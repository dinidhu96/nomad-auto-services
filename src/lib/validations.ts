import { z } from "zod";

export const phoneSchema = z.object({
  phone: z.string().min(7, "Enter a valid mobile number").max(24)
});

export const otpSchema = phoneSchema.extend({
  otp: z.string().length(6, "Enter the 6-digit OTP"),
  fullName: z.string().min(2).optional().default("")
});

export const adminAuthSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2).optional()
});

export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  issueDescription: z.string().min(4),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  vehicleYear: z.coerce.number().min(1950).max(new Date().getFullYear() + 1),
  plateNumber: z.string().min(2),
  pickupLocation: z.string().min(4),
  scheduledAt: z.string().min(1),
  scheduleMode: z.enum(["now", "later"])
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  mobile: z.string().min(1, "Mobile is required"),
  message: z.string().min(10)
});

export const checkoutSchema = z.object({
  product_id: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(5),
  customer_name: z.string().optional().default(""),
  customer_email: z.string().email().optional().or(z.literal("")).default(""),
  customer_mobile: z.string().optional().default("")
});

export const plateSchema = z.object({
  plate: z
    .string()
    .transform((value) => value.trim().toUpperCase().replace(/[\s-]/g, ""))
    .pipe(z.string().min(1).max(10).regex(/^[A-Z0-9]+$/, "Plate must contain letters and numbers only")),
  state: z.enum(["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"]).default("WA")
});
