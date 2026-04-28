const axios = require('axios');
require('dotenv').config();

describe('Registration Module', () => {
    const url = `${process.env.BASE_URL}/auth/register`;

    test('TSC-001: Verify registration with valid credentials', async () => {
        const id = Date.now();
        
        const res = await axios.post(url, {
            username: `user_${id}`,
            email: `test_${id}@zedu.com`,
            password: process.env.USER_PASSWORD,
            first_name: process.env.USER_FIRSTNAME,
            last_name: process.env.USER_LASTNAME,
            phone_number: process.env.USER_PHONE
        });
        
        expect(res.status).toBe(201);
    });

    test('TSC-002: Verify registration when fields are empty', async () => {
        try { 
            await axios.post(url, {}); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response.status); 
        }
    });

    test('TSC-003: Verify registration with an invalid email format', async () => {
        try { 
            await axios.post(url, { email: "no-at-sign", password: process.env.USER_PASSWORD }); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response.status); 
        }
    });

    test('TSC-004: Verify registration with existing email', async () => {
        try { 
            await axios.post(url, { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD }); 
        } catch (e) { 
            expect([400, 409, 422]).toContain(e.response.status); 
        }
    });

    test('TSC-005: Verify registration with a valid email and an empty password field', async () => {
        try { 
            const salt = Date.now();
            await axios.post(url, { 
                email: `test_${salt}@zedu.com`, 
                username: `u_${salt}`,
                first_name: process.env.USER_FIRSTNAME,
                last_name: process.env.USER_LASTNAME
            }); 
        } catch (e) { 
            expect([400, 422]).toContain(e.response.status); 
        }
    });
});