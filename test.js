import dotenv from 'dotenv'
dotenv.config();

import axios from 'axios';
const token = 'your_token_here'; // Replace with your actual token

axios.get('https://api.todoist.com/rest/v2/tasks/', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    console.log(response.data); // Log the response data
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
/*

    $ curl "https://api.todoist.com/rest/v2/tasks/2995104339" \
    -H "Authorization: Bearer $token"
*/