"use client";
import React from "react";
import { useScheduleStore } from "@/store/scheduleStore";

export default function ManualTrigger({ handleTriggerEvent }: { handleTriggerEvent: () => void }) {
  const { events, triggerEvent, setTriggerEvent } = useScheduleStore();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Trigger Event</h3>
      <select
        className="w-full border p-2 text-gray-900 bg-white mb-4"
        value={triggerEvent}
        onChange={(e) => setTriggerEvent(e.target.value)}
      >
        <option value="">Select event to trigger</option>
        {Object.entries(events).map(([key, friendly]) => (
          <option key={key} value={key}>
            {typeof friendly === "string" ? friendly : String(friendly)}
          </option>
        ))}
      </select>
      <button
        onClick={handleTriggerEvent}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Trigger Event
      </button>
    </div>
  );
}
