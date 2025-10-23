"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseDtoSchema = exports.CreateCourseDtoSchema = exports.CourseDtoSchema = void 0;
const zod_1 = require("zod");
exports.CourseDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string().nullable(),
    updatedAt: zod_1.z.string().nullable(),
});
exports.CreateCourseDtoSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().nullable().optional(),
});
exports.UpdateCourseDtoSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().nullable().optional(),
});
//# sourceMappingURL=courses.js.map