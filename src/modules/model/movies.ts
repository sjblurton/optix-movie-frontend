import { z } from "zod";
import { companySchema } from "./companies";

export const movieSchema = z.object({
  id: z.string(),
  reviews: z.array(z.number()),
  title: z.string(),
  filmCompanyId: z.string(),
  cost: z.number(),
  releaseYear: z.number(),
  company: companySchema,
});

export const moviesSchema = movieSchema.array();

export type Movie = z.infer<typeof movieSchema>;
