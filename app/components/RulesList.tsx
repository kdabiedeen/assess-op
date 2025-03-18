"use client";
import React from "react";
import { useScheduleStore } from "@/store/scheduleStore";
import { Rule } from "@/types/schedule.types";

interface RulesListProps {
  handleDeleteRule: (id: number) => void;
}

export default function RulesList({ handleDeleteRule }: RulesListProps) {
  const { rules, events, actions } = useScheduleStore();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Current Rules</h3>
      <ul className="bg-gray-100 p-4 rounded">
        {rules.length ? (
          rules.map((rule: Rule) => (
            <li key={rule.id} className="relative border p-2 bg-white rounded text-gray-900 mb-2">
              <div>
                <strong>{events[rule.event] || rule.event}</strong>
                <br />
                <span>→ {actions[rule.action] || rule.action}</span>
                <br />
                <span className="text-sm text-gray-600">Delay: {rule.delay} seconds</span>
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteRule(rule.id);
                }}
                className="absolute bottom-0 right-0 mb-2 mr-2 text-sm text-red-500 hover:underline"
              >
                Delete
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No rules available.</p>
        )}
      </ul>
    </div>
  );
}
