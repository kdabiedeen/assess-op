import { Log } from "@/types/schedule.types";

export interface LogsSlice {
    logs: Log[];
    setLogs: (logs: Log[]) => void;
    fetchLogs: () => Promise<void>;
    deleteAllLogs: () => Promise<void>;
}

export const createLogsSlice = (set: any, get: any): LogsSlice => ({
    logs: [],
    setLogs: (logs: Log[]) => set({ logs }),
    fetchLogs: async () => {
        try {
            const res = await fetch("/api/logs");
            const data = (await res.json()) as Log[];
            set({ logs: data ?? [] });
        } catch (err) {
            console.error("❌ Error fetching logs:", err);
            set({ logs: [] });
        }
    },
    deleteAllLogs: async () => {
        try {
            const res = await fetch("/api/logs", { method: "DELETE" });
            if (res.ok) {
                set({ logs: [] });
            } else {
                console.error("❌ Error deleting logs:", res.statusText);
            }
        } catch (err) {
            console.error("❌ Error deleting logs:", err);
        }
    },
});
