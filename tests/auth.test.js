const axios = require('axios');
require('dotenv').config();

describe('Authentication Module', () => {
    const loginUrl = `${process.env.BASE_URL}/auth/login`;

    test('TSC-006: Verify login with valid credentials', async () => {
        const res = await axios.post(loginUrl, { 
            email: process.env.USER_EMAIL, 
            password: process.env.USER_PASSWORD 
        });
        expect(res.status).toBe(200);
        expect(res.data.data).toHaveProperty('access_token'); 
    });

    test('TSC-007: Verify system behaviour when user tries to login with unregistered email', async () => {
        try { 
            await axios.post(loginUrl, { email: "ghost@zedu.com", password: "1" }); 
        } catch (e) { 
            expect([400, 401]).toContain(e.response.status); 
        }
    });

    test('TSC-008: Verify login with valid email and invalid password', async () => {
        try { 
            await axios.post(loginUrl, { email: process.env.USER_EMAIL, password: "wrong" }); 
        } catch (e) { 
            expect([400, 401]).toContain(e.response.status); 
        }
    });

    test('TSC-009: Verify login with unregistered email', async () => {
        try { 
            await axios.post(loginUrl, { email: "unregistered@example.com", password: "123" }); 
        } catch (e) { 
            expect([400, 401]).toContain(e.response.status); 
        }
    });

    test('TSC-010: Verify logout functionality without authorization', async () => {
        try { 
            await axios.post(`${process.env.BASE_URL}/auth/logout`, {}); 
        } catch (e) { 
            expect(e.response.status).toBe(401); 
        }
    });

    
});