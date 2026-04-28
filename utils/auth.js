const axios = require('axios');
require('dotenv').config();

async function getAuthToken() {
    try {
        const response = await axios.post(`${process.env.BASE_URL}/auth/login`, {
            email: process.env.USER_EMAIL,
            password: process.env.USER_PASSWORD
        });
        // Adjusted to the path found in your terminal logs
        return response.data.data.access_token; 
    } catch (error) {
        throw error;
    }
}

module.exports = { getAuthToken };