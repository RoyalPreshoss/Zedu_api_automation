const axios = require('axios');
require('dotenv').config({ silent: true });

describe('Registration Module (TSC-001 to TSC-005)', () => {
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");
    const url = `${baseUrl}/auth/register`;

    const generateUser = (overrides = {}) => {
        const uniqueId = Date.now();
        return {
            email: `qa_test_${uniqueId}@zedu.chat`,
            password: process.env.USER_PASSWORD,
            firstName: process.env.USER_FIRSTNAME,
            lastName: process.env.USER_LASTNAME,
            phone: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
            ...overrides
        };
    };

    test('TSC-001: Verify registration with valid credentials', async () => {
        const payload = generateUser();
        const res = await axios.post(url, payload);
        expect(res.status).toBe(201);
        expect(res.data.status).toBe("success");
    });

    test('TSC-002: Verify registration when fields are empty', async () => {
        try {
            const res = await axios.post(url, {});
           
            expect([400, 422]).toContain(res.status);
        } catch (e) {
            if (e.response) {
                expect([400, 422]).toContain(e.response.status);
            } else { throw e; }
        }
    });

    test('TSC-003: Verify registration with an invalid email format', async () => {
        try {
            const res = await axios.post(url, generateUser({ email: "invalid-mail" }));
           
            expect([400, 422]).toContain(res.status);
        } catch (e) {
            if (e.response) {
                expect([400, 422]).toContain(e.response.status);
            } else { throw e; }
        }
    });

    test('TSC-004: Verify registration with existing email', async () => {
        const payload = generateUser({ email: process.env.USER_EMAIL });
        try {
            const res = await axios.post(url, payload);
            // BUG TRAP: If API returns 200 OK for a duplicate email, this fails the test.
            expect([400, 409, 422]).toContain(res.status);
        } catch (e) {
            if (e.response) {
                expect([400, 409, 422]).toContain(e.response.status);
            } else { throw e; }
        }
    });

    test('TSC-005: Verify registration with a valid email and an empty password field', async () => {
        try {
            const res = await axios.post(url, generateUser({ password: "" }));
           
            expect([400, 422]).toContain(res.status);
        } catch (e) {
            if (e.response) {
                expect([400, 422]).toContain(e.response.status);
            } else { throw e; }
        }
    });
});