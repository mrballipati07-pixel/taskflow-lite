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

const filterButtons =
    document.querySelectorAll(".filter-btn");

let tasks = loadTasks();

let currentFilter = "all";
let searchTerm = "";

function updateProgress() {

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const percentage =
        tasks.length === 0
            ? 0
            : Math.round(
                (completed / tasks.length) * 100
            );

    progressBar.style.width =
        percentage + "%";

    progressText.textContent =
        `${percentage}% Completed`;
}

function getFilteredTasks() {

    let filtered = [...tasks];

    if (currentFilter === "active") {
        filtered = filtered.filter(
            task => !task.completed
        );
    }

    if (currentFilter === "completed") {
        filtered = filtered.filter(
            task => task.completed
        );
    }

    if (searchTerm) {
        filtered = filtered.filter(task =>
            task.text
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )
        );
    }

    return filtered;
}

function updateUI() {

    renderTasks(
        getFilteredTasks(),
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

    const result =
        validateTask(text);

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

    const filtered =
        getFilteredTasks();

    const selectedTask =
        filtered[index];

    const realIndex =
        tasks.findIndex(
            task =>
                task.text === selectedTask.text &&
                task.dueDate === selectedTask.dueDate
        );

    if (realIndex !== -1) {
        tasks[realIndex].completed =
            !tasks[realIndex].completed;
    }

    updateUI();
}

function deleteTask(index) {

    const filtered =
        getFilteredTasks();

    const selectedTask =
        filtered[index];

    const realIndex =
        tasks.findIndex(
            task =>
                task.text === selectedTask.text &&
                task.dueDate === selectedTask.dueDate
        );

    if (realIndex !== -1) {
        tasks.splice(realIndex, 1);
    }

    updateUI();
}

function editTask(index) {

    const filtered =
        getFilteredTasks();

    const selectedTask =
        filtered[index];

    const updated =
        prompt(
            "Edit Task",
            selectedTask.text
        );

    if (!updated) return;

    const result =
        validateTask(updated);

    if (!result.valid) {
        alert(result.message);
        return;
    }

    const realIndex =
        tasks.findIndex(
            task =>
                task.text === selectedTask.text &&
                task.dueDate === selectedTask.dueDate
        );

    if (realIndex !== -1) {
        tasks[realIndex].text =
            updated.trim();
    }

    updateUI();
}

addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    event => {
        if (event.key === "Enter") {
            addTask();
        }
    }
);

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value;

        updateUI();
    }
);

filterButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                b =>
                    b.classList.remove(
                        "active"
                    )
            );

            btn.classList.add(
                "active"
            );

            currentFilter =
                btn.dataset.filter;

            updateUI();
        }
    );

});

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        localStorage.setItem(
            "theme",
            document.body.classList.contains(
                "dark"
            )
                ? "dark"
                : "light"
        );
    }
);

if (
    localStorage.getItem("theme") ===
    "dark"
) {
    document.body.classList.add(
        "dark"
    );
}

updateUI();