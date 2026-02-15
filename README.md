# Welcome to the Chai! 

The Chai, is a simmple attempt to try out few features of the Graph RAG and as I hope to include it it some of the cupoming use cases. Chai is an "appetizer" type of project. 

## Project url: https://graphrag-test.lovable.app/


## 🏥 Ghana Healthcare Graph RAG Explorer

An interactive web application that demonstrates **Graph RAG (Retrieval-Augmented Generation)** using a pre-loaded Ghana healthcare dataset. Users can explore a visual knowledge graph, ask natural language questions, and calculate distances between healthcare facilities.

> ⚠️ **Disclaimer:** This is a visualization of a sample dataset from one of the **Hack Nation AI** hackathons and is for learning purposes only.

---

## 📋 Project Description

This project visualizes Ghana's healthcare infrastructure as an interactive knowledge graph, combining graph-based data retrieval with natural language querying. It allows users to explore relationships between healthcare facilities, medical specialties, equipment, and geographic regions across Ghana.

The Graph RAG approach retrieves relevant subgraph context (nodes and edges) before generating structured answers — making responses grounded in actual data rather than purely generative.

---

## 📊 Dataset

The dataset is a curated sample representing Ghana's healthcare ecosystem:

| Entity Type | Count | Description |
|-------------|-------|-------------|
| 🏥 Facilities | ~50 | Hospitals, clinics, health centers, and NGOs across Ghana |
| 🔬 Specialties | ~30 | Medical specializations offered by facilities |
| ⚙️ Equipment | ~30 | Medical equipment distributed across facilities |
| 📍 Regions | 16 | Administrative regions of Ghana |

### Relationships

- **located_in** — Facility → Region
- **has_specialty** — Facility → Specialty
- **has_equipment** — Facility → Equipment
- **refers_to** — Facility → Facility (referral networks)

---

## ✨ Key Features

### 🔗 Interactive Knowledge Graph
- Force-directed graph visualization with color-coded nodes by entity type
- Click any node to view details and connections
- Zoom, pan, and filter controls
- Real-time search and type-based filtering

### 🗺️ Map Visualization
- Leaflet-based geographic map of healthcare facilities across Ghana
- Filter by facility type (Hospital, Clinic, NGO) and region
- Interactive markers with facility details on click

### 📏 Distance Calculator
- Calculate straight-line distance between any two facilities using the Haversine formula
- Search facilities from the dataset or enter custom coordinates
- Direct link to Google Maps for driving directions

### 💬 Graph RAG Q&A Chat
- Natural language question input (e.g., "Which hospitals in Accra have MRI scanners?")
- Graph-based retrieval: tokenization → node matching → subgraph retrieval → answer generation
- Shows traversal statistics (nodes/edges explored, paths found)
- Highlights relevant subgraph in the visualization

### 📖 How It Works Panel
- Step-by-step explanation of the Graph RAG pipeline
- Visual flow diagram: Query → Tokenize → Match → Retrieve → Answer

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible UI component library |
| **react-force-graph-2d** | Force-directed graph visualization |
| **Leaflet** | Interactive map rendering |
| **Lucide React** | Icon library |
| **react-resizable-panels** | Split-pane layout |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ChatPanel.tsx          # Graph RAG Q&A interface
│   ├── DistanceCalculator.tsx # Facility distance calculator
│   ├── GraphVisualization.tsx # Force-directed graph view
│   ├── HowItWorksPanel.tsx    # RAG pipeline explanation
│   ├── MapVisualization.tsx   # Leaflet map view
│   ├── NodeDetailPanel.tsx    # Node info sidebar
│   └── ui/                   # shadcn/ui components
├── data/
│   ├── ghanaHealthcare.ts     # Graph nodes and edges
│   ├── ghanaCoordinates.ts    # Facility coordinates
│   └── rawFacilities.ts       # Raw facility data
├── lib/
│   └── graphSearch.ts         # Graph traversal & search logic
└── pages/
    └── Index.tsx              # Main application page
```

---

## 🎓 Learning Objectives

This project demonstrates:
1. **Knowledge Graph Construction** — Structuring real-world data as nodes and edges
2. **Graph-Based Retrieval** — Traversing graphs to find contextually relevant information
3. **RAG Pipeline** — Combining retrieval with generation for grounded answers
4. **Data Visualization** — Rendering complex relationships as interactive graphs and maps
5. **Geospatial Analysis** — Mapping facilities and calculating distances

---

## 📝 License

This project is for educational and demonstration purposes.

---

## 🙏 Acknowledgments

- **Hack Nation AI** — Hackathon that inspired the dataset
- **shadcn/ui** — Beautiful, accessible component library
- **OpenStreetMap** — Map tile provider via Leaflet
