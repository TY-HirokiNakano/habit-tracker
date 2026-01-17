const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");

// localStorageから読み込み
const habits = JSON.parse(localStorage.getItem("habits")) || [];

// 画面描画
const render = () => {
  list.innerHTML = "";
  habits.forEach((habit) => {
    const li = document.createElement("li");
    li.textContent = habit;
    list.appendChild(li);
  });
}

// 追加処理
button.addEventListener("click", () => {
  if (input.value === "") return;

  habits.push(input.value);
  localStorage.setItem("habits", JSON.stringify(habits));
  input.value = "";
  render();
});

render();
