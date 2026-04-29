const axios = require('axios');
require('dotenv').config();

// Increase global timeout for slow API responses
jest.setTimeout(30000); 

describe('Registration Module', () => {
    // Sanitize URL to prevent double slashes
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");
    const url = `${baseUrl}/auth/register`;

    const getFreshUserData = () => {
        const id = Date.now();
        return {
            username: `user_${id}`,
            email: `test_${id}@zedu.com`,
            password: process.env.USER_PASSWORD,
            first_name: process.env.USER_FIRSTNAME,
            last_name: process.env.USER_LASTNAME,
            phone_number: `234${id.toString().slice(-10)}`
        };
    };

    test('TSC-001: Verify registration with valid credentials', async () => {
        const payload = getFreshUserData();
        try {
            const res = await axios.post(url, payload);
            expect(res.status).toBe(201);
            expect(res.data.data.user).toHaveProperty('id');
        } catch (e) {
            // This will now log even if the error is a timeout or 500 error
            console.error('Registration Error Details:', e.response?.data || e.message);
            throw e;
        }
    });

    test('TSC-002: Verify registration when fields are empty', async () => {
        try { 
            await axios.post(url, {}); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response?.status); 
        }
    });

    // ... TSC-003 to 005 follow same structure
});