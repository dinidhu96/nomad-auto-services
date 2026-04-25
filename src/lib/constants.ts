import type { Booking, PricingPlan, Service, Vehicle } from "@/lib/types";

export const brand = {
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(876) 555-0123",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "support@nomadautoservices.com",
  colors: {
    navy950: "#001240",
    navy900: "#061A54",
    navy800: "#08246D",
    navy700: "#123787",
    yellow500: "#F8B000",
    yellow400: "#FFC526",
    yellow300: "#FFD95F",
    success: "#27C46B",
    danger: "#FF4D4D"
  }
};

export const services: Service[] = [
  {
    id: "battery-jump-start",
    name: "Battery Jump Start",
    slug: "battery-jump-start",
    description: "Dead battery? We will get you back on the road fast.",
    base_price: 45,
    icon: "BatteryCharging",
    is_active: true
  },
  {
    id: "tire-replacement",
    name: "Tire Replacement",
    slug: "tire-replacement",
    description: "Flat tire? We bring the tools and help with the fix.",
    base_price: 55,
    icon: "Disc3",
    is_active: true
  },
  {
    id: "emergency-fuel-delivery",
    name: "Emergency Fuel Delivery",
    slug: "emergency-fuel-delivery",
    description: "Out of fuel? We deliver enough to get you moving.",
    base_price: 35,
    icon: "Fuel",
    is_active: true
  },
  {
    id: "on-site-mechanic",
    name: "On-site Mechanic",
    slug: "on-site-mechanic",
    description: "Mobile mechanic services for repairs on the spot.",
    base_price: 85,
    icon: "Wrench",
    is_active: true
  },
  {
    id: "towing-support",
    name: "Towing Support",
    slug: "towing-support",
    description: "Coordinated towing support when roadside repair is not enough.",
    base_price: 120,
    icon: "Truck",
    is_active: true
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic Roadside",
    description: "For occasional drivers who want reliable help on call.",
    price: 19,
    features: ["One active vehicle", "Jump start support", "Fuel delivery coordination", "Standard ETA"],
    is_active: true
  },
  {
    id: "standard",
    name: "Standard Assistance",
    description: "Balanced roadside coverage for daily drivers.",
    price: 39,
    features: ["Two active vehicles", "Priority dispatch", "Tire change support", "Service history"],
    is_active: true
  },
  {
    id: "premium",
    name: "Premium Care",
    description: "Fast response and wider coverage for families and fleets.",
    price: 79,
    features: ["Four active vehicles", "Premium response queue", "On-site mechanic checks", "Dedicated support line"],
    is_active: true
  }
];

export const demoVehicle: Vehicle = {
  id: "demo-vehicle",
  customer_id: "demo-customer",
  make: "Toyota",
  model: "Aqua",
  year: 2019,
  plate_number: "NOM-1024",
  color: "Blue"
};

export const demoBookings: Booking[] = [
  {
    id: "demo-booking-1001",
    customer_id: "demo-customer",
    service_id: "battery-jump-start",
    vehicle_id: "demo-vehicle",
    issue_description: "Battery is flat after parking overnight.",
    pickup_location: "Main Street, Kingston",
    latitude: null,
    longitude: null,
    scheduled_at: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    status: "on_the_way",
    assigned_technician_id: "demo-tech",
    estimated_arrival_minutes: 12,
    admin_notes: "Technician carrying portable jump pack.",
    created_at: new Date().toISOString(),
    service: { name: "Battery Jump Start", slug: "battery-jump-start", icon: "BatteryCharging" },
    customer: { full_name: "Demo Driver", phone: "+1 876 555 0101", email: "driver@example.com" },
    vehicle: demoVehicle
  }
];

export const statusOrder = [
  "pending",
  "accepted",
  "technician_assigned",
  "on_the_way",
  "arrived",
  "completed"
] as const;
