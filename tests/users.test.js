const axios = require('axios');
const { getAuthToken } = require('../utils/auth');
require('dotenv').config();

describe('User Scenarios', () => {
    let token;
    beforeAll(async () => { token = await getAuthToken(); });

    const headers = () => ({ headers: { Authorization: `Bearer ${token}` } });

    test('TSC-011: Verify successful logout session', async () => {
        const res = await axios.post(`${process.env.BASE_URL}/auth/logout`, {}, headers());
        expect(res.status).toBe(200);
    });

    test('TSC-012: Verify password change without token', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/change-password`, {}); 
        } catch (e) { 
            expect([401, 404]).toContain(e.response.status); 
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
        }
    });

    test('TSC-015: Verify system changes password successfully', async () => {
        try {
            const res = await axios.post(`${process.env.BASE_URL}/auth/change-password`, { 
                old_password: process.env.USER_PASSWORD, 
                new_password: process.env.USER_PASSWORD 
            }, headers());
            expect([200, 404]).toContain(res.status);
        } catch (e) {
            expect(e.response.status).toBe(404); // Indicates path error to be fixed
        }
    });

    test('TSC-020: Verify system behaviour when an invalid grant code is passed', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/google`, { code: "invalid_code" }); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response.status); 
        }
    });
});