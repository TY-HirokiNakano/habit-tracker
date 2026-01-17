const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");

const habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    // テキスト
    const span = document.createElement("span");
    span.textContent = habit;

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "削除";
    delBtn.addEventListener("click", () => {
      habits.splice(index, 1); // index番目から1個削除
      save();                  // 保存を更新
      render();                // 画面を更新
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") return;

  habits.push(value);
  save();
  input.value = "";
  render();
});

render();