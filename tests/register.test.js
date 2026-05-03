const axios = require('axios');
require('dotenv').config({ silent: true });

describe('Registration Module (TSC-001 to TSC-005)', () => {
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");
    const url = `${baseUrl}/auth/register`;

    const uniqueEmail = `testuser_${Date.now()}@gmail.com`;

    test('TSC-001: Verify registration with valid data', async () => {
        const payload = {
            email: uniqueEmail,
            password: process.env.USER_PASSWORD,
            first_name: process.env.USER_FIRSTNAME || "Test",
            last_name: process.env.USER_LASTNAME || "User"
        };
        const res = await axios.post(url, payload);
        expect([200, 201]).toContain(res.status);
    });

    test('TSC-004: Negative - Existing email', async () => {
        try {
            await axios.post(url, {
                email: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD,
                first_name: "Duplicate",
                last_name: "User"
            });
            throw new Error('API allowed duplicate email registration');
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(400);
            } else { throw e; }
        }
    });
});