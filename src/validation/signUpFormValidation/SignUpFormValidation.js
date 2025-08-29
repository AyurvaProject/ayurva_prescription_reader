import { z } from 'zod';

export const signupFormSchema = z.object({
    user_name: z.string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters'),

    pr_name: z.string()
    .min(4, 'Pr name must be at least 4 characters')
    .max(20, 'Pr name must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Pr name can only contain letters, numbers, and underscores'),

    pr_email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters'),

    pr_contact_no: z.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(10, 'Contact number must be at most 10 digits')
    .regex(/^\d+$/, 'Contact number can only contain digits'),

    password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be at most 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  
  confirmPassword: z.string(),

  pr_address_l1: z.string()
  .min(4, 'Address line 1 must be at least 4 characters')
  .max(100, 'Address line 1 must be at most 100 characters'),
  
  pr_address_l2: z.string()
  .min(4, 'Address line 2 must be at least 4 characters')
  .max(100, 'Address line 2 must be at most 100 characters'),
  
  pr_address_l3: z.string()
  .min(4, 'Address line 3 must be at least 4 characters')
  .max(100, 'Address line 3 must be at most 100 characters'),

  pr_district: z.string()
  .min(4, 'District must be at least 4 characters')
  .max(100, 'District must be at most 100 characters'),
  
  pr_bio: z.string()
  .min(4, 'Bio must be at least 4 characters')
  .max(1000, 'Bio must be at most 100 characters'),

  role: z.string(),

  pr_nic_front: z.any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "NIC front image is required",
      }
    ),

    pr_nic_back: z.any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "NIC back image is required",
      }
    ),

    pr_profile_pic: z.any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Profile picture is required",
      }
    ),

    qualification_doc: z.any()
    .refine(
      (file) =>
        file instanceof File || (typeof file === "string" && file.length > 0),
      {
        message: "Qualification document is required",
      }
    ),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});