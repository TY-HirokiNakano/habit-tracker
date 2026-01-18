const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");

function loadHabits() {
  const raw = JSON.parse(localStorage.getItem("habits")) || [];

  // 旧形式（["走る","読書"]）→ 新形式（[{text,done}]）へ移行
  if (raw.length > 0 && typeof raw[0] === "string") {
    return raw.map((text) => ({ text, done: false }));
  }

  // すでに新形式ならそのまま
  return raw;
}

const habits = loadHabits();

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  list.innerHTML = "";

  // 表示用に「未完了 → 完了」の順に並べ替え（habits自体は変更しない）
  const todo = habits
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => !h.done);

  const done = habits
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => h.done);

  const view = [...todo, ...done]; // 表示順だけ変更

  view.forEach(({ h: habit, i: originalIndex }) => {
    const li = document.createElement("li");

    // ✅ チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;

    checkbox.addEventListener("change", () => {
      habits[originalIndex].done = checkbox.checked; // 元のhabitsを更新
      save();
      render();
    });

    // テキスト
    const span = document.createElement("span");
    span.textContent = habit.text;

    if (habit.done) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // 🗑 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.addEventListener("click", () => {
      habits.splice(originalIndex, 1); // 元のhabitsから削除
      save();
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  habits.push({ text: value, done: false });
  save();
  input.value = "";
  render();
});

// 初回ロード時に旧形式→新形式へ変換した場合も保存しておく
save();
render();
