import { useEffect, useRef, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { rawFacilities, specialtyLabels } from "@/data/rawFacilities";
import { getFacilityCoordinates } from "@/data/ghanaCoordinates";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, X } from "lucide-react";

interface Props {
  filterTypes?: string[];
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
  other: "#a855f7",
};

function getMarkerColor(facilityType: string | null): string {
  if (!facilityType) return facilityTypeColors.other;
  return facilityTypeColors[facilityType] || facilityTypeColors.other;
}

// Derive unique regions and facility types from data
const allRegions = Array.from(new Set(rawFacilities.map((f) => f.region))).sort();
const allFacilityTypes = Array.from(
  new Set(rawFacilities.map((f) => f.facilityType || "other"))
).sort();

export default function MapVisualization({ filterTypes, searchTerm }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);

  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState<Set<string>>(new Set());

  const toggleRegion = (r: string) =>
    setSelectedRegions((prev) => {
      const next = new Set(prev);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });

  const toggleFacilityType = (t: string) =>
    setSelectedFacilityTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });

  const clearFilters = () => {
    setSelectedRegions(new Set());
    setSelectedFacilityTypes(new Set());
  };

  const hasActiveFilters = selectedRegions.size > 0 || selectedFacilityTypes.size > 0;

  const facilities = useMemo<MappedFacility[]>(() => {
    const results: MappedFacility[] = [];
    for (const f of rawFacilities) {
      const coord = getFacilityCoordinates(f.city, f.region);
      if (!coord) continue;

      // Search filter
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

      // Region filter
      if (selectedRegions.size > 0 && !selectedRegions.has(f.region)) continue;

      // Facility type filter
      if (selectedFacilityTypes.size > 0) {
        const ft = f.facilityType || "other";
        if (!selectedFacilityTypes.has(ft)) continue;
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
  }, [filterTypes, searchTerm, selectedRegions, selectedFacilityTypes]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [7.9465, -1.0232],
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

  // Update markers
  useEffect(() => {
    if (!markersLayer.current) return;
    markersLayer.current.clearLayers();

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
          <div style="font-size: 11px; color: #94a3b8;">
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
        .bindPopup(popup, { className: "dark-popup", maxWidth: 300 })
        .addTo(markersLayer.current!);
    }
  }, [facilities]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />

      {/* Filter Panel */}
      <div className="absolute left-3 top-3 z-[1000] flex max-h-[calc(100%-24px)] w-56 flex-col gap-3 overflow-y-auto rounded-lg border border-border bg-card/95 p-3 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-foreground">Map Filters</h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        {/* Facility Type Filter */}
        <div>
          <div className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Building2 className="h-3 w-3" /> Facility Type
          </div>
          <div className="flex flex-wrap gap-1">
            {allFacilityTypes.map((ft) => {
              const active = selectedFacilityTypes.has(ft);
              const color = facilityTypeColors[ft] || facilityTypeColors.other;
              return (
                <Badge
                  key={ft}
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer text-[10px] capitalize"
                  style={
                    active
                      ? { backgroundColor: color, borderColor: color, color: "#fff" }
                      : { borderColor: color, color }
                  }
                  onClick={() => toggleFacilityType(ft)}
                >
                  {ft}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Region Filter */}
        <div>
          <div className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <MapPin className="h-3 w-3" /> Region
          </div>
          <div className="flex flex-wrap gap-1">
            {allRegions.map((r) => {
              const active = selectedRegions.has(r);
              return (
                <Badge
                  key={r}
                  variant={active ? "default" : "outline"}
                  className="cursor-pointer text-[10px]"
                  onClick={() => toggleRegion(r)}
                >
                  {r}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute right-3 top-3 z-[1000] rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur-sm">
        <div className="text-xs font-semibold text-foreground">{facilities.length} facilities</div>
        <div className="mt-1 space-y-0.5">
          {Object.entries(facilityTypeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
