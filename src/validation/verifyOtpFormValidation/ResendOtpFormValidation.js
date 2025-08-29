import { z } from 'zod';

export const resendOtpSchema = z.object({
    newEmail: z.string().email('Invalid email address'),
    role: z.string(),
});