(function (K) {
(K.lessons = K.lessons || {})["python/variables-and-data-types"] = {
  id: "variables-and-data-types", title: "Variables and Data Types", language: "python", n: 1,
  summary: "Lagyan natin ng pangalan ang values para magamit ulit sa code.",
  code: "name = \"Mia\"\nage = 18\nis_student = True\nprint(name, age)\nage = age + 1\nprint(age)",
  annotations: [
    { line: 1, from: 0, to: 4, text: "Variable ang pangalan na lalagyan ng value; puwede mo itong gamitin ulit." },
    { line: 2, from: 0, to: 3, text: "Number ang value na 18, kaya puwede itong gamitin sa math." },
    { line: 3, from: 0, to: 10, text: "Boolean ito: True o False lang ang puwedeng value." },
    { line: 5, from: 6, to: 11, text: "Kinukuha ang lumang age, dinadagdagan ng 1, tapos sine-save ulit." }
  ],
  sections: [
    { heading: "Variable = label ng box", code: "name = \"Mia\"\nage = 18\nprint(name)\nprint(age)", annotations: [{ line: 1, from: 0, to: 4, text: "name ang label ng box; ang string na Mia ang laman nito." }, { line: 2, from: 0, to: 3, text: "age ang label, at 18 ang numeric value sa box niya." }], explanation: ["Variable ang pangalang ibinibigay mo sa value para magamit mo ulit ito. Isipin mo na may mga labeled na box: name ang pangalan sa labas ng box, tapos Mia ang laman.", "Sa Python, hindi mo muna kailangang isulat ang type bago ang variable. Tinitingnan ni Python ang value para malaman kung text, number, o iba pa."], whereUsed: "Pang-store ng pangalan, score, presyo, status, at anumang data na gagamitin pa ng program.", tip: "Gumamit ng malinaw na pangalan: user_name mas gets kaysa x." },
    { heading: "String: text na naka-quotes", code: "first_name = \"Mia\"\nmessage = 'Hello!'\nprint(first_name + \" says: \" + message)", annotations: [{ line: 1, from: 13, to: 18, text: "Ang Mia ay string dahil naka-quotes; text ito, hindi variable name." }, { line: 3, from: 6, to: 16, text: "Ang + dito ay nagdudugtong ng strings para maging isang sentence." }], explanation: ["Ang string ay text. Puwedeng double quotes o single quotes, basta match ang opening at closing quote.", "Useful ito para sa names, messages, emails, captions, at anumang words na ipapakita sa user."], whereUsed: "UI labels, chat messages, form input, file content, at API data." },
    { heading: "Numbers: int at float", code: "age = 18\nprice = 49.50\ntotal = age + 2\nprint(total)\nprint(price * 2)", annotations: [{ line: 1, from: 6, to: 8, text: "18 ay int: whole number na walang decimal." }, { line: 2, from: 8, to: 13, text: "49.50 ay float: number na may decimal point." }, { line: 3, from: 8, to: 15, text: "Nag-compute si Python at ang total box ay naging 20." }], explanation: ["int ang whole numbers tulad ng age, count, at quantity. float naman ang may decimal tulad ng price, rating, o average.", "Pareho silang numbers, pero ingat sa money apps: puwedeng magkaroon ng tiny rounding issues ang float."], whereUsed: "Scores, counters, prices, measurements, percentages, at calculations." },
    { heading: "Boolean at None: yes/no at wala pa", code: "is_logged_in = True\nis_admin = False\nprofile_photo = None\nprint(is_logged_in)\nprint(profile_photo)", annotations: [{ line: 1, from: 15, to: 19, text: "True ay boolean value: yes / on / valid." }, { line: 2, from: 11, to: 16, text: "False ay boolean value: no / off / not valid." }, { line: 3, from: 16, to: 20, text: "None means wala pang value; hindi ito empty string at hindi rin zero." }], explanation: ["Boolean ay True o False lang, ginagamit sa decisions gaya ng 'logged in ba?' o 'pasado ba?'. Capital T at F ang Python style.", "None ay intentional na 'wala pa'. Halimbawa, walang profile photo ang user ngayon pero puwede siyang mag-upload later."], whereUsed: "if statements, feature switches, validation, at optional data." },
    { heading: "Collections: maraming values sa isang variable", code: "colors = [\"red\", \"blue\"]\npoint = (10, 20)\nunique_tags = {\"sale\", \"new\"}\nprofile = {\"name\": \"Mia\", \"age\": 18}\nprint(colors[0])\nprint(profile[\"name\"])", annotations: [{ line: 1, from: 9, to: 24, text: "List: ordered at puwedeng baguhin na group ng values." }, { line: 2, from: 8, to: 16, text: "Tuple: ordered values din, pero usually hindi binabago pagkatapos gawin." }, { line: 3, from: 14, to: 29, text: "Set: unique values lang; walang duplicate entries." }, { line: 4, from: 10, to: 36, text: "Dictionary: may key na label at katapat na value, parang mini profile form." }], explanation: ["List para sa ordered na items, tuple para sa fixed pair/group, set para sa unique values, at dictionary para sa named fields.", "Hindi required na kabisado lahat agad. Piliin base sa kailangan: sequence ba, unique ba, o may label bawat value?"], whereUsed: "Shopping cart, coordinates, tags, user profile, API response, at datasets." }
  ],
  trace: [
    { line: 1, vars: { name: "Mia" }, note: "May pangalan na ang text value." },
    { line: 2, vars: { name: "Mia", age: 18 } },
    { line: 3, vars: { name: "Mia", age: 18, is_student: true } },
    { line: 4, vars: { name: "Mia", age: 18, is_student: true }, output: "Mia 18" },
    { line: 5, vars: { name: "Mia", age: 19, is_student: true }, note: "Nagbago ang age mula 18 papuntang 19." },
    { line: 6, vars: { name: "Mia", age: 19, is_student: true }, output: "19" }
  ],
  editable: { starter: "name = \"Mia\"\nage = 18\nprint(name, age)", expectedOutput: "Mia 18" },
  predict: [
    { code: "score = 4\nscore = score + 3\nprint(score)", answer: "7", explanation: "In-update ang score: 4 plus 3 ay 7." },
    { code: "city = \"Cebu\"\nprint(city)", answer: "Cebu", explanation: "Ini-print ang laman ng city, hindi ang pangalan ng variable." }
  ],
  debug: [{ buggyCode: "price = 50\nquantity = 2\nprint(price + \" pesos\")", check: "price = 50\nquantity = 2\nprint(str(price) + \" pesos\")", hints: ["Magkaiba ang number at text types.", "I-convert muna ang price gamit ang str()."], solution: "price = 50\nquantity = 2\nprint(str(price) + \" pesos\")", explanation: "TypeError ang pagdugtong ng number at string; ginawa muna nating text ang price." }],
  reorder: [{ lines: ["total = 12 + 8", "print(total)"], explanation: "I-assign muna ang value bago ito gamitin." }],
  animation: "variable",
  kodigoCard: [{ label: "Text", snippet: "name = \"Mia\"" }, { label: "Number", snippet: "age = 18" }, { label: "Boolean", snippet: "is_ready = True" }, { label: "Update", snippet: "count = count + 1" }],
  miniProject: { goal: "Gumawa ng profile card gamit ang variables.", starter: "name = \"Kai\"\ncity = \"Iloilo\"\n# I-print ang name at city sa isang sentence", hints: ["Puwedeng maraming value sa print().", "Try print(name, \"lives in\", city)."], solution: "name = \"Kai\"\ncity = \"Iloilo\"\nprint(name, \"lives in\", city)" }
};
})(window.Kodigo = window.Kodigo || {});
