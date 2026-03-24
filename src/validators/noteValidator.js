import { z } from 'zod';
import { VISIBILITY } from '../constants/visibility.js';

const visibilityEnum = z.enum([VISIBILITY.PUBLIC, VISIBILITY.PRIVATE]);

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    visibility: visibilityEnum.optional(),
    tags: z.array(z.string().min(1)).optional()
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
    visibility: visibilityEnum.optional(),
    tags: z.array(z.string().min(1)).optional()
  }),
  query: z.object({}).optional().default({}),
  params: z.object({
    id: z.string()
  })
});

