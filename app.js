let point = 0;
let level = 1;

const sleepInput = document.getElementById("sleepTime");
const wakeInput = document.getElementById("wakeTime");
const message = document.getElementById("message");
const pointEl = document.getElementById("point");
const levelEl = document.getElementById("level");
const charEl = document.getElementById("char");
const btn = document.getElementById("checkBtn");

btn.addEventListener("click", checkTime);

function checkTime() {
  const sleep = sleepInput.value;
  const wake = wakeInput.value;

  if (!sleep || !wake) {
    message.textContent = "時間を入力してね";
    return;
  }

  const sleepOK = sleep <= "23:00";
  const wakeOK = wake <= "07:00";

  if (sleepOK && wakeOK) {
    point += 10;
    message.textContent = "🎉 成功！ポイント +10";
  } else {
    message.textContent = "😢 失敗…明日また挑戦！";
  }

  level = Math.floor(point / 20) + 1;
  updateCharacter();

  pointEl.textContent = point;
  levelEl.textContent = level;
}

function updateCharacter() {
  if (level >= 5) charEl.textContent = "🐉";
  else if (level >= 4) charEl.textContent = "🦊";
  else if (level >= 3) charEl.textContent = "🐱";
  else if (level >= 2) charEl.textContent = "🐣";
  else charEl.textContent = "🥚";
}
