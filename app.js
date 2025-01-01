import dotenv from 'dotenv';
import { createNewProjectIfNotExist } from './utils/todoist/createNewProjectIfNotExist.js';
import { fetchStriverSheet } from './utils/striver-sheet/fetchStriverSheet.js';
import { todoistTaskPayload } from './utils/todoist/todoistTaskPayload.js';
import { importSheetTasks } from './utils/todoist/importSheetTasks.js';

dotenv.config();

const projectName = process.env.PROJECT_NAME || 'DSA & Problem Solving' 

const project = await createNewProjectIfNotExist(projectName)

const sheet = await fetchStriverSheet();

const tasksPayload = todoistTaskPayload(sheet);

const response = await importSheetTasks(tasksPayload, project.id);
console.log(response)