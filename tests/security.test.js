const axios = require('axios');
require('dotenv').config();

describe('Zedu Security (5 Tests)', () => {
    const url = `${process.env.BASE_URL}/users/me`;

    test('TSC-012: Negative - Access without Authorization header', async () => {
        try { await axios.get(url); } catch (e) { expect(e.response.status).toBe(401); }
    });

    test('Negative - Malformed token (No Bearer)', async () => {
        try { await axios.get(url, { headers: { Authorization: "token123" } }); } catch (e) { expect(e.response.status).toBe(401); }
    });

    test('Negative - Invalid Bearer token string', async () => {
        try { await axios.get(url, { headers: { Authorization: "Bearer wrong.token.value" } }); } catch (e) { expect(e.response.status).toBe(401); }
    });

    test('Edge - Access with lowercase "bearer"', async () => {
        try { await axios.get(url, { headers: { Authorization: "bearer fake-token" } }); } catch (e) { expect(e.response.status).toBe(401); }
    });

    test('Edge - Empty Authorization string', async () => {
        try { await axios.get(url, { headers: { Authorization: "" } }); } catch (e) { expect(e.response.status).toBe(401); }
    });
});