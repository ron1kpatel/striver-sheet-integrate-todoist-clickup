import axios from "axios";

export const createSection = async (sectionName, projectId) => {
    // Create a new section in the specified project
    if(!sectionName) console.error("sectionName required")
    if(!projectId) console.error("projectId required")

    console.log(`createSection(): Creating section: ${sectionName} in project: ${projectId}`);

    const TODOIST_CREATE_SECTION_URL = `https://api.todoist.com/rest/v2/sections`;
    try{
        const response = await axios.post(
            TODOIST_CREATE_SECTION_URL,
            {
                project_id: projectId,
                name: sectionName,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
                },
            }
        );

        if(response && response.data){
            console.log("Section created successfully:", sectionName);
            return response.data; // Return the created section data
        }
    }catch(error){
        console.error("createSection(): Error creating section:", error.response?.data || error.message);
        return null;
    }
}


/**
 * $ curl -s -X POST --data '{"project_id":"2203306141", "name":"Groceries"}' \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $token" \
    https://api.todoist.com/rest/v2/sections
 */