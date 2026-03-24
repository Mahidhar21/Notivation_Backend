import { z } from 'zod';

export const edgeSchema = z.object({
  body: z.object({
    source_note_id: z.string(),
    target_note_id: z.string(),
    relation_type: z.string().min(1).max(100)
  }),
  query: z.object({}).optional().default({}),
  params: z.object({}).optional().default({})
});

