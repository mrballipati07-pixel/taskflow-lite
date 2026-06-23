import { saveTasks, loadTasks } from "./modules/storage.js";
import { validateTask } from "./modules/validation.js";
import { renderTasks } from "./modules/render.js";

const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");

const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyState = document.getElementById("emptyState");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let tasks = loadTasks();
let searchTerm = "";

function updateProgress() {
    const completed =
        tasks.filter(task => task.completed).length;

    const percentage =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    progressBar.style.width = percentage + "%";
    progressText.textContent =
        `${percentage}% Completed`;
}

function updateUI() {

    const filteredTasks = tasks.filter(task =>
        task.text
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    renderTasks(
        filteredTasks,
        taskList,
        emptyState,
        taskCounter,
        toggleTask,
        deleteTask,
        editTask
    );

    updateProgress();
    saveTasks(tasks);
}

function addTask() {

    const text = taskInput.value;

    const result = validateTask(text);

    if (!result.valid) {
        alert(result.message);
        return;
    }

    tasks.push({
        text: text.trim(),
        completed: false,
        dueDate: dueDateInput.value
    });

    taskInput.value = "";
    dueDateInput.value = "";

    updateUI();
}

function toggleTask(index) {
    tasks[index].completed =
        !tasks[index].completed;

    updateUI();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    updateUI();
}

function editTask(index) {

    const updated = prompt(
        "Edit Task",
        tasks[index].text
    );

    if (!updated) return;

    const result = validateTask(updated);

    if (!result.valid) {
        alert(result.message);
        return;
    }

    tasks[index].text = updated.trim();

    updateUI();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value;
    updateUI();
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

updateUI();