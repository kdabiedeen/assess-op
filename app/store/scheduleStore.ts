// store/scheduleStore.ts
import { create } from "zustand";
import { EventMap, ActionMap, Rule, ScheduledAction, Log } from "@/types/schedule.types";

interface ScheduleState {
  events: EventMap;
  actions: ActionMap;
  rules: Rule[];
  scheduledActions: ScheduledAction[];
  logs: Log[];
  selectedEvent: string;
  selectedAction: string;
  delaySeconds: number;
  nlpInput: string;
  triggerEvent: string;
  // Setters
  setEvents: (events: EventMap) => void;
  setActions: (actions: ActionMap) => void;
  setRules: (rules: Rule[]) => void;
  setScheduledActions: (scheduledActions: ScheduledAction[]) => void;
  setLogs: (logs: Log[]) => void;
  setSelectedEvent: (value: string) => void;
  setSelectedAction: (value: string) => void;
  setDelaySeconds: (value: number) => void;
  setNlpInput: (value: string) => void;
  setTriggerEvent: (value: string) => void;
  // Fetching functions
  fetchEvents: () => Promise<void>;
  fetchActions: () => Promise<void>;
  fetchRules: () => Promise<void>;
  fetchScheduledActions: () => Promise<void>;
  fetchLogs: () => Promise<void>;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  // initial state
  events: {} as EventMap,
  actions: {} as ActionMap,
  rules: [] as Rule[],
  scheduledActions: [] as ScheduledAction[],
  logs: [] as Log[],
  selectedEvent: "",
  selectedAction: "",
  delaySeconds: 0,
  nlpInput: "",
  triggerEvent: "",
  // setters
  setEvents: (events: EventMap) => set({ events }),
  setActions: (actions: ActionMap) => set({ actions }),
  setRules: (rules: Rule[]) => set({ rules }),
  setScheduledActions: (scheduledActions: ScheduledAction[]) => set({ scheduledActions }),
  setLogs: (logs: Log[]) => set({ logs }),
  setSelectedEvent: (selectedEvent: string) => set({ selectedEvent }),
  setSelectedAction: (selectedAction: string) => set({ selectedAction }),
  setDelaySeconds: (delaySeconds: number) => set({ delaySeconds }),
  setNlpInput: (nlpInput: string) => set({ nlpInput }),
  setTriggerEvent: (triggerEvent: string) => set({ triggerEvent }),
  // fetching functions
  fetchEvents: async (): Promise<void> => {
    try {
      const res = await fetch("/api/events");
      const data = (await res.json()) as EventMap;
      set({ events: data ?? {} });
    } catch (err) {
      console.error("❌ Error fetching events:", err);
      set({ events: {} });
    }
  },
  fetchActions: async (): Promise<void> => {
    try {
      const res = await fetch("/api/actions");
      const data = (await res.json()) as ActionMap;
      set({ actions: data ?? {} });
    } catch (err) {
      console.error("❌ Error fetching actions:", err);
      set({ actions: {} });
    }
  },
  fetchRules: async (): Promise<void> => {
    try {
      const res = await fetch("/api/rules");
      const data = (await res.json()) as Rule[];
      set({ rules: data ?? [] });
    } catch (err) {
      console.error("❌ Error fetching rules:", err);
      set({ rules: [] });
    }
  },
  fetchScheduledActions: async (): Promise<void> => {
    try {
      const res = await fetch("/api/scheduled-actions");
      const data = (await res.json()) as ScheduledAction[];
      set({ scheduledActions: data ?? [] });
    } catch (err) {
      console.error("❌ Error fetching scheduled actions:", err);
    }
  },
  fetchLogs: async (): Promise<void> => {
    try {
      const res = await fetch("/api/logs");
      const data = (await res.json()) as Log[];
      set({ logs: data ?? [] });
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      set({ logs: [] });
    }
  },
}));
