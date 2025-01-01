import axios from "axios";

/**
 * Creates a task in ClickUp.
 *
 * @param {string} listId - The ID of the list where the task will be created.
 * @param {Object} task - The task details.
 * @param {string} task.name - The name of the task.
 * @returns {Promise<Object|null>} The created task data or null if an error occurs.
 * @throws {Error} Throws an error if the API request fails.
 */
export const createTask = async (listId = "901605512296", task) => {
    if (!listId) {
        throw new Error("The 'listId' parameter is required.");
    }

    if (!task || !task.name) {
        throw new Error("The 'task' parameter with a 'name' property is required.");
    }

    const CREATE_TASK_URL = `https://api.clickup.com/api/v2/list/${listId}/task`;

    try {
        const response = await axios.post(
            CREATE_TASK_URL,
            task,
            {
                headers: {
                    Authorization: process.env.CLICKUP_API_KEY, // Ensure this is properly set in your environment variables.
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data || null;
    } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        return null; // Return null in case of error to gracefully handle failures.
    }
};