import axios from "axios";
import { getFolders } from "./getFolders.js";

export const createFolderIfNotExist = async (space_id) => {
    try {
        const folderName = process.env.CLICKUP_FOLDER_NAME;

        if (!folderName) {
            throw new Error("Environment variable CLICKUP_FOLDER_NAME is not defined.");
        }

        if (!space_id) {
            throw new Error("space_id is required.");
        }

        // Fetch existing folders in the space
        const { folders } = await getFolders(space_id); // Ensure getFolders is async and properly handles errors
        if (!folders || !Array.isArray(folders)) {
            throw new Error("Failed to fetch folders or invalid folder data returned.");
        }

        // Check if the folder already exists
        const existingFolder = folders.find(folder => folder.name === folderName);
        if (existingFolder) {
            console.log(`${folderName} folder already exists.`);
            return existingFolder; // Return the existing folder
        }

        // If folder does not exist, create it
        console.log(`Folder not found, creating folder: ${folderName}`);
        const CLICKUP_CREATE_FOLDER_URL = `https://api.clickup.com/api/v2/space/${space_id}/folder`;

        const data = {
            name: folderName,
        };

        const response = await axios.post(CLICKUP_CREATE_FOLDER_URL, data, {
            headers: {
                Authorization: process.env.CLICKUP_API_KEY,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (response?.data) {
            console.log("Folder created successfully:", response.data);
            return response.data;
        }

        throw new Error("Unexpected response from ClickUp API when creating folder.");
    } catch (error) {
        console.error("Error in createFolderIfNotExist:", error.message || error);
        return null; // Return null to indicate failure
    }
};