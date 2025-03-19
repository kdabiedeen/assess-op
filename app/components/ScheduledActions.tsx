"use client";
import React from "react";
import { useScheduleStore } from "@/store/scheduleStore";
import { ScheduledAction } from "@/types/schedule.types";

export default function ScheduledActions() {
    const { scheduledActions, events, actions } = useScheduleStore();

    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Scheduled Actions</h3>
            <ul className="bg-gray-100 p-4 rounded">
                {scheduledActions.length ? (
                    scheduledActions.map((scheduledAction: ScheduledAction) => (
                        <li key={scheduledAction.id} className="border p-2 bg-white rounded text-gray-900 mb-2">
                            <strong>{events[scheduledAction.event] || scheduledAction.event}</strong> → {actions[scheduledAction.action] || scheduledAction.action}
                            <br/>
                            <span className="text-sm text-gray-600">
                Executes at: {new Date(scheduledAction.completionTime).toLocaleString()}
              </span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No scheduled actions.</p>
                )}
            </ul>
        </div>
    );
}
