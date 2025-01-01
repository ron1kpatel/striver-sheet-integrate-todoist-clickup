import axios from "axios";
import fs from "fs/promises";
import path from "path";

const FILE_NAME = "striver-sheet.json";

export const fetchStriverSheet = async () => {
  const filePath = path.resolve(FILE_NAME);

  try {
    // Check if the file exists
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      console.log("Reading data from existing file.");
      return JSON.parse(fileData); // Return the data if the file exists
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err; // Re-throw error if it's not a "file not found" error
      }
    }

    // If file doesn't exist, fetch data from the API
    console.log("File not found. Fetching data from the API...");
    const URL =
      "https://backend.takeuforward.org/api/sheets/double/strivers_a2z_sheet";
    const response = await axios.get(URL, {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        Cookie:
          "_ga=GA1.1.327278615.1728750482; _ga_51P1R4XNJ0=GS1.1.1728750481.1.1.1728750498.0.0.0; takeuforward=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJwMTQwMjY3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicm9uMWtwYXRlbCIsImlhdCI6MTczMDIxMDQ3NCwiZXhwIjoxNzM3OTg2NDc0fQ.GFTiex21q0OTfNP71HKhqxvt-WEeho3RnBj0CrdpghE",
        DNT: "1",
        Origin: "https://takeuforward.org",
        Referer: "https://takeuforward.org/",
        "Sec-CH-UA": '"Chromium";v="131", "Not_A Brand";v="24"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"macOS"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });

    const data = response.data;

    // Write data to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log("Data fetched and written to file.");
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};
