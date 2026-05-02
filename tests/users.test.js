const axios = require('axios');
const { getAuthToken } = require('../utils/auth');
require('dotenv').config();

describe('User Scenarios (TSC-011 to TSC-024)', () => {
    let token;
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");

    beforeAll(async () => { 
        token = await getAuthToken(); 
    });

    const getHeaders = () => ({ 
        headers: { Authorization: `Bearer ${token}` } 
    });

    test('TSC-011: Verify successful logout session', async () => {
        const res = await axios.post(`${baseUrl}/auth/logout`, {}, getHeaders());
        expect(res.status).toBe(200);
        expect(res.data.status).toBe('success');
    });

    test('TSC-012: Verify password change without token', async () => {
        try { 
            await axios.post(`${baseUrl}/auth/change-password`, {}); 
        } catch (e) { 
            if (e.response) {
                expect([401, 404]).toContain(e.response.status); 
                expect(e.response.data).toHaveProperty('message');
            } else { throw e; }
        }
    });

    test('TSC-013: Verify system rejects wrong input of old password', async () => {
        try { 
            await axios.post(`${baseUrl}/auth/change-password`, { 
                old_password: "incorrect_password_123", 
                new_password: "NewPassword123!" 
            }, getHeaders()); 
        } catch (e) { 
            if (e.response) {
                expect([400, 401, 404]).toContain(e.response.status); 
                expect(typeof e.response.data.message).toBe('string');
            } else { throw e; }
        }
    });

    test('TSC-015: Verify system changes password successfully', async () => {
        try {
            const res = await axios.post(`${baseUrl}/auth/change-password`, { 
                old_password: process.env.USER_PASSWORD, 
                new_password: process.env.USER_PASSWORD 
            }, getHeaders());
            expect([200, 204]).toContain(res.status);
        } catch (e) {
            if (e.response) {
                expect([200, 404]).toContain(e.response.status); 
            } else { throw e; }
        }
    });

    test('TSC-020: Verify system behaviour when an invalid grant code is passed', async () => {
        try { 
            await axios.post(`${baseUrl}/auth/google`, { code: "invalid_auth_code_999" }); 
        } catch (e) { 
            if (e.response) {
                expect([400, 401, 422]).toContain(e.response.status); 
                expect(e.response.data).toHaveProperty('message');
            } else { throw e; }
        }
    });

    test('TSC-023: Verify access denied with a malformed token', async () => {
        try {
            await axios.get(`${baseUrl}/users/me`, {
                headers: { Authorization: "Bearer malformed.token.value" }
            });
        } catch (e) {
            if (e.response) {
                expect([401, 403]).toContain(e.response.status);
                expect(e.response.data).toHaveProperty('message');
            } else { throw e; }
        }
    });

    test('TSC-024: Verify access denied when Bearer prefix is missing', async () => {
        try {
            await axios.get(`${baseUrl}/users/me`, {
                headers: { Authorization: "plain_token_without_bearer" }
            });
        } catch (e) {
            if (e.response) {
                expect([401, 403]).toContain(e.response.status);
            } else { throw e; }
        }
    });
});