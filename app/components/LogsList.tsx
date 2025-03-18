"use client";
import React from "react";
import { useScheduleStore } from "@/store/scheduleStore";
import { Log } from "@/types/schedule.types";

export default function LogsList() {
  const { logs } = useScheduleStore();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Execution Logs</h3>
      <ul className="bg-gray-100 p-4 rounded">
        {logs.length ? (
          logs.map((log: Log) => (
            <li key={log.id} className="border p-2 bg-white rounded text-gray-900 mb-2">
              <span className="text-sm text-gray-600">
                {new Date(log.createdAt).toLocaleString()}
              </span>
              <br />
              {log.message}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No logs available.</p>
        )}
      </ul>
    </div>
  );
}
