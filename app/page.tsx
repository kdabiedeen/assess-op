// app/page.tsx
"use client";
import { useEffect, FormEvent } from "react";
import NlpProcessor from "@/components/NlpProcessor";
import RuleForm from "@/components/RuleForm";
import ManualTrigger from "@/components/ManualTrigger";
import ScheduledActions from "@/components/ScheduledActions";
import RulesList from "@/components/RulesList";
import LogsList from "@/components/LogsList";
import { useScheduleStore } from "@/store/scheduleStore";

export default function ScheduleActionPage() {
  // Destructure state, setters, and fetching functions from Zustand store
  const {
    events,
    actions,
    rules,
    scheduledActions,
    logs,
    selectedEvent,
    selectedAction,
    delaySeconds,
    triggerEvent,
    setNlpInput,
    fetchEvents,
    fetchActions,
    fetchRules,
    fetchScheduledActions,
    fetchLogs,
  } = useScheduleStore();

  // Initial data fetch
  useEffect(() => {
    fetchEvents();
    fetchActions();
    fetchRules();
    fetchLogs();
  }, [fetchEvents, fetchActions, fetchRules, fetchLogs]);

  // Periodically update scheduled actions, rules, and logs
  useEffect(() => {
    fetchScheduledActions();
    const interval = setInterval(() => {
      fetchScheduledActions();
      fetchRules();
      fetchLogs();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchScheduledActions, fetchRules, fetchLogs]);

  // Handle rule creation (scheduling an action)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !selectedAction || delaySeconds < 0) {
      alert("Please select an event, an action, and a valid delay.");
      return;
    }
    try {
      const response = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: selectedEvent,
          action: selectedAction,
          delay: delaySeconds,
        }),
      });
      if (response.ok) {
        alert("Rule created successfully!");
        fetchRules();
      } else {
        alert("Failed to create rule.");
      }
    } catch (error) {
      console.error("❌ Error creating rule:", error);
      alert("Error creating rule.");
    }
  };

  // Handle rule deletion
  const handleDeleteRule = async (id: number) => {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    try {
      const response = await fetch(`/api/rules?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Rule deleted successfully!");
        fetchRules();
      } else {
        alert("Failed to delete rule.");
      }
    } catch (error) {
      console.error("❌ Error deleting rule:", error);
      alert("Error deleting rule.");
    }
  };

  // Handle manual event trigger
  const handleTriggerEvent = async () => {
    if (!triggerEvent) {
      alert("Please select an event to trigger!");
      return;
    }
    try {
      const response = await fetch("/api/scheduled-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: triggerEvent }),
      });
      if (response.ok) {
        alert("Event triggered successfully!");
        fetchScheduledActions();
      } else {
        alert("Failed to trigger event.");
      }
    } catch (error) {
      console.error("❌ Error triggering event:", error);
      alert("Error triggering event.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <NlpProcessor />
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Schedule an Action</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-6">
          <RuleForm handleSubmit={handleSubmit} />
          <ManualTrigger handleTriggerEvent={handleTriggerEvent} />
        </div>
        <ScheduledActions />
        <RulesList handleDeleteRule={handleDeleteRule} />
        <LogsList />
      </div>
    </div>
  );
}
