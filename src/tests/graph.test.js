import request from 'supertest';
import { app } from '../app.js';

describe('Graph API', () => {
  it('should return graph structure', async () => {
    const res = await request(app).get('/graph');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('nodes');
    expect(res.body).toHaveProperty('edges');
  });
});

