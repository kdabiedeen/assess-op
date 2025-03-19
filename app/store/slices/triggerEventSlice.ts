export interface TriggerEventSlice {
    triggerEvent: string;
    setTriggerEvent: (value: string) => void;
}

export const createTriggerEventSlice = (set: any, get: any): TriggerEventSlice => ({
    triggerEvent: "",
    setTriggerEvent: (triggerEvent: string) => set({ triggerEvent }),
});
