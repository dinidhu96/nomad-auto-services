"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, Textarea } from "@/components/ui/field";
import type { BookingStatus } from "@/lib/types";

export function AdminBookingActions({ id }: { id: string }) {
  const [status, setStatus] = useState<BookingStatus>("accepted");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  async function update() {
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status, admin_notes: notes })
    });
    setMessage(response.ok ? "Booking updated." : "Unable to update booking.");
  }

  return (
    <div className="grid gap-3">
      <Select value={status} onChange={(event) => setStatus(event.target.value as BookingStatus)}>
        <option value="accepted">Accept booking</option>
        <option value="technician_assigned">Assign technician</option>
        <option value="on_the_way">Technician on the way</option>
        <option value="arrived">Arrived</option>
        <option value="completed">Mark completed</option>
        <option value="cancelled">Cancel booking</option>
      </Select>
      <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Admin notes" />
      <Button onClick={update}>Update booking</Button>
      {message && <p className="text-sm font-bold text-[#FFC526]">{message}</p>}
    </div>
  );
}
