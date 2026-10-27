(function (K) {
(K.lessons = K.lessons || {})["python/functions"] = {
  id: "functions", title: "Functions", language: "python", n: 8,
  summary: "I-wrap ang reusable steps sa function para tawagin kapag kailangan.",
  code: "def greet(name):\n    message = f\"Hi, {name}!\"\n    return message\n\nresult = greet(\"Ana\")\nprint(result)",
  annotations: [{ line: 1, from: 0, to: 3, text: "Ang def ang nagde-define ng function; name ang input parameter nito." }, { line: 2, from: 14, to: 25, text: "Gumagawa ang f-string ng text na may value ng name sa loob." }, { line: 3, from: 4, to: 10, text: "Ibinabalik ng return ang result sa code na tumawag sa function." }, { line: 5, from: 9, to: 14, text: "Function call ito at ipinapasa ang Ana bilang argument." }],
  trace: [{ line: 1, vars: {} }, { line: 5, vars: { name: "Ana" }, note: "Tinawag ang greet gamit ang argument na Ana." }, { line: 2, vars: { name: "Ana", message: "Hi, Ana!" } }, { line: 3, vars: { result: "Hi, Ana!" } }, { line: 6, vars: { result: "Hi, Ana!" }, output: "Hi, Ana!" }],
  editable: { starter: "def greet(name):\n    return f\"Hi, {name}!\"\n\nprint(greet(\"Ana\"))", expectedOutput: "Hi, Ana!" },
  predict: [{ code: "def double(value):\n    return value * 2\n\nprint(double(4))", answer: "8", explanation: "Tinawag ang double(4), kaya return ang 4 multiplied by 2." }, { code: "def add(a, b):\n    return a + b\n\nanswer = add(2, 5)\nprint(answer)", answer: "7", explanation: "Ang arguments na 2 at 5 ang naging a at b; 7 ang ibinalik." }],
  debug: [{ buggyCode: "def greet(name)\n    return \"Hi, \" + name\n\nprint(greet(\"Mia\"))", check: "def greet(name):\n    return \"Hi, \" + name\n\nprint(greet(\"Mia\"))", hints: ["May kailangan sa dulo ng function header.", "Lagyan ng colon (:) pagkatapos ng closing parenthesis."], solution: "def greet(name):\n    return \"Hi, \" + name\n\nprint(greet(\"Mia\"))", explanation: "Kailangan ng colon sa dulo ng def header para simulan ang function body." }],
  reorder: [{ lines: ["def greet(name):", "    return f\"Hi, {name}!\"", "print(greet(\"Sam\"))"], explanation: "I-define muna ang function bago ito tawagin." }],
  animation: null,
  kodigoCard: [{ label: "Define", snippet: "def greet(name):" }, { label: "Return", snippet: "return value" }, { label: "Call", snippet: "greet(\"Ana\")" }, { label: "Default", snippet: "def greet(name=\"friend\"):" }],
  miniProject: { goal: "Gumawa ng function na nagko-convert ng minutes to seconds.", starter: "def to_seconds(minutes):\n    # Ibalik ang minutes in seconds\n    pass\n\nprint(to_seconds(3))", hints: ["Isang minute ay 60 seconds.", "I-return ang minutes * 60."], solution: "def to_seconds(minutes):\n    return minutes * 60\n\nprint(to_seconds(3))" }
};
})(window.Kodigo = window.Kodigo || {});