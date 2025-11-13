# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Process Documentation Tool (SOP Generator) that helps businesses document their processes through conversational interviews. It generates SOPs, process flowcharts, and gap analysis reports.

**Tech Stack**: Next.js 14+ (App Router), TypeScript, TailwindCSS, Mermaid.js

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

### Data Flow

The application follows a linear flow:
1. **Process Setup** (`/process/new`) → Creates Process object
2. **Interview** (`/process/[id]/interview`) → Captures ProcessStep objects via conversational Q&A
3. **Review** (`/process/[id]/review`) → Shows visual flowchart and captured data
4. **Export** (`/process/[id]/export`) → Generates SOP, flowchart, and gap analysis documents

### Core Data Models

Located in `types/index.ts`:

- **Process**: Metadata about the business process (name, description, owner, category, status)
- **ProcessStep**: Individual step details (step_name, role_responsible, systems_used, inputs, outputs, time_estimate, pain_points, etc.)
- **InterviewSession**: Tracks interview progress (current_step, conversation_history)
- **ConversationMessage**: Chat messages between user and assistant

### localStorage Persistence

The MVP uses browser localStorage with these keys:
- `processes` - Array of all Process objects
- `interview_${processId}` - Interview session state (messages, steps, currentQuestionIndex)
- `steps_${processId}` - Array of ProcessStep objects for a process

### Interview System

The interview page (`app/process/[id]/interview/page.tsx`) uses a **hardcoded question flow** in the `questionFlow` array. This is MVP implementation - Phase 2 will replace this with Claude API for intelligent follow-up questions.

The question flow cycles through:
1. Process trigger → 2. First step name → 3. Role responsible → 4. Systems used → 5. Inputs → 6. Outputs → 7. Time estimate → 8. Pain points → 9. Next step (loops back to step 3 for each new step)

### Export System

Three exporter modules in `lib/exporters/`:

1. **sop.ts**: Generates markdown/text SOPs with process overview, detailed steps, and quick reference table
2. **flowchart.ts**: Generates Mermaid flowchart syntax (linear graph TD format and swimlane format)
3. **gap-analysis.ts**: Analyzes process for:
   - Documentation gaps (missing details)
   - Manual handoffs (email, Excel, manual processes)
   - Single points of failure (individual dependencies)
   - Bottlenecks (delays, waits mentioned in pain_points)
   - Recommendations based on detected issues

### Visualization

`components/ProcessFlow.tsx` renders Mermaid diagrams client-side. It:
- Initializes Mermaid with `securityLevel: "loose"`
- Generates graph TD format with Start → Steps → End
- Sanitizes step names to prevent Mermaid syntax errors
- Shows role_responsible in italics under each step node

## Key Implementation Notes

- All pages under `/process/[id]/` are client components (`"use client"`) that interact with localStorage
- Process IDs are generated using `Date.now().toString()`
- The interview page auto-saves session state to localStorage after each answer
- ProcessStep.sequence_order is the array index (0-based)
- Systems, inputs, and outputs are parsed as comma-separated strings
- Gap analysis uses keyword matching (e.g., "manual", "delay", "slow") to detect issues

## Future Enhancements (Phase 2)

Documented in README but not yet implemented:
- Claude API integration for smart follow-ups
- PDF export
- Swimlane diagrams by role
- Database persistence (replacing localStorage)
- Multi-user collaboration
