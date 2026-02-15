import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { rawFacilities, specialtyLabels } from "@/data/rawFacilities";
import { getFacilityCoordinates } from "@/data/ghanaCoordinates";
import { nodeColors, type NodeType } from "@/data/ghanaHealthcare";

interface Props {
  filterTypes?: NodeType[];
  searchTerm?: string;
}

interface MappedFacility {
  id: number;
  name: string;
  lat: number;
  lng: number;
  city: string;
  region: string;
  facilityType: string | null;
  specialties: string[];
  equipment: string[];
  capacity: number | null;
  phone: string;
  description: string;
}

const facilityTypeColors: Record<string, string> = {
  hospital: "#3b82f6",
  clinic: "#22c55e",
  ngo: "#f97316",
  default: "#a855f7",
};

function getMarkerColor(facilityType: string | null): string {
  if (!facilityType) return facilityTypeColors.default;
  return facilityTypeColors[facilityType] || facilityTypeColors.default;
}

export default function MapVisualization({ filterTypes, searchTerm }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);

  const facilities = useMemo<MappedFacility[]>(() => {
    const results: MappedFacility[] = [];
    for (const f of rawFacilities) {
      const coord = getFacilityCoordinates(f.city, f.region);
      if (!coord) continue;

      // Apply search filter
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        const match =
          f.name.toLowerCase().includes(s) ||
          f.city.toLowerCase().includes(s) ||
          f.region.toLowerCase().includes(s) ||
          f.specialties.some((sp) => (specialtyLabels[sp] || sp).toLowerCase().includes(s)) ||
          (f.facilityType || "").toLowerCase().includes(s);
        if (!match) continue;
      }

      // Apply type filter
      if (filterTypes && filterTypes.length > 0) {
        if (filterTypes.includes("facility") || filterTypes.includes("region")) {
          // show all facilities when facility or region filter is on
        } else {
          // If filtering by specialty or equipment, check if facility has matching ones
          const hasSpecialty = filterTypes.includes("specialty") && f.specialties.length > 0;
          const hasEquipment = filterTypes.includes("equipment") && f.equipment.length > 0;
          if (!hasSpecialty && !hasEquipment) continue;
        }
      }

      results.push({
        id: f.id,
        name: f.name,
        lat: coord.lat,
        lng: coord.lng,
        city: f.city,
        region: f.region,
        facilityType: f.facilityType,
        specialties: f.specialties,
        equipment: f.equipment,
        capacity: f.capacity,
        phone: f.phone,
        description: f.description,
      });
    }
    return results;
  }, [filterTypes, searchTerm]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [7.9465, -1.0232], // Center of Ghana
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    markersLayer.current = L.layerGroup().addTo(map);
    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (!markersLayer.current) return;
    markersLayer.current.clearLayers();

    // Region labels
    const regionCounts: Record<string, number> = {};
    for (const f of facilities) {
      regionCounts[f.region] = (regionCounts[f.region] || 0) + 1;
    }

    for (const f of facilities) {
      const color = getMarkerColor(f.facilityType);

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 12px; height: 12px; border-radius: 50%;
          background: ${color}; border: 2px solid rgba(255,255,255,0.8);
          box-shadow: 0 0 8px ${color}88;
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const specialtiesList = f.specialties
        .slice(0, 5)
        .map((s) => specialtyLabels[s] || s)
        .join(", ");

      const popup = `
        <div style="font-family: system-ui; min-width: 200px; color: #e2e8f0;">
          <h3 style="margin: 0 0 6px; font-size: 14px; color: #fff; font-weight: 600;">${f.name}</h3>
          <div style="font-size: 11px; space-y: 2px; color: #94a3b8;">
            ${f.facilityType ? `<div><strong>Type:</strong> ${f.facilityType}</div>` : ""}
            <div><strong>Location:</strong> ${f.city}, ${f.region}</div>
            ${f.capacity ? `<div><strong>Capacity:</strong> ${f.capacity} beds</div>` : ""}
            ${specialtiesList ? `<div><strong>Specialties:</strong> ${specialtiesList}</div>` : ""}
            ${f.equipment.length > 0 ? `<div><strong>Equipment:</strong> ${f.equipment.slice(0, 3).join(", ")}</div>` : ""}
            ${f.phone ? `<div><strong>Phone:</strong> ${f.phone}</div>` : ""}
            ${f.description ? `<div style="margin-top: 4px; font-style: italic;">${f.description.slice(0, 120)}</div>` : ""}
          </div>
        </div>
      `;

      L.marker([f.lat, f.lng], { icon })
        .bindPopup(popup, {
          className: "dark-popup",
          maxWidth: 300,
        })
        .addTo(markersLayer.current!);
    }
  }, [facilities]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      {/* Stats overlay */}
      <div className="absolute right-3 top-3 rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur-sm">
        <div className="text-xs font-semibold text-foreground">{facilities.length} facilities mapped</div>
        <div className="mt-1 space-y-0.5">
          {Object.entries(facilityTypeColors)
            .filter(([k]) => k !== "default")
            .map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="capitalize">{type}</span>
              </div>
            ))}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: facilityTypeColors.default }} />
            <span>Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}
