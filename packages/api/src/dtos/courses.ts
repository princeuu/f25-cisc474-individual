import {z} from 'zod';

export const CourseDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
  term: z.string().min(1).optional(),
  year: z.number().int().optional(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const CreateCourseDtoSchema = z.object({
  title: z.string().min(1),
  code: z.string().min(1),
  term: z.string().min(1).optional(),
  year: z.number().int().optional(),
});

export const UpdateCourseDtoSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  code: z.string().optional(),
  term: z.string().min(1).optional(),
  year: z.number().int().optional(),
});

export type CourseDto = z.infer<typeof CourseDtoSchema>;
export type CreateCourseDto = z.infer<typeof CreateCourseDtoSchema>;
export type UpdateCourseDto = z.infer<typeof UpdateCourseDtoSchema>;