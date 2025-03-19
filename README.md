# Project Overview

This project focuses on designing an efficient scheduled events architecture for a lightweight backend system. The solution addresses the challenges of scheduling, persistence, and execution of events, along with a simple frontend interface for testing and interaction.

## Identifying the Core Challenge

My approach to any project begins by identifying areas that require the most attention. In this case, the primary challenge was designing a lightweight scheduled events architecture. After reviewing the requirements, it became clear that we could leverage built-in JavaScript features (such as `setTimeout` and persistence) to achieve this.

## Breaking Down the Problem

To architect a solution for scheduled actions, I decomposed the problem into several key components:

### Executing Actions at Specific Times

- **Challenge:** Execute an action at a predetermined time.
- **Considerations:** Tools like Redis with Bull are commonly used for scheduling, but they were deemed overly complex for the lightweight requirements of this project.
- **Solution:** Leverage the built-in `setTimeout` function. Although it relies on the event loop’s timer phases and isn’t designed for millisecond precision, accuracy to the nearest second is sufficient.

### Ensuring Persistence Across Restarts

- **Challenge:** Handling server crashes or restarts, which would clear any pending events.
- **Solution:** Store each scheduled action along with its calculated completion time and execution status. This persistence allows the system to reinitialize pending `setTimeout` callbacks upon restart, ensuring that no scheduled action is lost.

### Generating Scheduled Actions via Rule Templates

- **Approach:** Introduce a "Rules" schema that acts as a template.
    - A rule encapsulates the event-to-action mapping and defines a delay period used to calculate the action's completion time.
    - This one-to-many relationship allows a single rule to generate multiple scheduled actions.
- **Process:**
    - **Rule Creation:** Define a template by selecting an event, an action, and a delay.
    - **Action Scheduling:** Compute the scheduled action's completion time as the current time plus the delay specified by the rule.

With these models in place, the backend can reliably manage scheduled events.

## Implementation and Technology Stack

- **Database:** PostgreSQL, chosen for its robust support for relational data. I used [neon.tech](https://neon.tech) as the database solution.
- **Application Framework:** Next.js, which supports a fullstack development environment and enables straightforward deployment via Vercel.

## Services Overview

Two primary services form the core of this architecture:

### Executor Service

- **Responsibilities:**
    - Execute actions immediately or at scheduled times.
    - Handle overdue actions (e.g., due to delays or previous failures to trigger).

### Scheduler Service

- **Responsibilities:**
    - Manage the lifecycle of scheduled actions by creating new actions based on rule templates.
    - Trigger immediate actions when necessary.
    - Reinitialize `setTimeout` callbacks on server restarts to maintain continuity.

## Frontend and Additional Features

Once the backend was set up, I developed a barebones frontend to test the functionality. The frontend includes:

- A simple interface where users can select an event, action, and delay.
- Logic to trigger an event. If a corresponding rule exists in the database, the system either sets a `setTimeout` based on the scheduled completion time or runs the event immediately.
- A **Log** table to capture records of completed events (both scheduled and immediate). A dedicated component rerenders when new logs are available.
- A component to display scheduled events, providing users with a clear view of pending executions.

## Natural Language Parsing

For natural language input parsing, the goal was to return specific keys that our application understands to set events and actions. Key challenges included:

- **Prompt Size:** Initially, only event and action keys were sent, but this limited the parsing accuracy.
- **Handling Ambiguity:** The parser sometimes hallucinated keys despite clear instructions.

**Improvements:**  
I considered using a fine-tuned model with all keys and additional synonyms preloaded into GPT's training. However, due to the requirement of supporting any OpenAI key, a fine-tuned model would only be local to the key it was built on. Instead, I implemented the following improvements:

- Added checks in the OpenAI service to ensure that responses match supported keys.
- Incorporated synonyms for events and actions to provide more context, significantly improving accuracy.
- Provided explicit instructions in the prompt to clearly describe GPT's role and its end goal.

Once the model returns the best information, the global state of the React frontend is updated, allowing changes to be easily edited in the rule creator component.

## State Management

I chose **zustand** for state management because it centralizes logic and simplifies the application's overall structure. This design decision has made the project much easier to work with and maintain.

## Conclusion

Overall, I had a lot of fun working on this project. I placed strong emphasis on project organization and delegated specific responsibilities to each service accordingly. The result is a robust, scalable solution that effectively handles scheduled events while providing clear insights into event execution.

## Setup

1. Create a `.env.local` file in the root directory with the following variables:

   ```env
    OPENAI_API_KEY=your_openai_api_key
    DATABASE_URL=your_database_url
    ```
2. Install dependencies and run locally or view live.

   ```aiignore
    npm install
    npm run dev```

3. You can view the project locally at: [http://localhost:3000](http://localhost:3000) or live at: [https://assess-op.vercel.app/](https://assess-op.vercel.app/)


