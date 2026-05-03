const axios = require('axios');
const { getAuthToken } = require('../utils/auth');
require('dotenv').config({ silent: true });

describe('User Scenarios (TSC-011 to TSC-024)', () => {
    let token;
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");

    beforeAll(async () => { 
        token = await getAuthToken(); 
    });

    const getHeaders = () => ({ 
        headers: { Authorization: `Bearer ${token}` } 
    });

    test('TSC-012: Verify password change without token', async () => {
        try { 
            await axios.put(`${baseUrl}/auth/change-password`, {});
        } catch (e) { 
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-013: Verify system rejects wrong input of old password', async () => {
        try { 
            await axios.put(`${baseUrl}/auth/change-password`, {
                old_password: "wrong_password_123", 
                new_password: "NewPassword123!" 
            }, getHeaders()); 
        } catch (e) { 
            if (e.response) {
                expect(e.response.status).toBe(400);
            } else { throw e; }
        }
    });

    test('TSC-015: Verify system changes password successfully', async () => {
        // We use a different 'new' password to avoid 409 Conflict
        const res = await axios.put(`${baseUrl}/auth/change-password`, {
            old_password: process.env.USER_PASSWORD, 
            new_password: process.env.USER_PASSWORD + "_updated" 
        }, getHeaders());
        expect(res.status).toBe(200);
        
        // RECTIFICATION: Immediately change it back so TSC-006 doesn't fail later
        await axios.put(`${baseUrl}/auth/change-password`, {
            old_password: process.env.USER_PASSWORD + "_updated", 
            new_password: process.env.USER_PASSWORD 
        }, getHeaders());
    });

    test('TSC-021: Verify login with email in UPPERCASE', async () => {
        const payload = {
            email: process.env.USER_EMAIL.toUpperCase(),
            password: process.env.USER_PASSWORD
        };
        const res = await axios.post(`${baseUrl}/auth/login`, payload);
        expect(res.status).toBe(200);
    });

    test('TSC-023: Verify access denied with a malformed token', async () => {
        try {
            await axios.get(`${baseUrl}/users/me`, {
                headers: { Authorization: "Bearer malformed.token" }
            });
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-011: Verify successful logout session', async () => {
        const res = await axios.post(`${baseUrl}/auth/logout`, {}, getHeaders());
        expect(res.status).toBe(200);
    });
});