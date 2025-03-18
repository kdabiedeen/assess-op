// src/types/scheduleTypes.ts

export interface EventMap {
    [key: string]: string;
  }
  
  export interface ActionMap {
    [key: string]: string;
  }
  
  export interface Rule {
    id: number;
    event: string;
    action: string;
    delay: number;
  }
  
  export interface ScheduledAction {
    id: number;
    event: string;
    action: string;
    completionTime: string;
  }
  
  export interface Log {
    id: number;
    message: string;
    createdAt: string;
  }
  