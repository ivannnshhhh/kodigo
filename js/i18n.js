// Interface language only. Course names, code, and the Kodigo brand stay unchanged.
(function (K) {
const { getInterfaceLanguage, saveInterfaceLanguage } = K.store;
const strings = {
  tl: { skip: "Laktaw sa content", courseLanguage: "Pumili ng programming language", language: "Language", roadmap: "Roadmap", careerPaths: "Career paths", chooseRoadmap: "Pumili ng roadmap", allRoadmaps: "Lahat ng roadmap", careerPath: "Career path", focus: "Pag-aaralan", projectGoal: "Goal sa project", handsOn: "Hands-on practice", codingChallenge: "Coding challenge", yourTurn: "Ikaw naman:", chooseDifficulty: "Pumili ng difficulty, gamitin ang hints kung kailangan, at i-run ang solution. Kapag tumakbo ito nang walang error, makukuha mo ang points.", difficulty: "Difficulty", solutionCode: "Solution code", hint: "Hint", runChallenge: "I-run ang challenge", completed: "Tapos na", readyWhenYouAre: "Handa na kapag ikaw na.", memoryVisualization: "Memory visualization", peekMemory: "Silipin ang laman ng memory", stepThroughCode: "I-step ang code para makita ang pagbabago ng variables, collections, at objects habang sinusundan ang lesson.", noVariablesYet: "Wala pang variable values sa step na ito.", previousStep: "Previous step", nextStep: "Next step", noOutputThisStep: "Walang bagong output sa step na ito.", testCasePlayground: "Test case playground", tryDifferentInputs: "Subukan ang iba’t ibang input", runEachTest: "Patakbuhin ang code sa bawat test case. Ilagay ang input at inaasahang output para makita kung pumasa ang solution.", baseline: "baseline", ownEdgeCase: "sariling edge case", custom: "custom", input: "Input", expectedOutput: "Expected output", oneInputPerLine: "Isang input kada line", exampleInputs: "Halimbawa: 0, blank, o ibang value", expectedBehavior: "Ano ang dapat mangyari?", notRunYet: "Hindi pa na-run.", addTestCase: "Magdagdag ng test case", runAllTests: "I-run lahat ng tests", removeTestCase: "Alisin ang test case", fillInBlank: "Punan ang blank", completeCode: "Kumpletuhin ang code", missingCode: "Missing code", typeMissingCode: "I-type ang nawawalang code", checkAnswer: "I-check ang sagot", dragDropCoding: "Drag-and-Drop Coding", completeMissingPart: "Kumpletuhin ang nawawalang bahagi", dragChoiceInstructions: "Nasa code area ang existing code. I-drag ang tamang choice papunta sa blank. Sa phone, i-tap ang choice at pagkatapos ay ang blank.", fillBlankExisting: "Punan ang blank sa existing code.", choices: "Choices", reset: "I-reset", miniProject: "Mini project", makeItYourOwn: "Gawin mong sarili mong code", starterCode: "Starter code", showSolution: "Ipakita ang solution", predictOutput: "Hulaan ang output", predictQuestion: "Ikaw muna: ano ang lalabas?", question: "Tanong", output: "Output", check: "I-check", brokenCode: "Sirang code", findFixBug: "Hanapin at ayusin ang bug", editCode: "I-edit ang code", showAnswer: "Ipakita ang sagot", commonMistakes: "Karaniwang pagkakamali", fix: "Ayos", practiceLab: "Practice lab", writeCode: "Ikaw ang magsulat", loadSampleHelp: "Mag-load ng sample kung kailangan, baguhin ito, at i-run ang sarili mong solution.", loadSample: "Load sample", runCode: "I-run ang code", clear: "I-clear", copy: "Copy", searchNoResults: "Walang nakita. Subukan ang ibang keyword.", history: "Kasaysayan", timeline: "Timeline", whyPopular: "Bakit ito sikat?", whereUsed: "Saan ito ginagamit?", milestones: "Mahahalagang milestones", whereToStart: "Saan magsisimula?", funFact: "Fun fact", madeBy: "Ginawa ni", lessonNavigation: "Navigation ng lesson", startTopic: "Simulan na: Topic 1", continue: "Ituloy", beginner: "Baguhan", intermediate: "Gitna", advanced: "Advanced", whyKodigo: "Bakit Kodigo", streak: "araw na sunod-sunod", footerCredit: "Developed by: Nielagang Itlog" },
  en: { skip: "Skip to content", courseLanguage: "Choose programming language", language: "Language", roadmap: "Roadmap", careerPaths: "Career paths", chooseRoadmap: "Choose a roadmap", allRoadmaps: "All roadmaps", careerPath: "Career path", focus: "Focus", projectGoal: "Project goal", handsOn: "Hands-on practice", codingChallenge: "Coding challenge", yourTurn: "Your turn:", chooseDifficulty: "Choose a difficulty, use hints if needed, and run your solution. If it runs without errors, you will earn points.", difficulty: "Difficulty", solutionCode: "Solution code", hint: "Hint", runChallenge: "Run challenge", completed: "Completed", readyWhenYouAre: "Ready when you are.", memoryVisualization: "Memory visualization", peekMemory: "See what is in memory", stepThroughCode: "Step through the code to see how variables, collections, and objects change during the lesson.", noVariablesYet: "There are no variable values at this step yet.", previousStep: "Previous step", nextStep: "Next step", noOutputThisStep: "There is no new output at this step.", testCasePlayground: "Test case playground", tryDifferentInputs: "Try different inputs", runEachTest: "Run the code for each test case. Enter input and expected output to see whether the solution passes.", baseline: "baseline", ownEdgeCase: "your edge case", custom: "custom", input: "Input", expectedOutput: "Expected output", oneInputPerLine: "One input per line", exampleInputs: "For example: 0, blank, or another value", expectedBehavior: "What should happen?", notRunYet: "Not run yet.", addTestCase: "Add test case", runAllTests: "Run all tests", removeTestCase: "Remove test case", fillInBlank: "Fill in the blank", completeCode: "Complete the code", missingCode: "Missing code", typeMissingCode: "Type the missing code", checkAnswer: "Check answer", dragDropCoding: "Drag-and-drop coding", completeMissingPart: "Complete the missing part", dragChoiceInstructions: "The existing code is shown. Drag the correct choice into the blank. On a phone, tap the choice, then tap the blank.", fillBlankExisting: "Fill in the blank in the existing code.", choices: "Choices", reset: "Reset", miniProject: "Mini project", makeItYourOwn: "Make this code your own", starterCode: "Starter code", showSolution: "Show solution", predictOutput: "Predict the output", predictQuestion: "Your turn: what will the code display?", question: "Question", output: "Output", check: "Check", brokenCode: "Broken code", findFixBug: "Find and fix the bug", editCode: "Edit the code", showAnswer: "Show answer", commonMistakes: "Common mistakes", fix: "Fix", practiceLab: "Practice lab", writeCode: "Write your code", loadSampleHelp: "Load a sample if you need one, make changes, and run your own solution.", loadSample: "Load sample", runCode: "Run code", clear: "Clear", copy: "Copy", searchNoResults: "No results found. Try another keyword.", history: "History", timeline: "Timeline", whyPopular: "Why is it popular?", whereUsed: "Where is it used?", milestones: "Key milestones", whereToStart: "Where should you start?", funFact: "Fun fact", madeBy: "Created by", lessonNavigation: "Lesson navigation", startTopic: "Start learning: Topic 1", continue: "Continue", beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", whyKodigo: "Why Kodigo", streak: "day streak", footerCredit: "Developed by: Nielagang Itlog" }
};
const practiceStrings = {
  tl: { careerPaths: "Career paths", chooseRoadmap: "Pumili ng roadmap", allRoadmaps: "Lahat ng roadmap", careerPath: "Career path", focus: "Pag-aaralan", projectGoal: "Goal sa project", handsOn: "Hands-on practice", codingChallenge: "Coding challenge", yourTurn: "Ikaw naman:", chooseDifficulty: "Pumili ng difficulty, gamitin ang hints kung kailangan, at i-run ang solution. Kapag tumakbo ito nang walang error, makukuha mo ang points.", difficulty: "Difficulty", solutionCode: "Solution code", hint: "Hint", runChallenge: "I-run ang challenge", completed: "Tapos na", readyWhenYouAre: "Handa na kapag ikaw na.", memoryVisualization: "Memory visualization", peekMemory: "Silipin ang laman ng memory", stepThroughCode: "I-step ang code para makita ang pagbabago ng variables, collections, at objects habang sinusundan ang lesson.", noVariablesYet: "Wala pang variable values sa step na ito.", previousStep: "Previous step", nextStep: "Next step", noOutputThisStep: "Walang bagong output sa step na ito.", testCasePlayground: "Test case playground", tryDifferentInputs: "Subukan ang iba’t ibang input", runEachTest: "Patakbuhin ang code sa bawat test case. Ilagay ang input at inaasahang output para makita kung pumasa ang solution.", baseline: "baseline", ownEdgeCase: "sariling edge case", custom: "custom", input: "Input", expectedOutput: "Expected output", oneInputPerLine: "Isang input kada line", exampleInputs: "Halimbawa: 0, blank, o ibang value", expectedBehavior: "Ano ang dapat mangyari?", notRunYet: "Hindi pa na-run.", addTestCase: "Magdagdag ng test case", runAllTests: "I-run lahat ng tests", removeTestCase: "Alisin ang test case", fillInBlank: "Punan ang blank", completeCode: "Kumpletuhin ang code", missingCode: "Missing code", typeMissingCode: "I-type ang nawawalang code", checkAnswer: "I-check ang sagot", dragDropCoding: "Drag-and-Drop Coding", completeMissingPart: "Kumpletuhin ang nawawalang bahagi", dragChoiceInstructions: "Nasa code area ang existing code. I-drag ang tamang choice papunta sa blank. Sa phone, i-tap ang choice at pagkatapos ay ang blank.", fillBlankExisting: "Punan ang blank sa existing code.", choices: "Choices", reset: "I-reset", miniProject: "Mini project", makeItYourOwn: "Gawin mong sarili mong code", starterCode: "Starter code", showSolution: "Ipakita ang solution", predictOutput: "Hulaan ang output", predictQuestion: "Ikaw muna: ano ang lalabas?", question: "Tanong", output: "Output", check: "I-check", brokenCode: "Sirang code", findFixBug: "Hanapin at ayusin ang bug", editCode: "I-edit ang code", showAnswer: "Ipakita ang sagot", commonMistakes: "Karaniwang pagkakamali", fix: "Ayos", practiceLab: "Practice lab", writeCode: "Ikaw ang magsulat", loadSampleHelp: "Mag-load ng sample kung kailangan, baguhin ito, at i-run ang sarili mong solution.", loadSample: "Load sample", runCode: "I-run ang code", clear: "I-clear", copy: "Copy" },
  en: { careerPaths: "Career paths", chooseRoadmap: "Choose a roadmap", allRoadmaps: "All roadmaps", careerPath: "Career path", focus: "Focus", projectGoal: "Project goal", handsOn: "Hands-on practice", codingChallenge: "Coding challenge", yourTurn: "Your turn:", chooseDifficulty: "Choose a difficulty, use hints if needed, and run your solution. If it runs without errors, you will earn points.", difficulty: "Difficulty", solutionCode: "Solution code", hint: "Hint", runChallenge: "Run challenge", completed: "Completed", readyWhenYouAre: "Ready when you are.", memoryVisualization: "Memory visualization", peekMemory: "See what is in memory", stepThroughCode: "Step through the code to see how variables, collections, and objects change during the lesson.", noVariablesYet: "There are no variable values at this step yet.", previousStep: "Previous step", nextStep: "Next step", noOutputThisStep: "There is no new output at this step.", testCasePlayground: "Test case playground", tryDifferentInputs: "Try different inputs", runEachTest: "Run the code for each test case. Enter input and expected output to see whether the solution passes.", baseline: "baseline", ownEdgeCase: "your edge case", custom: "custom", input: "Input", expectedOutput: "Expected output", oneInputPerLine: "One input per line", exampleInputs: "For example: 0, blank, or another value", expectedBehavior: "What should happen?", notRunYet: "Not run yet.", addTestCase: "Add test case", runAllTests: "Run all tests", removeTestCase: "Remove test case", fillInBlank: "Fill in the blank", completeCode: "Complete the code", missingCode: "Missing code", typeMissingCode: "Type the missing code", checkAnswer: "Check answer", dragDropCoding: "Drag-and-drop coding", completeMissingPart: "Complete the missing part", dragChoiceInstructions: "The existing code is shown. Drag the correct choice into the blank. On a phone, tap the choice, then tap the blank.", fillBlankExisting: "Fill in the blank in the existing code.", choices: "Choices", reset: "Reset", miniProject: "Mini project", makeItYourOwn: "Make this code your own", starterCode: "Starter code", showSolution: "Show solution", predictOutput: "Predict the output", predictQuestion: "Your turn: what will the code display?", question: "Question", output: "Output", check: "Check", brokenCode: "Broken code", findFixBug: "Find and fix the bug", editCode: "Edit the code", showAnswer: "Show answer", commonMistakes: "Common mistakes", fix: "Fix", practiceLab: "Practice lab", writeCode: "Write your code", loadSampleHelp: "Load a sample if you need one, make changes, and run your own solution.", loadSample: "Load sample", runCode: "Run code", clear: "Clear", copy: "Copy" }
};
practiceStrings.tl.lessons = "Mga lesson";
practiceStrings.en.lessons = "Lessons";
const copyByLanguage = {
  tl: { tagline: "Matuto sa pag-code, gumaling sa paggawa.", empty: "Wala pa dito. Simulan mo na!", correct: "Tama! Solid.", wrong: "Medyo malapit. Tingnan natin kung bakit.", comingSoon: "Parating na. Sandali lang!", loadingPython: "Ginigising pa ang Python... saglit lang.", completed: "Done! +10 XP", notFound: "Naligaw ka yata. Balik tayo sa umpisa.", errorOutput: "May error. Okay lang, normal 'yan." },
  en: { tagline: "Learn by Coding, Improve by Building", empty: "Nothing here yet. Start learning!", correct: "Correct! Nice work.", wrong: "Close. Let’s see why.", comingSoon: "Coming soon!", loadingPython: "Starting Python... one moment.", completed: "Done! +10 XP", notFound: "Looks like you are lost. Let’s go back home.", errorOutput: "There was an error. That is normal while coding." }
};
const homeText = {
  "Learn code one clear step at a time.": "Matuto ng code, isang malinaw na hakbang sa bawat oras.",
  "Explore lessons with real code, clear explanations, guided practice, and small projects. Choose Python or Java from the navigation bar to begin.": "I-explore ang lessons na may totoong code, malinaw na paliwanag, guided practice, at maliliit na project. Piliin ang Python o Java sa navigation bar para magsimula.",
  "See how code works": "Tingnan kung paano gumagana ang code",
  "Build solid foundations": "Bumuo ng matibay na foundation",
  "Write your own code": "Isulat ang sarili mong code",
  "Learning path": "Learning path",
  "From first variable to real applications.": "Mula unang variable hanggang totoong applications.",
  "Getting started": "Pagsisimula",
  "A simple way to study": "Simpleng paraan ng pag-aaral",
  "A useful reminder": "Mahalagang paalala",
  "More courses": "Iba pang courses",
  "More languages are on the way": "May iba pang languages na darating",
  "These course pages are not available yet.": "Hindi pa available ang course pages na ito.",
  "Lesson coming soon": "Malapit nang magkaroon ng lesson",
  "01 · Read": "01 · Basahin",
  "02 · Understand": "02 · Unawain",
  "03 · Practice": "03 · Magsanay",
  "Each lesson connects syntax to its purpose, so every line has a reason for being there.": "Ipinapakita ng bawat lesson kung para saan ang syntax at kung bakit kailangan ang bawat line.",
  "Topics cover concepts, syntax rules, common mistakes, and how each skill is used in applications.": "Saklaw ng mga topic ang concepts, syntax rules, karaniwang pagkakamali, at paggamit ng bawat skill sa apps.",
  "Use the empty editor, solve practice prompts, and apply each idea through a guided mini project.": "Gamitin ang editor, sagutan ang practice prompts, at subukan ang bawat idea sa guided mini project.",
  "Beginner:": "Baguhan:",
  "Intermediate:": "Intermediate:",
  "Advanced:": "Advanced:",
  "syntax, variables, data types, decisions, loops, collections, and functions.": "syntax, variables, data types, conditions, loops, collections, at functions.",
  "files, OOP, algorithms, databases, Git, and code organization.": "files, OOP, algorithms, databases, Git, at pag-aayos ng code.",
  "testing, APIs, concurrency, web or GUI applications, performance, and software design.": "testing, APIs, concurrency, web o GUI apps, performance, at software design.",
  "Take one topic at a time: read the example, write your own variation, then move forward once you can explain what the code does.": "Isa-isahin ang mga topic: basahin ang example, gumawa ng sariling version, at lumipat kapag kaya mo nang ipaliwanag ang code.",
  "Choose a language from the navigation bar, select a lesson from its sidebar, review the example, and then write a solution in the practice editor. Errors are part of programming; reading the message and testing one small change at a time are useful debugging habits.": "Pumili ng language sa navigation bar, pumili ng lesson sa sidebar, basahin ang example, at magsulat ng solution sa practice editor. Normal ang errors sa programming; basahin ang error message at mag-test ng tig-isang pagbabago para mas madaling mag-debug.",
  "Kodigo is developed by": "Ang Kodigo ay ginawa ni",
  "Programming is not memorizing commands. It is learning how to break a problem into small steps and test each step.": "Hindi kailangang kabisaduhin ang lahat ng command. Matutong hatiin ang problema sa maliliit na hakbang at subukan ang bawat isa."
};
const englishHomeText = Object.fromEntries(Object.entries(homeText).map(([en, tl]) => [tl, en]));
const lessonTranslations = {
  "Kumuha ng input at magpakita ng malinaw na output.": "Get input and display clear output.",
  "Walang pabebe na mystery dito—himayin natin kung ano ang laman ng bawat line.": "No mystery here—let's break down what each line does.",
  "Actual code, actual ganap": "Real code, real action",
  "Basahin ito na parang instructions sa tropa: bawat line may isang maliit na trabaho.": "Read this like a set of instructions: each line has one small job.",
  "input() ang nagtatanong at ibinibigay ang sagot bilang text. Ang name ay label ng box; ang sagot ng user ang laman ng box.": "input() asks a question and returns the answer as text. name is the variable label; the user's answer becomes its value.",
  "Login forms, quiz apps, at kahit simpleng order form.": "Login forms, quiz apps, and even a simple order form.",
  "Palitan ang values at i-run mo. Doon talaga kumakapit ang concept.": "Change the values and run it. That is where the concept starts to click.",
  "Himayin natin line by line": "Break it down line by line",
  "Important rules para hindi ma-lost": "Important rules to keep you on track",
  "Mga terms na dapat malinaw": "Key terms to understand",
  "Saan ito ginagamit sa totoong app?": "Where is this used in a real app?",
  "Practice plan bago lumipat": "Practice plan before moving on",
  "Walang kailangang hulaan—tingnan natin kung ano ang ginagawa ng bawat line.": "No guesswork needed—let's see what each line does.",
  "Actual code, actual ganap": "Real code, real example",
  "Himayin natin line by line": "Let's break it down line by line",
  "Mga terms na dapat malinaw": "Key terms to understand",
  "Important rules para hindi ma-lost": "Important rules to remember",
  "Variable = label ng box": "A variable is a labeled box",
  "Variable = type + label + laman": "A variable has a type, name, and value",
  "String: text na naka-quotes": "Strings: text inside quotes",
  "Numbers: int at float": "Numbers: int and float",
  "Boolean at None: yes/no at wala pa": "Boolean and None: true/false and no value",
  "Collections: maraming values sa isang variable": "Collections: storing multiple values",
  "For loop: start, condition, update": "For loop: start, condition, update",
  "While loop: condition ang driver": "While loop: the condition controls repetition",
  "For o while?": "For or while?",
  "List: ordered at puwedeng baguhin": "Lists: ordered and changeable",
  "Tuple: ordered pero fixed": "Tuples: ordered but fixed",
  "Set: unique values lang": "Sets: unique values only",
  "Dictionary: may label bawat value": "Dictionaries: each value has a key",
  "Variable ang pangalang ibinibigay mo sa value para magamit mo ulit ito. Isipin mo na may mga labeled na box: name ang pangalan sa labas ng box, tapos Mia ang laman.": "A variable is a name you give a value so you can use it again. Think of it as a labeled box: name is the label, and Mia is what the box contains.",
  "Sa Python, hindi mo muna kailangang isulat ang type bago ang variable. Tinitingnan ni Python ang value para malaman kung text, number, o iba pa.": "In Python, you do not declare a variable's type first. Python uses the value to determine whether it is text, a number, or another type.",
  "Sa Java, kailangan mong sabihin muna ang type ng box bago lagyan ng value. Format: type variableName = value;": "In Java, declare the variable's type before assigning a value. The format is: type variableName = value;",
  "Ang semicolon sa dulo ay parang full stop ng Java statement. Huwag i-skip, bestie.": "The semicolon at the end marks where a Java statement finishes.",
  "Gamitin ang for loop kapag alam mo ang starting value, stopping rule, at update. Nakaayos ang tatlong ito sa header kaya madaling makita ang buong cycle.": "Use a for loop when you know the starting value, stopping condition, and update. They are all in the header, so the full cycle is easy to see.",
  "Sa example, magsisimula sa 1, magpi-print habang hanggang 3, at magdadagdag ng 1 pagkatapos ng bawat iteration. Curly braces ang bumabalot sa body ng loop.": "This example starts at 1, prints through 3, and adds 1 after each iteration. Curly braces contain the loop body.",
  "Gamitin ang while loop kapag condition ang nagdidikta kung magpapatuloy pa, at hindi mo tiyak kung ilang ikot ang kailangan. Tatakbo lang ito habang positive ang count.": "Use a while loop when a condition determines whether to continue and you do not know in advance how many iterations are needed. It runs only while count is positive.",
  "Dapat baguhin ng body ang condition o value na ginagamit sa condition. Kung walang count--, laging true ang count > 0 at magiging infinite loop ito.": "The loop body must update the condition or a value used by it. Without count--, count > 0 stays true and the loop never ends.",
  "For = may clear na start, condition, at update o may collection na dadaanan. While = magpapatuloy hangga't true ang isang condition. Pareho silang repetition, pero ibang dahilan ang pagtigil.": "Use for when you have a clear start, condition, and update, or need to visit each item in a collection. Use while when repetition should continue as long as a condition is true. Both repeat work, but they stop for different reasons.",
  "Mas readable ang for para sa counter o collection. Mas natural ang while para sa retries at state-based na work.": "A for loop is usually clearer for counters and collections. A while loop is a natural fit for retries and condition-based work.",
  "Gamitin ang if at else, pipili ang program ng code na tatakbo.": "Use if and else to choose which code the program runs.",
  "Lagyan natin ng pangalan ang values para magamit ulit sa code.": "Give values names so you can use them again in your code.",
  "I-wrap ang reusable steps sa function para tawagin kapag kailangan.": "Put reusable steps in a function so you can call them when needed.",
  "String ay words/text, int ay whole numbers, at double ay decimals. Dahil declared ang types, mahuhuli ni Java agad kapag maling kind of value ang nilagay mo.": "String stores text, int stores whole numbers, and double stores decimal numbers. Because Java uses declared types, it can catch a value with the wrong type.",
  "Ang + ay puwedeng math kapag numbers pareho, o pangdugtong kapag may String sa expression.": "The + operator adds numbers, or joins text when a String is part of the expression.",
  "boolean ay yes/no switch para sa conditions. char naman ay isang single character—'A', '7', o '?'—hindi buong word.": "boolean is a true-or-false value used in conditions. char stores one character, such as 'A', '7', or '?', not a whole word.",
  "Para sa buong word gaya ng 'Awesome', String ang gamitin, hindi char.": "Use String, not char, for a whole word such as 'Awesome'.",
  "String at arrays ay reference types: ang variable ay may reference papunta sa object/data. null ay ibig sabihing wala pa itong tinuturo.": "String and arrays are reference types: a variable holds a reference to an object or data. null means it does not refer to a value yet.",
  "Mag-ingat sa null: kung tatawag ka ng method sa null, magkaka-NullPointerException. Check muna kung may value.": "Be careful with null: calling a method on it causes a NullPointerException. Check that a value exists first.",
  "Umuulit ang for block para sa bawat value na galing sa range.": "The for block repeats once for each value produced by range.",
  "Gumagawa ang range(1, 4) ng 1, 2, at 3; hindi kasama ang dulo.": "range(1, 4) produces 1, 2, and 3; the stop value is not included.",
  "Tumatakbo ang while block habang true ang condition.": "The while block runs as long as its condition is true.",
  "Binabawasan ang count para eventually maging false ang condition.": "count is reduced so the condition eventually becomes false.",
  "Variable ang pangalan na lalagyan ng value; puwede mo itong gamitin ulit.": "A variable is a name that stores a value so you can use it again.",
  "Number ang value na 18, kaya puwede itong gamitin sa math.": "18 is a number, so it can be used in calculations.",
  "Boolean ito: True o False lang ang puwedeng value.": "This is a Boolean value; it can only be True or False.",
  "Kinukuha ang lumang age, dinadagdagan ng 1, tapos sine-save ulit.": "This reads the current age, adds 1, and stores the updated value.",
  "name ang label ng box; ang string na Mia ang laman nito.": "name is the variable label, and the string Mia is its value.",
  "age ang label, at 18 ang numeric value sa box niya.": "age is the variable label, and 18 is its numeric value.",
  "Ang Mia ay string dahil naka-quotes; text ito, hindi variable name.": "Mia is a string because it is inside quotes; it is text, not a variable name.",
  "Ang + dito ay nagdudugtong ng strings para maging isang sentence.": "Here, + joins strings to make one sentence.",
  "18 ay int: whole number na walang decimal.": "18 is an int, a whole number with no decimal part.",
  "49.50 ay float: number na may decimal point.": "49.50 is a float, a number with a decimal point.",
  "Nag-compute si Python at ang total box ay naging 20.": "Python calculates the result and stores 20 in total.",
  "Ang String ang type ng name; text value ang laman nito.": "String is the type of name, so it stores text.",
  "Ang int ay para sa whole numbers gaya ng edad.": "int is used for whole numbers such as an age.",
  "Ang boolean ay true o false lang.": "boolean stores either true or false.",
  "Ina-update ang existing variable; same pa rin ang type nitong int.": "This updates the existing variable; its type remains int.",
  "Umuulit ang for block habang true ang condition nito.": "The for loop repeats while its condition is true.",
  "Dinadagdagan ang number pagkatapos ng bawat iteration.": "number increases after each iteration.",
  "Bago ang bawat ikot, chine-check ni Java kung true pa ang count > 0.": "Before each iteration, Java checks whether count > 0 is still true.",
  "count-- ang update na naglalapit sa condition na false.": "count-- updates the value so the condition eventually becomes false.",
  "Gamitin ang for loop kapag may collection kang dadaanan o malinaw kung ilang beses mauulit ang trabaho. Dito, umiikot ito isang beses para sa 1, 2, at 3.": "Use a for loop to visit a collection or when you know how many times the work should repeat. Here, it runs once for each value: 1, 2, and 3.",
  "Ang range(start, stop) ay kasama ang start pero hindi kasama ang stop. Kailangan ding naka-indent ang print dahil iyon ang body ng loop.": "range(start, stop) includes start but excludes stop. print must also be indented because it belongs to the loop body.",
  "Gamitin ang while loop kapag hindi mo alam agad kung ilang ulit tatakbo; ang mahalaga ay may condition na dapat manatiling true. Dito, tuloy ito habang mas mataas sa zero ang count.": "Use a while loop when you do not know how many times it needs to run. The loop continues while its condition is true; here, count must stay above zero.",
  "Kailangang may pagbabago sa condition sa loob ng loop. Kapag walang count -= 1, mananatiling 3 ang count at magkakaroon ng infinite loop.": "Something in the loop must change the condition. Without count -= 1, count stays at 3 and the loop never ends.",
  "For = dumaan sa bawat item o fixed na bilang. While = umulit hangga't true ang condition. Pareho silang may body na inuulit, pero magkaiba ang dahilan kung kailan sila humihinto.": "Use for to visit each item or repeat a set number of times. Use while to repeat as long as a condition is true. Both repeat a block, but they stop for different reasons.",
  "Huwag gamitin ang while kung simpleng list lang naman ang dadaanan; mas malinaw ang for. Huwag din pilitin ang for kung condition ang totoong nagpapatakbo ng repetition.": "Use for to go through a list; it is clearer than while for that job. Use while when a condition should control the repetition.",
  "append() isang item lang. extend() maraming item. insert() puwedeng pumili ng exact na position.": "append() adds one item. extend() adds multiple items. insert() lets you choose the exact position.",
  "remove(value) ay value ang gamit. pop() ay position ang gamit at may ibinabalik na item. clear() naman ay reset ng buong list.": "remove(value) removes an item by value. pop() removes an item by position and returns it. clear() empties the entire list.",
  "index(value) ay nagsasabi kung saan unang nakita ang value. count(value) ay nagsasabi kung ilang duplicate ang mayroon.": "index(value) returns the position of the first match. count(value) returns the number of times the value appears.",
  "copy() ay safe backup. sort() ay nag-aayos. reverse() ay nagbabaliktad ng current order. Lahat maliban sa copy() ay binabago ang same list.": "copy() makes a separate copy. sort() orders the items. reverse() flips their current order. All three methods except copy() change the original list.",
  "Gumawa tayo ng list. Naka-order ang items at puwede pa silang baguhin.": "This creates a list. Its items are ordered and can be changed.",
  "append() ay nagdadagdag ng isang item sa pinakadulo ng list.": "append() adds one item to the end of the list.",
  "extend() ay nagdadagdag ng maraming items mula sa ibang list.": "extend() adds multiple items from another list.",
  "insert(index, value) ay nagsisingit ng item sa specific na position.": "insert(index, value) adds an item at a specific position.",
  "Tine-test ng if kung true ang condition bago patakbuhin ang indented block.": "if checks whether its condition is true before running the indented block.",
  "Comparison operator ito: true kapag 30 o mas mataas ang temperature.": "This comparison is true when the temperature is 30 or higher.",
  "Tatama ang else kapag false ang condition sa if.": "The else block runs when the if condition is false.",
  "Ulitin ang isang block para hindi mo kailangang kopyahin ang parehong code.": "Repeat a block so you do not have to copy the same code."
};
const topicLabels = {
  python: {
    "variables-and-data-types": "Variables at Data Types", "input-and-output": "Input at Output", operators: "Operators", "conditional-statements": "If / Else Conditions", loops: "Loops", strings: "Strings", "list-methods": "List Methods", "lists-tuples-sets-and-dictionaries": "Lists, Tuples, Sets, at Dictionaries", functions: "Functions", "error-handling": "Error Handling", "file-handling": "File Handling", "modules-and-packages": "Modules at Packages", oop: "OOP", recursion: "Recursion", "searching-and-sorting": "Searching at Sorting", "basic-dsa": "Basic DSA", "sql-and-database-programming": "SQL at Database Programming", "git-and-github": "Git at GitHub", "advanced-oop": "Advanced OOP", "advanced-dsa": "Advanced DSA", "gui-or-web-development": "GUI o Web Development", "testing-and-debugging": "Testing at Debugging", "apis-and-automation": "APIs at Automation", "ai-computer-vision-or-data-analysis": "AI, Computer Vision, o Data Analysis"
  },
  java: {
    "java-fundamentals": "Java Fundamentals", operators: "Operators", "conditional-statements": "If / Else Conditions", loops: "Loops", strings: "Strings", arrays: "Arrays", methods: "Methods", oop: "OOP", "exception-handling": "Exception Handling", "collections-framework": "Collections Framework", "file-handling": "File Handling", generics: "Generics", "data-structures-and-algorithms": "Data Structures at Algorithms", "sql-at-jdbc": "SQL at JDBC", "git-and-github": "Git at GitHub", multithreading: "Multithreading", "modern-java-features": "Modern Java Features", "unit-testing": "Unit Testing", "gui-programming": "GUI Programming", "spring-boot": "Spring Boot", "software-design-patterns": "Software Design Patterns", "jvm-and-memory-management": "JVM at Memory Management"
  }
};
const englishTopicLabels = { java: { "sql-at-jdbc": "SQL and JDBC" } };
const topicSummaries = {
  python: {
    "variables-and-data-types": "Name values and learn about basic data types.",
    "input-and-output": "Get user input and display clear output.",
    operators: "Use operators to calculate and compare values.",
    "conditional-statements": "Choose what to do with if, elif, and else.",
    loops: "Repeat instructions with for and while loops.",
    strings: "Create, format, and work with text.",
    "list-methods": "Add, remove, find, and sort items in a Python list.",
    "lists-tuples-sets-and-dictionaries": "Organize multiple values with Python collections.",
    functions: "Put reusable code in functions with parameters and return values.",
    "error-handling": "Catch and handle runtime errors with try and except.",
    "file-handling": "Read and write files safely.",
    "modules-and-packages": "Organize and reuse code with imports and packages.",
    oop: "Model data and behavior with classes and objects.",
    recursion: "Solve a problem by having a function call itself.",
    "searching-and-sorting": "Find and sort values with common algorithms.",
    "basic-dsa": "Choose the right data structure and algorithm for a task.",
    "sql-and-database-programming": "Connect to a database and query data from Python.",
    "git-and-github": "Track code changes and share projects.",
    "advanced-oop": "Explore composition, inheritance, and protocols in more depth.",
    "advanced-dsa": "Compare advanced data structures and algorithm trade-offs.",
    "gui-or-web-development": "Build an interactive desktop or web app with Python.",
    "testing-and-debugging": "Check behavior and find bugs with tests and tools.",
    "apis-and-automation": "Get data from APIs and automate routine work.",
    "ai-computer-vision-or-data-analysis": "Explore data and build intelligent Python applications."
  },
  java: {
    "java-fundamentals": "Learn Java syntax, types, variables, and basic program structure.",
    operators: "Use operators to calculate and compare values.",
    "conditional-statements": "Choose what to do with if, else, and switch.",
    loops: "Repeat instructions with for, while, and do-while loops.",
    strings: "Create and work with text using Java String APIs.",
    arrays: "Store and access values of the same type with arrays.",
    methods: "Reuse logic with methods, parameters, and return values.",
    oop: "Model data and behavior with classes and objects.",
    "exception-handling": "Handle errors with exceptions and try-catch.",
    "collections-framework": "Choose a suitable List, Set, or Map for your data.",
    "file-handling": "Read and write files with Java APIs.",
    generics: "Create reusable, type-safe classes and methods.",
    "data-structures-and-algorithms": "Use and analyze common data structures and algorithms.",
    "sql-at-jdbc": "Connect to a database and run SQL with JDBC.",
    "git-and-github": "Track code changes and share projects.",
    multithreading: "Run tasks concurrently with Java threads.",
    "modern-java-features": "Use modern Java syntax and APIs.",
    "unit-testing": "Check code behavior with unit tests.",
    "gui-programming": "Build a graphical interface for Java applications.",
    "spring-boot": "Build Java applications with Spring Boot.",
    "software-design-patterns": "Use design patterns to make software easier to maintain.",
    "jvm-and-memory-management": "Learn how the JVM runs programs and manages memory."
  }
};
const historyTranslations = {
  python: {
    title: "History of Python",
    hook: "From a hobby project to a language used in data, AI, and automation, Python has come a long way.",
    timeline: [
      { year: "Late 1980s", event: "Guido van Rossum, from the Netherlands, started Python as a hobby project." },
      { year: "1991", event: "Python was first released to the public." },
      { year: "2000", event: "Python 2.0 was released." },
      { year: "2008", event: "Python 3.0 was released; it is not backward compatible with Python 2." },
      { year: "January 1, 2020", event: "Python 2 reached end of life." }
    ],
    popular: [
      "Its code is readable and simple, so it is easier to follow.",
      "The Zen of Python offers guidance on the language's design philosophy.",
      "Many ready-to-use libraries make it quick to get started.",
      "It is friendly to beginners and also works for large projects."
    ],
    uses: [
      "Web apps built with Django or Flask.",
      "Data analysis with NumPy and pandas.",
      "AI and machine learning with TensorFlow.",
      "Automation, scripting, and education."
    ],
    milestones: [
      { title: "Python 2 to Python 3", text: "Python 3 cleaned up several design decisions. The transition took years, but Python 2 reached end of life in 2020, so modern projects should use Python 3." },
      { title: "Community-led development", text: "Python is maintained through an open process. Proposals called PEPs document ideas and language changes; PEP 8 is the well-known style guide." },
      { title: "Why beginners meet it early", text: "Its readable syntax lets new programmers focus on logic first, while its ecosystem still supports professional work in web, data, automation, and science." }
    ],
    startHere: ["Start with variables, conditions, loops, collections, and functions.", "Use the built-in standard library before adding external packages.", "When you are ready, build a small automation script, data project, or web app."],
    funFact: "Python was not named after a snake; the name came from the comedy group Monty Python.",
    continueLabel: "Continue"
  },
  java: {
    title: "History of Java",
    hook: "Java runs on different platforms, which helped make it important for apps and enterprise systems.",
    timeline: [
      { year: "1991", event: "The Green Team at Sun Microsystems started a project first called Oak." },
      { year: "1995", event: "Java 1.0 was publicly released with “Write Once, Run Anywhere,” powered by the JVM." },
      { year: "2010", event: "Oracle acquired Sun Microsystems." },
      { year: "2017", event: "Java began releasing a new version every six months." },
      { year: "LTS versions", event: "Long-term support releases include Java 8, 11, 17, and 21." }
    ],
    popular: [
      "The JVM lets Java bytecode run on different platforms.",
      "It has strong types and a large ecosystem for long-running systems.",
      "It has regular releases and LTS versions for longer support.",
      "Teams and large apps can use its many tools and libraries."
    ],
    uses: [
      "Android apps and enterprise or backend systems.",
      "Banking and big data applications.",
      "Games such as Minecraft Java Edition."
    ],
    milestones: [
      { title: "The JVM idea", text: "Java source code is compiled into bytecode. The Java Virtual Machine runs that bytecode, which made the same program usable across different operating systems." },
      { title: "A language for large systems", text: "Java became popular for teams because its type system, tooling, testing ecosystem, and long-term support releases help maintain large applications." },
      { title: "Modern Java", text: "Modern releases added features such as records, improved switch expressions, text blocks, and better APIs while keeping the JVM ecosystem strong." }
    ],
    startHere: ["Start with variables, conditions, loops, arrays, and methods.", "Understand classes and objects before moving into collections and exceptions.", "Then explore testing, databases, multithreading, and Spring Boot."],
    funFact: "The project was first called Oak. It was renamed Java, a reference to coffee.",
    continueLabel: "Continue"
  }
};
let language = getInterfaceLanguage();
function t(key) { return practiceStrings[language][key] || strings[language][key] || key; }
function topic(languageId, id, fallback) {
  return language === "tl"
    ? (topicLabels[languageId]?.[id] || fallback)
    : (englishTopicLabels[languageId]?.[id] || fallback);
}
function topicSummary(languageId, id, fallback) {
  return language === "en" ? (topicSummaries[languageId]?.[id] || fallback) : fallback;
}
function history(languageId, data) {
  return language === "en" ? { ...data, ...historyTranslations[languageId] } : data;
}
function lessonText(value, fallback) {
  if (language !== "en") return value;
  return lessonTranslations[value] || fallback || value;
}
function practiceCode(value) {
  if (language !== "en") return value;
  return String(value).split("\n").map(line => {
    const comment = line.match(/^(\s*(?:#|\/\/)\s*)(.*)$/);
    if (!comment) return line;
    if (lessonTranslations[comment[2]]) return `${comment[1]}${lessonTranslations[comment[2]]}`;
    if (/\b(?:ang|ng|sa|para|muna|gamitin|ilagay|tingnan|baguhin|ito|mo|natin|kailangan|kapag|habang|hindi|mga)\b/i.test(comment[2])) {
      return `${comment[1]}Complete this step using the lesson concept.`;
    }
    return line;
  }).join("\n");
}
function applyChrome() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document.querySelectorAll("[data-i18n-title]").forEach(el => el.title = t(el.dataset.i18nTitle));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  document.querySelectorAll("[data-interface-lang]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.interfaceLang === language)));
}
function localizePage() {
  const replacements = language === "tl" ? homeText : englishHomeText;
  document.querySelectorAll(".landing-page").forEach(page => {
    const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => { const value = node.nodeValue.trim(); if (replacements[value]) node.nodeValue = node.nodeValue.replace(value, replacements[value]); });
  });
}
function setLanguage(next) {
  language = next === "en" ? "en" : "tl";
  saveInterfaceLanguage(language);
  if (K.copy) Object.assign(K.copy, copyByLanguage[language]);
  applyChrome();
  K.ui?.nav?.refresh();
  K.app?.render({ preserveScroll: true });
}
document.querySelectorAll("[data-interface-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.interfaceLang)));
K.i18n = { get language() { return language; }, t, topic, topicSummary, history, lessonText, practiceCode, setLanguage, applyChrome, localizePage };
if (K.copy) Object.assign(K.copy, copyByLanguage[language]);
applyChrome();
})(window.Kodigo = window.Kodigo || {});
