import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(100)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

