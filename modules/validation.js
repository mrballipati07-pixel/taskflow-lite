export function validateTask(taskText) {

    const text = (taskText || "").trim();

    if (!text) {
        return {
            valid: false,
            message: "Task cannot be empty"
        };
    }

    if (text.length < 3) {
        return {
            valid: false,
            message:
                "Task must be at least 3 characters"
        };
    }

    return {
        valid: true,
        message: ""
    };
}