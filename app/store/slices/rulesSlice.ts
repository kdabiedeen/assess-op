import { Rule } from "@/types/schedule.types";

export interface RulesSlice {
    rules: Rule[];
    setRules: (rules: Rule[]) => void;
    fetchRules: () => Promise<void>;
}

export const createRulesSlice = (set: any, get: any): RulesSlice => ({
    rules: [] as Rule[],
    setRules: (rules: Rule[]) => set({ rules }),
    fetchRules: async () => {
        try {
            const res = await fetch("/api/rules");
            const data = (await res.json()) as Rule[];
            set({ rules: data ?? [] });
        } catch (err) {
            console.error("❌ Error fetching rules:", err);
            set({ rules: [] });
        }
    },
});
