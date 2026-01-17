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

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    // ✅ チェックボックス（完了/未完了）
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;

    checkbox.addEventListener("change", () => {
      habit.done = checkbox.checked; // 状態更新
      save();                        // 保存
      render();                      // 再描画（見た目も更新）
    });

    // テキスト
    const span = document.createElement("span");
    span.textContent = habit.text;

    // 完了なら取り消し線（最低限の見た目）
    if (habit.done) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // 🗑 削除ボタン（1-Aのまま）
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.addEventListener("click", () => {
      habits.splice(index, 1);
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
