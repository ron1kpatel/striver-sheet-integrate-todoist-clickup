import axios from "axios";

export const createTask = async (taskContent, dueString, priority = 4) => {
    if (!taskContent) {
        console.error("taskContent is required");
        return null;
    }

    console.log(`Creating task: ${taskContent} with due date: ${dueString}`);

    const TODOIST_CREATE_TASK_URL = `https://api.todoist.com/rest/v2/tasks`;
    
    try {
        const response = await axios.post(
            TODOIST_CREATE_TASK_URL,
            {
                // due_string: dueString, // e.g., "tomorrow at 12:00"
                ...taskContent,
                due_lang: "en",
                priority: priority,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
                },
            }
        );

        if (response && response.data) {
            console.log("createTask(): Task created successfully:", taskContent.content);
            return response.data; // Return the created task data
        }
    } catch (error) {
        console.error("createTask(): Error creating task:", error.response?.data || error.message);
        return null;
    }

    return true;
};

/**
 * Example of usage:
 * 
 * createTask('Buy Milk', 'tomorrow at 12:00');
 */