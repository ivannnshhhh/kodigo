// Complete lesson fallback registry. Existing hand-written lessons stay untouched;
// this fills every curriculum item that does not yet have its own lesson file.
(function (K) {
  const py = {
    "input-and-output": ["name = input(\"Ano pangalan mo? \")\nprint(\"Hello,\", name)", "input() ang nagtatanong at ibinibigay ang sagot bilang text. Ang name ay label ng box; ang sagot ng user ang laman ng box.", "Login forms, quiz apps, at kahit simpleng order form."],
    operators: ["price = 120\nquantity = 3\ntotal = price * quantity\nprint(total)\nprint(total >= 300)", "Ang * ay multiply; ang >= ay comparison. Ang total ay box na may result na 360, tapos ang comparison ay nagiging True o False.", "Pag-compute ng total, discount, scores, at pag-check ng rules."],
    strings: ["name = \"Kai\"\nmessage = f\"Hi, {name}!\"\nprint(message.upper())", "String ang text na naka-quotes. Sa f-string, isinisiksik ng {name} ang laman ng name box sa sentence.", "Names, captions, emails, search text, at messages sa app."],
    "lists-tuples-sets-and-dictionaries": ["colors = [\"red\", \"blue\"]\nprofile = {\"name\": \"Kai\", \"age\": 18}\nprint(colors[0])\nprint(profile[\"name\"])", "List ay ordered na collection; ginagamit ang index para pumili. Dictionary naman ay key-value pairs: ang key na name ang label, at Kai ang laman.", "Shopping carts, user profiles, tags, at records galing API."],
    "error-handling": ["try:\n    age = int(input(\"Age: \"))\n    print(age + 1)\nexcept ValueError:\n    print(\"Number lang, bestie.\")", "Sinusubukan ng try ang risky code. Kapag hindi ma-convert sa number ang input, sasalo ang except para hindi mag-crash ang app.", "Forms at files—lahat ng places na puwedeng mali o unexpected ang input."],
    "file-handling": ["with open(\"notes.txt\", \"w\") as file:\n    file.write(\"Aral today: files!\")\n\nwith open(\"notes.txt\") as file:\n    print(file.read())", "Ang with ang bahala magsara ng file pagkatapos. Ang file ay parang remote control para sa notes.txt; write ang lagay, read ang basa.", "Saving notes, reports, simple data, at exported results."],
    "modules-and-packages": ["import math\n\nradius = 4\narea = math.pi * radius ** 2\nprint(area)", "Module ang ready-made file ng code. Dito, math ang toolbox; math.pi ang specific na value na kinuha natin mula rito.", "Pag-reuse ng tools tulad ng math, random, dates, at third-party libraries."],
    oop: ["class Player:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\nplayer = Player(\"Kai\", 0)\nprint(player.name)", "Class ang blueprint. Ang player ay actual object; self.name ang sariling name box ng bawat player object.", "Users, products, game characters, at anumang bagay na may data plus actions."],
    recursion: ["def countdown(number):\n    if number == 0:\n        return\n    print(number)\n    countdown(number - 1)\n\ncountdown(3)", "Tinatawag ng function ang sarili niya gamit ang mas maliit na number. Ang base case na number == 0 ang exit door—kung wala ito, tuloy-tuloy lang siya.", "Tree/folder traversal, nested data, at divide-and-conquer problems."],
    "searching-and-sorting": ["scores = [88, 72, 95, 80]\nscores.sort()\nprint(scores)\nprint(95 in scores)", "sort() inaayos ang list from small to big. Ang in ay nagche-check kung may value sa collection at nagbabalik ng True o False.", "Leaderboards, product lists, at mabilis na pag-check kung existing ang item."],
    "basic-dsa": ["queue = []\nqueue.append(\"Ana\")\nqueue.append(\"Ben\")\nnext_person = queue.pop(0)\nprint(next_person)", "Ang queue ay first in, first out: unang pumasok si Ana, siya rin ang unang lumabas. append ang pasok; pop(0) ang kuha sa harap.", "Ticket queues, task processing, at BFS-style na workflows."],
    "sql-and-database-programming": ["import sqlite3\n\nconn = sqlite3.connect(\"school.db\")\nconn.execute(\"CREATE TABLE IF NOT EXISTS students (name TEXT)\")\nconn.execute(\"INSERT INTO students VALUES (?)\", (\"Kai\",))\nconn.commit()", "Ang database ay organized na storage. Ang ? placeholder ang safe na slot para sa value; commit ang save button ng changes.", "Accounts, orders, inventory, at data na kailangang hindi mawala pag close ng app."],
    "git-and-github": ["# terminal commands\ngit init\ngit add .\ngit commit -m \"Add profile feature\"\ngit push", "git add ang pipili ng changes, git commit ang snapshot na may message, at git push ang upload papuntang shared remote repo.", "Backup, teamwork, code review, at pagbabalik sa dating version kapag may sablay."],
    "advanced-oop": ["class Animal:\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof\"\n\nprint(Dog().speak())", "Inheritance means may base behavior si Animal, pero puwedeng i-override ni Dog ang speak. Same method name, ibang actual behavior—clean flex ng polymorphism.", "Kapag may related objects na may shared rules pero may sariling version ng behavior."],
    "advanced-dsa": ["from heapq import heappush, heappop\n\nurgent = []\nheappush(urgent, (1, \"Fix bug\"))\nheappush(urgent, (3, \"Read docs\"))\nprint(heappop(urgent))", "Heap ang priority queue: mas maliit na priority number ang unang lalabas. Tuple ang may priority label at actual task value.", "Schedulers, pathfinding, at task queues na may urgency."],
    "gui-or-web-development": ["from flask import Flask\napp = Flask(__name__)\n\n@app.get(\"/\")\ndef home():\n    return \"Hello, web!\"", "Si Flask ang web helper. Ang @app.get('/') ay nagsasabing kapag binuksan ang home URL, tawagin ang home function at ibalik ang text.", "Web dashboards, APIs, portfolio sites, at internal tools."],
    "testing-and-debugging": ["def add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(2, 3) == 5", "Test ang automatic na taga-check. assert ay nagsasabi: dapat ang actual result ay same sa expected result; kung hindi, may clue ka saan mag-debug.", "Bago mag-deploy at tuwing may bagong feature para hindi mabasag ang old behavior."],
    "apis-and-automation": ["import requests\n\nresponse = requests.get(\"https://api.github.com\")\nprint(response.status_code)", "API ang paraan para makipag-usap ang app sa ibang service. response ang box na may sagot ng server; status_code ang quick health check nito.", "Weather data, payments, notifications, at repeatable office tasks."],
    "ai-computer-vision-or-data-analysis": ["import pandas as pd\n\nscores = pd.DataFrame({\"name\": [\"Ana\", \"Ben\"], \"score\": [90, 82]})\nprint(scores[\"score\"].mean())", "DataFrame ay parang spreadsheet sa code. scores['score'] ay column na pinili gamit ang pangalan nito, then mean() ang average.", "Reports, insights, predictions, image processing, at data-driven features."]
  };
  const java = {
    operators: ["int price = 120;\nint quantity = 3;\nint total = price * quantity;\nSystem.out.println(total);\nSystem.out.println(total >= 300);", "Ang * ay multiply; >= ay comparison. Ang total variable ay box na may 360, habang comparison ay boolean na true o false.", "Totals, discounts, scores, at business rules."],
    strings: ["String name = \"Kai\";\nString message = \"Hi, \" + name + \"!\";\nSystem.out.println(message.toUpperCase());", "String ang text sa quotes. Ang + ang nagdudugtong ng text at variable value; toUpperCase() ay method na gumagawa ng uppercase version.", "Names, labels, search, emails, at user messages."],
    arrays: ["int[] scores = {88, 72, 95};\nSystem.out.println(scores[0]);\nscores[1] = 80;", "Array ang fixed-size row ng same type na values. Ang scores[0] ay unang slot dahil zero ang starting index. In-update natin ang pangalawang slot.", "Grades, daily readings, at fixed number of items."],
    oop: ["class Player {\n    String name;\n    int score;\n\n    Player(String name) {\n        this.name = name;\n        this.score = 0;\n    }\n}\nPlayer player = new Player(\"Kai\");", "Class ang blueprint; player ang real object. this.name ay tumutukoy sa name box na pag-aari ng object, hindi lang sa parameter na dumating.", "Users, products, game characters, at domain models."],
    "exception-handling": ["try {\n    int age = Integer.parseInt(\"hello\");\n} catch (NumberFormatException error) {\n    System.out.println(\"Number lang, bestie.\");\n}", "Risky ang parseInt kapag text ang input. Kapag nag-throw ito ng NumberFormatException, catch ang sasalo para graceful ang response.", "Forms, file reads, network requests, at input validation."],
    "collections-framework": ["import java.util.ArrayList;\n\nArrayList<String> names = new ArrayList<>();\nnames.add(\"Ana\");\nnames.add(\"Ben\");\nSystem.out.println(names.get(0));", "ArrayList ay resizable list. <String> ay guardrail: text lang ang puwedeng ilagay. add ang pasok, get(0) ang kuha sa unang item.", "Dynamic lists, menus, result sets, at collections ng objects."],
    "file-handling": ["import java.nio.file.Files;\nimport java.nio.file.Path;\n\nFiles.writeString(Path.of(\"notes.txt\"), \"Hello file!\");\nSystem.out.println(Files.readString(Path.of(\"notes.txt\")));", "Path.of() ang address ng file. writeString ang save, readString ang basa; parehong static helper methods mula Files.", "Reports, config files, exports, at saved app data."],
    generics: ["import java.util.ArrayList;\n\nArrayList<Integer> scores = new ArrayList<>();\nscores.add(95);\nint first = scores.get(0);", "Generic type na <Integer> ang nagsasabi kung anong data ang allowed. Kaya safe ang get(0) as number at less casting drama.", "Reusable collections, APIs, at classes na dapat type-safe."],
    "data-structures-and-algorithms": ["int[] numbers = {4, 8, 15, 16};\nint target = 15;\nfor (int number : numbers) {\n    if (number == target) {\n        System.out.println(\"Found\");\n    }\n}", "Linear search: chine-check ang bawat number hanggang makita ang target. number ang temporary box para sa current item sa bawat loop.", "Search features at pag-process ng lists kapag okay lang ang simple scan."],
    "sql-at-jdbc": ["String sql = \"SELECT name FROM students WHERE id = ?\";\nPreparedStatement statement = connection.prepareStatement(sql);\nstatement.setInt(1, 7);\nResultSet rows = statement.executeQuery();", "PreparedStatement ang safe SQL helper. Ang ? ay placeholder; setInt(1, 7) ang naglalagay ng 7 sa first placeholder bago i-run ang query.", "Apps na may users, orders, inventory, o anumang persistent records."],
    "git-and-github": ["// terminal commands\ngit init\ngit add .\ngit commit -m \"Add profile feature\"\ngit push", "git add ang pipili ng changes, commit ang snapshot, at push ang upload sa shared repo. Parang save points para sa code mo.", "Backup, collaboration, pull requests, at pag-recover sa bad changes."],
    multithreading: ["Thread worker = new Thread(() -> {\n    System.out.println(\"Working in background\");\n});\nworker.start();", "Thread ang separate lane ng trabaho. Ang lambda ang code na tatakbo roon; start() ang totoong start button—hindi lang run().", "Background downloads, responsive UI, at parallel tasks."],
    "modern-java-features": ["var names = java.util.List.of(\"Ana\", \"Ben\");\nnames.stream()\n     .filter(name -> name.startsWith(\"A\"))\n     .forEach(System.out::println);", "Stream ay pipeline ng data. filter ang bouncer na pumipili ng names; lambda ang mini-rule; forEach ang gagawa ng action sa bawat natira.", "Pag-filter at transform ng collections nang readable."],
    "unit-testing": ["import static org.junit.jupiter.api.Assertions.assertEquals;\nimport org.junit.jupiter.api.Test;\n\n@Test\nvoid addsNumbers() {\n    assertEquals(5, 2 + 3);\n}", "@Test ang marker para makita ng JUnit ang test. assertEquals(expected, actual) ang comparison ng gusto mong result at totoong lumabas.", "CI checks at safe refactoring bago ma-release ang app."],
    "gui-programming": ["import javax.swing.*;\n\nJFrame frame = new JFrame(\"Hello\");\nframe.add(new JLabel(\"Hi, Kai!\"));\nframe.pack();\nframe.setVisible(true);", "JFrame ang app window. JLabel ang text component sa loob. pack() ang nagfi-fit ng size, setVisible(true) ang actual na pagpapakita.", "Desktop tools, internal apps, at visual prototypes."],
    "spring-boot": ["@RestController\nclass HelloController {\n    @GetMapping(\"/hello\")\n    String hello() {\n        return \"Hello, web!\";\n    }\n}", "@RestController tells Spring na magbabalik ito ng web response. @GetMapping ang route label: kapag /hello ang request, hello() ang tatakbo.", "REST APIs, backend services, dashboards, at production web apps."],
    "software-design-patterns": ["class NotificationService {\n    private final Sender sender;\n\n    NotificationService(Sender sender) {\n        this.sender = sender;\n    }\n}\ninterface Sender { void send(String message); }", "Dependency injection ito: tinatanggap ng service ang Sender na kailangan niya imbes na siya ang gumawa nito. Mas madaling mag-swap ng email, SMS, o fake sender sa tests.", "Malalaking apps na kailangan maintainable at madaling i-test."],
    "jvm-and-memory-management": ["class User {\n    String name = \"Kai\";\n}\nUser user = new User();\nuser = null; // puwedeng linisin ng garbage collector later", "Ang object na new User() ay nasa heap. Kapag wala nang reference papunta rito (null na si user), eligible na siyang linisin ng garbage collector—hindi instant, pero managed.", "Pag-iwas sa memory leaks at pag-intindi ng performance issues."]
  };

  function makeLesson(language, topic, details) {
    const [code, explanation, whereUsed] = details;
    const codeLines = code.split("\n");
    const firstUseful = codeLines.findIndex(line => line.trim() && !line.trim().startsWith("//") && !line.trim().startsWith("#")) + 1;
    return {
      id: topic.id, title: topic.title, language, n: topic.n, summary: topic.summary,
      hook: "Walang pabebe na mystery dito—himayin natin kung ano ang laman ng bawat line.",
      code,
      annotations: [{ line: Math.max(1, firstUseful), from: 0, to: Math.max(1, codeLines[Math.max(0, firstUseful - 1)].length), text: explanation }],
      sections: [
        { heading: "Actual code, actual ganap", code, annotations: [{ line: Math.max(1, firstUseful), from: 0, to: Math.max(1, codeLines[Math.max(0, firstUseful - 1)].length), text: explanation }], explanation: ["Basahin ito na parang instructions sa tropa: bawat line may isang maliit na trabaho.", explanation], whereUsed, tip: "Palitan ang values at i-run mo. Doon talaga kumakapit ang concept." },
        { heading: "Himayin natin line by line", code, annotations: [], explanation: ["Unang useful line: doon ginagawa o kinukuha ang data/tool na kailangan ng topic. Gitnang lines: doon nangyayari ang action, computation, o decision. Huling line: doon mo makikita ang result.", "Kapag may variable, isipin mo: pangalan nito ang label ng box, at ang nasa right side ang laman. Kapag method/function call naman, isipin mo itong utos na may ginagawa sa value."], whereUsed: "Ganito magbasa ng unfamiliar code sa kahit anong project: hanapin ang input, process, at output.", tip: "I-comment mo bawat line sa sariling words bago mag-copy-paste. Mas tumatagal sa utak." },
        { heading: "Important rules para hindi ma-lost", code, annotations: [], explanation: ["Sundin ang exact syntax ng language: Python ay sensitive sa indentation; Java ay kailangan ng declared type at semicolon. Maliit na character lang minsan ang dahilan ng error, so no shame—i-check line by line.", "Huwag lang kabisaduhin ang code. Tanungin lagi: ano ang input? saan naka-store ang result? ano ang output? Iyan ang reusable skill, hindi lang isang snippet."], whereUsed: "Useful ito sa school exercises, coding exams, at real apps na maraming files.", tip: "Kapag may error, basahin ang mismong error message bago hulaan ang fix." },
        { heading: "Mga terms na dapat malinaw", code, annotations: [], explanation: ["Syntax = tamang spelling at ayos ng code. Value = actual na laman gaya ng 18 o Mia. Variable = label ng box na may value. Expression = code na may result, gaya ng price * quantity. Statement = isang utos na ginagawa ng program.", "Hindi mo kailangang i-memorize ang definitions word-for-word. Ang mahalaga: kaya mong ituro kung aling part ng example ang variable, value, input, process, at output."], whereUsed: "Ito ang vocab na paulit-ulit mong makikita sa tutorials, documentation, at team discussions.", tip: "Kapag may bagong term, hanapan agad ng line sa code na example nito." },
        { heading: "Saan ito ginagamit sa totoong app?", code, annotations: [], explanation: [whereUsed, "Usually, hindi solo ang concept na ito. Pinagsasama ito sa variables, conditions, loops, functions, files, o database depende sa feature na ginagawa."], whereUsed, tip: "Try challenge: palitan ang sample data para maging sariling mini scenario mo—grades, orders, game score, o profile." },
        { heading: "Practice plan bago lumipat", code, annotations: [], explanation: ["Una, i-run ang original example nang hindi binabago. Pangalawa, palitan ang isang value at hulaan ang output bago i-run. Pangatlo, magdagdag ng isang bagong case o item. Pang-apat, i-explain ang code sa sarili mong words.", "Kapag kaya mo nang gawin ang apat na iyon nang walang tingin sa answer, solid na ang foundation mo sa topic na ito. Doon ka lang lumipat sa next topic—no need magmadali."], whereUsed: "Ito ang repeatable study loop para sa bawat Python o Java lesson.", tip: "Small wins > marathon. Kahit 20 minutes ng hands-on practice may malaking impact." }
      ],
      trace: [{ line: Math.max(1, firstUseful), vars: { lesson: topic.title }, note: "Start small: i-check muna kung ano ang ginagawa ng first useful line." }],
      editable: { starter: code, language, expectedOutput: "" },
      predict: [{ code, answer: "Depende sa values sa code.", explanation: "I-trace ang variables one line at a time; tingnan kung anong line ang nagpi-print." }],
      debug: [], reorder: [], animation: null,
      kodigoCard: [{ label: "Core idea", snippet: topic.title }, { label: "Saan ginagamit", snippet: whereUsed }],
      miniProject: { goal: `I-customize ang example para sa sarili mong ${topic.title} practice.`, starter: code, hints: ["Palitan ang isang value at i-run.", "I-explain sa comment kung ano ang laman ng bawat variable."], solution: code }
    };
  }

  Object.entries(K.curriculum).forEach(([language, course]) => {
    const bank = language === "python" ? py : java;
    course.topics.forEach(topic => {
      const key = `${language}/${topic.id}`;
      if (!K.lessons?.[key] && bank[topic.id]) {
        (K.lessons = K.lessons || {})[key] = makeLesson(language, topic, bank[topic.id]);
      }
    });
  });

  // Collections need more than one tiny sample, so give them a proper mini-guide.
  const pythonCollections = K.lessons["python/lists-tuples-sets-and-dictionaries"];
  if (pythonCollections) {
    pythonCollections.hook = "Apat na containers, apat na personalities. Piliin natin nang walang hulaan.";
    pythonCollections.sections = [
      { heading: "List: ordered at puwedeng baguhin", code: "fruits = [\"mango\", \"banana\", \"apple\"]\nprint(fruits[0])      # mango\nfruits.append(\"grape\")\nfruits[1] = \"orange\"\nprint(fruits)", annotations: [{ line: 1, from: 9, to: 37, text: "List ito: naka-order ang items at puwede mong idagdag, alisin, o palitan." }, { line: 2, from: 6, to: 15, text: "Index starts at 0, kaya fruits[0] ang first item, hindi second." }, { line: 3, from: 0, to: 22, text: "append() ang nagdadagdag sa dulo ng list." }], explanation: ["List ang go-to kapag may sunod-sunod na items at may chance na magbago sila. Square brackets [] ang itsura nito.", "fruits ang label ng malaking box; bawat item sa loob ay may position/index. Dahil mutable ang list, puwedeng baguhin ang laman after creation."], whereUsed: "Shopping cart items, todo lists, quiz answers, posts, at data na ipinapakita bilang listahan.", tip: "Common sablay: fruits[3] sa 3-item list—out of range iyon dahil 0, 1, 2 lang ang valid index." },
      { heading: "Tuple: ordered pero fixed", code: "location = (14.5995, 120.9842)\nlatitude, longitude = location\nprint(latitude)\n# location[0] = 15  # error: hindi puwedeng palitan", annotations: [{ line: 1, from: 11, to: 29, text: "Tuple ito: parentheses () at ordered ang values." }, { line: 2, from: 0, to: 21, text: "Unpacking: unang value papunta sa latitude box, second value papunta sa longitude box." }], explanation: ["Tuple ay parang list pero immutable: hindi mo dapat baguhin ang laman pagkatapos gawin. Good ito kapag fixed ang group of values.", "Puwede pa rin itong basahin gamit ang index, pero walang append o item replacement."], whereUsed: "Coordinates, RGB colors, function return values, at settings na dapat hindi basta mabago.", tip: "Isang-item tuple? Lagyan ng comma: single = (5,)." },
      { heading: "Set: unique values lang", code: "tags = {\"python\", \"beginner\", \"python\"}\nprint(tags)\ntags.add(\"practice\")\nprint(\"python\" in tags)", annotations: [{ line: 1, from: 7, to: 41, text: "Set ito. Kahit dalawang python ang nilagay, isang python lang ang matitira dahil unique lang ang allowed." }, { line: 3, from: 0, to: 20, text: "add() ang pangdagdag ng isang unique item sa set." }], explanation: ["Set ang gamitin kapag duplicate ang ayaw mo. Hindi guaranteed ang order, kaya huwag umasa na pareho lagi ang print order.", "Ang in ay mabilis na way para i-check kung existing na ang value sa set."], whereUsed: "Unique tags, visited pages, allowed IDs, deduplication, at mabilis na membership checks.", tip: "{} lang ay empty dictionary, hindi empty set. Gamitin ang set() para gumawa ng empty set." },
      { heading: "Dictionary: label-to-value pairs", code: "student = {\n    \"name\": \"Mia\",\n    \"age\": 18,\n    \"is_active\": True\n}\nprint(student[\"name\"])\nstudent[\"age\"] = 19\nprint(student.get(\"city\", \"Wala pa\"))", annotations: [{ line: 1, from: 10, to: 11, text: "Dictionary starts with braces. Bawat entry ay key: value pair." }, { line: 2, from: 4, to: 17, text: "name ang key/label; Mia ang value na makukuha gamit ang key na iyon." }, { line: 7, from: 0, to: 21, text: "Ina-update ang value na naka-tie sa age key." }, { line: 8, from: 6, to: 42, text: "get() ay safe: magbibigay ng fallback imbes na mag-error kung wala ang key." }], explanation: ["Dictionary ay parang profile form: bawat field may pangalan (key) at may sagot (value). Hindi position ang gamit para kumuha; key ang gamit.", "Puwede ang iba-ibang types sa values: text, number, boolean, list, o kahit nested dictionary."], whereUsed: "User profiles, JSON/API responses, settings, inventory records, at any data na may named fields.", tip: "student['city'] mag-e-error kapag missing; student.get('city') mas safe kapag optional ang field." },
      { heading: "Quick chooser: alin ang gagamitin?", code: "# ordered + editable   -> list   [\"a\", \"b\"]\n# ordered + fixed      -> tuple  (10, 20)\n# unique items only    -> set    {\"a\", \"b\"}\n# named fields         -> dict   {\"name\": \"Mia\"}", annotations: [], explanation: ["Need mo ng order at edits? List. Fixed pair/group? Tuple. Ayaw ng duplicate? Set. May field names gaya ng name at age? Dictionary.", "Hindi may isang 'best' container. Best ay kung ano ang tugma sa problem na ginagawa mo."], whereUsed: "Ito ang daily decision sa Python apps, from tiny exercises hanggang APIs at data analysis.", tip: "Practice: gumawa ng list ng subjects, tuple ng location, set ng skills, at dictionary ng sariling profile." }
    ];
  }

  const javaCollections = K.lessons["java/collections-framework"];
  if (javaCollections) {
    javaCollections.hook = "Sa Java, collections ang flexible na lalagyan ng maraming data—pero bawat isa may sariling superpower.";
    javaCollections.sections = [
      { heading: "List: ordered at puwedeng duplicate", code: "import java.util.ArrayList;\nimport java.util.List;\n\nList<String> names = new ArrayList<>();\nnames.add(\"Mia\");\nnames.add(\"Kai\");\nnames.add(\"Mia\");\nSystem.out.println(names.get(0));", annotations: [{ line: 4, from: 0, to: 43, text: "List<String> means list ito na text lang ang puwede. ArrayList ang actual resizable implementation." }, { line: 7, from: 0, to: 17, text: "Allowed ang duplicate sa List; valid pa rin ang second Mia." }], explanation: ["List ay ordered: may index 0, 1, 2... at puwedeng magka-duplicate. <String> ang generic type guardrail para text lang ang mailagay.", "add() ang lagay, get(index) ang kuha, at remove() ang tanggal."], whereUsed: "Cart products, comments, menu items, at ordered results.", tip: "Prefer List<String> sa variable type kaysa ArrayList<String> para flexible ang implementation later." },
      { heading: "Set: unique values only", code: "import java.util.HashSet;\nimport java.util.Set;\n\nSet<String> tags = new HashSet<>();\ntags.add(\"java\");\ntags.add(\"beginner\");\ntags.add(\"java\");\nSystem.out.println(tags.contains(\"java\"));", annotations: [{ line: 4, from: 0, to: 39, text: "Set<String> allows unique text values only." }, { line: 7, from: 0, to: 17, text: "Second java will not make a duplicate entry." }], explanation: ["Set is for uniqueness. HashSet does not promise display order, pero mabilis ito sa contains() checks.", "Kung kailangan sorted set, tingnan ang TreeSet; kung insertion order, LinkedHashSet."], whereUsed: "Unique tags, enrolled student IDs, permissions, at duplicate prevention.", tip: "Huwag gumamit ng Set kung mahalaga ang item position/index." },
      { heading: "Map: key to value", code: "import java.util.HashMap;\nimport java.util.Map;\n\nMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Mia\", 95);\nscores.put(\"Kai\", 88);\nSystem.out.println(scores.get(\"Mia\"));\nSystem.out.println(scores.getOrDefault(\"Ana\", 0));", annotations: [{ line: 4, from: 0, to: 50, text: "Map<String, Integer>: text keys (names) point to whole-number values (scores)." }, { line: 5, from: 0, to: 21, text: "put(key, value) stores or updates the value for that key." }, { line: 8, from: 0, to: 51, text: "getOrDefault avoids null by giving 0 when Ana is missing." }], explanation: ["Map is dictionary-style data: key ang label, value ang laman. Walang duplicate keys; a second put with same key updates the old value.", "get() can return null if missing, so getOrDefault() is friendlier kapag may fallback ka."], whereUsed: "Profiles, settings, inventory by product ID, and cached API data.", tip: "HashMap has no guaranteed order. LinkedHashMap keeps insertion order; TreeMap sorts keys." },
      { heading: "Chooser + common mistakes", code: "// Need order / duplicates?  List<String>\n// Need uniqueness?          Set<String>\n// Need key -> value lookup? Map<String, Integer>\n\n// Arrays are fixed-size; Collections can grow.", annotations: [], explanation: ["List for sequence, Set for unique items, Map for named lookup. Collections can grow/shrink; arrays have fixed length after creation.", "Common error: use primitive int inside generics. Use wrapper Integer: List<Integer>, not List<int>. Java auto-boxes it for you."], whereUsed: "Every Java app that handles multiple users, records, products, or results.", tip: "Start with the interface type—List, Set, Map—then pick ArrayList, HashSet, HashMap as implementation." }
    ];
  }

  // The original lessons already have exercises; give them the same complete
  // reading structure as the newer lessons so no topic feels like a short stub.
  Object.entries(K.curriculum).forEach(([language, course]) => {
    course.topics.forEach(topic => {
      const lesson = K.lessons[`${language}/${topic.id}`];
      if (!lesson || lesson.sections?.length) return;
      const lessonCode = lesson.code || "";
      const firstLine = lessonCode.split("\n").find(line => line.trim()) || "";
      lesson.sections = [
        { heading: "Main example", code: lessonCode, annotations: lesson.annotations || [], explanation: ["Ito ang core pattern ng topic. Basahin muna nang dahan-dahan, then palitan ang sample values para makita kung ano ang mag-iiba.", lesson.summary], whereUsed: topic.summary, tip: "Hindi kailangan perfect sa first try. Goal muna: alam mo ang job ng bawat line." },
        { heading: "Ano ang nangyayari sa code?", code: lessonCode, annotations: [], explanation: [`Start sa first line: ${firstLine || "ito ang setup ng example"}. May mga variable na nagsisilbing labeled boxes, habang ang conditions, loops, o functions ay instructions kung ano ang gagawin sa laman ng mga box na iyon.`, "Basahin in order: setup/input muna, process sa gitna, tapos output o result sa dulo. Kapag may block, ang indentation/braces ang nagsasabing magkakasama ang lines."], whereUsed: "Ito ang reading pattern na magagamit mo sa anumang codebase, hindi lang sa lesson na ito.", tip: "Kapag may error, i-check muna ang line bago ang error line—madalas doon nagsimula ang issue." },
        { heading: "Common mistakes at pang-iwas", code: lessonCode, annotations: [], explanation: [language === "python" ? "Sa Python, bantayan ang indentation, colon pagkatapos ng if/for/def, at case ng True/False. Isang extra space o maling type lang, puwedeng mag-error." : "Sa Java, bantayan ang type ng variable, semicolon, braces, at exact capitalization. String at int ay magkaiba, at Java will call that out agad.", "Huwag mag-panic sa error. Basahin ang message, hanapin ang file/line, at i-compare ang syntax sa working example."], whereUsed: "Useful ito kapag nag-e-experiment ka sa editor o nagso-solve ng coding exercise.", tip: "Change one thing at a time para alam mo kung alin ang nag-fix o nag-break." },
        { heading: "Terms at mental model", code: lessonCode, annotations: [], explanation: ["Input ang data na pumapasok sa program. Process ang rules o actions na ginagawa ng code. Output ang lumalabas na result. Variable ang label ng box; value ang laman. Function o method ang named na set ng instructions.", "Sa tuwing may bagong concept, i-map mo siya sa input, process, at output. Ito ang easiest way para hindi mukhang random symbols ang code."], whereUsed: "Ito ang vocabulary na ginagamit sa tutorials, error messages, at sa real IT teams.", tip: "Subukang hanapin sa example ang isang input, isang process, at isang output." },
        { heading: "Gawing real-world", code: lessonCode, annotations: [], explanation: ["Try i-convert ang sample sa sarili mong scenario: grades, online shop, game score, attendance, o profile. Same programming concept, pero mas memorable kapag sariling data ang gamit.", "Pagkatapos, gamitin ang I-try mo editor at mini project sa baba. Iyan ang bridge mula 'gets ko' papuntang 'kaya ko na'."], whereUsed: topic.summary, tip: "Bonus challenge: magsulat ng comment sa bawat line gamit ang sarili mong words." },
        { heading: "Bago mag-next topic", code: lessonCode, annotations: [], explanation: ["I-run ang original code. Palitan ang isang value. Hulaan ang bagong output bago i-run. Tapos gumawa ng isang maliit na variation nang walang kopya. Iyan ang pinaka-reliable na test kung gets mo na talaga.", "Okay lang bumalik sa lesson. Sa IT, normal ang tumingin sa docs at examples—ang mahalaga ay kaya mong mag-reason tungkol sa code."], whereUsed: "Gamitin itong checklist sa bawat lesson para mas matibay ang foundation mo.", tip: "Kung may isang part na di pa kaya i-explain, doon muna mag-practice bago umusad." }
      ];
      lesson.challenges = [
        { title: "Challenge 1: Recreate the idea", task: `Mula sa blank editor, magsulat ng maliit na example para sa ${topic.title} nang hindi kinokopya ang sample. Gumamit ng sarili mong values.`, check: "Dapat tumakbo ang code at may malinaw na output o visible na result." },
        { title: "Challenge 2: Change one rule", task: "Magdagdag o magbago ng isang input, value, condition, item, o method call. Hulaan muna ang magiging result bago i-run.", check: "I-compare ang prediction mo sa actual output at ayusin kung may mali." },
        { title: "Challenge 3: Real scenario", task: `I-apply ang ${topic.title} sa isang mini scenario: grade checker, shop item, game score, attendance, profile, o task list.`, check: "May meaningful variable names, at kaya mong i-explain ang trabaho ng bawat line." }
      ];
    });
  });

  // Every lesson gets code-writing prompts, including the detailed custom lessons.
  Object.entries(K.curriculum).forEach(([language, course]) => {
    course.topics.forEach(topic => {
      const lesson = K.lessons[`${language}/${topic.id}`];
      if (!lesson) return;
      lesson.challenges = [
        { title: "Challenge 1: Recreate the idea", task: `Mula sa blank editor, magsulat ng maliit na example para sa ${topic.title} nang hindi kinokopya ang sample. Gumamit ng sarili mong values.`, check: "Dapat tumakbo ang code at may malinaw na output o visible na result." },
        { title: "Challenge 2: Change one rule", task: "Magdagdag o magbago ng isang input, value, condition, item, o method call. Hulaan muna ang magiging result bago i-run.", check: "I-compare ang prediction mo sa actual output at ayusin kung may mali." },
        { title: "Challenge 3: Real scenario", task: `I-apply ang ${topic.title} sa isang mini scenario: grade checker, shop item, game score, attendance, profile, o task list.`, check: "May meaningful variable names, at kaya mong i-explain ang trabaho ng bawat line." }
      ];
    });
  });
  // Related Python tools stay inside the lesson where learners will use them.
  // This keeps the sidebar short while still giving each tool a runnable sample.
  const addRelated = (id, sections) => {
    const lesson = K.lessons[`python/${id}`];
    if (!lesson) return;
    const existingSections = lesson._relatedSections ? lesson.sections : (lesson.sections || []).slice(0, 1);
    lesson.showAllSections = true;
    lesson._relatedSections = true;
    lesson.sections = [...existingSections, ...sections];
  };
  const related = (heading, code, explanation, tip) => ({ heading, code, annotations: [], explanation: [explanation], tip });

  addRelated("variables-and-data-types", [
    related("Type conversion: palitan ang type", "age_text = \"18\"\nage = int(age_text)\nprice = float(\"49.50\")\nmessage = str(age) + \" years old\"\nprint(message)", "int(), float(), at str() ay nagko-convert ng value sa kailangan mong type.", "Text galing input() by default, kaya madalas kailangan ng int() o float().")
  ]);
  addRelated("strings", [
    related("String methods", "name = \"  kai dela cruz  \"\nprint(name.strip())\nprint(name.upper())\nprint(name.replace(\"kai\", \"Mia\"))", "strip() ay tanggal extra spaces; upper() ay uppercase; replace() ay nagpapalit ng text.", "String methods gumagawa ng bagong text; hindi nila binabago ang original string."),
    related("String slicing", "word = \"Python\"\nprint(word[0:3])\nprint(word[-2:])\nprint(word[::-1])", "[start:end] ay kumukuha ng part ng text; negative index ay mula sa dulo; [::-1] ay reverse.", "Hindi kasama ang end index: word[0:3] ay Pyt.")
  ]);
  addRelated("lists-tuples-sets-and-dictionaries", [
    related("List slicing at list comprehension", "numbers = [1, 2, 3, 4, 5]\nprint(numbers[1:4])\nsquares = [number ** 2 for number in numbers]\nprint(squares)", "List slicing ay kumukuha ng range ng items. List comprehension ay compact na paggawa ng bagong list.", "Sa numbers[1:4], index 1 hanggang 3 lang ang kukunin."),
    related("Dictionary methods at dictionary comprehension", "profile = {\"name\": \"Mia\", \"score\": 90}\nprint(profile.get(\"name\"))\nprint(profile.keys())\nlabels = {number: f\"Item {number}\" for number in [1, 2, 3]}\nprint(labels)", "get() ay safe na kuha ng value; keys() ay listahan ng keys; dictionary comprehension ay gumagawa ng key-value pairs sa isang line.", "Gamitin ang get(key, default) kapag posibleng wala ang key."),
    related("Set at tuple methods", "tags = {\"python\", \"beginner\"}\ntags.add(\"practice\")\ntags.discard(\"beginner\")\npoint = (10, 20)\nprint(point.count(10))", "add() ay dagdag sa set; discard() ay safe na tanggal; tuple.count() ay nagbibilang ng value.", "Set ay unique items lang; tuple ay fixed o hindi nababago.")
  ]);
  addRelated("operators", [
    related("Operators sa actual condition", "score = 85\nis_passing = score >= 75 and score <= 100\nprint(is_passing)\nprint(score % 2 == 1)", "Comparison operators ay nagbabalik ng True/False; and/or ay pinagsasama ang conditions; % ay remainder.", "Gamitin ang parentheses kung gusto mong gawing mas klaro ang order ng checks.")
  ]);
  addRelated("conditional-statements", [
    related("Nested if-else", "is_logged_in = True\nis_admin = False\nif is_logged_in:\n    if is_admin:\n        print(\"Admin panel\")\n    else:\n        print(\"User dashboard\")\nelse:\n    print(\"Please log in\")", "Nested if ay condition sa loob ng isa pang condition. Indentation ang nagsasabi kung aling block ang magkakasama.", "Gamitin lang kapag may dependent na second check; huwag sobrang lalim.")
  ]);
  addRelated("loops", [
    related("Nested loops at range()", "for row in range(1, 3):\n    for column in range(1, 4):\n        print(row, column)", "range() ang nagbibigay ng numbers; nested loop ay loop sa loob ng loop para sa rows at columns.", "Bawat isang row ay tatakbo nang buo ang inner loop."),
    related("enumerate() at zip()", "names = [\"Ana\", \"Ben\"]\nscores = [90, 85]\nfor index, name in enumerate(names, start=1):\n    print(index, name)\nfor name, score in zip(names, scores):\n    print(name, score)", "enumerate() ay may index at item. zip() ay pinapares ang items mula sa dalawang lists.", "Hihinto ang zip() sa mas maikling list.")
  ]);
  addRelated("functions", [
    related("Built-in functions: len, max, min, sum", "scores = [88, 72, 95, 80]\nprint(len(scores))\nprint(max(scores))\nprint(min(scores))\nprint(sum(scores))", "len() ay bilang, max() pinakamataas, min() pinakamababa, at sum() ang total.", "Gamitin ang sum(scores) / len(scores) para sa average kapag hindi empty ang list."),
    related("Lambda, *args, at **kwargs", "add = lambda first, second: first + second\ndef show(*items, **options):\n    print(items)\n    print(options)\nprint(add(2, 3))\nshow(\"Python\", \"Java\", level=\"beginner\")", "Lambda ay maliit na one-line function. *args ay maraming positional values; **kwargs ay named values.", "Mas readable pa rin ang def kapag mahaba o maraming logic ang function."),
    related("map, filter, reduce, sorted, any, all", "from functools import reduce\nnumbers = [3, 1, 4, 2]\nprint(list(map(lambda number: number * 2, numbers)))\nprint(list(filter(lambda number: number > 2, numbers)))\nprint(reduce(lambda total, number: total + number, numbers))\nprint(sorted(numbers, reverse=True))\nprint(any(number > 3 for number in numbers))\nprint(all(number > 0 for number in numbers))", "map() transforms, filter() keeps matching values, reduce() combines values. sorted() returns a new sorted list; any/all check boolean conditions.", "Import reduce mula functools bago ito gamitin.")
  ]);
  addRelated("recursion", [
    related("Recursion recap", "def factorial(number):\n    if number == 1:\n        return 1\n    return number * factorial(number - 1)\nprint(factorial(4))", "Recursion ay function na tumatawag sa sarili. Base case ang tumitigil sa tawag.", "Laging maglagay ng base case para hindi maging infinite recursion.")
  ]);
  addRelated("error-handling", [
    related("Exception handling", "try:\n    age = int(input(\"Age: \"))\n    print(age + 1)\nexcept ValueError:\n    print(\"Number lang ang ilagay.\")\nfinally:\n    print(\"Done\")", "try ang risky code; except ang sasalo ng specific error; finally ay laging tatakbo.", "I-handle ang specific error tulad ng ValueError, hindi broad na except lang.")
  ]);
  addRelated("file-handling", [
    related("File handling", "with open(\"notes.txt\", \"w\") as file:\n    file.write(\"Practice every day\")\nwith open(\"notes.txt\") as file:\n    print(file.read())", "with ang nagsasara ng file automatically. w ay write mode; default mode ay read.", "Gamitin ang a mode kung gusto mong magdagdag nang hindi binubura ang lumang content.")
  ]);
  addRelated("modules-and-packages", [
    related("Virtual environment at pip", "# terminal\npython -m venv .venv\n# Windows: .venv\\Scripts\\activate\npip install requests\npip freeze > requirements.txt", "Virtual environment ay isolated na dependencies ng project. pip ang pang-install ng packages.", "I-activate ang .venv bago mag-install para project lang ang maapektuhan."),
    related("Useful standard modules", "import json, random, math\nfrom datetime import datetime\nprint(json.dumps({\"name\": \"Mia\"}))\nprint(random.choice([\"red\", \"blue\"]))\nprint(math.sqrt(81))\nprint(datetime.now())", "json para data exchange, random para random values, math para calculations, at datetime para date/time.", "Standard library ang mga ito—walang pip install kailangan."),
    related("re, os, at pathlib", "import os, re\nfrom pathlib import Path\nemail = \"mia@example.com\"\nprint(bool(re.fullmatch(r\"[^@]+@[^@]+\\.[^@]+\", email)))\nprint(os.getcwd())\npath = Path(\"notes.txt\")\nprint(path.exists())", "re ay regular expressions para sa pattern matching. os ay may OS-level helpers; pathlib ay modern way para humawak ng file paths.", "Gamitin ang pathlib para mas readable at cross-platform ang paths.")
  ]);
  addRelated("oop", [
    related("Classes, objects, at constructor", "class Player:\n    def __init__(self, name, score=0):\n        self.name = name\n        self.score = score\nplayer = Player(\"Kai\")\nprint(player.name)", "Class ang blueprint; object ang actual instance. __init__() ang constructor na nagse-set ng starting data.", "self ay tumutukoy sa current object.") ,
    related("Encapsulation", "class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance\n    def get_balance(self):\n        return self.__balance\naccount = BankAccount(500)\nprint(account.get_balance())", "Ang __balance ay private-style attribute. Method ang controlled na paraan para basahin ito.", "Sa Python, name mangling ito; convention pa rin ang responsible access.")
  ]);
  addRelated("advanced-oop", [
    related("Inheritance, abstraction, at polymorphism", "from abc import ABC, abstractmethod\nclass Animal(ABC):\n    @abstractmethod\n    def speak(self): pass\nclass Dog(Animal):\n    def speak(self): return \"Woof\"\nprint(Dog().speak())", "Inheritance ay pagmana mula base class. Abstract method ay required contract. Polymorphism ay same method name, iba't ibang behavior.", "Gamitin ang base class kapag may shared contract ang related objects."),
    related("Magic methods, isinstance, issubclass", "class Score:\n    def __init__(self, value): self.value = value\n    def __str__(self): return f\"Score: {self.value}\"\nitem = Score(95)\nprint(item)\nprint(isinstance(item, Score))\nprint(issubclass(bool, int))", "Magic methods gaya ng __str__() ay special behavior. isinstance() checks an object; issubclass() checks a class relationship.", "Ang bool ay subclass ng int sa Python, kaya True behaves like 1 sa ilang computations.")
  ]);
  addRelated("testing-and-debugging", [
    related("Unit testing", "import unittest\ndef add(first, second): return first + second\nclass AddTest(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)\nif __name__ == \"__main__\":\n    unittest.main()", "Unit test ay automatic check ng maliit na behavior. assertEqual(expected, actual) ang nagko-compare ng result.", "Mag-test ng normal at edge cases, hindi happy path lang.")
  ]);
  addRelated("functions", [
    related("Decorators, generators, at iterators", "def loud(function):\n    def wrapper(): return function().upper()\n    return wrapper\n@loud\ndef greet(): return \"hello\"\ndef count_up():\n    yield 1\n    yield 2\nprint(greet())\nprint(next(iter(count_up())))", "Decorator ay nagdadagdag ng behavior sa function. Generator na may yield ay nagbibigay ng values one at a time; iterator ang nagbibigay ng next value.", "Gamitin ang generator kapag hindi kailangan i-store lahat ng values agad.")
  ]);
  // Every lesson receives two quick coding drills, even when it has no custom exercise data.
  // The challenges are derived from that lesson's own sample so Python and Java stay language-specific.
  const pickPracticeToken = (source, language, seed) => {
    const searchable = source.replace(/(["']).*?\1/g, " ");
    const patterns = language === "java"
      ? [/System\.out\.println/g, /\breturn\b/g, /\b(String|int|double|boolean)\b/g, /\b(if|else|for|while|class|static)\b/g, /\b[A-Za-z_$][\w$]*/g]
      : [/\bprint\b/g, /\breturn\b/g, /\b(range|append|remove|sort|len|input)\b/g, /\b(if|elif|else|for|while|def|class)\b/g, /\b[A-Za-z_][\w]*/g];
    const choices = [];
    patterns.forEach(pattern => {
      for (const match of searchable.matchAll(pattern)) {
        if (!choices.includes(match[0]) && !["true", "false", "null", "True", "False", "None", "System", "out", "println"].includes(match[0])) choices.push(match[0]);
      }
    });
    const number = [...`${language}:${seed}`].reduce((total, character) => total + character.charCodeAt(0), 0);
    return choices.length ? choices[number % choices.length] : "";
  };
  const makeUniversalPractice = lesson => {
    const source = (lesson.code || lesson.sections?.[0]?.code || "").split(/\r?\n/)
      .filter(line => line.trim() && !line.trim().startsWith("#") && !line.trim().startsWith("//"))
      .slice(0, 8)
      .join("\n");
    if (!source) return;
    if (!lesson.reorder?.length) {
      const lines = source.split("\n");
      lesson.reorder = [{ lines: lines.slice(0, Math.min(lines.length, 5)), explanation: "Basahin ang flow: setup muna, saka process, tapos output." }];
    }
    if (!lesson.fillBlanks?.length) {
      const token = pickPracticeToken(source, lesson.language, lesson.id);
      if (!token) return;
      lesson.fillBlanks = [{
        code: source.replace(token, "____"),
        answer: token,
        hint: "Hanapin ang built-in function, keyword, o method na kailangan sa blank.",
        explanation: `Ang missing code ay ${token}.`
      }];
    }
  };
  Object.values(K.lessons || {}).forEach(makeUniversalPractice);
})(window.Kodigo = window.Kodigo || {});
