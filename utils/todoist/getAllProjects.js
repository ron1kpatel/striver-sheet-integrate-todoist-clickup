import axios from "axios";
import fs from "fs/promises";
import path from "path";

const PROJECTS_FILE_PATH = "project.json" // Adjust the path as needed

export const getAllProjects = async () => {
  // Check if the project.json file exists
  try {
    const fileData = await fs.readFile(PROJECTS_FILE_PATH, "utf-8");
    console.log("getAllProjects(): Returning data from existing project.json file.");
    return JSON.parse(fileData); // Return the data if the file exists
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error("Error reading the file:", err);
      throw err; // Re-throw error if it's not a "file not found" error
    }
  }

  // If the file doesn't exist, fetch data from the API
  console.log("File not found. Fetching data from the Todoist API...");
  const TODOIST_PROJECTS_URL = `https://api.todoist.com/rest/v2/projects`;

  try {
    const response = await axios.get(TODOIST_PROJECTS_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
      },
    });

    if (response && response.data) {
      // Write the data to the file
      await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(response.data, null, 2));
      console.log("getAllProjects(): Data fetched from API and written to project.json.");
      return response.data; // Return the fetched data
    }
  } catch (error) {
    console.error("getAllProjects(): Error getting all projects:", error.response?.data || error.message);
    return null;
  }
};