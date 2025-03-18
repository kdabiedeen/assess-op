export const ACTIONS: Record<string, string> = {
    send_email: "Send Email",
    send_slack_notification: "Send Slack Notification",
    send_native_notification: "Send Native Notification",
    create_task: "Create Task",
    turn_on_device: "Turn On Device",
    turn_off_device: "Turn Off Device",
    send_sms: "Send SMS",
    send_whatsapp_message: "Send WhatsApp Message",
    update_calendar_event: "Update Calendar Event",
    assign_cleaner: "Assign Cleaner",
    escalate_issue: "Escalate Issue",
    generate_report: "Generate Report",
    log_event: "Log Event",
    send_invoice: "Send Invoice",
    reschedule_cleaning: "Reschedule Cleaning",
    reminder_notification: "Reminder Notification",
  };

export const ACTION_SYNONYMS: Record<string, string[]> = {
    send_email: [
        "dispatch an email",
        "email the customer",
        "send an email notification",
        "email alert"
    ],
    send_slack_notification: [
        "slack alert",
        "send slack message",
        "notify via slack",
        "slack notification sent"
    ],
    send_native_notification: [
        "push notification",
        "app alert",
        "mobile notification",
        "native alert"
    ],
    create_task: [
        "initiate a task",
        "log a task",
        "create a new task",
        "task creation"
    ],
    turn_on_device: [
        "activate device",
        "switch on device",
        "power on the device",
        "enable device"
    ],
    turn_off_device: [
        "deactivate device",
        "switch off device",
        "power down device",
        "disable device"
    ],
    send_sms: [
        "text message",
        "send a text",
        "SMS alert",
        "mobile text"
    ],
    send_whatsapp_message: [
        "whatsapp alert",
        "send whatsapp message",
        "whatsapp notification",
        "chat on whatsapp"
    ],
    update_calendar_event: [
        "modify calendar event",
        "change the appointment",
        "update the schedule",
        "adjust event in calendar"
    ],
    assign_cleaner: [
        "delegate cleaning",
        "schedule cleaning service",
        "assign housekeeping",
        "allocate cleaning staff"
    ],
    escalate_issue: [
        "raise an issue",
        "forward the problem",
        "bump up the issue",
        "elevate the concern"
    ],
    generate_report: [
        "create report",
        "produce report",
        "report generation",
        "compile a report"
    ],
    log_event: [
        "record the event",
        "register an event",
        "event logging",
        "log occurrence"
    ],
    send_invoice: [
        "dispatch invoice",
        "invoice the client",
        "billing notice",
        "send billing statement"
    ],
    reschedule_cleaning: [
        "change cleaning time",
        "postpone cleaning",
        "update cleaning schedule",
        "rearrange cleaning"
    ],
    reminder_notification: [
        "send reminder",
        "reminder alert",
        "notification reminder",
        "alert for reminder"
    ],
};
