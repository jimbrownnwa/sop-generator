# Process Documentation Tool (SOP Generator)

A guided interview tool that helps businesses document their processes through conversational Q&A, then automatically generates SOPs, technical process flows, and gap analysis reports.

## Features

- **Conversational Interview UI** - Chat-like interface guides users through documenting their process
- **Real-time Process Visualization** - Mermaid flowcharts build as you document
- **Multi-format Export**:
  - Standard Operating Procedure (SOP) in Markdown
  - Process flowchart in Mermaid format
  - Gap Analysis Report identifying bottlenecks and improvement opportunities
- **Local Storage Persistence** - Save progress and resume later
- **Review & Edit** - Review captured steps and make adjustments before export

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Usage Flow

1. **Create Process** - Name your process, describe it, assign an owner
2. **Interview** - Answer guided questions about each process step
3. **Review** - See the visual flowchart and edit any details
4. **Export** - Download SOP, flowchart, and gap analysis

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Diagrams**: Mermaid.js
- **Storage**: Browser localStorage (MVP)

## Project Structure

```
sop-generator/
├── app/                          # Next.js app router
│   ├── page.tsx                 # Landing page
│   ├── process/
│   │   ├── new/                 # Process setup
│   │   └── [id]/
│   │       ├── interview/       # Conversational interview
│   │       ├── review/          # Review & edit
│   │       └── export/          # Export options
├── components/                   # React components
│   └── ProcessFlow.tsx          # Mermaid flowchart component
├── lib/
│   └── exporters/               # Export logic
│       ├── sop.ts               # SOP generation
│       ├── gap-analysis.ts      # Gap analysis
│       └── flowchart.ts         # Flowchart generation
└── types/
    └── index.ts                 # TypeScript definitions
```

## Roadmap

### MVP (Current)
- ✅ Conversational interview UI
- ✅ Process step capture
- ✅ Real-time flowchart generation
- ✅ SOP, flowchart, and gap analysis export
- ✅ localStorage persistence

### Phase 2 (Future)
- [ ] Claude API integration for smart follow-up questions
- [ ] PDF export
- [ ] Swimlane diagrams by role
- [ ] Database persistence
- [ ] Multi-user collaboration
- [ ] Process library

## License

ISC
