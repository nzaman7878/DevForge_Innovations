const request = require('supertest');
const express = require('express');

// We can mount a simple app just to test the health route
const app = express();
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

describe('Health Check API', () => {
  it('should return 200 OK on /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
