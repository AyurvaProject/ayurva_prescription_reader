import { z } from 'zod';

export const verifyOtpSchema = z.object({
    otp: z.string().min(6, 'OTP must be at least 6 digits').max(6, 'OTP must be at most 6 digits'),
    role: z.string(),
});