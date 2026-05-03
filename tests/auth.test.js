const axios = require('axios');
require('dotenv').config({ silent: true });

describe('Authentication Module (TSC-006 - TSC-011, TSC-020)', () => {
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");
    const loginUrl = `${baseUrl}/auth/login`;

    const attemptLogin = (email, password) => axios.post(loginUrl, { email, password });

    test('TSC-006: Verify login with valid credentials', async () => {
        const res = await attemptLogin(process.env.USER_EMAIL, process.env.USER_PASSWORD);
        expect(res.status).toBe(200);
        expect(res.data.data).toHaveProperty('access_token');
    });

    test('TSC-007: Verify system behaviour when user tries to login with unregistered email', async () => {
        try {
            await attemptLogin(`unregistered_${Date.now()}@gmail.com`, "anyPassword123");
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(400);
            } else { throw e; }
        }
    });

    test('TSC-008: Verify login with valid email and invalid password', async () => {
        try {
            await attemptLogin(process.env.USER_EMAIL, "WrongPass123!");
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(400);
            } else { throw e; }
        }
    });

    test('TSC-020: Verify system behaviour when an invalid grant code is passed', async () => {
        try {
            await axios.post(`${baseUrl}/auth/google`, { code: "invalid_grant_123" });
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(422);
            } else { throw e; }
        }
    });
});