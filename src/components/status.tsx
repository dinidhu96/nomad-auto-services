import { statusOrder } from "@/lib/constants";
import type { BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const labels: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  technician_assigned: "Technician Assigned",
  on_the_way: "On the Way",
  arrived: "Arrived",
  completed: "Completed",
  cancelled: "Cancelled"
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const tone =
    status === "cancelled"
      ? "border-[#FF4D4D]/50 bg-[#FF4D4D]/15 text-[#FFB3B3]"
      : status === "completed"
        ? "border-[#27C46B]/50 bg-[#27C46B]/15 text-[#8EF3B8]"
        : "border-[#FFC526]/50 bg-[#FFC526]/15 text-[#FFD95F]";

  return <span className={cn("rounded-full border px-3 py-1 text-xs font-bold", tone)}>{labels[status]}</span>;
}

export function BookingTimeline({ status }: { status: BookingStatus }) {
  const current = statusOrder.indexOf(status as (typeof statusOrder)[number]);
  return (
    <div className="grid gap-3">
      {statusOrder.map((item, index) => {
        const active = index <= current && status !== "cancelled";
        return (
          <div key={item} className="flex items-center gap-3">
            <span className={cn("h-4 w-4 rounded-full border", active ? "border-[#FFC526] bg-[#FFC526]" : "border-white/25 bg-white/5")} />
            <span className={cn("text-sm font-semibold", active ? "text-white" : "text-[#8FA4D4]")}>{labels[item]}</span>
          </div>
        );
      })}
    </div>
  );
}
