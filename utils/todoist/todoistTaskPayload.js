import fs from "fs";
export const todoistTaskPayload = (sheet, start=3, end=10) => {

    const tasksPayload = [];
    for(const step of sheet){
        if(step.step_no < start || step.step_no > end) continue;
        const task = {
            sectionName: step.step_title,
            sectionNo: step.step_no,
            subSection: [],
        };

        for(const sub_step of step.sub_steps){
            const subSection = {
                subSectionName: sub_step.sub_step_title,
                sub_step: sub_step.sub_step_no,
                problems: [],
            };
            const topic = {
                question_title: sub_step.topics[0].question_title,
            };
            for(const topic of sub_step.topics){
                subSection.problems.push(topic);
            }
            task.subSection.push(subSection);
        }
        tasksPayload.push(task);
    }

    fs.writeFileSync('tasksPayload.json', JSON.stringify(tasksPayload, null, 2));

    return tasksPayload;
}