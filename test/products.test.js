const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');

test('GET /products returns product list and responds with 200', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
        const res = await fetch(`http://127.0.0.1:${port}/products`);
        assert.equal(res.status, 200);
        const data = await res.json();
        assert.ok(Array.isArray(data));
        assert.ok(data.length > 0);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});

test('GET /products/:id returns specific product', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
        const res = await fetch(`http://127.0.0.1:${port}/products/1`);
        assert.equal(res.status, 200);
        const product = await res.json();
        assert.equal(product.id, 1);
        assert.ok(product.name);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});

test('GET /products/99999 returns 404 for unknown product', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
        const res = await fetch(`http://127.0.0.1:${port}/products/99999`);
        assert.equal(res.status, 404);
        const body = await res.json();
        assert.equal(body.message, 'Product not found');
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});
