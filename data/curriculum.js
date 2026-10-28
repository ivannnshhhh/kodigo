// Curriculum topics power the topic sidebar, lesson routes, and quiz coverage.
(function (K) {
const topic = (n, id, title, level, summary) => ({ n, id, title, level, summary });

K.curriculum = {
  python: {
    name: "Python",
    topics: [
      topic(1, "variables-and-data-types", "Variables and Data Types", "beginner", "Bigyan ng pangalan ang values at kilalanin ang basic data types."),
      topic(2, "input-and-output", "Input and Output", "beginner", "Kumuha ng input at magpakita ng malinaw na output."),
      topic(3, "operators", "Operators", "beginner", "Gamitin ang operators para mag-compute at mag-compare ng values."),
      topic(4, "conditional-statements", "Conditional Statements", "beginner", "Pumili ng gagawin gamit ang if, elif, at else."),
      topic(5, "loops", "Loops", "beginner", "Ulitin ang instructions gamit ang for at while loops."),
      topic(6, "strings", "Strings", "beginner", "Gumawa, mag-format, at magproseso ng text."),
      topic(7, "list-methods", "List Methods", "beginner", "Magdagdag, magtanggal, maghanap, at mag-ayos ng items sa Python list."),
      topic(8, "lists-tuples-sets-and-dictionaries", "Data Structures", "beginner", "I-organize ang maraming values gamit ang Python collections."),
      topic(9, "functions", "Functions", "beginner", "I-wrap ang reusable code sa functions na may parameters at return values."),
      topic(10, "error-handling", "Error Handling", "beginner", "Saluhin at ayusin ang runtime errors gamit ang try at except."),
      topic(10, "file-handling", "File Handling", "intermediate", "Magbasa at magsulat ng files nang ligtas."),
      topic(11, "modules-and-packages", "Modules and Packages", "intermediate", "Ayusin at i-reuse ang code gamit ang imports at packages."),
      topic(12, "oop", "OOP", "intermediate", "I-model ang data at behavior gamit ang classes at objects."),
      topic(13, "recursion", "Recursion", "intermediate", "Lutasin ang problema sa pamamagitan ng function na tumatawag sa sarili."),
      topic(14, "searching-and-sorting", "Searching and Sorting", "intermediate", "Maghanap at mag-ayos ng values gamit ang common algorithms."),
      topic(15, "basic-dsa", "Basic DSA", "intermediate", "Piliin ang tamang data structure at algorithm para sa task."),
      topic(16, "sql-and-database-programming", "SQL and Database Programming", "intermediate", "Kumonekta sa database at mag-query ng data mula sa Python."),
      topic(17, "git-and-github", "Git and GitHub", "intermediate", "I-track ang code changes at i-share ang projects."),
      topic(18, "advanced-oop", "Advanced OOP", "advanced", "Palalimin ang OOP gamit ang composition, inheritance, at protocols."),
      topic(19, "advanced-dsa", "Advanced DSA", "advanced", "Suriin ang mas advanced na structures at algorithm trade-offs."),
      topic(20, "gui-or-web-development", "GUI or Web Development", "advanced", "Gumawa ng interactive desktop o web app gamit ang Python."),
      topic(21, "testing-and-debugging", "Testing and Debugging", "advanced", "I-verify ang behavior at hanapin ang bugs gamit ang tests at tools."),
      topic(22, "apis-and-automation", "APIs and Automation", "advanced", "Kumuha ng data mula sa APIs at i-automate ang routine work."),
      topic(23, "ai-computer-vision-or-data-analysis", "AI, Computer Vision, or Data Analysis", "advanced", "I-explore ang data at gumawa ng intelligent na Python applications."),
    ]
  },
  java: {
    name: "Java",
    topics: [
      topic(1, "java-fundamentals", "Java Fundamentals", "beginner", "Kilalanin ang Java syntax, types, variables, at basic program structure."),
      topic(2, "operators", "Operators", "beginner", "Gamitin ang operators para mag-compute at mag-compare ng values."),
      topic(3, "conditional-statements", "Conditional Statements", "beginner", "Pumili ng gagawin gamit ang if, else, at switch."),
      topic(4, "loops", "Loops", "beginner", "Ulitin ang instructions gamit ang for, while, at do-while."),
      topic(5, "strings", "Strings", "beginner", "Gumawa at magproseso ng text gamit ang Java String APIs."),
      topic(6, "arrays", "Arrays", "beginner", "Mag-store at mag-access ng magkakaparehong values gamit ang arrays."),
      topic(7, "methods", "Methods", "beginner", "I-reuse ang logic gamit ang methods, parameters, at return values."),
      topic(8, "oop", "OOP", "intermediate", "I-model ang data at behavior gamit ang classes at objects."),
      topic(9, "exception-handling", "Exception Handling", "intermediate", "I-handle ang errors gamit ang exceptions at try-catch."),
      topic(10, "collections-framework", "Collections Framework", "intermediate", "Pumili ng angkop na List, Set, o Map para sa data."),
      topic(11, "file-handling", "File Handling", "intermediate", "Magbasa at magsulat ng files gamit ang Java APIs."),
      topic(12, "generics", "Generics", "intermediate", "Gumawa ng reusable, type-safe na classes at methods."),
      topic(13, "data-structures-and-algorithms", "Data Structures and Algorithms", "intermediate", "Gamitin at suriin ang common structures at algorithms."),
      topic(14, "sql-at-jdbc", "SQL at JDBC", "intermediate", "Kumonekta sa database at magpatakbo ng SQL gamit ang JDBC."),
      topic(15, "git-and-github", "Git and GitHub", "intermediate", "I-track ang code changes at i-share ang projects."),
      topic(16, "multithreading", "Multithreading", "advanced", "Magpatakbo ng tasks concurrently gamit ang Java threads."),
      topic(17, "modern-java-features", "Modern Java Features", "advanced", "Gamitin ang modern syntax at APIs ng Java."),
      topic(18, "unit-testing", "Unit Testing", "advanced", "Subukan ang behavior ng code gamit ang unit tests."),
      topic(19, "gui-programming", "GUI Programming", "advanced", "Gumawa ng graphical interface para sa Java applications."),
      topic(20, "spring-boot", "Spring Boot", "advanced", "Bumuo ng Java application gamit ang Spring Boot."),
      topic(21, "software-design-patterns", "Software Design Patterns", "advanced", "Gumamit ng design patterns para sa maintainable na software."),
      topic(22, "jvm-and-memory-management", "JVM and Memory Management", "advanced", "Unawain kung paano pinapatakbo at inaasikaso ng JVM ang memory."),
    ]
  }
};

K.levelIds = ["beginner", "intermediate", "advanced"];
K.curriculum.python.topics.forEach((item, index) => { item.n = index + 1; });
K.curriculum.java.topics.forEach((item, index) => { item.n = index + 1; });
K.allLessons = Object.entries(K.curriculum).flatMap(([language, data]) =>
  data.topics.map(item => ({ ...item, language, keywords: `${item.title} ${item.summary}` }))
);
})(window.Kodigo = window.Kodigo || {});
