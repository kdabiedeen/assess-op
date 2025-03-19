"use client";
import React, { FormEvent } from "react";
import { useScheduleStore } from "@/store/scheduleStore";

export default function RuleForm({ handleSubmit }: { handleSubmit: (e: FormEvent) => Promise<void> }) {
    const {
        events,
        actions,
        selectedEvent,
        selectedAction,
        delaySeconds,
        setSelectedEvent,
        setSelectedAction,
        setDelaySeconds
    } = useScheduleStore();

    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Create Rule</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-gray-700">Select Event:</label>
                <select
                    className="w-full border p-2 text-gray-900 bg-white"
                    required
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                >
                    <option value="">Choose an event</option>
                    {Object.entries(events).map(([key, friendly]) => (
                        <option key={key} value={key}>
                            {typeof friendly === "string" ? friendly : String(friendly)}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Select Action:</label>
                <select
                    className="w-full border p-2 text-gray-900 bg-white"
                    required
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                >
                    <option value="">Choose an action</option>
                    {Object.entries(actions).map(([key, friendly]) => (
                        <option key={key} value={key}>
                            {typeof friendly === "string" ? friendly : String(friendly)}
                        </option>
                    ))}
                </select>

                <label className="block text-gray-700">Set Delay (seconds):</label>
                <input
                    type="number"
                    className="w-full border p-2 text-gray-900 bg-white"
                    value={delaySeconds}
                    onChange={(e) => setDelaySeconds(Math.max(0, Number(e.target.value)))}
                    min="0"
                    step="1"
                    placeholder="Enter delay in seconds"
                    required
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Create Rule
                </button>
            </form>
        </div>
    );
}
