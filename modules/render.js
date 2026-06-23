export function renderTasks(
    tasks,
    taskList,
    emptyState,
    taskCounter,
    toggleTask,
    deleteTask,
    editTask
) {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    const today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const overdue =
            task.dueDate &&
            task.dueDate < today &&
            !task.completed;

        li.innerHTML = `
            <div class="task-info">

                <span class="${
                    task.completed ? "completed" : ""
                }">
                    ${task.text}
                </span>

                ${
                    task.dueDate
                        ? `<small class="${
                              overdue ? "overdue" : ""
                          }">
                              Due: ${task.dueDate}
                           </small>`
                        : ""
                }

            </div>

            <div class="task-actions">

                <button
                    class="done-btn"
                    data-toggle="${index}">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button
                    class="edit-btn"
                    data-edit="${index}">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-delete="${index}">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    const completedCount =
        tasks.filter(task => task.completed).length;

    taskCounter.textContent =
        `Total: ${tasks.length} | Completed: ${completedCount}`;

    taskList
        .querySelectorAll("[data-toggle]")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                toggleTask(
                    Number(btn.dataset.toggle)
                );
            });
        });

    taskList
        .querySelectorAll("[data-delete]")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                deleteTask(
                    Number(btn.dataset.delete)
                );
            });
        });

    taskList
        .querySelectorAll("[data-edit]")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                editTask(
                    Number(btn.dataset.edit)
                );
            });
        });
}