
# Graph RAG Demo: Ghana Healthcare Dataset

## Overview
An interactive learning tool that demonstrates Graph RAG (Retrieval-Augmented Generation) using a pre-loaded Ghana healthcare dataset. Users can explore a visual knowledge graph and ask natural language questions that are answered using graph-based retrieval.

## Pages & Features

### 1. Knowledge Graph Explorer (Main Page)
- **Interactive graph visualization** showing entities (hospitals, clinics, doctors, equipment) as nodes and their relationships as edges
- Color-coded nodes by type: 🏥 Facilities (blue), 👨‍⚕️ Doctors (green), 🔧 Equipment (orange), 📍 Regions (purple)
- Click any node to see its details and connections in a side panel
- Zoom, pan, and filter controls to focus on specific entity types or regions
- Search bar to find specific entities in the graph

### 2. Q&A Chat Interface
- Natural language question input (e.g., "Which hospitals in Accra have MRI machines?", "Which doctors specialize in cardiology?")
- AI-powered answers using Graph RAG — the system retrieves relevant subgraph context before generating answers
- Shows the **retrieval path**: which nodes/edges were used to answer the question
- Highlights the relevant subgraph in the visualization when an answer is generated
- Streaming responses for a smooth experience

### 3. How It Works Panel
- Step-by-step explanation of the Graph RAG pipeline: Entity Extraction → Graph Construction → Subgraph Retrieval → LLM Generation
- Visual diagram showing the flow from question to answer

## Sample Dataset (Pre-loaded)
- ~50 healthcare facilities across Ghana's regions (hospitals, clinics, health centers)
- ~100 doctors with specialties and affiliations
- ~30 equipment types distributed across facilities
- Relationships: works_at, located_in, has_equipment, refers_to, specializes_in

## Backend (Lovable Cloud)
- Edge function to process natural language queries
- Graph traversal logic to find relevant entities and relationships
- Lovable AI integration (Gemini) for entity extraction and answer generation
- Pre-built graph data stored and queryable

## Design
- Clean, modern dashboard layout
- Split view: graph visualization on one side, chat/details on the other
- Dark/light mode support
- Responsive but optimized for desktop (graph viz works best on larger screens)
