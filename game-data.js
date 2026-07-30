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


/* ---------------------------------------------------------
   隠しステータス設定

   社員登録画面で「育休対象」「パワハラ」を
   表示するかどうかを設定します。

   false ＝ 登録時には表示しない
   true  ＝ 登録時にも表示する

   データ自体は保持されるため、
   イベントの判定には影響しません。
--------------------------------------------------------- */

const SHOW_PARENTAL_LEAVE_TRAIT = false;
const SHOW_HARASSMENT_TRAIT = false;


/* =========================================================
   会社データ
========================================================= */

// COMPANY_DATA は game-data.js で定義しています。


/* =========================================================
   社員データ

   skillsの色

   red    ：体力
   yellow ：コミュ力
   blue   ：知力
   pink   ：器用さ
========================================================= */

// EMPLOYEE_DATA は game-data.js で定義しています。


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

const screens =
  document.querySelectorAll(".screen");

const storyNextButton =
  document.getElementById(
    "storyNextButton"
  );

const storyImage =
  document.getElementById(
    "storyImage"
  );

const storyActionButton =
  document.getElementById(
    "storyActionButton"
  );

const playerIcons =
  document.getElementById(
    "playerIcons"
  );

const playerNumber =
  document.getElementById(
    "playerNumber"
  );

const minusButton =
  document.getElementById(
    "minusButton"
  );

const plusButton =
  document.getElementById(
    "plusButton"
  );

const confirmPlayersButton =
  document.getElementById(
    "confirmPlayersButton"
  );

const companyCurrentPlayer =
  document.getElementById(
    "companyCurrentPlayer"
  );

const companyList =
  document.getElementById(
    "companyList"
  );

const companyPreviewArea =
  document.getElementById(
    "companyPreviewArea"
  );

const companyPreviewImage =
  document.getElementById(
    "companyPreviewImage"
  );

const companyPreviewName =
  document.getElementById(
    "companyPreviewName"
  );

const companyPreviewIndustry =
  document.getElementById(
    "companyPreviewIndustry"
  );

const companyScoreColorList =
  document.getElementById(
    "companyScoreColorList"
  );

const mockCompanyScanButton =
  document.getElementById(
    "mockCompanyScanButton"
  );

const employeeCurrentPlayer =
  document.getElementById(
    "employeeCurrentPlayer"
  );

const employeeSlots =
  document.getElementById(
    "employeeSlots"
  );

const employeePreview =
  document.getElementById(
    "employeePreview"
  );

const employeePreviewName =
  document.getElementById(
    "employeePreviewName"
  );

const employeeSkillPreview =
  document.getElementById(
    "employeeSkillPreview"
  );

const employeeCompanyScore =
  document.getElementById(
    "employeeCompanyScore"
  );

const employeeTraitList =
  document.getElementById(
    "employeeTraitList"
  );

const employeeSkillRedBar =
  document.getElementById(
    "employeeSkillRedBar"
  );

const employeeSkillYellowBar =
  document.getElementById(
    "employeeSkillYellowBar"
  );

const employeeSkillBlueBar =
  document.getElementById(
    "employeeSkillBlueBar"
  );

const employeeSkillPinkBar =
  document.getElementById(
    "employeeSkillPinkBar"
  );

const employeeSkillRedValue =
  document.getElementById(
    "employeeSkillRedValue"
  );

const employeeSkillYellowValue =
  document.getElementById(
    "employeeSkillYellowValue"
  );

const employeeSkillBlueValue =
  document.getElementById(
    "employeeSkillBlueValue"
  );

const employeeSkillPinkValue =
  document.getElementById(
    "employeeSkillPinkValue"
  );
const mockEmployeeScanButton =
  document.getElementById(
    "mockEmployeeScanButton"
  );

const registerEmployeeButton =
  document.getElementById(
    "registerEmployeeButton"
  );

const cancelEmployeeButton =
  document.getElementById(
    "cancelEmployeeButton"
  );

const finishEmployeeButton =
  document.getElementById(
    "finishEmployeeButton"
  );

const turnDisplay =
  document.getElementById(
    "turnDisplay"
  );

const eventImage =
  document.getElementById(
    "eventImage"
  );

const eventTitle =
  document.getElementById(
    "eventTitle"
  );

const eventStatusText =
  document.getElementById(
    "eventStatusText"
  );

const nextTurnButton =
  document.getElementById(
    "nextTurnButton"
  );

const performanceRanking =
  document.getElementById(
    "performanceRanking"
  );

const whiteRanking =
  document.getElementById(
    "whiteRanking"
  );

const companyStats =
  document.getElementById(
    "companyStats"
  );

const gameAdvice =
  document.getElementById(
    "gameAdvice"
  );

const resultRanking =
  document.getElementById(
    "resultRanking"
  );

const restartButton =
  document.getElementById(
    "restartButton"
  );

const eventModal =
  document.getElementById(
    "eventModal"
  );

const eventModalCompany =
  document.getElementById(
    "eventModalCompany"
  );

const eventModalTitle =
  document.getElementById(
    "eventModalTitle"
  );

const eventModalMessage =
  document.getElementById(
    "eventModalMessage"
  );

const eventModalOptions =
  document.getElementById(
    "eventModalOptions"
  );

const eventModalEmployeePreview =
  document.getElementById(
    "eventModalEmployeePreview"
  );

const eventModalEmployeeImage =
  document.getElementById(
    "eventModalEmployeeImage"
  );

const eventModalEmployeeName =
  document.getElementById(
    "eventModalEmployeeName"
  );

const eventModalEmployeeDetail =
  document.getElementById(
    "eventModalEmployeeDetail"
  );

const nfcMessage =
  document.getElementById(
    "nfcMessage"
  );


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
      `${SKILL_SHORT_LABELS[color]}・` +
      SKILL_LABELS[color];

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
    `${currentPlayer.name}｜` +
    currentPlayer.company.name;

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
    `${selectedEmployee.name}を読み取りました。`,
    "success"
  );
}


function mockEmployeeScan() {
  const usedEmployeeIds =
    players.flatMap((player) => {
      return player.employees.map(
        (employee) => employee.id
      );
           });

  const candidates =
    EMPLOYEE_DATA.filter(
      (employee) => {
        return !usedEmployeeIds.includes(
          employee.id
        );
      }
    );

  const employee =
    getRandomItem(candidates);

  if (!employee) {
    showMessage(
      "登録できる社員がいません。",
      "error"
    );

    return;
  }

  receiveEmployee(employee.id);
}


function registerSelectedEmployee() {
  if (!selectedEmployee) {
    showMessage(
      "先に社員カードを読み取ってください。",
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

  const employeeName =
    selectedEmployee.name;

  currentPlayer.employees.push(
    selectedEmployee
  );

  selectedEmployee = null;

  renderEmployeeRegistration();

  showMessage(
    `${employeeName}を登録しました。`,
    "success"
  );
}


function cancelSelectedEmployee() {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  if (selectedEmployee) {
    const employeeName =
      selectedEmployee.name;

    clearEmployeePreview();
    renderEmployeeRegistration();

    showMessage(
      `${employeeName}の読み取りを取り消しました。`
    );

    return;
  }

  if (
    currentPlayer.employees.length > 0
  ) {
    const removedEmployee =
      currentPlayer.employees.pop();

    renderEmployeeRegistration();

    showMessage(
      `${removedEmployee.name}の登録を取り消しました。`
    );

    return;
  }

  showMessage(
    "取り消せる社員がいません。",
    "error"
  );
}


function finishCurrentEmployeeRegistration() {
  const currentPlayer =
    players[currentEmployeePlayerIndex];

  if (
    currentPlayer.employees.length <
    MAX_EMPLOYEES
  ) {
    showMessage(
      "社員を4人登録してください。",
      "error"
    );

    return;
  }

  currentEmployeePlayerIndex += 1;
  selectedEmployee = null;

  if (
    currentEmployeePlayerIndex >=
    playerCount
  ) {
    startGame();
    return;
  }

  renderEmployeeRegistration();
}


/* =========================================================
   ゲーム開始
========================================================= */

function createTurnEvents() {
  const childcareEvent =
    EVENT_DATA.find(
      (event) =>
        event.id === "childcare"
    );

  const otherEvents =
    shuffleArray(
      EVENT_DATA.filter(
        (event) =>
          event.id !== "childcare"
      )
    ).slice(0, 4);

  turnEvents = [
    otherEvents[0],
    childcareEvent,
    otherEvents[1],
    otherEvents[2],
    otherEvents[3]
  ];
}


function startGame() {
  currentTurn = 1;
  currentEventIndex = 0;
  eventRunning = false;

  players.forEach((player) => {
    player.performanceBonus = 0;
    player.whiteStars = 0;

    player.currentPerformance =
      calculateCompanyPerformance(player);

    player.previousPerformance =
      player.currentPerformance;
  });

  createTurnEvents();

  showScreen("gameScreen");
  renderGame();
}
function renderGame() {
  updateAllPerformance();

  turnDisplay.textContent =
    `${currentTurn}/${TOTAL_TURNS}`;

  const event =
    turnEvents[currentEventIndex];

  if (event) {
    eventImage.src = event.image;
    eventImage.alt = event.title;

    eventTitle.textContent =
      event.title;

    eventStatusText.textContent =
      event.description;
  }

  nextTurnButton.disabled =
    eventRunning;

  nextTurnButton.textContent =
    eventRunning
      ? "イベント処理中"
      : "イベントを実行";

  renderRankings();
  renderCompanyStats();
}


/* =========================================================
   ランキング
========================================================= */

function createRankingItem(
  index,
  companyName,
  value
) {
  const item =
    document.createElement("li");

  const nameElement =
    document.createElement("span");

  const valueElement =
    document.createElement("span");

  item.className = "ranking-item";

  nameElement.className =
    "ranking-company-name";

  valueElement.className =
    "ranking-value";

  nameElement.textContent =
    `${index + 1}位 ${companyName}`;

  valueElement.textContent =
    value;

  item.append(
    nameElement,
    valueElement
  );

  return item;
}


function renderRankings() {
  performanceRanking.innerHTML = "";
  whiteRanking.innerHTML = "";

  getPerformanceRanking().forEach(
    (player, index) => {
      performanceRanking.appendChild(
        createRankingItem(
          index,
          player.company.name,
          `${player.currentPerformance}pt`
        )
      );
    }
  );

  getWhiteRanking().forEach(
    (player, index) => {
      whiteRanking.appendChild(
        createRankingItem(
          index,
          player.company.name,
          `${getStarText(player.whiteStars)} ${player.whiteStars}`
        )
      );
    }
  );
}


/* =========================================================
   会社ステータス
========================================================= */

function createStatRow(
  label,
  value,
  maximum
) {
  const row =
    document.createElement("div");

  const labelElement =
    document.createElement("span");

  const track =
    document.createElement("div");

  const fill =
    document.createElement("div");

  const valueElement =
    document.createElement("strong");

  row.className = "stat-row";

  labelElement.className =
    "stat-label";

  track.className =
    "stat-bar-track";

  fill.className =
    "stat-bar-fill";

  valueElement.className =
    "stat-value";

  const percentage = Math.max(
    0,
    Math.min(
      100,
      maximum > 0
        ? (value / maximum) * 100
        : 0
    )
  );

  labelElement.textContent = label;

  fill.style.width =
    `${percentage}%`;

  valueElement.textContent =
    `${value}pt`;

  track.appendChild(fill);

  row.append(
    labelElement,
    track,
    valueElement
  );

  return row;
}


function renderCompanyStats() {
  companyStats.innerHTML = "";

  companyStats.className =
    `company-stats company-count-${players.length}`;

  /*
    棒グラフの最大値を100ptに固定します。

    最大値を現在の最高業績に合わせると、
    業績が増減しても棒の長さがほとんど
   変わらないように見えるためです。
  */
  const maximumPerformance = 100;

  players.forEach((player) => {
    const card =
      document.createElement("article");

    const header =
      document.createElement("header");

    const name =
      document.createElement("h3");

    const stars =
      document.createElement("div");

    const bars =
      document.createElement("div");

    card.className =
      "company-stat-card";

    header.className =
      "company-stat-header";

    name.className =
      "company-stat-name";

    stars.className =
      "company-white-stars";

    bars.className =
      "company-bars";

    name.textContent =
      player.company.name;

    stars.textContent =
      `${getStarText(player.whiteStars)} ` +
      player.whiteStars;

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

    header.append(name, stars);

    bars.appendChild(
      createStatRow(
        "業績",
        player.currentPerformance,
        maximumPerformance
      )
    );

    bars.appendChild(
      createStatRow(
        "社員力",
        employeeScore,
        maximumPerformance
      )
    );

    card.append(header, bars);

    companyStats.appendChild(card);
  });
}
/* =========================================================
   イベントモーダル
========================================================= */

function openEventModal({
  companyName = "",
  title = "",
  message = "",
  employee = null,
  options = []
}) {
  return new Promise((resolve) => {
    eventModalCompany.textContent =
      companyName;

    eventModalTitle.textContent =
      title;

    eventModalMessage.textContent =
      message;

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
        `${getDietLabel(employee.diet)}・` +
        `${getHabitatLabel(employee.habitat)}`;
    } else {
      eventModalEmployeePreview.classList.add(
        "hidden"
      );

      eventModalEmployeeImage.removeAttribute(
        "src"
      );

      eventModalEmployeeName.textContent = "";
      eventModalEmployeeDetail.textContent = "";
    }

    options.forEach((option) => {
      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "event-option-button";

      button.textContent =
        option.label;

      if (option.important) {
        button.classList.add(
          "is-important"
        );
      }

      if (option.danger) {
        button.classList.add(
          "is-danger"
        );
      }

      button.addEventListener(
        "click",
        () => {
          eventModal.classList.add(
            "hidden"
          );

          resolve(option.value);
        },
        {
          once: true
        }
      );

      eventModalOptions.appendChild(button);
    });

    eventModal.classList.remove("hidden");
  });
}


function chooseEmployee(
  player,
  message
) {
  return openEventModal({
    companyName: player.company.name,
    title: "社員を選択",
    message,
    options: player.employees.map(
      (employee) => ({
        label: employee.name,
        value: employee.id
      })
    )
  });
}


/* =========================================================
   イベント実行
========================================================= */

async function executeCurrentEvent() {
  if (eventRunning) {
    return;
  }

  const event =
    turnEvents[currentEventIndex];

  if (!event) {
    return;
  }

  eventRunning = true;
  renderGame();

  try {
    switch (event.id) {
      case "childcare":
        await executeChildcareEvent();
        break;

      case "diversity":
        await executeDiversityEvent();
        break;

      case "complaint":
        await executeComplaintEvent();
        break;

      case "headhunting":
        await executeHeadhuntingEvent();
        break;

      case "winter":
        await executeWinterEvent();
        break;

      case "disability":
        await executeDisabilityEvent();
        break;

      case "powerHarassment":
        await executePowerHarassmentEvent();
        break;

      case "strike":
        await executeStrikeEvent();
        break;

      case "training":
        await executeTrainingEvent();
        break;

      default:
        throw new Error(
          "イベントが見つかりません。"
        );
    }

    /*
      イベントでperformanceBonusなどが
      変更されたあと、業績・ランキング・
      棒グラフをすぐに更新します。
    */
    updateAllPerformance();
    renderRankings();
    renderCompanyStats();

    eventStatusText.textContent =
      "イベントの処理が完了しました。";

    gameAdvice.textContent =
      "次のターンへ進みます。";

    await wait(800);

    goToNextTurn();
  } catch (error) {
    console.error(error);

    eventRunning = false;

    showMessage(
      "イベント処理中にエラーが発生しました。",
      "error"
    );

    renderGame();
  }
}


function goToNextTurn() {
  if (currentTurn >= TOTAL_TURNS) {
    showResult();
    return;
  }

  currentTurn += 1;
  currentEventIndex += 1;
  eventRunning = false;

  renderGame();
}


/* =========================================================
   育児休業
========================================================= */

async function executeChildcareEvent() {
  for (const player of players) {
    const targetEmployees =
      player.employees.filter(
        (employee) =>
          employee.parentalLeave
      );

    const targetText =
      targetEmployees.length > 0
        ? targetEmployees
            .map((employee) => employee.name)
            .join("・")
        : "対象社員なし";

    const choice =
      await openEventModal({
        companyName:
          player.company.name,

        title: "育児休業",

        message:
          `育児休業を希望する社員：${targetText}\n` +
          "会社としてどのように対応しますか？",

        options: [
          {
            label:
              "希望どおり全員の育児休業を認める　★＋4",
            value: "all",
            important: true
          },
          {
            label:
              "一部の社員だけ認める　★＋2",
            value: "some"
          },
          {
            label:
              "全員認めるが、希望とは異なる期間にする　★＋1",
            value: "different"
          },
          {
            label:
              "育児休業を認めない　変化なし",
            value: "reject",
            danger: true
          }
        ]
      });

    const starChanges = {
      all: 4,
      some: 2,
      different: 1,
      reject: 0
    };

    player.whiteStars +=
      starChanges[choice] || 0;
  }
}
/* =========================================================
   多様性イベント
========================================================= */

async function executeDiversityEvent() {
  for (const player of players) {
    const categories = new Set();

    player.employees.forEach(
      (employee) => {
        categories.add(employee.diet);
        categories.add(employee.habitat);

        if (employee.parentalLeave) {
          categories.add(
            "parentalLeave"
          );
        }

        if (employee.hibernation) {
          categories.add(
            "hibernation"
          );
        }

        if (employee.disability) {
          categories.add(
            "disability"
          );
        }
      }
    );

    let bonus = 0;

    if (categories.size >= 8) {
      bonus = 20;
    } else if (categories.size >= 7) {
      bonus = 15;
    }

    player.performanceBonus += bonus;

    await openEventModal({
      companyName:
        player.company.name,

      title:
        "みんなちがって、みんないい",

      message:
        `社員の属性は${categories.size}種類でした。\n` +
        `業績＋${bonus}pt`,

      options: [
        {
          label: "確認",
          value: "ok",
          important: true
        }
      ]
    });
  }
}


/* =========================================================
   社内からの不満
========================================================= */

async function executeComplaintEvent() {
  for (const player of players) {
    const counts = {
      grass: 0,
      meat: 0,
      land: 0,
      sea: 0
    };

    player.employees.forEach(
      (employee) => {
        if (employee.diet === "grass") {
          counts.grass += 1;
        }

        if (employee.diet === "meat") {
          counts.meat += 1;
        }

        if (employee.habitat === "land") {
          counts.land += 1;
        }

        if (employee.habitat === "sea") {
          counts.sea += 1;
        }
      }
    );

    const labels = {
      grass: "草食",
      meat: "肉食",
      land: "陸",
      sea: "海"
    };

    const matchingGroups =
      Object.entries(counts)
        .filter(([, count]) => {
          return count >= 3;
        })
        .map(([key]) => {
          return labels[key];
        });

    const penalty =
      matchingGroups.length > 0
        ? 10
        : 0;

    player.performanceBonus -=
      penalty;

    await openEventModal({
      companyName:
        player.company.name,

      title: "社内からの不満",

      message:
        matchingGroups.length > 0
          ? `${matchingGroups.join("・")}の社員が3人以上います。\n業績－10pt`
          : "社員の属性に大きな偏りはありませんでした。",

      options: [
        {
          label: "確認",
          value: "ok",
          important: true
        }
      ]
    });
  }
}


/* =========================================================
   ヘッドハンティング
========================================================= */

async function executeHeadhuntingEvent() {
  updateAllPerformance();

  const ascendingRanking =
    [...players].sort(
      (playerA, playerB) => {
        return (
          playerA.currentPerformance -
          playerB.currentPerformance
        );
      }
    );

  const lowestPlayer =
    ascendingRanking[0];

  const ownEmployeeId =
    await chooseEmployee(
      lowestPlayer,
      "交換に出す社員を選んでください。"
    );

  const ownEmployeeIndex =
    lowestPlayer.employees.findIndex(
      (employee) =>
        employee.id === ownEmployeeId
    );

  const otherPlayers =
    players.filter((player) => {
      return (
        player.id !== lowestPlayer.id
      );
    });

  const targetPlayerId =
    await openEventModal({
      companyName:
        lowestPlayer.company.name,

      title: "交換する会社",

      message:
        "社員を交換したい会社を選んでください。",

      options: otherPlayers.map(
        (player) => ({
          label: player.company.name,
          value: player.id
        })
      )
    });

  const targetPlayer =
    players.find((player) => {
      return (
        player.id ===
        Number(targetPlayerId)
      );
    });

  const targetEmployeeId =
    await chooseEmployee(
      targetPlayer,
      "迎え入れる社員を選んでください。"
    );

  const targetEmployeeIndex =
    targetPlayer.employees.findIndex(
      (employee) =>
        employee.id === targetEmployeeId
    );

  const ownEmployee =
    lowestPlayer.employees[
      ownEmployeeIndex
    ];

  const targetEmployee =
    targetPlayer.employees[
      targetEmployeeIndex
    ];

  lowestPlayer.employees[
    ownEmployeeIndex
  ] = targetEmployee;

  targetPlayer.employees[
    targetEmployeeIndex
  ] = ownEmployee;

  await openEventModal({
    companyName:
      lowestPlayer.company.name,

    title: "社員交換完了",

    message:
      `${ownEmployee.name}と` +
      `${targetEmployee.name}を交換しました。`,

    options: [
      {
        label: "確認",
        value: "ok",
        important: true
      }
    ]
  });
}
                "業績20ptを使って更生プログラムを行う",
              value: "rehabilitate",
              important: true
            },
            {
              label:
                "問題を見過ごす",
              value: "ignore",
              danger: true
            }
          ]
        });

      if (
        choice === "rehabilitate"
      ) {
        player.performanceBonus -= 20;

        // 業績を即更新
        updateAllPerformance();
        renderRankings();
        renderCompanyStats();

        employee.powerHarassment = false;
        employee.harassmentType = "";
      }
    }
  }
}


/* =========================================================
   社員ストライキ
========================================================= */

async function executeStrikeEvent() {
  const minimumStars =
    Math.min(
      ...players.map(
        (player) =>
          player.whiteStars
      )
    );

  const targetPlayers =
    players.filter((player) => {
      return (
        player.whiteStars ===
        minimumStars
      );
    });

  for (const player of targetPlayers) {
    const protectedEmployees =
      player.employees.filter(
        (employee) =>
          employee.parentalLeave
      );

    const replacementCount =
      MAX_EMPLOYEES -
      protectedEmployees.length;

    const usedEmployeeIds =
      players.flatMap(
        (currentPlayer) => {
          if (
            currentPlayer.id ===
            player.id
          ) {
            return protectedEmployees.map(
              (employee) =>
                employee.id
            );
          }

          return currentPlayer.employees.map(
            (employee) =>
              employee.id
          );
        }
      );

    const candidates =
      shuffleArray(
        EMPLOYEE_DATA.filter(
          (employee) => {
            return !usedEmployeeIds.includes(
              employee.id
            );
          }
        )
      );

    const newEmployees =
      candidates
        .slice(0, replacementCount)
        .map(cloneEmployee);

    player.employees = [
      ...protectedEmployees,
      ...newEmployees
    ];

    await openEventModal({
      companyName:
        player.company.name,

      title: "社員ストライキ",

      message:
        protectedEmployees.length > 0
          ? "育休対象の社員を除く社員が入れ替わりました。"
          : "すべての社員が入れ替わりました。",

      options: [
        {
          label: "確認",
          value: "ok",
          important: true
        }
      ]
    });
  }
}


/* =========================================================
   社員研修
========================================================= */

async function executeTrainingEvent() {
  for (const player of players) {
    updateAllPerformance();

    const choice =
      await openEventModal({
        companyName:
          player.company.name,

        title: "社員研修",

        message:
          "業績2ptを使って、社員1人の能力を1上げますか？",

        options: [
          {
            label:
              "研修を行う　業績－2pt",
            value: "train",
            important: true
          },
          {
            label:
              "今回は行わない",
            value: "skip"
          }
        ]
      });

    if (choice !== "train") {
      continue;
    }

    if (
      player.currentPerformance < 2
    ) {
      await openEventModal({
        companyName:
          player.company.name,

        title: "社員研修",

        message:
          "業績が不足しているため、研修を行えません。",
                 options: [
          {
            label: "確認",
            value: "ok"
          }
        ]
      });

      continue;
    }

    const employeeId =
      await chooseEmployee(
        player,
        "研修を受ける社員を選んでください。"
      );

    const employee =
      player.employees.find(
        (item) =>
          item.id === employeeId
      );

    const availableColors =
      Object.keys(SKILL_LABELS).filter(
        (color) =>
          employee.skills[color] < 5
      );

    if (
      availableColors.length === 0
    ) {
      await openEventModal({
        companyName:
          player.company.name,

        title: "社員研修",

        message:
          "この社員の能力は、すべて最大です。",

        options: [
          {
            label: "確認",
            value: "ok"
          }
        ]
      });

      continue;
    }

    const skillColor =
      await openEventModal({
        companyName:
          player.company.name,

        title: "伸ばす能力",

        message:
          `${employee.name}の伸ばす能力を選んでください。`,

        employee,

        options:
          availableColors.map(
            (color) => ({
              label:
                `${SKILL_LABELS[color]}　` +
                `${employee.skills[color]} → ` +
                `${employee.skills[color] + 1}`,

              value: color
            })
          )
      });

    player.performanceBonus -= 2;

    employee.skills[skillColor] += 1;

    // ★ 修正：研修後すぐに業績・ランキング・棒グラフを更新
    updateAllPerformance();
    renderRankings();
    renderCompanyStats();

    await openEventModal({
      companyName:
        player.company.name,

      title: "研修完了",

      message:
        `${employee.name}の` +
        `${SKILL_LABELS[skillColor]}が1上がりました。`,

      options: [
        {
          label: "確認",
          value: "ok",
          important: true
        }
      ]
    });
  }
}
/* =========================================================
   結果画面
========================================================= */

function showResult() {
  updateAllPerformance();

  const ranking =
    getFinalRanking();

  resultRanking.innerHTML = "";

  ranking.forEach(
    (player, index) => {
      const item =
        document.createElement("article");

      const rank =
        document.createElement("div");

      const company =
        document.createElement("div");

      const score =
        document.createElement("div");

      const detail =
        document.createElement("small");

      item.className =
        "result-item";

      rank.className =
        "result-rank";

      company.className =
        "result-company";

      score.className =
        "result-score";

      rank.textContent =
        `${index + 1}位`;

      company.textContent =
        player.company.name;

      score.textContent =
        `${getFinalScore(player)}pt`;

      detail.textContent =
        `業績 ${player.currentPerformance}pt ／ ` +
        `ホワイト度 ${player.whiteStars}`;

      score.appendChild(detail);

      item.append(
        rank,
        company,
        score
      );

      resultRanking.appendChild(item);
    }
  );

  showScreen("resultScreen");
}


/* =========================================================
   リスタート
========================================================= */

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

  eventRunning = false;

  eventModal.classList.add("hidden");

  renderStory();
  renderPlayerSelection();

  showScreen("storyScreen");
}
/* =========================================================
   Swift・NFC連携
========================================================= */

window.NFCBridge = {
  receiveCompany(companyId) {
    receiveCompany(
      String(companyId)
    );
  },

  receiveEmployee(employeeId) {
    receiveEmployee(
      String(employeeId)
    );
  },

  receiveByUid(uid) {
    handleUidScan(String(uid));
  },

  showMessage(message) {
    showMessage(
      String(message)
    );
  }
};


/* =========================================================
   イベントリスナー
========================================================= */

storyNextButton.addEventListener(
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

confirmPlayersButton.addEventListener(
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
  registerSelectedEmployee
);

cancelEmployeeButton.addEventListener(
  "click",
  cancelSelectedEmployee
);

finishEmployeeButton.addEventListener(
  "click",
  finishCurrentEmployeeRegistration
);

nextTurnButton.addEventListener(
  "click",
  executeCurrentEvent
);

restartButton.addEventListener(
  "click",
  restartGame
);


/* =========================================================
   初期表示
========================================================= */

renderStory();
renderPlayerSelection();
showScreen("storyScreen");
/* =========================================================
   カードUID読み取り（キーボードウェッジ）

   iPadに接続したNFCリーダーがUIDをキー入力として打ち込み、
   末尾のEnterで確定する方式を想定。
   会社登録画面・社員登録画面でのみ有効にし、
   UID → 会社id/社員id を card-db.js の対応表で引いて登録する。
========================================================= */

function handleUidScan(rawUid) {
  if (!window.CardDB) {
    showMessage(
      "UIDデータベースを読み込めていません。",
      "error"
    );

    return;
  }

  const uid =
    CardDB.normalizeUid(rawUid);

  if (!uid) {
    return;
  }

  const activeScreen =
    document.querySelector(
      ".screen.active"
    );

  const activeId =
    activeScreen
      ? activeScreen.id
      : "";

  const db =
    CardDB.load();

  const hit =
    CardDB.lookup(db, uid);

  if (!hit) {
    showMessage(
      `未登録のカードです（UID: ${uid}）。登録ページで先に登録してください。`,
      "error"
    );

    return;
  }

  if (hit.kind === "company") {
    if (
      activeId !== "companyScreen"
    ) {
      showMessage(
        "会社カードは会社登録画面で読み取ってください。",
        "error"
      );

      return;
    }

    receiveCompany(hit.id);

    return;
  }

  // hit.kind === "employee"
  if (
    activeId !== "employeeScreen"
  ) {
    showMessage(
      "社員カードは社員登録画面で読み取ってください。",
      "error"
    );

    return;
  }

  receiveEmployee(hit.id);
}


let uidScanBuffer = "";
let uidScanLastKey = 0;

document.addEventListener(
  "keydown",
  (event) => {
    const activeScreen =
      document.querySelector(
        ".screen.active"
      );

    const activeId =
      activeScreen
        ? activeScreen.id
        : "";

    // 読み取りは会社登録・社員登録画面のみ
    if (
      activeId !== "companyScreen" &&
      activeId !== "employeeScreen"
    ) {
      return;
    }

    // イベントモーダル表示中は無視
    if (
      eventModal &&
      !eventModal.classList.contains(
        "hidden"
      )
    ) {
      return;
    }

    const now =
      Date.now();

    if (
      now - uidScanLastKey > 800
    ) {
      uidScanBuffer = "";
    }

    uidScanLastKey = now;

    if (
      event.key === "Enter"
    ) {
      if (
        uidScanBuffer.length > 0
      ) {
        const scanned =
          uidScanBuffer.trim();

        uidScanBuffer = "";

        event.preventDefault();

        handleUidScan(scanned);
      }

      return;
    }

    if (
      event.key.length === 1
    ) {
      uidScanBuffer += event.key;
    }
  }
);

/* =========================================================
   起動時の初期化
========================================================= */

async function initializeGame() {
  if (window.CardDB) {
    try {
      const db = await CardDB.loadSeedIfEmpty(
        "card-uid-db.json"
      );

      console.log(
        "UIDデータベース読み込み完了",
        db
      );
    } catch (error) {
      console.error(
        "UIDデータベースの読み込みに失敗しました。",
        error
      );
    }
  }

  renderStory();
  renderPlayerSelection();
  showScreen("storyScreen");
}

initializeGame();
