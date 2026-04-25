export type UserRole = "customer" | "admin" | "dispatcher" | "technician";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "technician_assigned"
  | "on_the_way"
  | "arrived"
  | "completed"
  | "cancelled";

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  icon: string;
  is_active: boolean;
};

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  is_active: boolean;
};

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  is_active: boolean;
};

export type Vehicle = {
  id: string;
  customer_id: string;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  color: string;
};

export type Booking = {
  id: string;
  customer_id: string;
  service_id: string;
  vehicle_id: string | null;
  issue_description: string | null;
  pickup_location: string;
  latitude: number | null;
  longitude: number | null;
  scheduled_at: string;
  status: BookingStatus;
  assigned_technician_id: string | null;
  estimated_arrival_minutes: number | null;
  admin_notes: string | null;
  created_at: string;
  service?: Pick<Service, "name" | "slug" | "icon"> | null;
  customer?: Pick<Profile, "full_name" | "phone" | "email"> | null;
  vehicle?: Vehicle | null;
};
