(function (K) {
const paths = [
  {
    id: "front-end-developer",
    title: "Front End Developer",
    description: ["Gumawa ng interfaces na madaling gamitin, accessible, at responsive sa iba’t ibang screen.", "Build interfaces that are easy to use, accessible, and responsive on different screens."],
    steps: [
      { title: ["HTML at page structure", "HTML and page structure"], description: ["Ayusin ang content gamit ang semantic elements at malinaw na page structure.", "Organize content with semantic elements and a clear page structure."], focus: "HTML · semantic markup", deliverable: ["Isang maayos na profile o article page.", "A well-structured profile or article page."] },
      { title: ["CSS at responsive layout", "CSS and responsive layout"], description: ["Gamitin ang spacing, typography, Flexbox, Grid, at media queries para gumana sa mobile at desktop.", "Use spacing, typography, Flexbox, Grid, and media queries for mobile and desktop."], focus: "CSS · Flexbox · Grid", deliverable: ["Responsive page na maayos sa maliit at malaking screen.", "A responsive page that works on small and large screens."] },
      { title: ["JavaScript at interaction", "JavaScript and interaction"], description: ["Magdagdag ng event handling, form validation, at pagbabago sa page gamit ang JavaScript.", "Add event handling, form validation, and page updates with JavaScript."], focus: "JavaScript · DOM · events", deliverable: ["Interactive form o maliit na task list.", "An interactive form or small task list."] },
      { title: ["Accessibility at testing", "Accessibility and testing"], description: ["Ayusin ang keyboard navigation, labels, contrast, at behavior sa iba’t ibang browser.", "Improve keyboard navigation, labels, contrast, and behavior across browsers."], focus: "Accessibility · browser testing", deliverable: ["Accessible at nasubukang interface.", "An accessible, tested interface."] },
      { title: ["Portfolio at deployment", "Portfolio and deployment"], description: ["I-publish ang projects, isulat ang README, at ipakita ang design decisions mo.", "Publish your projects, write a README, and explain your design decisions."], focus: "Git · deployment · portfolio", deliverable: ["Live portfolio na may tatlong projects.", "A live portfolio with three projects."] }
    ]
  },
  {
    id: "back-end-developer",
    title: "Back End Developer",
    description: ["Bumuo ng server-side logic, APIs, at data storage para sa applications.", "Build server-side logic, APIs, and data storage for applications."],
    steps: [
      { title: ["Programming fundamentals", "Programming fundamentals"], description: ["Palakasin ang variables, conditions, loops, functions, at error handling sa Python o Java.", "Strengthen variables, conditions, loops, functions, and error handling in Python or Java."], focus: "Python or Java · core concepts", deliverable: ["Maliit na command-line application.", "A small command-line application."] },
      { title: ["HTTP at APIs", "HTTP and APIs"], description: ["Unawain ang requests, responses, status codes, JSON, at REST API design.", "Learn requests, responses, status codes, JSON, and REST API design."], focus: "HTTP · REST · JSON", deliverable: ["API na may ilang malinaw na endpoints.", "An API with a few clear endpoints."] },
      { title: ["Database at SQL", "Databases and SQL"], description: ["Magdisenyo ng tables, gumamit ng queries, at mag-save ng data nang maayos.", "Design tables, write queries, and store data reliably."], focus: "SQL · schema · migrations", deliverable: ["Database-backed na CRUD feature.", "A database-backed CRUD feature."] },
      { title: ["Security at authentication", "Security and authentication"], description: ["I-validate ang input, protektahan ang accounts, at mag-ingat sa secrets at permissions.", "Validate input, protect accounts, and handle secrets and permissions carefully."], focus: "Validation · authentication · authorization", deliverable: ["Secured na login at protected endpoint.", "A login flow with a protected endpoint."] },
      { title: ["Testing at deployment", "Testing and deployment"], description: ["Magdagdag ng automated tests, logs, configuration, at paraan ng pag-deploy.", "Add automated tests, logs, configuration, and a deployment workflow."], focus: "Testing · logging · deployment", deliverable: ["Deployed API na may tests at setup guide.", "A deployed API with tests and a setup guide."] }
    ]
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: ["Matutong magdisenyo, gumawa, mag-test, at mag-maintain ng software bilang isang buong proseso.", "Learn to design, build, test, and maintain software as a complete process."],
    steps: [
      { title: ["Programming at problem solving", "Programming and problem solving"], description: ["Mag-practice ng core programming concepts at hatiin ang problema sa maliliit na hakbang.", "Practice core programming concepts and break problems into smaller steps."], focus: "Python or Java · fundamentals", deliverable: ["Collection ng maliliit na solved exercises.", "A collection of small solved exercises."] },
      { title: ["Data structures at algorithms", "Data structures and algorithms"], description: ["Aralin ang arrays, lists, maps, searching, sorting, at basic complexity.", "Study arrays, lists, maps, searching, sorting, and basic complexity."], focus: "DSA · Big O", deliverable: ["Ilang algorithm na may tests at complexity notes.", "A few algorithms with tests and complexity notes."] },
      { title: ["Git at team workflow", "Git and team workflow"], description: ["Gumamit ng branches, commits, code reviews, at malinaw na project history.", "Use branches, commits, code reviews, and a clear project history."], focus: "Git · pull requests · code review", deliverable: ["Project na may feature branches at review notes.", "A project with feature branches and review notes."] },
      { title: ["OOP, design, at testing", "OOP, design, and testing"], description: ["Ayusin ang code sa maintainable na components at magdagdag ng unit tests.", "Organize code into maintainable components and add unit tests."], focus: "OOP · design principles · unit tests", deliverable: ["Tested application na may malinaw na modules.", "A tested application with clear modules."] },
      { title: ["System design at capstone", "System design and capstone"], description: ["Pag-isipan ang data flow, failures, performance, at trade-offs habang gumagawa ng end-to-end project.", "Consider data flow, failures, performance, and trade-offs while building an end-to-end project."], focus: "Architecture · reliability · documentation", deliverable: ["Dokumentado at deployed na capstone project.", "A documented and deployed capstone project."] }
    ]
  },
  {
    id: "web-developer",
    title: "Web Developer",
    description: ["Gumawa ng kumpletong website o web app mula sa interface hanggang sa server at database.", "Build a complete website or web app, from the interface to the server and database."],
    steps: [
      { title: ["HTML at CSS", "HTML and CSS"], description: ["Bumuo ng semantic pages at responsive layouts para sa iba’t ibang device.", "Build semantic pages and responsive layouts for different devices."], focus: "HTML · CSS · responsive design", deliverable: ["Multi-page responsive website.", "A multi-page responsive website."] },
      { title: ["JavaScript sa browser", "JavaScript in the browser"], description: ["Gawing interactive ang page at mag-handle ng forms, events, at API responses.", "Make pages interactive and handle forms, events, and API responses."], focus: "JavaScript · DOM · fetch", deliverable: ["Web page na gumagamit ng public API.", "A web page that uses a public API."] },
      { title: ["Server at API", "Server and API"], description: ["Gumawa ng backend endpoints gamit ang Python o Java at magbalik ng JSON data.", "Build backend endpoints with Python or Java and return JSON data."], focus: "Python or Java · HTTP · REST", deliverable: ["Frontend na kumukuha ng data sa sariling API.", "A frontend that gets data from your own API."] },
      { title: ["Database at accounts", "Database and accounts"], description: ["Mag-store ng application data at magpatupad ng ligtas na authentication.", "Store application data and implement safe authentication."], focus: "SQL · persistence · authentication", deliverable: ["Full-stack feature na may user accounts.", "A full-stack feature with user accounts."] },
      { title: ["Quality at launch", "Quality and launch"], description: ["Subukan ang main flows, ayusin ang accessibility, at i-deploy ang app.", "Test main flows, improve accessibility, and deploy the app."], focus: "Testing · accessibility · deployment", deliverable: ["Live full-stack app na may setup instructions.", "A live full-stack app with setup instructions."] }
    ]
  },
  {
    id: "game-developer",
    title: "Game Developer",
    description: ["Gumawa ng games sa pamamagitan ng game loops, player input, rules, at paulit-ulit na testing.", "Build games using game loops, player input, rules, and iterative testing."],
    steps: [
      { title: ["Programming fundamentals", "Programming fundamentals"], description: ["Aralin ang variables, conditions, loops, functions, at collections gamit ang Python o Java.", "Learn variables, conditions, loops, functions, and collections with Python or Java."], focus: "Python or Java · fundamentals", deliverable: ["Text-based guessing o quiz game.", "A text-based guessing or quiz game."] },
      { title: ["Game loop at input", "Game loop and input"], description: ["Unawain kung paano inuulit ng game loop ang input, update, at rendering.", "Learn how a game loop repeats input, updates, and rendering."], focus: "Game engine · events · game state", deliverable: ["Maliit na playable prototype.", "A small playable prototype."] },
      { title: ["Movement at game rules", "Movement and game rules"], description: ["Magdagdag ng player controls, collisions, score, at win/lose conditions.", "Add player controls, collisions, scoring, and win/lose conditions."], focus: "Movement · collision · scoring", deliverable: ["Isang kumpletong core gameplay loop.", "A complete core gameplay loop."] },
      { title: ["Levels, UI, at audio", "Levels, UI, and audio"], description: ["Gumawa ng levels, menus, feedback, at audio para mas malinaw laruin ang game.", "Create levels, menus, feedback, and audio to make the game easier to play."], focus: "Level design · UI · audio", deliverable: ["Game na may menu at maraming level.", "A game with a menu and multiple levels."] },
      { title: ["Testing at release", "Testing and release"], description: ["Subukan ang edge cases, ayusin ang performance, at ihanda ang build para ma-share.", "Test edge cases, improve performance, and prepare a build to share."], focus: "Playtesting · optimization · publishing", deliverable: ["Playable release na may maikling instructions.", "A playable release with short instructions."] }
    ]
  },
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    description: ["Magdisenyo at bumuo ng mobile app na maayos gamitin, ligtas, at kayang makipag-ugnayan sa APIs.", "Design and build a mobile app that is usable, secure, and able to connect to APIs."],
    steps: [
      { title: ["Programming at app basics", "Programming and app basics"], description: ["Pumili ng mobile platform at aralin ang programming language at project structure nito.", "Choose a mobile platform and learn its programming language and project structure."], focus: "Android/Kotlin or cross-platform tools", deliverable: ["Simpleng app na may isang screen.", "A simple app with one screen."] },
      { title: ["UI at navigation", "UI and navigation"], description: ["Gumawa ng screens, reusable UI components, at malinaw na navigation.", "Build screens, reusable UI components, and clear navigation."], focus: "Layout · accessibility · navigation", deliverable: ["App flow na may ilang screens.", "An app flow with several screens."] },
      { title: ["State at local storage", "State and local storage"], description: ["Pamahalaan ang screen state at i-save ang user preferences o data sa device.", "Manage screen state and save user preferences or data on the device."], focus: "State · local persistence", deliverable: ["App na nakakaalala ng user settings.", "An app that remembers user settings."] },
      { title: ["APIs at network states", "APIs and network states"], description: ["Kumonekta sa API at magpakita ng loading, empty, at error states.", "Connect to an API and handle loading, empty, and error states."], focus: "HTTP · JSON · error handling", deliverable: ["App screen na gumagamit ng remote data.", "An app screen that uses remote data."] },
      { title: ["Testing at publishing", "Testing and publishing"], description: ["Subukan ang iba’t ibang screen sizes, ayusin ang crashes, at ihanda ang app release.", "Test different screen sizes, fix crashes, and prepare an app release."], focus: "Device testing · release build", deliverable: ["Tested app build at release checklist.", "A tested app build and release checklist."] }
    ]
  }
];

function localized(pair) {
  return pair[K.i18n.language === "en" ? 1 : 0];
}

function renderOverview() {
  const english = K.i18n.language === "en";
  return `<article class="roadmap-page roadmap-overview">
    <header class="roadmap-hero"><span class="eyebrow">${K.i18n.t("careerPaths")}</span><h1>${K.i18n.t("chooseRoadmap")}</h1><p>${english ? "Choose a career path to see a practical, step-by-step learning plan. Build projects as you go and adjust the order to fit your goals." : "Pumili ng career path para makita ang step-by-step na plano sa pag-aaral. Gumawa ng projects habang sumusulong at i-adjust ang pagkakasunod ayon sa goal mo."}</p></header>
    <div class="roadmap-grid">${paths.map((path, index) => `<a class="roadmap-card" href="#/roadmap/${path.id}"><span class="roadmap-card-number">${String(index + 1).padStart(2, "0")}</span><span class="roadmap-card-copy"><strong>${path.title}</strong><span>${localized(path.description)}</span></span><span class="roadmap-card-arrow" aria-hidden="true">→</span></a>`).join("")}</div>
  </article>`;
}

function renderPath(pathId) {
  const path = paths.find(item => item.id === pathId);
  if (!path) return renderOverview();
  const english = K.i18n.language === "en";
  return `<article class="roadmap-page roadmap-detail">
    <a class="roadmap-back" href="#/roadmap">← ${K.i18n.t("allRoadmaps")}</a>
    <header class="roadmap-hero"><span class="eyebrow">${K.i18n.t("careerPath")} · ${path.steps.length} ${english ? "steps" : "hakbang"}</span><h1>${path.title}</h1><p>${localized(path.description)}</p></header>
    <ol class="roadmap-steps">${path.steps.map((step, index) => `<li class="roadmap-step"><span class="roadmap-step-marker">${String(index + 1).padStart(2, "0")}</span><article class="roadmap-step-card"><div class="roadmap-step-heading"><span class="eyebrow">${english ? "STEP" : "HAKBANG"} ${String(index + 1).padStart(2, "0")}</span><h2>${localized(step.title)}</h2></div><p>${localized(step.description)}</p><div class="roadmap-step-outcome"><span>${K.i18n.t("focus")}</span><strong>${step.focus}</strong><span>${K.i18n.t("projectGoal")}</span><strong>${localized(step.deliverable)}</strong></div></article></li>`).join("")}</ol>
  </article>`;
}

function renderRoadmap(pathId) {
  return pathId ? renderPath(pathId) : renderOverview();
}

K.pages = K.pages || {};
K.pages.roadmap = { paths, renderRoadmap };
})(window.Kodigo = window.Kodigo || {});
