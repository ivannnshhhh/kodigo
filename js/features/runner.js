(function (K) {
K.features = K.features || {};
const RUNNER_CONFIG = { java: { enabled: false, endpoint: "" } };
const PYODIDE_VERSION = "0.27.7";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
let worker;
let workerReady;
let mainPyodidePromise;

function collectInputs(code) {
  const count = [...code.matchAll(/\binput\s*\(/g)].length;
  const inputs = [];
  for (let index = 0; index < count; index += 1) {
    const value = window.prompt(`Input ${index + 1} para sa Python code:`);
    if (value === null) return null;
    inputs.push(value);
  }
  return inputs;
}

function createWorker() {
  const source = `
    importScripts("${PYODIDE_URL}");
    let pyodide;
    let running = false;
    self.onmessage = async event => {
      if (running) return;
      running = true;
      const data = event.data;
      let output = "";
      let stderr = "";
      try {
        if (!pyodide) pyodide = await loadPyodide({ indexURL: "${PYODIDE_INDEX}" });
        const inputBytes = new TextEncoder().encode((data.inputs || []).join("\\n") + "\\n");
        let inputIndex = 0;
        pyodide.setStdout({ batched: text => { output += text + "\\n"; } });
        pyodide.setStderr({ batched: text => { stderr += text + "\\n"; } });
        pyodide.setStdin({ stdin: () => inputIndex < inputBytes.length ? inputBytes[inputIndex++] : null });
        await pyodide.runPythonAsync(data.code);
        self.postMessage({ type: "done", output, error: stderr });
      } catch (error) {
        self.postMessage({ type: "run-error", output, error: stderr + String(error) });
      } finally { running = false; }
    };
    self.postMessage({ type: "ready" });`;
  const blobUrl = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
  try { return new Worker(blobUrl); }
  finally { URL.revokeObjectURL(blobUrl); }
}

function runInWorker(code, inputs, onLoading) {
  return new Promise(resolve => {
    let settled = false;
    let started = false;
    let timeout;
    let bootTimeout;
    const finish = result => { if (settled) return; settled = true; clearTimeout(timeout); clearTimeout(bootTimeout); resolve(result); };
    const startRun = () => {
      if (started) return;
      started = true;
      timeout = setTimeout(() => { worker?.terminate(); worker = null; workerReady = null; finish({ output: "", error: "Tumigil ang run pagkalipas ng 10 seconds. Baka may loop na hindi natatapos." }); }, 10000);
      worker.postMessage({ code, inputs });
    };
    try {
      if (!worker) { worker = createWorker(); workerReady = false; }
      onLoading?.(K.copy.loadingPython);
      if (!workerReady) bootTimeout = setTimeout(() => {
        if (!workerReady) { worker?.terminate(); worker = null; workerReady = null; finish({ fallback: true }); }
      }, 20000);
      worker.onmessage = event => {
        const data = event.data;
        if (data.type === "ready") {
          workerReady = true;
          clearTimeout(bootTimeout);
          startRun();
        }
        if (data.type === "done" || data.type === "run-error") finish({ output: data.output || "", error: data.error || "" });
      };
      worker.onerror = event => {
        clearTimeout(bootTimeout);
        worker?.terminate(); worker = null; workerReady = null;
        finish({ fallback: true, note: event.message || "Hindi gumana ang Python Worker." });
      };
      if (workerReady) startRun();
    } catch (error) { worker = null; workerReady = null; finish({ fallback: true, note: error.message }); }
  });
}

function loadPyodideOnPage(onLoading) {
  if (window.loadPyodide) {
    if (!mainPyodidePromise) mainPyodidePromise = window.loadPyodide({ indexURL: PYODIDE_INDEX });
    return mainPyodidePromise;
  }
  if (!mainPyodidePromise) {
    onLoading?.(K.copy.loadingPython);
    mainPyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PYODIDE_URL;
      script.async = true;
      script.onload = () => typeof window.loadPyodide === "function" ? resolve(window.loadPyodide({ indexURL: PYODIDE_INDEX })) : reject(new Error("Hindi naihanda ang Python runtime."));
      script.onerror = () => reject(new Error("Hindi ma-load ang Python. I-check ang internet connection at subukan ulit."));
      document.head.append(script);
    }).catch(error => { mainPyodidePromise = null; throw error; });
  }
  return mainPyodidePromise;
}

async function runOnMainThread(code, inputs, onLoading, fallbackNote) {
  let pyodide;
  try {
    onLoading?.(K.copy.loadingPython);
    pyodide = await loadPyodideOnPage(onLoading);
  } catch (error) {
    return { output: "", error: `Hindi ma-load ang Python runtime. I-check ang internet at subukan ulit. ${error.message || ""}`.trim(), retryable: true, note: fallbackNote };
  }
  try {
    let output = "";
    let stderr = "";
    const inputBytes = new TextEncoder().encode(inputs.join("\n") + "\n");
    let inputIndex = 0;
    pyodide.setStdout({ batched: text => { output += text + "\n"; } });
    pyodide.setStderr({ batched: text => { stderr += text + "\n"; } });
    pyodide.setStdin({ stdin: () => inputIndex < inputBytes.length ? inputBytes[inputIndex++] : null });
    let softTimedOut = false;
    const softTimeout = setTimeout(() => { softTimedOut = true; onLoading?.("Python is still running. Main-thread runs cannot be stopped safely."); }, 10000);
    try { await pyodide.runPythonAsync(code); }
    finally { clearTimeout(softTimeout); }
    return { output, error: stderr, note: [fallbackNote, softTimedOut ? "Natapos ang Python run matapos ang soft timeout warning." : ""].filter(Boolean).join(" ") };
  } catch (error) {
    return { output: "", error: String(error), note: fallbackNote };
  }
}

async function runPython(code, onLoading, providedInputs) {
  const inputs = providedInputs === undefined ? collectInputs(code) : providedInputs;
  if (inputs === null) return { output: "", error: "Run cancelled." };
  const workerResult = await runInWorker(code, inputs, onLoading);
  if (!workerResult.fallback) return workerResult;
  const fallbackNote = "Worker unavailable. Tumatakbo ang Python sa page; maaaring mag-freeze sandali ang browser sa mahahabang run.";
  const result = await runOnMainThread(code, inputs, onLoading, fallbackNote);
  return result;
}

function prepareJavaSource(code) {
  if (/\bclass\s+Main\b/.test(code) || /\bstatic\s+void\s+main\s*\(/.test(code)) return code;
  const lines = code.split(/\r?\n/);
  const imports = lines.filter(line => /^\s*import\s+/.test(line));
  const body = lines.filter(line => !/^\s*import\s+/.test(line)).join("\n");
  return `${imports.join("\n")}${imports.length ? "\n\n" : ""}class Main {\n  public static void main(String[] args) throws Exception {\n${body.split("\n").map(line => `    ${line}`).join("\n")}\n  }\n}`;
}

async function runJava(code, inputs = []) {
  if (!RUNNER_CONFIG.java.enabled || !RUNNER_CONFIG.java.endpoint) return { output: "", error: K.copy.javaRunnerNotice };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(RUNNER_CONFIG.java.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal, body: JSON.stringify({ language: "java", version: "15.0.2", files: [{ name: "Main.java", content: prepareJavaSource(code) }], stdin: inputs.join("\n") + "\n" }) });
    if (!response.ok) {
      if (response.status === 401) throw new Error("Java runner authorization required. Configure an authorized or self-hosted Piston endpoint.");
      throw new Error(`Runner returned ${response.status}.`);
    }
    const result = await response.json();
    const error = result.run?.stderr || result.compile?.stderr || (result.compile?.code && result.compile.code !== 0 ? result.compile?.output : "") || (result.run?.code && result.run.code !== 0 ? result.run?.output : "") || "";
    return { output: result.run?.output || result.compile?.output || "No output.", error };
  } catch (error) {
    return { output: "", error: error.name === "AbortError" ? "Nag-timeout ang Java runner." : error.message };
  } finally { clearTimeout(timeout); }
}

function runCode(language, code, onLoading, inputs) { return language === "python" ? runPython(code, onLoading, inputs) : runJava(code, inputs); }
K.features.runner = { RUNNER_CONFIG, runPython, runJava, runCode };
})(window.Kodigo = window.Kodigo || {});