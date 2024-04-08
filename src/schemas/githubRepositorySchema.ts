import { z } from 'zod';


export const githubRepositorySchema = z.object({
  language: z.string().optional().nullable(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional().nullable(),
  url: z.string().optional()
});
