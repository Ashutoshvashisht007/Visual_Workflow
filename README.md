# ReactFlow Canvas - App Graph Builder

A responsive app graph builder UI built with React, TypeScript, ReactFlow, TanStack Query, and Zustand.

## Features

* **Layout**: Top bar, left rail, right panel inspector, dotted canvas.  
* **ReactFlow**: 3 nodes, drag & drop, select, delete (Backspace/Delete), zoom/pan and fit view on initiall load.  
* **Node Inspector**: Status badge, tabs (Config/Runtime), synced slider & numeric input.  
* **TanStack Query**: Mock API with loading/error states.  
* **Zustand**: State management for selected app/node, mobile panel and active tab. 
* **TypeScript Strict Mode**: Full type safety.  
* **Responsive**: Mobile drawer for inspector panel.  

## Tech Stack

- **React 18** + **Vite**
- **TypeScript (strict)**
- **ReactFlow (@xyflow/react)**
- **shadcn/ui** components
- **TanStack Query** for data fetching
- **Zustand** for state management
- **MSW** for API mocking
- **Tailwind CSS** for styling
- **Motion** for animation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize MSW

MSW needs to generate a service worker file in the `public` directory:

```bash
npx msw init public/ --save
```

This creates `public/mockServiceWorker.js` which is required for MSW to work.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn components (button, slider, tabs, etc.)
│   └── layout/           # Sidebar, MobileDrawer
├── features/
│   ├── canvas/           # ReactFlow logic
│   │   ├── components/   # ServiceNode
│   │   └── GraphCanvas.tsx
│   ├── inspector/        # NodeInspector
│   └── navigation/       # AppSelector
├── hooks/                # useAppStore custom hook
├── lib/                  # Utilities
├── mocks/                # MSW handlers and setup
│   ├── handlers.ts       # API mock handlers
│   └── browser.ts        # MSW setup
├── stores/               # Zustand store
│   └── useAppStore.ts
├── types/                # TypeScript types
│   └── index.ts
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Key Features Implemented

### 1. Mock API (MSW)

Two endpoints are mocked:
- `GET /api/apps` - Returns list of apps
- `GET /api/apps/:appId/graph` - Returns nodes & edges for selected app

Simulated features:
- 300-500ms latency
- 5% random error rate
- Different graph data per app

### 2. ReactFlow Canvas

- **3 Nodes per app** with drag & drop
- **2 Edges** connecting nodes
- **Delete nodes** with Backspace/Delete key
- **Dotted background** pattern
- **Zoom, pan, fit view** controls
- **Node selection** with visual feedback

### 3. Node Inspector Panel

**Desktop**: Fixed right panel  
**Mobile**: Slide-over drawer

Features:
- **Status badge** (healthy/degraded/down)
- **Two tabs**: Configuration & Runtime
- **Synced controls**: Slider ↔ Numeric input (0-100)
- **Editable fields**: Node name, CPU allocation
- **Read-only data**: Memory, disk, region, cost

### 4. State Management (Zustand)

Store includes:
- `selectedAppId` - Currently selected app
- `selectedNodeId` - Currently selected node
- `isMobilePanelOpen` - Mobile drawer state
- `activeInspectorTab` - Active inspector tab

### 5. Responsive Design

- Desktop: Side-by-side layout
- Mobile: Drawer overlay for inspector

## Testing the App

  1. **Select an app** from the dropdown in the top bar
  2. **Click on nodes** to select them - inspector panel opens
  3. **Edit node name** in the Config tab
  4. **Adjust CPU slider** watch the numeric input sync
  5. **Switch to Runtime tab** to see read-only metrics
  6. **Delete nodes** by selecting and pressing Backspace/Delete
  8. **Test mobile view** by resizing browser window


## Key Decisions

- **ReactFlow** was chosen to handle node-based graph interactions such as drag, connect, zoom, and fit view, avoiding the need to build low-level canvas logic.
- **TanStack Query** is used strictly for server-derived state (apps list and graph data) to leverage caching, loading, and error handling.
- **Zustand** manages local UI state (selected app, selected node, inspector visibility, active tab) to keep React components lightweight and predictable.
- **MSW** is used to mock backend APIs, enabling realistic async behavior (latency, errors) without requiring a real backend.
- **shadcn/ui** components are used for consistency, accessibility, and faster UI development.
- **Strict TypeScript mode** is enabled to catch errors early and improve maintainability.



## Known Limitations

- Graph data is mocked using MSW and resets on page refresh.
- Node edits are not persisted to a backend.
- No undo/redo support for graph changes.
- Edge creation is static and not editable via UI.
- Authentication and authorization are not implemented.


## Notes

- MSW requires the `mockServiceWorker.js` file in `public/` to work
- The first time you run the app, make sure to run `npx msw init public/ --save`
- All data is in-memory and resets on refresh
- Node edits persist during the session but don't save to a backend
- Error state can be simulated (5% random chance on graph fetch)
