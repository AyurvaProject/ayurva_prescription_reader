import { z } from 'zod';

export const prescriptionDetailFormSchema = z.object({
    product_license_no: z.string("Product license number is required").min(1, "Product license number is required"),
    mg: z.number().optional(),
    ml: z.number().optional(),
    insructions: z.string("Insructions are required"),
    quantity: z.number().optional(),
    days: z.number().optional(),
    times: z.number().optional(),
    frequency: z.string().optional(),
    moment_of_take: z.string().optional(),
    pres_id: z.number("Prescription id is required"),
});