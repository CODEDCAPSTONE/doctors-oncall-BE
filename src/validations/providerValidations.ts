import { z } from "zod";

// Common fields
const baseSchema = {
  name: z.string().min(3),
  civilID: z.string().regex(/^\d{12}$/),
  phoneNum: z.string().regex(/^\d{8}$/),
  email: z.string().email(),
  password: z.string().min(6),
  YOEX: z.coerce.number().min(0),
  licenseNum: z.string(),
  bio: z.string().optional(),
  specialization: z.string(),
};

// Doctor
export const doctorRegistrationSchema = z.object({
  ...baseSchema,
  hospitalOrClinicName: z.string().min(1),
});

// Nurse
export const nurseRegistrationSchema = z.object({
  ...baseSchema,
  companyName: z.string().min(1),
  languages: z.union([
    z.string(),
    z.array(z.string())
  ]).optional(),
});

// Lab
export const labRegistrationSchema = z.object({
  ...baseSchema,
  companyName: z.string().min(1),
});

// Physiotherapist
export const physiotherapistRegistrationSchema = z.object({
  ...baseSchema,
  companyName: z.string().min(1),
});
