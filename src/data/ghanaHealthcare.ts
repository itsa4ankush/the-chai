// Ghana Healthcare Graph Data - generated from real Virtue Foundation dataset

import { rawFacilities, specialtyLabels, type RawFacility } from "./rawFacilities";

export type NodeType = "facility" | "specialty" | "equipment" | "region";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  details: Record<string, string>;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

function buildGraph(): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const regionSet = new Map<string, GraphNode>();
  const specialtySet = new Map<string, GraphNode>();
  const equipmentSet = new Map<string, GraphNode>();

  // Build facility nodes
  for (const f of rawFacilities) {
    const facilityId = `f_${f.id}`;
    const details: Record<string, string> = {};
    if (f.facilityType) details.type = f.facilityType;
    if (f.operatorType) details.operator = f.operatorType;
    if (f.city) details.city = f.city;
    if (f.region) details.region = f.region;
    if (f.address) details.address = f.address;
    if (f.phone) details.phone = f.phone;
    if (f.email) details.email = f.email;
    if (f.website) details.website = f.website;
    if (f.yearEstablished) details.established = String(f.yearEstablished);
    if (f.capacity) details.capacity = `${f.capacity} beds`;
    if (f.description) details.description = f.description;
    if (f.capabilities.length > 0) details.capabilities = f.capabilities.slice(0, 3).join("; ");

    nodes.push({ id: facilityId, label: f.name, type: "facility", details });

    // Region node + edge
    if (f.region) {
      const regionId = `r_${f.region.toLowerCase().replace(/\s+/g, "_")}`;
      if (!regionSet.has(regionId)) {
        const regionNode: GraphNode = { id: regionId, label: f.region, type: "region", details: { country: "Ghana" } };
        regionSet.set(regionId, regionNode);
      }
      edges.push({ source: facilityId, target: regionId, relation: "located_in" });
    }

    // Specialty nodes + edges
    for (const spec of f.specialties) {
      const specId = `s_${spec}`;
      if (!specialtySet.has(specId)) {
        const label = specialtyLabels[spec] || spec.replace(/([A-Z])/g, " $1").trim();
        specialtySet.set(specId, { id: specId, label, type: "specialty", details: { category: "Medical Specialty" } });
      }
      edges.push({ source: facilityId, target: specId, relation: "specializes_in" });
    }

    // Equipment nodes + edges
    for (const eq of f.equipment) {
      if (!eq || eq.length < 3) continue;
      const eqId = `e_${eq.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40)}`;
      if (!equipmentSet.has(eqId)) {
        equipmentSet.set(eqId, { id: eqId, label: eq, type: "equipment", details: { category: "Medical Equipment" } });
      }
      edges.push({ source: facilityId, target: eqId, relation: "has_equipment" });
    }
  }

  nodes.push(...regionSet.values(), ...specialtySet.values(), ...equipmentSet.values());

  return { nodes, edges };
}

export const ghanaHealthcareData = buildGraph();

// Node color mapping
export const nodeColors: Record<NodeType, string> = {
  facility: "#3b82f6",   // blue
  specialty: "#22c55e",   // green (was doctor)
  equipment: "#f97316",   // orange
  region: "#a855f7",      // purple
};

export const nodeIcons: Record<NodeType, string> = {
  facility: "🏥",
  specialty: "🩺",
  equipment: "🔧",
  region: "📍",
};
