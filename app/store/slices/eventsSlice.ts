import { EventMap } from "@/types/schedule.types";

export interface EventsSlice {
    events: EventMap;
    setEvents: (events: EventMap) => void;
    fetchEvents: () => Promise<void>;
}

export const createEventsSlice = (set: any, get: any): EventsSlice => ({
    events: {} as EventMap,
    setEvents: (events: EventMap) => set({ events }),
    fetchEvents: async () => {
        try {
            const res = await fetch("/api/events");
            const data = (await res.json()) as EventMap;
            set({ events: data ?? {} });
        } catch (err) {
            console.error("❌ Error fetching events:", err);
            set({ events: {} });
        }
    },
});
