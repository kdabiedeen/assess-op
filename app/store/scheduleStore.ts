import { create } from "zustand";
import { createLogsSlice, LogsSlice } from "./slices/logsSlice";
import { createEventsSlice, EventsSlice } from "./slices/eventsSlice";
import { createActionsSlice, ActionsSlice } from "./slices/actionsSlice";
import { createRulesSlice, RulesSlice } from "./slices/rulesSlice";
import { createScheduledActionsSlice, ScheduledActionsSlice } from "./slices/scheduledActionsSlice";
import { createNlpSlice, NlpSlice } from "./slices/nlpSlice";
import { createTriggerEventSlice, TriggerEventSlice } from "./slices/triggerEventSlice";

export type ScheduleState = LogsSlice &
    EventsSlice &
    ActionsSlice &
    RulesSlice &
    ScheduledActionsSlice &
    NlpSlice &
    TriggerEventSlice;

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  ...createLogsSlice(set, get),
  ...createEventsSlice(set, get),
  ...createActionsSlice(set, get),
  ...createRulesSlice(set, get),
  ...createScheduledActionsSlice(set, get),
  ...createNlpSlice(set, get),
  ...createTriggerEventSlice(set, get),
}));
