const STORAGE_KEY = "taskflow_tasks";

export function saveTasks(tasks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}

export function loadTasks() {
    try {
        const data =
            localStorage.getItem(STORAGE_KEY);

        return data
            ? JSON.parse(data)
            : [];

    } catch (error) {
        console.error(
            "Failed to load tasks:",
            error
        );

        return [];
    }
}