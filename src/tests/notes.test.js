import request from 'supertest';
import { app } from '../app.js';

describe('Notes API', () => {
  it('should list notes without auth (public only)', async () => {
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
  });

  it('should return 401 when creating note without auth', async () => {
    const res = await request(app).post('/notes').send({
      title: 'Test Note',
      content: 'Some content'
    });
    expect(res.status).toBe(401);
  });
});

