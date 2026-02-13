// ===== 初期データ =====
let data = JSON.parse(localStorage.getItem("sleepGame")) || {
  point: 0,
  items: 0,
  level: 1,
  targetSleep: "23:00",
  targetWake: "07:00",
  logs: []
};

const quotes = [
  "おはよう！今日も頑張ろう ☀️",
  "昨日の自分より一歩前へ",
  "早く寝るなんて偉すぎるじゃないか！！",
  "今日の自分を大切に"
];

const routines = [
  "📱 スマホを置く",
  "🧘‍♀️ 深呼吸30秒",
  "📝 明日の予定を1つ書く",
  "💡 部屋を少し暗くする"
];

// ===== 起動時 =====
showQuote();
showRoutine();
updateUI();

// ===== 機能 =====
function saveTarget() {
  data.targetSleep = document.getElementById("targetSleep").value;
  data.targetWake = document.getElementById("targetWake").value;
  save();
}

function check() {
  const sleep = document.getElementById("sleepTime").value;
  const wake = document.getElementById("wakeTime").value;
  const msg = document.getElementById("message");

  if (!sleep || !wake) return;

  const today = new Date().toDateString();

  // 睡眠時間（自動計算）
  const sleepDate = new Date(`2000-01-01 ${sleep}`);
  const wakeDate = new Date(`2000-01-02 ${wake}`);
  const hours = (wakeDate - sleepDate) / 1000 / 60 / 60;

  // ログ保存
  data.logs.push({ date: today, sleep, wake, hours });

  // 目標判定
  if (sleep <= data.targetSleep && wake <= data.targetWake) {
    data.point += 10;
    data.level = Math.min(30, data.level + 1);
    msg.textContent = "🎉 目標達成！";
  } else {
    msg.textContent = "😌 記録できたよ";
  }

  // 6時間以上でアイテム
  if (hours >= 6) {
    data.items += 1;
    msg.textContent += " 🎁 アイテムGET！";
  }

  updateChar();
  save();
}

// ===== 表示系 =====
function updateUI() {
  document.getElementById("point").textContent = data.point;
  document.getElementById("items").textContent = data.items;
  document.getElementById("level").textContent = data.level;
  document.getElementById("targetSleep").value = data.targetSleep;
  document.getElementById("targetWake").value = data.targetWake;
  updateChar();
}

function updateChar() {
  const c = document.getElementById("char");
  if (data.level >= 30) c.textContent = "🐉";
  else if (data.level >= 20) c.textContent = "🦊";
  else if (data.level >= 10) c.textContent = "🐱";
  else if (data.level >= 5) c.textContent = "🐣";
  else c.textContent = "🥚";
}

function showQuote() {
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
}

function showRoutine() {
  const ul = document.getElementById("routine");
  routines.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    ul.appendChild(li);
  });
}

function save() {
  localStorage.setItem("sleepGame", JSON.stringify(data));
  updateUI();
}

