import dotenv from 'dotenv'
import { getTeamDetails } from './utils/clickup/getTeamDetails.js';
import { getSpaces } from './utils/clickup/getSpaces.js';
import { createFolderIfNotExist } from './utils/clickup/createFolderIfNotExist.js';
import { createList } from './utils/clickup/crateList.js';
import { createTask } from './utils/clickup/createTask.js';
import { importSheetToClickup } from './utils/clickup/importSheetToClickup.js';
import { fetchStriverSheet } from './utils/striver-sheet/fetchStriverSheet.js';
dotenv.config();

const {teams} = await getTeamDetails();
const {spaces} = await getSpaces(teams[0].id);

const folder = await createFolderIfNotExist(process.env.CLICKUP_SPACE_ID);



const sheet = await fetchStriverSheet();



const status = await importSheetToClickup(sheet, folder.id);


console.log(status)