import { z } from "zod";

export const paginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    pages: z.number(),
    total: z.number(),
    next: z.number().optional().nullable(),
    prev: z.number().optional().nullable(),
  });
  
  export const metaSchema = z.object({
    pagination: paginationSchema,
  });