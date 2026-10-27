(function (K) {
(K.lessons = K.lessons || {})["python/conditional-statements"] = {
  id: "conditional-statements", title: "Conditional Statements", language: "python", n: 4,
  summary: "Gamit ang if at else, pipili ang program ng code na tatakbo.",
  code: "temperature = 31\nif temperature >= 30:\n    print(\"Mainit ngayon.\")\nelse:\n    print(\"Presko ngayon.\")",
  annotations: [{ line: 2, from: 0, to: 2, text: "Tine-test ng if kung true ang condition bago patakbuhin ang indented block." }, { line: 2, from: 16, to: 18, text: "Comparison operator ito: true kapag 30 o mas mataas ang temperature." }, { line: 4, from: 0, to: 4, text: "Tatama ang else kapag false ang condition sa if." }],
  trace: [{ line: 1, vars: { temperature: 31 } }, { line: 2, vars: { temperature: 31 }, note: "31 >= 30 ay true." }, { line: 3, vars: { temperature: 31 }, output: "Mainit ngayon." }],
  editable: { starter: "score = 82\nif score >= 75:\n    print(\"Passed\")\nelse:\n    print(\"Try again\")", expectedOutput: "Passed" },
  predict: [{ code: "age = 15\nif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")", answer: "Minor", explanation: "False ang 15 >= 18, kaya else block ang tumakbo." }, { code: "n = 4\nif n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")", answer: "Even", explanation: "Zero ang remainder ng 4 divided by 2, kaya even." }],
  debug: [{ buggyCode: "score = 65\nif score >= 75\n    print(\"Passed\")", check: "score = 65\nif score >= 75:\n    print(\"Passed\")\nelse:\n    print(\"Try again\")", hints: ["May isang punctuation mark na kailangan sa condition line.", "Lagyan ng colon (:) pagkatapos ng 75."], solution: "score = 65\nif score >= 75:\n    print(\"Passed\")\nelse:\n    print(\"Try again\")", explanation: "Kailangan ng colon pagkatapos ng if condition; idinagdag din ang else para sa alternate case." }],
  reorder: [{ lines: ["score = 80", "if score >= 75:", "    print(\"Pass\")", "else:", "    print(\"Retry\")"], explanation: "Unahin ang value, saka condition, tapos ang indented branches." }],
  animation: null,
  kodigoCard: [{ label: "If", snippet: "if condition:" }, { label: "Else", snippet: "else:" }, { label: "Compare", snippet: "score >= 75" }, { label: "Both", snippet: "if / elif / else" }],
  miniProject: { goal: "I-label kung pasado o kailangan pang mag-review.", starter: "score = 72\n# Gumamit ng if / else\n# Passing score ay 75", hints: ["I-compare ang score sa 75.", "I-print ang Passed kung true, at Review kung hindi."], solution: "score = 72\nif score >= 75:\n    print(\"Passed\")\nelse:\n    print(\"Review\")" }
};
})(window.Kodigo = window.Kodigo || {});