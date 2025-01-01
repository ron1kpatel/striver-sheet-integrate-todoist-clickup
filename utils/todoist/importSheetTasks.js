import axios from "axios";
import { createSection } from "./createSection.js";
import { createTask } from "./createTask.js";
export const importSheetTasks = async (tasksPayload, projectId) => {
  for (const section of tasksPayload) {
    const createdSection = await createSection(section.sectionName, projectId);
    for (const subSection of section.subSection) {
      const createdParentTask = await createTask({
        content: subSection.subSectionName,
        project_id: projectId,
        section_id: createdSection.id,
      });
      for (const problem of subSection.problems) {
        const {
          question_title,
          cs_link,
          gfg_link,
          lc_link,
          post_link,
          yt_link,
          ques_topic,
        } = problem;

        const createdTask = await createTask({
          content: problem.question_title,
          description: createTaskDescription(problem),
          project_id: projectId,
          parent_id: createdParentTask.id,
        });
      }
    }
  }
};

const createTaskDescription = (problem) => {
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

