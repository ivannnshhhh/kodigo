// Python question bank contains ten questions for each quiz type.
(function (K) {
K.quiz = K.quiz || {};
K.quiz.python = {
  multipleChoice: [
    { q: "Ano ang type ng value na `True`?", options: ["bool", "str", "int", "list"], answer: 0, explain: "Boolean ang True at False values." },
    { q: "Ano ang output ng `print(2 + 3 * 2)`?", options: ["10", "8", "12", "7"], answer: 1, explain: "Una ang multiplication: 3 times 2, saka dagdag ang 2." },
    { q: "Aling function ang kumukuha ng user input?", options: ["read()", "input()", "scan()", "get()"], answer: 1, explain: "input() ang built-in function para kumuha ng text input." },
    { q: "Aling keyword ang nagsisimula ng conditional branch?", options: ["when", "if", "case", "check"], answer: 1, explain: "Gumagamit ang Python ng if para mag-test ng condition." },
    { q: "Ilang beses tatakbo ang `for n in range(3)`?", options: ["2", "3", "4", "Walang katapusan"], answer: 1, explain: "Kasama ang 0, 1, at 2 sa range(3)." },
    { q: "Paano idagdag ang value sa dulo ng list na `items`?", options: ["items.add(value)", "items.append(value)", "items.push(value)", "append.items(value)"], answer: 1, explain: "append() ang nagdadagdag sa dulo ng list." },
    { q: "Ano ang ibinabalik ng function na walang return statement?", options: ["0", "False", "None", "Empty string"], answer: 2, explain: "None ang default return value ng Python function." },
    { q: "Aling block ang sumasalo ng error mula sa try block?", options: ["catch", "except", "finally", "error"], answer: 1, explain: "except ang Python keyword para humawak ng exception." },
    { q: "Anong mode ang nagbubukas ng file para idagdag sa dulo?", options: ["\"r\"", "\"w\"", "\"a\"", "\"x\""], answer: 2, explain: "Ang append mode na \"a\" ay nagdadagdag sa dulo ng file." },
    { q: "Ano ang ginagawa ng `return` sa recursive function?", options: ["Tinatapos ang buong Python app", "Ibinabalik ang result sa caller", "Umuulit agad", "Nag-iimport ng module"], answer: 1, explain: "Ipinapasa ng return ang computed result pabalik sa tumawag." }
  ],
  trueFalse: [
    { q: "Mutable ang Python list, kaya puwedeng baguhin ang laman nito.", answer: true, explain: "Puwedeng magdagdag o magpalit ng list items." },
    { q: "`==` ang karaniwang pang-assign ng value sa variable.", answer: false, explain: "Single `=` ang assignment; `==` ang equality comparison." },
    { q: "Ang `elif` ay puwedeng sumunod sa `if` para mag-test ng ibang condition.", answer: true, explain: "Nagdadagdag ang elif ng alternative branch." },
    { q: "Laging isang beses tumatakbo ang while loop kahit false ang condition.", answer: false, explain: "Maaaring zero times tumakbo ang while loop." },
    { q: "Ang tuple ay karaniwang immutable.", answer: true, explain: "Hindi direktang napapalitan ang tuple items pagkatapos itong gawin." },
    { q: "Ang dictionary ay nagma-map ng keys sa values.", answer: true, explain: "Bawat key sa dictionary ay tumutukoy sa value." },
    { q: "Nagiging string ang integer kapag tinawag ang `int(\"12\")`.", answer: false, explain: "Integer na 12 ang resulta ng int(\"12\")." },
    { q: "Puwedeng gumamit ng `finally` para sa cleanup kahit may exception.", answer: true, explain: "Tumatakbo ang finally matapos ang try/except flow." },
    { q: "Ang `import math` ay nag-i-import ng standard library module.", answer: true, explain: "Bahagi ng Python standard library ang math." },
    { q: "Palaging mas mabilis ang recursion kaysa iteration.", answer: false, explain: "May overhead ang recursive calls; depende sa task ang performance." }
  ],
  identification: [
    { q: "Anong built-in function ang ginagamit para ipakita ang output?", answers: ["print"], explain: "print() ang nagpapakita ng output." },
    { q: "Anong keyword ang ginagamit para mag-define ng function?", answers: ["def"], explain: "Nagsisimula sa def ang Python function definition." },
    { q: "Anong keyword ang nagdadagdag ng branch kapag if condition false?", answers: ["elif", "else if"], explain: "elif ang Python syntax para sa else-if branch." },
    { q: "Anong operator ang naghahati at nagbabalik ng decimal quotient?", answers: ["/"], explain: "Ang / operator ay regular division." },
    { q: "Ano ang tawag sa collection na walang duplicate at walang fixed order?", answers: ["set", "a set"], explain: "Ang set ay collection ng unique values." },
    { q: "Anong keyword ang nagsisimula ng exception-handling block?", answers: ["try"], explain: "Ilagay sa try ang code na maaaring mag-raise ng error." },
    { q: "Anong keyword ang nagbabalik ng value mula sa function?", answers: ["return"], explain: "return ang nagpapasa ng result sa caller." },
    { q: "Anong built-in function ang nagbibigay ng bilang ng items sa collection?", answers: ["len"], explain: "len() ang nagbibilang ng items o characters." },
    { q: "Anong keyword ang naglo-load ng module sa kasalukuyang file?", answers: ["import"], explain: "Gamitin ang import para magamit ang module." },
    { q: "Anong keyword ang nagpapasa ng value sa susunod na iteration ng loop?", answers: ["continue"], explain: "Nilalaktawan ng continue ang natitirang code sa iteration." }
  ],
  code: [
    { q: "I-print ang bilang ng `apples` at `oranges`.", starter: "apples = 4\noranges = 3\n# I-print ang total", expectedOutput: "7", patterns: [], hint: "Pagsamahin ang dalawang integer bago i-print.", solution: "apples = 4\noranges = 3\nprint(apples + oranges)", explain: "Pinagsama ang dalawang number at ipinakita ang total." },
    { q: "I-print ang `Hello, Kai!` gamit ang variable na name.", starter: "name = \"Kai\"\n# I-print ang greeting", expectedOutput: "Hello, Kai!", patterns: [], hint: "Gamitin ang f-string para isingit ang name.", solution: "name = \"Kai\"\nprint(f\"Hello, {name}!\")", explain: "In-format ng f-string ang greeting gamit ang name." },
    { q: "I-print ang `Even` kapag even ang number.", starter: "number = 8\n# I-check kung even at i-print ang Even", expectedOutput: "Even", patterns: [], hint: "Ang even number ay walang remainder kapag hinati sa 2.", solution: "number = 8\nif number % 2 == 0:\n    print(\"Even\")", explain: "Zero ang remainder ng even number sa division by 2." },
    { q: "I-print ang numbers 1 hanggang 3, tig-iisang line.", starter: "# Gumamit ng for loop", expectedOutput: "1\n2\n3", patterns: [], hint: "Tandaan na exclusive ang dulo ng range().", solution: "for number in range(1, 4):\n    print(number)", explain: "Nag-yield ang range(1, 4) ng 1, 2, at 3." },
    { q: "I-print ang uppercase version ng word.", starter: "word = \"kodigo\"\n# I-print ang uppercase", expectedOutput: "KODIGO", patterns: [], hint: "May string method para gawing uppercase ang text.", solution: "word = \"kodigo\"\nprint(word.upper())", explain: "Gumagawa ang upper() ng uppercase string." },
    { q: "I-print ang unang item sa list.", starter: "colors = [\"blue\", \"green\"]\n# I-print ang unang item", expectedOutput: "blue", patterns: [], hint: "Zero ang index ng unang list item.", solution: "colors = [\"blue\", \"green\"]\nprint(colors[0])", explain: "Nasa index 0 ang unang item." },
    { q: "Gumawa ng function na nagdodoble ng value at i-print ang result para sa 5.", starter: "# Gumawa ng double(value) at gamitin ito sa 5", expectedOutput: "10", patterns: [], hint: "I-return ang value multiplied by 2.", solution: "def double(value):\n    return value * 2\n\nprint(double(5))", explain: "Nagbalik ang function ng 5 times 2." },
    { q: "I-print ang value ng key `city` mula sa dictionary.", starter: "profile = {\"city\": \"Cebu\"}\n# I-print ang city", expectedOutput: "Cebu", patterns: [], hint: "I-access ang dictionary value gamit ang key sa square brackets.", solution: "profile = {\"city\": \"Cebu\"}\nprint(profile[\"city\"])", explain: "Ginamit ang key na city para kunin ang value." },
    { q: "Gumawa ng file na may `Hello`, basahin ang unang line, at i-print ito.", starter: "with open(\"note.txt\", \"w\") as file:\n    file.write(\"Hello\\n\")\n# Basahin at i-print ang unang line", expectedOutput: "Hello", patterns: [], hint: "Buksan ulit ang file sa read mode at gamitin ang readline().", solution: "with open(\"note.txt\", \"w\") as file:\n    file.write(\"Hello\\n\")\nwith open(\"note.txt\") as file:\n    print(file.readline().strip())", explain: "Ginamit ang context manager sa pagsulat at pagbasa ng file." },
    { q: "I-print ang kabuuan ng numbers list gamit ang built-in function.", starter: "numbers = [2, 3, 5]\n# I-print ang sum", expectedOutput: "10", patterns: [], hint: "May built-in function na sum() para sa iterable numbers.", solution: "numbers = [2, 3, 5]\nprint(sum(numbers))", explain: "Pinagsama ng sum() ang lahat ng list values." }
  ]
};
})(window.Kodigo = window.Kodigo || {});
