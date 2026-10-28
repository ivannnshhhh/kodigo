(function (K) {
(K.lessons = K.lessons || {})["python/list-methods"] = {
  id: "list-methods", title: "List Methods", language: "python", n: 7,
  summary: "Gamitin ang list methods para magdagdag, magtanggal, maghanap, at mag-ayos ng items.",
  showAllSections: true,
  code: "tasks = [\"review notes\", \"write code\"]\ntasks.append(\"run tests\")\ntasks.extend([\"fix bug\", \"push code\"])\ntasks.insert(1, \"take a break\")\nprint(tasks)",
  annotations: [
    { line: 1, from: 0, to: 41, text: "Gumawa tayo ng list. Naka-order ang items at puwede pa silang baguhin." },
    { line: 2, from: 0, to: 25, text: "append() ay nagdadagdag ng isang item sa pinakadulo ng list." },
    { line: 3, from: 0, to: 43, text: "extend() ay nagdadagdag ng maraming items mula sa ibang list." },
    { line: 4, from: 0, to: 35, text: "insert(index, value) ay nagsisingit ng item sa specific na position." },
    { line: 5, from: 0, to: 12, text: "Makikita sa output ang updated na list." }
  ],
  sections: [
    {
      heading: "1. Magdagdag: append, extend, insert",
      code: "tasks = [\"review notes\", \"write code\"]\ntasks.append(\"run tests\")\ntasks.extend([\"fix bug\", \"push code\"])\ntasks.insert(1, \"take a break\")\nprint(tasks)",
      annotations: [
        { line: 1, from: 0, to: 5, text: "tasks ay list variable; nasa square brackets ang items." },
        { line: 2, from: 6, to: 12, text: "append() = dagdag ng isang item sa dulo." },
        { line: 3, from: 6, to: 12, text: "extend() = dagdag ng lahat ng items mula sa isang list." },
        { line: 4, from: 6, to: 12, text: "insert(1, ...) = singit sa index 1, bago ang dating item doon." },
        { line: 5, from: 0, to: 12, text: "print para makita ang final list." }
      ],
      explanation: ["append() isang item lang. extend() maraming item. insert() puwedeng pumili ng exact na position."],
      whereUsed: "To-do lists, shopping carts, names ng students, game items, at anumang listahang puwedeng magbago.",
      tip: "Index nagsisimula sa 0, kaya insert(1, value) ay second position."
    },
    {
      heading: "2. Magtanggal: remove, pop, clear",
      code: "fruits = [\"mango\", \"apple\", \"banana\"]\nfruits.remove(\"apple\")\nlast_fruit = fruits.pop()\nprint(last_fruit)\nfruits.clear()\nprint(fruits)",
      annotations: [
        { line: 2, from: 7, to: 13, text: "remove(\"apple\") = tanggal gamit ang value." },
        { line: 3, from: 14, to: 19, text: "pop() = tanggalin at ibalik ang last item; puwede rin ang pop(index)." },
        { line: 5, from: 7, to: 12, text: "clear() = tanggalin lahat ng items; magiging empty list []." }
      ],
      explanation: ["remove(value) ay value ang gamit. pop() ay position ang gamit at may ibinabalik na item. clear() naman ay reset ng buong list."],
      whereUsed: "Pag-delete ng cart item, pagkuha ng next/last task, o pag-reset ng temporary data.",
      tip: "Kapag wala ang value na ibinigay sa remove(), magkaka-ValueError."
    },
    {
      heading: "3. Maghanap: index at count",
      code: "scores = [90, 75, 90, 80]\nfirst_90 = scores.index(90)\nhow_many_90 = scores.count(90)\nprint(first_90)\nprint(how_many_90)",
      annotations: [
        { line: 2, from: 18, to: 23, text: "index(90) = kunin ang position ng unang 90." },
        { line: 3, from: 20, to: 25, text: "count(90) = bilangin kung ilang beses lumabas ang 90." }
      ],
      explanation: ["index(value) ay nagsasabi kung saan unang nakita ang value. count(value) ay nagsasabi kung ilang duplicate ang mayroon."],
      whereUsed: "Paghanap ng item position at pagbilang ng votes, scores, o repeated na tags.",
      tip: "Mag-e-error ang index() kung wala ang value sa list."
    },
    {
      heading: "4. Ayusin at kopyahin: sort, reverse, copy",
      code: "numbers = [8, 3, 5]\nbackup = numbers.copy()\nnumbers.sort()\nnumbers.reverse()\nprint(numbers)\nprint(backup)",
      annotations: [
        { line: 2, from: 17, to: 21, text: "copy() = gumawa ng hiwalay na duplicate list." },
        { line: 3, from: 8, to: 12, text: "sort() = small to big para sa numbers; alphabetical para sa text." },
        { line: 4, from: 8, to: 15, text: "reverse() = baliktarin ang kasalukuyang order." }
      ],
      explanation: ["copy() ay safe backup. sort() ay nag-aayos. reverse() ay nagbabaliktad ng current order. Lahat maliban sa copy() ay binabago ang same list."],
      whereUsed: "Leaderboards, alphabetical name lists, newest-to-oldest display, at backup bago mag-edit ng data.",
      tip: "Kung descending numbers ang gusto: numbers.sort(reverse=True)."
    }
  ],
  trace: [
    { line: 1, vars: { tasks: ["review notes", "write code"] }, note: "May dalawang starting tasks." },
    { line: 2, vars: { tasks: ["review notes", "write code", "run tests"] }, note: "Nadagdag ang run tests sa dulo." },
    { line: 3, vars: { tasks: ["review notes", "write code", "run tests", "fix bug", "push code"] }, note: "Naidagdag ng extend() ang dalawang bagong tasks." },
    { line: 4, vars: { tasks: ["review notes", "take a break", "write code", "run tests", "fix bug", "push code"] }, note: "Naipasok ang take a break sa index 1." },
    { line: 5, vars: { tasks: ["review notes", "take a break", "write code", "run tests", "fix bug", "push code"] }, output: "['review notes', 'take a break', 'write code', 'run tests', 'fix bug', 'push code']" }
  ],
  editable: { starter: "fruits = [\"mango\", \"apple\"]\n# Magdagdag ng \"banana\"\n# Alisin ang \"mango\"\n# I-sort at i-print ang fruits", expectedOutput: "['apple', 'banana']" },
  predict: [
    { code: "colors = [\"blue\", \"red\"]\ncolors.append(\"green\")\ncolors.sort()\nprint(colors)", answer: "['blue', 'green', 'red']", explanation: "Nadagdag muna ang green, tapos inayos ni sort() alphabetically." },
    { code: "scores = [90, 70, 80]\nscores.remove(70)\nprint(scores)", answer: "[90, 80]", explanation: "Value na 70 ang tinanggal ni remove(), hindi ang item sa index 70." }
  ],
  debug: [{ buggyCode: "fruits = [\"mango\", \"apple\"]\nfruits.remove(\"banana\")\nprint(fruits)", check: "fruits = [\"mango\", \"apple\"]\nfruits.append(\"banana\")\nfruits.remove(\"banana\")\nprint(fruits)", hints: ["Wala pang banana sa list bago ito i-remove.", "Mag-append muna o mag-remove ng existing na value."], solution: "fruits = [\"mango\", \"apple\"]\nfruits.append(\"banana\")\nfruits.remove(\"banana\")\nprint(fruits)", explanation: "Kailangang existing ang value bago gamitin ang remove()." }],
  reorder: [{ lines: ["numbers = [8, 3, 5]", "numbers.append(1)", "numbers.sort()", "print(numbers)"], explanation: "Gumawa muna ng list, saka magdagdag at mag-sort bago i-print." }],
  animation: null,
  kodigoCard: [{ label: "Add", snippet: "items.append(value)" }, { label: "Remove value", snippet: "items.remove(value)" }, { label: "Sort", snippet: "items.sort()" }, { label: "Remove by index", snippet: "items.pop(index)" }],
  miniProject: { goal: "Gumawa ng mini shopping list na may add, remove, at sort.", starter: "shopping = [\"milk\", \"bread\"]\n# Magdagdag ng isang item\n# Magtanggal ng isang existing item\n# I-sort at i-print", hints: ["Gamitin ang shopping.append(...).", "Gamitin ang shopping.remove(...) bago shopping.sort()."], solution: "shopping = [\"milk\", \"bread\"]\nshopping.append(\"eggs\")\nshopping.remove(\"milk\")\nshopping.sort()\nprint(shopping)" }
};
})(window.Kodigo = window.Kodigo || {});
