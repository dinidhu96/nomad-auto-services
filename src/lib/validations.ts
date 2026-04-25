import { z } from "zod";

export const phoneSchema = z.object({
  phone: z.string().min(7, "Enter a valid mobile number").max(24)
});

export const otpSchema = phoneSchema.extend({
  otp: z.string().length(6, "Enter the 6-digit OTP")
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
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10)
});
