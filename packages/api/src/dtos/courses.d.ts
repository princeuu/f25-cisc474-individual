import { z } from 'zod';
export declare const CourseDtoSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const CreateCourseDtoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const UpdateCourseDtoSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type CourseDto = z.infer<typeof CourseDtoSchema>;
export type CreateCourseDto = z.infer<typeof CreateCourseDtoSchema>;
export type UpdateCourseDto = z.infer<typeof UpdateCourseDtoSchema>;
//# sourceMappingURL=courses.d.ts.map