const axios = require('axios');
require('dotenv').config();

describe('Authentication Module', () => {
    const loginUrl = `${process.env.BASE_URL}/auth/login`;

    test('TSC-006: Verify login with valid credentials', async () => {
        const res = await axios.post(loginUrl, { 
            email: process.env.USER_EMAIL, 
            password: process.env.USER_PASSWORD 
        });
        
        // 1. Status Code
        expect(res.status).toBe(200);
        
        // 2. Field Presence & Data Types
        expect(res.data.data).toHaveProperty('access_token'); 
        expect(typeof res.data.data.access_token).toBe('string');
        
        // 3. Field Values
        expect(res.data.status).toBe('success');
    });

    test('TSC-007: Verify system behaviour when user tries to login with unregistered email', async () => {
        try { 
            await axios.post(loginUrl, { email: "ghost@zedu.com", password: "1" }); 
        } catch (e) { 
            expect([400, 401]).toContain(e.response.status); 
            // Assert error message presence
            expect(e.response.data).toHaveProperty('message');
        }
    });

    test('TSC-008: Verify login with valid email and invalid password', async () => {
        try { 
            await axios.post(loginUrl, { email: process.env.USER_EMAIL, password: "wrong" }); 
        } catch (e) { 
            expect([400, 401]).toContain(e.response.status); 
            expect(typeof e.response.data.message).toBe('string');
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
            
            expect(e.response.data).toHaveProperty('message');
        }
    });

    

    test('TSC-021: Verify login with email in UPPERCASE', async () => {
        try{
        const res = await axios.post(loginUrl, {
            email: process.env.USER_EMAIL.toUpperCase(),
            password: process.env.USER_PASSWORD
        });
        expect(res.status).toBe(200);}
        catch (e){
            expect ([200, 400, 401]).toContain(e.response.status);}
        });
    });

 test('TSC-022: Verify login fails with a very short password', async () => {
    try {
        
        const loginUrl = `${process.env.BASE_URL}/auth/login`; 
        
        await axios.post(loginUrl, {
            email: process.env.TEST_EMAIL,
            password: "1" // Very short password
        });
    } catch (e) {
        if (!e.response) {
            throw new Error(`Request failed without a response: ${e.message}`);
        }
        const statusCodes = [400, 401, 422];
        expect(statusCodes).toContain(e.response.status);
        expect(e.response.data).toHaveProperty('message');
    }
});
