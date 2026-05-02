const axios = require('axios');
require('dotenv').config();

describe('Zedu Security (TSC-012 to TSC-016)', () => {
    const baseUrl = process.env.BASE_URL.replace(/\/+$/, "");
    const url = `${baseUrl}/users/me`;

    test('TSC-012: Negative - Access without Authorization header', async () => {
        try {
            await axios.get(url);
            throw new Error('Security Breach: Access allowed without header');
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-013: Negative - Malformed token (No Bearer prefix)', async () => {
        try {
            await axios.get(url, { headers: { Authorization: "token123" } });
            throw new Error('Security Breach: Access allowed with malformed token');
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-014: Negative - Invalid Bearer token string', async () => {
        try {
            await axios.get(url, { headers: { Authorization: "Bearer wrong.token.value" } });
            throw new Error('Security Breach: Access allowed with invalid token');
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-015: Edge - Access with lowercase "bearer"', async () => {
        try {
           
            await axios.get(url, { headers: { Authorization: "bearer fake-token" } });
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });

    test('TSC-016: Edge - Empty Authorization string', async () => {
        try {
            await axios.get(url, { headers: { Authorization: "" } });
            throw new Error('Security Breach: Access allowed with empty auth string');
        } catch (e) {
            if (e.response) {
                expect(e.response.status).toBe(401);
            } else { throw e; }
        }
    });
});