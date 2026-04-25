import {
  BatteryCharging,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock3,
  Disc3,
  Fuel,
  Gauge,
  Home,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  ToolCase,
  Truck,
  User,
  Users,
  Wrench,
  XCircle
} from "lucide-react";

export const iconMap = {
  BatteryCharging,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock3,
  Disc3,
  Fuel,
  Gauge,
  Home,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  ToolCase,
  Truck,
  User,
  Users,
  Wrench,
  XCircle
};

export type IconName = keyof typeof iconMap;

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = iconMap[(name as IconName) || "Wrench"] || Wrench;
  return <Icon className={className} aria-hidden />;
}
