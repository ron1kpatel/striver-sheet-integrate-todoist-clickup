import axios from "axios";
import dotenv from "dotenv";
import { getAllProjects } from "./getAllProjects.js";
import fs from 'fs'

dotenv.config();

export const createNewProjectIfNotExist = async (projectName) => {
  const TODOIST_CREATE_PROJECT_URL = `https://api.todoist.com/rest/v2/projects`;

  const projects = await  getAllProjects();
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2))

  for(const project of projects){
    if(project.name === projectName){
      console.log(`createNewProjectIfNotExist(): ${projectName} project already exists`);
      return project;
    }
  }
  try {
    const response = await axios.post(
      TODOIST_CREATE_PROJECT_URL,
      {
        name: projectName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
        },
      }
    );

    if (response && response.data) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("createNewProjectIfNotExist():Error creating project:", error.response?.data || error.message);
    return null;
  }
};