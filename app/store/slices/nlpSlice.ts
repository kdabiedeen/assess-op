export interface NlpSlice {
    selectedEvent: string;
    selectedAction: string;
    delaySeconds: number;
    nlpInput: string;
    setSelectedEvent: (value: string) => void;
    setSelectedAction: (value: string) => void;
    setDelaySeconds: (value: number) => void;
    setNlpInput: (value: string) => void;
}

export const createNlpSlice = (set: any, get: any): NlpSlice => ({
    selectedEvent: "",
    selectedAction: "",
    delaySeconds: 0,
    nlpInput: "",
    setSelectedEvent: (selectedEvent: string) => set({ selectedEvent }),
    setSelectedAction: (selectedAction: string) => set({ selectedAction }),
    setDelaySeconds: (delaySeconds: number) => set({ delaySeconds }),
    setNlpInput: (nlpInput: string) => set({ nlpInput }),
});
