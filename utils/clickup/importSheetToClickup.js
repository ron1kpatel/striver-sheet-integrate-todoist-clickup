import { createList } from "./crateList.js";
import { createTask } from "./createTask.js";

export const importSheetToClickup = async (taskPayload, folderId) => {
    try {
        for (const step of taskPayload) {
            console.log(`Creating list: ${step.step_title}`);
            const createdList = await createList(folderId, {
                name: step.step_title,
                archived: false,
                tags: ["dsa"],
            });

            for (const subStep of step.sub_steps) {
                console.log(`  Creating subtask: ${subStep.sub_step_title}`);
                const createdTask = await createTask(createdList.id, {
                    name: subStep.sub_step_title,
                    tags: ["dsa"],
                });

                for (const topic of subStep.topics) {
                    console.log(`    Creating topic: ${topic.question_title}`);
                    await createTask(createdList.id, {
                        name: topic.question_title,
                        tags: ["dsa"],
                        parent: createdTask.id,
                        markdown_content: createMarkdownContent(topic),

                    });
                }
            }
        }

        console.log("Import completed successfully.");
    } catch (error) {
        console.error("Error occurred during import:", error.message);
        // Optional: Log the error with additional details or send notifications
    }
};
const createMarkdownContent = (problem) => {
    // Extract relevant data from the problem object
    const {
        question_title,
        cs_link,
        gfg_link,
        lc_link,
        post_link,
        yt_link,
        ques_topic,
        difficulty
    } = problem;

    // Parse the ques_topic string into an array
    let topics = [];
    try {
        topics = JSON.parse(ques_topic);  // This converts the string into an array
    } catch (e) {
        console.error("Error parsing ques_topic:", e);
    }

    const difficultyLable = difficulty === 0 ? 'Easy' : difficulty === 1 ? 'Medium' : 'Hard';
    // Dynamically construct the markdown content
    return `
---

### Problem Links:
${yt_link ? `[YT: Learn Basics of Input/Output](${yt_link})` : 'No video available'}

${cs_link ? `- [Coding Ninjas: ${question_title}](${cs_link})` : ''}
${gfg_link ? `- [GeeksforGeeks: ${question_title}](${gfg_link})` : ''}
${lc_link ? `- [LeetCode: ${question_title}](${lc_link})` : ''}
${post_link ? `- [TakeUForward: ${question_title}](${post_link})` : ''}

### Related Topic:
${Array.isArray(topics) && topics.length > 0 ? topics.map(topic => `- ${topic.label}`).join('\n') : 'N/A'}

### Difficulty Level: ${difficultyLable} 

---

    `;
};

