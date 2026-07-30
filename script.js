"use strict";

/* =========================================================
   基本設定
========================================================= */

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 4;
const MAX_EMPLOYEES = 4;
const TOTAL_TURNS = 5;

const SKILL_LABELS = {
  red: "体力",
  yellow: "コミュ力",
  blue: "知力",
  pink: "器用さ"
};

const SKILL_SHORT_LABELS = {
  red: "赤",
  yellow: "黄",
  blue: "青",
  pink: "ピンク"
};


/* =========================================================
   会社データ
========================================================= */

// COMPANY_DATA は game-data.js で定義（登録ページと共有）

// game-data.js に未登録の場合のみ、追加の会社3社を補完します。
[
  {
    id: "clinic",
    name: "ふわふわクリニック",
    industry: "医療",
    image: "images/company-clinic.png",
    colors: ["pink", "blue"]
  },
  {
    id: "manufacturing",
    name: "こねこね職人",
    industry: "製造",
    image: "images/company-manufacturing.png",
    colors: ["red", "pink"]
  },
  {
    id: "restaurant",
    name: "もぐもぐ工房",
    industry: "飲食",
    image: "images/company-restaurant.png",
    colors: ["yellow", "pink"]
  }
].forEach((company) => {
  const alreadyExists = COMPANY_DATA.some(
    (registeredCompany) => registeredCompany.id === company.id
  );

  if (!alreadyExists) {
    COMPANY_DATA.push(company);
  }
});


/* =========================================================
   社員データ

   skillsの順番
   red    ：体力
   yellow ：コミュ力
   blue   ：知力
   pink   ：器用さ

   disabilityは資料内に指定がなかったため、
   現段階では全員falseにしています。
========================================================= */

// EMPLOYEE_DATA は game-data.js で定義（登録ページと共有）


/* =========================================================
   イベントデータ
========================================================= */

const EVENT_DATA = [
  {
    id: "childcare",
    title: "育児休業",
    image: "images/event-childcareleave.png",
    description:
      "社員から育児休業の申請がありました。会社として対応を決めてください。"
  },
  {
    id: "diversity",
    title: "みんなちがって、みんないい",
    image: "images/event-everyone.png",
    description:
      "多様な特徴を持つ社員が働いている会社が評価されます。"
  },
  {
    id: "complaint",
    title: "社内からの不満",
    image: "images/event-firestorm.png",
    description:
      "似た属性の社員ばかりが集まっていないか確認します。"
  },
  {
    id: "headhunting",
    title: "ヘッドハンティング",
    image: "images/event-headhunting.png",
    description:
      "業績が最下位の会社が、ほかの会社と社員を交換します。"
  },
  {
    id: "winter",
    title: "冬がやってきた",
    image: "images/event-hibernation.png",
    description:
      "冬眠する社員を休ませるか、そのまま働いてもらうか決めます。"
  },
  {
    id: "disability",
    title: "ひとりじゃない",
    image: "images/event-notalone.png",
    description:
      "さまざまな事情を持つ社員が活躍できる会社を評価します。"
  },
  {
    id: "powerHarassment",
    title: "パワーハラスメント",
    image: "images/event-powerharassment.png",
    description:
      "パワーハラスメントを行う社員への対応を決めます。"
  },
  {
    id: "strike",
    title: "社員ストライキ",
    image: "images/event-strike.png",
    description:
      "ホワイト度が最下位の会社でストライキが発生します。"
  },
  {
    id: "training",
    title: "社員研修",
    image: "images/event-training.png",
    description:
      "業績を使って社員の能力を伸ばします。"
  }
];


/* =========================================================
   DOM取得
========================================================= */

const screens = document.querySelectorAll(".screen");

const storyNextButton =
  document.getElementById("storyNextButton");

const storyImage =
  document.getElementById("storyImage");

const storyActionButton =
  document.getElementById("storyActionButton");

const playerIcons =
  document.getElementById("playerIcons");

const playerNumber =
  document.getElementById("playerNumber");

const minusButton =
  document.getElementById("minusButton");

const plusButton =
  document.getElementById("plusButton");

const confirmPlayersButton =
  document.getElementById("confirmPlayersButton");

const companyCurrentPlayer =
  document.getElementById("companyCurrentPlayer");

const companyList =
  document.getElementById("companyList");

const companyPreviewArea =
  document.getElementById("companyPreviewArea");

const companyPreviewImage =
  document.getElementById("companyPreviewImage");

const companyPreviewName =
  document.getElementById("companyPreviewName");

const companyPreviewIndustry =
  document.getElementById("companyPreviewIndustry");

const companyScoreColorList =
  document.getElementById("companyScoreColorList");

const mockCompanyScanButton =
  document.getElementById("mockCompanyScanButton");

const employeeCurrentPlayer =
  document.getElementById("employeeCurrentPlayer");

const employeeSlots =
  document.getElementById("employeeSlots");

const employeePreview =
  document.getElementById("employeePreview");

const employeePreviewName =
  document.getElementById("employeePreviewName");
const employeeSkillPreview =
  document.getElementById("employeeSkillPreview");

const employeeCompanyScore =
  document.getElementById("employeeCompanyScore");

const employeeTraitList =
  document.getElementById("employeeTraitList");

const employeeSkillRedBar =
  document.getElementById("employeeSkillRedBar");

const employeeSkillYellowBar =
  document.getElementById("employeeSkillYellowBar");

const employeeSkillBlueBar =
  document.getElementById("employeeSkillBlueBar");

const employeeSkillPinkBar =
  document.getElementById("employeeSkillPinkBar");

const employeeSkillRedValue =
  document.getElementById("employeeSkillRedValue");

const employeeSkillYellowValue =
  document.getElementById("employeeSkillYellowValue");

const employeeSkillBlueValue =
  document.getElementById("employeeSkillBlueValue");

const employeeSkillPinkValue =
  document.getElementById("employeeSkillPinkValue");

const mockEmployeeScanButton =
  document.getElementById("mockEmployeeScanButton");

const registerEmployeeButton =
  document.getElementById("registerEmployeeButton");

const cancelEmployeeButton =
  document.getElementById("cancelEmployeeButton");

const finishEmployeeButton =
  document.getElementById("finishEmployeeButton");

const turnDisplay =
  document.getElementById("turnDisplay");

const eventImage =
  document.getElementById("eventImage");

const eventTitle =
  document.getElementById("eventTitle");

const eventStatusText =
  document.getElementById("eventStatusText");

const nextTurnButton =
  document.getElementById("nextTurnButton");

const performanceRanking =
  document.getElementById("performanceRanking");

const whiteRanking =
  document.getElementById("whiteRanking");

const companyStats =
  document.getElementById("companyStats");

const gameAdvice =
  document.getElementById("gameAdvice");

const resultRanking =
  document.getElementById("resultRanking");

const restartButton =
  document.getElementById("restartButton");

const eventModal =
  document.getElementById("eventModal");

const eventModalCompany =
  document.getElementById("eventModalCompany");

const eventModalTitle =
  document.getElementById("eventModalTitle");

const eventModalMessage =
  document.getElementById("eventModalMessage");

const eventModalOptions =
  document.getElementById("eventModalOptions");

const eventModalEmployeePreview =
  document.getElementById("eventModalEmployeePreview");

const eventModalEmployeeImage =
  document.getElementById("eventModalEmployeeImage");

const eventModalEmployeeName =
  document.getElementById("eventModalEmployeeName");

const eventModalEmployeeDetail =
  document.getElementById("eventModalEmployeeDetail");

const nfcMessage =
  document.getElementById("nfcMessage");


/* =========================================================
   状態管理
========================================================= */

let storyIndex = 0;
let playerCount = 2;

let currentCompanyPlayerIndex = 0;
let currentEmployeePlayerIndex = 0;

let selectedEmployee = null;

let currentTurn = 1;
let currentEventIndex = 0;

let turnEvents = [];
let eventRunning = false;

let messageTimer = null;

let players = [];


/* =========================================================
   共通処理
========================================================= */

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle(
      "active",
      screen.id === screenId
    );
  });
}


function getRandomItem(array) {
  if (!array.length) {
    return null;
  }

  const index =
    Math.floor(Math.random() * array.length);

  return array[index];
}


function shuffleArray(array) {
  const copiedArray = [...array];

  for (
    let index = copiedArray.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(Math.random() * (index + 1));

    [
      copiedArray[index],
      copiedArray[randomIndex]
    ] = [
      copiedArray[randomIndex],
      copiedArray[index]
    ];
  }

  return copiedArray;
}


function cloneEmployee(employee) {
  return {
    ...employee,
    skills: {
      ...employee.skills
    }
  };
}


function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}
function showMessage(message, type = "normal") {
  window.clearTimeout(messageTimer);

  nfcMessage.textContent = message;

  nfcMessage.classList.remove(
    "nfc-message--success",
    "nfc-message--error"
  );

  if (type === "success") {
    nfcMessage.classList.add(
      "nfc-message--success"
    );
  }

  if (type === "error") {
    nfcMessage.classList.add(
      "nfc-message--error"
    );
  }

  nfcMessage.classList.add("is-visible");

  messageTimer = window.setTimeout(() => {
    nfcMessage.classList.remove("is-visible");
  }, 2200);
}


function createPlayers() {
  players = Array.from(
    {
      length: playerCount
    },
    (_, index) => ({
      id: index + 1,
      name: `プレイヤー${index + 1}`,
      company: null,
      employees: [],
      performanceBonus: 0,
      whiteStars: 0,
      currentPerformance: 0,
      previousPerformance: 0
    })
  );
}


function getDietLabel(diet) {
  const labels = {
    grass: "草食",
    meat: "肉食",
    omnivore: "雑食"
  };

  return labels[diet] || diet;
}


function getHabitatLabel(habitat) {
  const labels = {
    land: "陸",
    sea: "海"
  };

  return labels[habitat] || habitat;
}


function getEmployeeContribution(
  employee,
  company
) {
  if (!employee || !company) {
    return 0;
  }

  return company.colors.reduce(
    (total, color) => {
      return (
        total +
        Number(employee.skills[color] || 0)
      );
    },
    0
  );
}


function calculateCompanyPerformance(player) {
  if (!player.company) {
    return 0;
  }

  const employeeScore =
    player.employees.reduce(
      (total, employee) => {
        return (
          total +
          getEmployeeContribution(
            employee,
            player.company
          )
        );
      },
      0
    );

  return Math.max(
    0,
    employeeScore + player.performanceBonus
  );
}


function updateAllPerformance() {
  players.forEach((player) => {
    player.previousPerformance =
      player.currentPerformance;

    player.currentPerformance =
      calculateCompanyPerformance(player);
  });
}


function getPerformanceRanking() {
  return [...players].sort(
    (playerA, playerB) => {
      if (
        playerB.currentPerformance !==
        playerA.currentPerformance
      ) {
        return (
          playerB.currentPerformance -
          playerA.currentPerformance
        );
      }

      return (
        playerB.whiteStars -
        playerA.whiteStars
      );
    }
  );
}


function getWhiteRanking() {
  return [...players].sort(
    (playerA, playerB) => {
      if (
        playerB.whiteStars !==
        playerA.whiteStars
      ) {
        return (
          playerB.whiteStars -
          playerA.whiteStars
        );
      }

      return (
        playerB.currentPerformance -
        playerA.currentPerformance
      );
    }
  );
}


function getFinalScore(player) {
  return (
    player.currentPerformance +
    player.whiteStars * 3
  );
}


function getFinalRanking() {
  return [...players].sort(
    (playerA, playerB) => {
      return (
        getFinalScore(playerB) -
        getFinalScore(playerA)
      );
    }
  );
}


function getStarText(count) {
  const safeCount = Math.max(
    0,
    Math.min(10, Number(count) || 0)
  );

  if (safeCount === 0) {
    return "☆";
  }

  return "★".repeat(safeCount);
}


/* =========================================================
   ストーリー画面
========================================================= */

const STORY_IMAGES = [
  "images/story-1.png",
  "images/story-2.png",
  "images/story-3.png"
];


function renderStory() {
  storyImage.src = STORY_IMAGES[storyIndex];

  storyImage.alt =
    `ストーリー${storyIndex + 1}`;

  const isLastStory =
    storyIndex === STORY_IMAGES.length - 1;

  storyActionButton.textContent =
    isLastStory ? "START" : "TAP";

  storyActionButton.classList.toggle(
    "is-start",
    isLastStory
  );
}
function goToNextStory() {
  if (
    storyIndex <
    STORY_IMAGES.length - 1
  ) {
    storyIndex += 1;
    renderStory();
    return;
  }

  showScreen("playerSelectScreen");
  renderPlayerSelection();
}


/* =========================================================
   プレイヤー人数選択
========================================================= */

function renderPlayerSelection() {
  playerNumber.textContent =
    String(playerCount);

  playerIcons.innerHTML = "";

  for (
    let index = 0;
    index < playerCount;
    index += 1
  ) {
    const image =
      document.createElement("img");

    image.src = "images/player-1.png";
    image.alt = "";
    image.className = "player-icon";

    playerIcons.appendChild(image);
  }

  minusButton.disabled =
    playerCount <= MIN_PLAYERS;

  plusButton.disabled =
    playerCount >= MAX_PLAYERS;
}


function decreasePlayerCount() {
  if (playerCount <= MIN_PLAYERS) {
    return;
  }

  playerCount -= 1;
  renderPlayerSelection();
}


function increasePlayerCount() {
  if (playerCount >= MAX_PLAYERS) {
    return;
  }

  playerCount += 1;
  renderPlayerSelection();
}


function confirmPlayerCount() {
  createPlayers();

  currentCompanyPlayerIndex = 0;

  showScreen("companyScreen");
  renderCompanyRegistration();
}


/* =========================================================
   会社登録
========================================================= */

function renderCompanyRegistration() {
  const currentPlayer =
    players[currentCompanyPlayerIndex];

  companyCurrentPlayer.textContent =
    currentPlayer
      ? currentPlayer.name
      : "";

  companyList.innerHTML = "";

  players.forEach((player, index) => {
    const card =
      document.createElement("article");

    const playerLabel =
      document.createElement("p");

    const companyName =
      document.createElement("p");

    card.className = "company-card";

    if (index === currentCompanyPlayerIndex) {
      card.classList.add("is-current");
    }

    if (player.company) {
      card.classList.add("is-complete");
    }

    playerLabel.className =
      "company-card-player";

    playerLabel.textContent =
      player.name;

    companyName.className =
      "company-card-name";

    if (player.company) {
      companyName.textContent =
        player.company.name;
    } else {
      companyName.textContent =
        "未登録";

      companyName.classList.add(
        "is-unregistered"
      );
    }

    card.append(
      playerLabel,
      companyName
    );

    companyList.appendChild(card);
  });

  companyPreviewArea.classList.add(
    "hidden"
  );
}


function renderCompanyPreview(company) {
  companyPreviewArea.classList.remove(
    "hidden"
  );

  companyPreviewImage.src =
    company.image;

  companyPreviewImage.alt =
    company.name;

  companyPreviewName.textContent =
    company.name;

  companyPreviewIndustry.textContent =
    company.industry;

  companyScoreColorList.innerHTML = "";

  company.colors.forEach((color) => {
    const chip =
      document.createElement("div");

    const dot =
      document.createElement("span");

    const label =
      document.createElement("span");

    chip.className =
      "company-score-color-chip";

    dot.className =
      "company-score-color-dot " +
      `company-score-color-dot--${color}`;

    label.textContent =
      `${SKILL_SHORT_LABELS[color]}・${SKILL_LABELS[color]}`;

    chip.append(dot, label);

    companyScoreColorList.appendChild(chip);
  });
}
function receiveCompany(companyId) {
  const company = COMPANY_DATA.find(
    (item) => item.id === companyId
  );

  if (!company) {
    showMessage(
      "会社カードを確認できませんでした。",
      "error"
    );
    return;
  }

  const alreadyRegistered =
    players.some((player) => {
      return (
        player.company &&
        player.company.id === company.id
      );
    });

  if (alreadyRegistered) {
    showMessage(
      "この会社カードはすでに登録されています。",
      "error"
    );
    return;
  }

  players[currentCompanyPlayerIndex].company = {
    ...company,
    colors: [...company.colors]
  };

  renderCompanyRegistration();
  renderCompanyPreview(company);

  showMessage(
    `${company.name}を登録しました。`,
    "success"
  );

  window.setTimeout(() => {
    currentCompanyPlayerIndex += 1;

    if (
      currentCompanyPlayerIndex >=
      playerCount
    ) {
      startEmployeeRegistration();
      return;
    }

    renderCompanyRegistration();
  }, 900);
}


function mockCompanyScan() {
  const usedCompanyIds =
    players
      .filter((player) => player.company)
      .map((player) => player.company.id);

  const candidates =
    COMPANY_DATA.filter((company) => {
      return !usedCompanyIds.includes(
        company.id
      );
    });

  const company =
    getRandomItem(candidates);

  if (!company) {
    showMessage(
      "登録できる会社がありません。",
      "error"
    );
    return;
  }

  receiveCompany(company.id);
}


/* =========================================================
   社員登録
========================================================= */

function startEmployeeRegistration() {
  currentEmployeePlayerIndex = 0;
  selectedEmployee = null;

  showScreen("employeeScreen");
  renderEmployeeRegistration();
}


function renderEmployeeRegistration() {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  employeeCurrentPlayer.textContent =
    `${currentPlayer.name}｜${currentPlayer.company.name}`;

  renderEmployeeSlots();

  if (selectedEmployee) {
    renderEmployeePreview(
      selectedEmployee
    );
  } else {
    clearEmployeePreview();
  }

  const registrationComplete =
    currentPlayer.employees.length >=
    MAX_EMPLOYEES;

  finishEmployeeButton.classList.toggle(
    "hidden",
    !registrationComplete
  );

  mockEmployeeScanButton.disabled =
    registrationComplete;

  registerEmployeeButton.disabled =
    !selectedEmployee ||
    registrationComplete;
}


function renderEmployeeSlots() {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  employeeSlots.innerHTML = "";

  for (
    let index = 0;
    index < MAX_EMPLOYEES;
    index += 1
  ) {
    const slot =
      document.createElement("div");

    const employee =
      currentPlayer.employees[index];

    slot.className = "employee-slot";

    if (employee) {
      const image =
        document.createElement("img");

      slot.classList.add(
        "is-registered"
      );

      image.src = employee.image;
      image.alt = employee.name;

      slot.appendChild(image);
    }

    employeeSlots.appendChild(slot);
  }
}


function setSkillPreview(
  value,
  barElement,
  valueElement
) {
  const safeValue = Math.max(
    0,
    Math.min(5, Number(value) || 0)
  );

  barElement.style.width =
    `${safeValue * 20}%`;

  valueElement.textContent =
    String(safeValue);
}
function renderEmployeePreview(employee) {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  employeePreview.src =
    employee.image;

  employeePreview.alt =
    employee.name;

  employeePreview.classList.remove(
    "is-empty"
  );

  employeePreviewName.textContent =
    employee.name;

  employeeSkillPreview.classList.remove(
    "hidden"
  );

  setSkillPreview(
    employee.skills.red,
    employeeSkillRedBar,
    employeeSkillRedValue
  );

  setSkillPreview(
    employee.skills.yellow,
    employeeSkillYellowBar,
    employeeSkillYellowValue
  );

  setSkillPreview(
    employee.skills.blue,
    employeeSkillBlueBar,
    employeeSkillBlueValue
  );

  setSkillPreview(
    employee.skills.pink,
    employeeSkillPinkBar,
    employeeSkillPinkValue
  );

  const contribution =
    getEmployeeContribution(
      employee,
      currentPlayer.company
    );

  employeeCompanyScore.textContent =
    `＋${contribution}pt`;

  employeeTraitList.innerHTML = "";

  const traits = [
    getDietLabel(employee.diet),
    getHabitatLabel(employee.habitat)
  ];

  if (employee.parentalLeave) {
    traits.push("育休対象");
  }

  if (employee.hibernation) {
    traits.push("冬眠");
  }

  if (employee.powerHarassment) {
    traits.push(
      employee.harassmentType ||
      "パワハラ注意"
    );
  }

  traits.forEach((trait) => {
    const chip =
      document.createElement("span");

    chip.className =
      "employee-trait-chip";

    chip.textContent = trait;

    employeeTraitList.appendChild(chip);
  });

  registerEmployeeButton.disabled =
    false;
}


function clearEmployeePreview() {
  selectedEmployee = null;

  employeePreview.removeAttribute("src");
  employeePreview.alt = "";

  employeePreview.classList.add(
    "is-empty"
  );

  employeePreviewName.textContent =
    "社員カードを読み込んでください";

  employeeSkillPreview.classList.add(
    "hidden"
  );

  employeeCompanyScore.textContent =
    "＋0pt";

  employeeSkillRedBar.style.width = "0%";
  employeeSkillYellowBar.style.width = "0%";
  employeeSkillBlueBar.style.width = "0%";
  employeeSkillPinkBar.style.width = "0%";

  employeeSkillRedValue.textContent = "0";
  employeeSkillYellowValue.textContent = "0";
  employeeSkillBlueValue.textContent = "0";
  employeeSkillPinkValue.textContent = "0";

  employeeTraitList.innerHTML = "";

  registerEmployeeButton.disabled = true;
}


function receiveEmployee(employeeId) {
  const sourceEmployee =
    EMPLOYEE_DATA.find(
      (employee) =>
        employee.id === employeeId
    );

  if (!sourceEmployee) {
    showMessage(
      "社員カードを確認できませんでした。",
      "error"
    );

    return;
  }

  const currentPlayer =
    players[currentEmployeePlayerIndex];

  if (
    currentPlayer.employees.length >=
    MAX_EMPLOYEES
  ) {
    showMessage(
      "社員は4人まで登録できます。",
      "error"
    );

    return;
  }

  const alreadyRegistered =
    players.some((player) => {
      return player.employees.some(
        (employee) =>
          employee.id === sourceEmployee.id
      );
    });

  if (alreadyRegistered) {
    showMessage(
      "この社員はすでに登録されています。",
      "error"
    );

    return;
  }
     selectedEmployee =
    cloneEmployee(sourceEmployee);

  renderEmployeePreview(
    selectedEmployee
  );

  showMessage(
    `${selectedEmployee.name}を読み込みました。`,
    "success"
  );
}


function mockEmployeeScan() {
  const usedEmployeeIds =
    players.flatMap((player) =>
      player.employees.map(
        (employee) => employee.id
      )
    );

  const candidates =
    EMPLOYEE_DATA.filter(
      (employee) =>
        !usedEmployeeIds.includes(
          employee.id
        )
    );

  const employee =
    getRandomItem(candidates);

  if (!employee) {
    showMessage(
      "登録できる社員がありません。",
      "error"
    );

    return;
  }

  receiveEmployee(employee.id);
}


function registerEmployee() {
  if (!selectedEmployee) {
    return;
  }

  const currentPlayer =
    players[currentEmployeePlayerIndex];

  currentPlayer.employees.push(
    selectedEmployee
  );

  showMessage(
    `${selectedEmployee.name}を登録しました。`,
    "success"
  );

  clearEmployeePreview();
  renderEmployeeRegistration();
}


function cancelEmployeeRegistration() {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  if (selectedEmployee) {
    clearEmployeePreview();
    return;
  }

  if (
    currentPlayer.employees.length === 0
  ) {
    return;
  }

  currentPlayer.employees.pop();

  renderEmployeeRegistration();

  showMessage(
    "最後の社員登録を取り消しました。"
  );
}


function finishEmployeeRegistration() {
  currentEmployeePlayerIndex += 1;

  if (
    currentEmployeePlayerIndex >=
    playerCount
  ) {
    startGame();
    return;
  }

  selectedEmployee = null;
  renderEmployeeRegistration();
}


/* =========================================================
   ゲーム開始
========================================================= */

function createTurnEvents() {
  const childcareEvent =
    EVENT_DATA.find(
      (event) =>
        event.id === "childcareleave"
    );

  const otherEvents =
    EVENT_DATA.filter(
      (event) =>
        event.id !== "childcareleave"
    );

  turnEvents = [
    getRandomItem(otherEvents),
    childcareEvent,
    ...shuffleArray(otherEvents).slice(0, 3)
  ];
}
function startGame() {
  currentTurn = 1;
  currentEventIndex = 0;

  createTurnEvents();
  updateAllPerformance();

  showScreen("gameScreen");
  renderTurn();
}


function renderTurn() {
  updateAllPerformance();

  const event =
    turnEvents[currentEventIndex];

  turnDisplay.textContent =
    `TURN ${currentTurn} / 5`;

  eventImage.src = event.image;
  eventImage.alt = event.title;

  eventTitle.textContent =
    event.title;

  eventStatusText.textContent =
    event.description;

  renderPerformanceRanking();
  renderWhiteRanking();
  renderCompanyStats();
  renderAdvice();
}


function renderPerformanceRanking() {
  performanceRanking.innerHTML = "";

  getPerformanceRanking().forEach(
    (player, index) => {
      const item =
        document.createElement("div");

      item.className =
        "ranking-item";

      const changed =
        player.currentPerformance !==
        player.previousPerformance;

      item.innerHTML = `
        <span class="ranking-rank">
          ${index + 1}
        </span>

        <span class="ranking-name">
          ${player.name}
        </span>

        <span class="ranking-score ${
          changed ? "is-blink" : ""
        }">
          ${player.currentPerformance}
        </span>
      `;

      performanceRanking.appendChild(
        item
      );
    }
  );
}


function renderWhiteRanking() {
  whiteRanking.innerHTML = "";

  getWhiteRanking().forEach(
    (player, index) => {
      const item =
        document.createElement("div");

      item.className =
        "ranking-item";

      item.innerHTML = `
        <span class="ranking-rank">
          ${index + 1}
        </span>

        <span class="ranking-name">
          ${player.name}
        </span>

        <span class="ranking-score">
          ${getStarText(
            player.whiteStars
          )}
        </span>
      `;

      whiteRanking.appendChild(item);
    }
  );
}


function renderCompanyStats() {
  companyStats.innerHTML = "";

  players.forEach((player) => {
    const card =
      document.createElement("div");

    card.className =
      "company-status-card";

    card.innerHTML = `
      <div class="company-status-header">
        <img
          src="${player.company.image}"
          alt="${player.company.name}"
        >

        <div>
          <p>${player.name}</p>
          <strong>
            ${player.company.name}
          </strong>
        </div>
      </div>

      <div class="company-status-value">
        業績：
        ${player.currentPerformance}
      </div>

      <div class="company-status-value">
        ホワイト度：
        ${getStarText(
          player.whiteStars
        )}
      </div>
    `;

    companyStats.appendChild(card);
  });
}
function renderAdvice() {
  const leader =
    getPerformanceRanking()[0];

  gameAdvice.textContent =
    `${leader.name}が現在トップです！`;
}


/* =========================================================
   イベント処理
========================================================= */

async function executeCurrentEvent() {
  if (eventRunning) {
    return;
  }

  eventRunning = true;

  nextTurnButton.disabled = true;

  const event =
    turnEvents[currentEventIndex];

  for (const player of players) {
    await applyEventToPlayer(
      player,
      event
    );
  }

  updateAllPerformance();

  renderTurn();

  eventRunning = false;

  nextTurnButton.disabled = false;
}


async function applyEventToPlayer(
  player,
  event
) {
  switch (event.id) {
    case "childcareleave":
      await applyChildcareLeave(
        player,
        event
      );
      break;

    case "training":
      await applyTraining(
        player,
        event
      );
      break;

    case "headhunting":
      await applyHeadhunting(
        player,
        event
      );
      break;

    case "everyone":
      await applyEveryone(
        player,
        event
      );
      break;

    case "firestorm":
      await applyFirestorm(
        player,
        event
      );
      break;

    case "hibernation":
      await applyHibernation(
        player,
        event
      );
      break;

    case "powerharassment":
      await applyPowerHarassment(
        player,
        event
      );
      break;

    case "strike":
      await applyStrike(
        player,
        event
      );
      break;

    case "notalone":
      await applyNotAlone(
        player,
        event
      );
      break;

    default:
      break;
  }
}
async function showEventModal({
  player,
  event,
  title,
  message,
  employee = null,
  options = ["OK"]
}) {
  return new Promise((resolve) => {
    eventModalCompany.textContent =
      `${player.name}｜${player.company.name}`;

    eventModalTitle.textContent = title;
    eventModalMessage.textContent = message;

    eventModalOptions.innerHTML = "";

    if (employee) {
      eventModalEmployeePreview.classList.remove(
        "hidden"
      );

      eventModalEmployeeImage.src =
        employee.image;

      eventModalEmployeeImage.alt =
        employee.name;

      eventModalEmployeeName.textContent =
        employee.name;

      eventModalEmployeeDetail.textContent =
        `貢献度 ${getEmployeeContribution(
          employee,
          player.company
        )}`;
    } else {
      eventModalEmployeePreview.classList.add(
        "hidden"
      );
    }

    options.forEach((label, index) => {
      const button =
        document.createElement("button");

      button.type = "button";
      button.className =
        "event-modal-button";

      button.textContent = label;

      button.addEventListener(
        "click",
        () => {
          eventModal.classList.add(
            "hidden"
          );

          resolve(index);
        },
        { once: true }
      );

      eventModalOptions.appendChild(
        button
      );
    });

    eventModal.classList.remove("hidden");
  });
}


async function applyChildcareLeave(
  player,
  event
) {
  const candidates =
    player.employees.filter(
      (employee) =>
        employee.parentalLeave
    );

  if (!candidates.length) {
    return;
  }

  const employee =
    getRandomItem(candidates);

  player.performanceBonus -=
    getEmployeeContribution(
      employee,
      player.company
    );

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "育休取得のため一時的に業績が下がりました。",
    employee
  });
}


async function applyTraining(
  player,
  event
) {
  player.performanceBonus += 2;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "研修の成果で業績がアップしました。"
  });
}
async function applyHeadhunting(
  player,
  event
) {
  if (!player.employees.length) {
    return;
  }

  const employee =
    getRandomItem(player.employees);

  player.performanceBonus += 3;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      `${employee.name}が注目され、会社の評価が上がりました。`,
    employee
  });
}


async function applyEveryone(
  player,
  event
) {
  player.whiteStars += 1;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "社員全員の協力でホワイト度が上昇しました。"
  });
}


async function applyFirestorm(
  player,
  event
) {
  player.performanceBonus -= 2;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "トラブル対応で業績が一時的に低下しました。"
  });
}


async function applyHibernation(
  player,
  event
) {
  const candidates =
    player.employees.filter(
      (employee) =>
        employee.hibernation
    );

  if (!candidates.length) {
    return;
  }

  const employee =
    getRandomItem(candidates);

  player.performanceBonus -= 1;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      `${employee.name}は冬眠中です。`,
    employee
  });
}
async function applyPowerHarassment(
  player,
  event
) {
  const candidates =
    player.employees.filter(
      (employee) =>
        employee.powerHarassment
    );

  if (!candidates.length) {
    return;
  }

  const employee =
    getRandomItem(candidates);

  player.whiteStars = Math.max(
    0,
    player.whiteStars - 1
  );

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      `${employee.name}の言動によりホワイト度が下がりました。`,
    employee
  });
}


async function applyStrike(
  player,
  event
) {
  player.performanceBonus -= 3;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "ストライキが発生し、業績が大きく低下しました。"
  });
}


async function applyNotAlone(
  player,
  event
) {
  player.whiteStars += 2;

  await showEventModal({
    player,
    event,
    title: event.title,
    message:
      "助け合いによって働きやすい会社になりました。"
  });
}


/* =========================================================
   ターン進行
========================================================= */

async function nextTurn() {
  if (eventRunning) {
    return;
  }

  await executeCurrentEvent();

  if (currentTurn >= 5) {
    showResult();
    return;
  }

  currentTurn += 1;
  currentEventIndex += 1;

  renderTurn();
}


/* =========================================================
   リザルト
========================================================= */

function showResult() {
  updateAllPerformance();

  showScreen("resultScreen");

  resultRanking.innerHTML = "";

  getFinalRanking().forEach(
    (player, index) => {
      const item =
        document.createElement("div");

      item.className =
        "result-ranking-item";

      item.innerHTML = `
        <span class="result-rank">
          ${index + 1}
        </span>

        <span class="result-name">
          ${player.name}
        </span>

        <span class="result-score">
          ${getFinalScore(player)}
        </span>
      `;

      resultRanking.appendChild(item);
    }
  );
}
function restartGame() {
  storyIndex = 0;

  playerCount = 2;

  currentCompanyPlayerIndex = 0;
  currentEmployeePlayerIndex = 0;

  currentTurn = 1;
  currentEventIndex = 0;

  selectedEmployee = null;

  turnEvents = [];
  players = [];

  renderStory();

  showScreen("storyScreen");
}


/* =========================================================
   NFC連携（Swiftから呼び出す）
========================================================= */

window.NFCBridge = {
  receiveCompany(companyId) {
    receiveCompany(companyId);
  },

  receiveEmployee(employeeId) {
    receiveEmployee(employeeId);
  }
};


/* =========================================================
   イベント登録
========================================================= */

storyActionButton.addEventListener(
  "click",
  goToNextStory
);

minusButton.addEventListener(
  "click",
  decreasePlayerCount
);

plusButton.addEventListener(
  "click",
  increasePlayerCount
);

playerConfirmButton.addEventListener(
  "click",
  confirmPlayerCount
);

mockCompanyScanButton.addEventListener(
  "click",
  mockCompanyScan
);

mockEmployeeScanButton.addEventListener(
  "click",
  mockEmployeeScan
);

registerEmployeeButton.addEventListener(
  "click",
  registerEmployee
);

cancelEmployeeButton.addEventListener(
  "click",
  cancelEmployeeRegistration
);

finishEmployeeButton.addEventListener(
  "click",
  finishEmployeeRegistration
);

nextTurnButton.addEventListener(
  "click",
  nextTurn
);

restartButton.addEventListener(
  "click",
  restartGame
);


/* =========================================================
   初期化
========================================================= */

renderStory();

renderPlayerSelection();

showScreen("storyScreen");
