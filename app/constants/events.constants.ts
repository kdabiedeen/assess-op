export const EVENTS: Record<string, string> = {
    // Guest-related events
    guest_checked_in: "Guest Checked In",
    guest_checked_out: "Guest Checked Out",
    guest_damage_reported: "Guest Damage Reported",
    lost_item_reported: "Lost Item Reported",

    // Cleaning events
    cleaning_requested: "Cleaning Requested",
    cleaning_completed: "Cleaning Completed",
    cleaning_issue_escalated: "Cleaning Issue Escalated",

    // Maintenance events
    maintenance_task_created: "Maintenance Task Created",
    maintenance_team_notified: "Maintenance Team Notified",

    // Climate control events
    temperature_increased: "Temperature Increased",
    temperature_decreased: "Temperature Decreased",
    bedroom_thermostat_adjusted: "Bedroom Thermostat Adjusted",
    living_room_thermostat_adjusted: "Living Room Thermostat Adjusted",

    // Security and access events
    front_door_locked: "Front Door Locked",
    front_door_unlocked: "Front Door Unlocked",
    back_door_locked: "Back Door Locked",
    back_door_unlocked: "Back Door Unlocked",
    smart_lock_engaged: "Smart Lock Engaged",
    smart_lock_released: "Smart Lock Released",

    // Smart home automation events
    noise_control_activated: "Noise Control Activated",
    noise_control_deactivated: "Noise Control Deactivated",
    sound_system_turned_on: "Sound System Turned On",
    sound_system_turned_off: "Sound System Turned Off",
    lights_turned_on: "Lights Turned On",
    lights_turned_off: "Lights Turned Off",
};

export const EVENT_SYNONYMS: Record<string, string[]> = {
    // Guest-related events
    guest_checked_in: [
        "guest has arrived",
        "arrival of guest",
        "check in completed",
        "new arrival"
    ],
    guest_checked_out: [
        "guest departed",
        "guest left",
        "departure completed",
        "check out finished"
    ],
    guest_damage_reported: [
        "damage incident reported",
        "report of guest damage",
        "damage noticed by guest",
        "damage complaint"
    ],
    lost_item_reported: [
        "missing item report",
        "item not found",
        "lost property noticed",
        "report of missing item"
    ],
    // Cleaning events
    cleaning_requested: [
        "need for cleaning",
        "cleaning service requested",
        "cleaning assistance needed"
    ],
    cleaning_completed: [
        "cleaning finished",
        "cleaning done",
        "cleaning successfully completed"
    ],
    cleaning_issue_escalated: [
        "cleaning problem escalated",
        "issue with cleaning raised",
        "cleaning concern forwarded"
    ],
    // Maintenance events
    maintenance_task_created: [
        "maintenance work scheduled",
        "maintenance required initiated",
        "maintenance order placed"
    ],
    maintenance_team_notified: [
        "maintenance alerted",
        "maintenance staff informed",
        "maintenance crew notified"
    ],
    // Climate control events
    temperature_increased: [
        "temperature went up",
        "warmer setting applied",
        "heat level increased"
    ],
    temperature_decreased: [
        "temperature dropped",
        "cooling applied",
        "chill level increased"
    ],
    bedroom_thermostat_adjusted: [
        "bedroom climate changed",
        "adjusted temperature in bedroom",
        "bedroom heating/cooling modified"
    ],
    living_room_thermostat_adjusted: [
        "living area climate updated",
        "adjusted temperature in living room",
        "living room climate control modified"
    ],
    // Security and access events
    front_door_locked: [
        "secured the front entrance",
        "front access secured",
        "main door locked"
    ],
    front_door_unlocked: [
        "front entrance opened",
        "unsecured the main door",
        "front door access granted"
    ],
    back_door_locked: [
        "secured the rear entrance",
        "back access secured",
        "rear door locked"
    ],
    back_door_unlocked: [
        "rear entrance opened",
        "back access granted",
        "unsecured the back door"
    ],
    smart_lock_engaged: [
        "activated smart security",
        "smart lock enabled",
        "engaged electronic lock"
    ],
    smart_lock_released: [
        "deactivated smart security",
        "smart lock disabled",
        "released electronic lock"
    ],
    // Smart home automation events
    noise_control_activated: [
        "turned on noise control",
        "activated sound dampening",
        "noise suppression engaged"
    ],
    noise_control_deactivated: [
        "turned off noise control",
        "deactivated sound dampening",
        "noise suppression disengaged"
    ],
    sound_system_turned_on: [
        "activated sound system",
        "audio system powered up",
        "sound playback started"
    ],
    sound_system_turned_off: [
        "deactivated sound system",
        "audio system powered down",
        "sound playback stopped"
    ],
    lights_turned_on: [
        "activated lighting",
        "illumination turned on",
        "lights switched on"
    ],
    lights_turned_off: [
        "deactivated lighting",
        "illumination turned off",
        "lights switched off"
    ],
};
