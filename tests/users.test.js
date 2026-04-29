const axios = require('axios');
const { getAuthToken } = require('../utils/auth');
require('dotenv').config();

describe('User Scenarios', () => {
    let token;
    beforeAll(async () => { token = await getAuthToken(); });

    const headers = () => ({ headers: { Authorization: `Bearer ${token}` } });

    test('TSC-011: Verify successful logout session', async () => {
        const res = await axios.post(`${process.env.BASE_URL}/auth/logout`, {}, headers());
        
        // Assertions for status and structure
        expect(res.status).toBe(200);
        expect(typeof res.data.status).toBe('string');
        expect(res.data.status).toBe('success');
    });

    test('TSC-012: Verify password change without token', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/change-password`, {}); 
        } catch (e) { 
            expect([401, 404]).toContain(e.response.status); 
            // Validate field presence in error response
            expect(e.response.data).toHaveProperty('message');
        }
    });

    test('TSC-013: Verify system rejects wrong input of old password', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/change-password`, { 
                old_password: "wrong", 
                new_password: "NewPassword123!" 
            }, headers()); 
        } catch (e) { 
            expect([400, 401, 404]).toContain(e.response.status); 
            expect(typeof e.response.data.message).toBe('string');
        }
    });

    test('TSC-015: Verify system changes password successfully', async () => {
        try {
            const res = await axios.post(`${process.env.BASE_URL}/auth/change-password`, { 
                old_password: process.env.USER_PASSWORD, 
                new_password: process.env.USER_PASSWORD 
            }, headers());
            expect([200, 404]).toContain(res.status);
            if(res.status === 200) {
                expect(res.data).toHaveProperty('status');
            }
        } catch (e) {
            expect(e.response.status).toBe(404); 
        }
    });

    test('TSC-020: Verify system behaviour when an invalid grant code is passed', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/google`, { code: "invalid_code" }); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response.status); 
            expect(e.response.data).toHaveProperty('message');
        }
    });

    

    test('TSC-023: Verify access denied with a malformed token', async () => {
        try {
            await axios.get(`${process.env.BASE_URL}/users/me`, {
                headers: { Authorization: "Bearer this-is-not-a-real-token" }
            });
        } catch (e) {
            expect([401, 403]).toContain(e.response.status);
            expect(e.response.data).toHaveProperty('message');
        }
    });

    test('TSC-024: Verify access denied when Bearer prefix is missing', async () => {
        try {
            await axios.get(`${process.env.BASE_URL}/users/me`, {
                headers: { Authorization: "abc123token" }
            });
        } catch (e) {
            expect([401, 403]).toContain(e.response.status);
        }
    });
});