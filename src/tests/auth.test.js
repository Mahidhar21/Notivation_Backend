import request from 'supertest';
import { app } from '../app.js';

describe('Auth API', () => {
  it('should return validation error for invalid register payload', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'ab',
      email: 'not-an-email',
      password: '123'
    });
    expect(res.status).toBe(400);
  });

  it('should return 401 for invalid login', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'unknown@example.com',
      password: 'password123'
    });
    expect([400, 401]).toContain(res.status);
  });
});

