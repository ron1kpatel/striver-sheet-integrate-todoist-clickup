import axios from "axios";
export const createList = async (folder_id, list) => {
    if (!folder_id) {
        console.error("folder_id is required.");
        return null;
    }

    if (!list) {
        console.error("list is required.");
        return null;
    }

    const CREATE_LIST_URL = `https://api.clickup.com/api/v2/folder/${folder_id}/list`;
    

    try {
        const response = await axios.post(CREATE_LIST_URL, list, {
            headers: {
                'Authorization': process.env.CLICKUP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error while creating list:\n  ", err.message);
        return null;
    }
}