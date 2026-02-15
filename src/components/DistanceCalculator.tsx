import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ruler, MapPin, Navigation, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react";
import { rawFacilities } from "@/data/rawFacilities";
import { getFacilityCoordinates, cityCoordinates, type CityCoord } from "@/data/ghanaCoordinates";

interface FacilityOption {
  id: number;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
}

function haversineDistance(a: CityCoord, b: CityCoord): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

const mappedFacilities: FacilityOption[] = rawFacilities
  .map((f) => {
    const coord = getFacilityCoordinates(f.city, f.region);
    if (!coord) return null;
    return { id: f.id, name: f.name, city: f.city, region: f.region, lat: coord.lat, lng: coord.lng };
  })
  .filter(Boolean) as FacilityOption[];

export default function DistanceCalculator() {
  const [open, setOpen] = useState(false);
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [pointA, setPointA] = useState<FacilityOption | null>(null);
  const [pointB, setPointB] = useState<FacilityOption | null>(null);
  const [focusA, setFocusA] = useState(false);
  const [focusB, setFocusB] = useState(false);
  const [customLatA, setCustomLatA] = useState("");
  const [customLngA, setCustomLngA] = useState("");
  const [customLatB, setCustomLatB] = useState("");
  const [customLngB, setCustomLngB] = useState("");
  const [useCustomA, setUseCustomA] = useState(false);
  const [useCustomB, setUseCustomB] = useState(false);

  const filteredA = useMemo(
    () =>
      searchA.length > 0
        ? mappedFacilities.filter(
            (f) =>
              f.name.toLowerCase().includes(searchA.toLowerCase()) ||
              f.city.toLowerCase().includes(searchA.toLowerCase())
          ).slice(0, 6)
        : [],
    [searchA]
  );

  const filteredB = useMemo(
    () =>
      searchB.length > 0
        ? mappedFacilities.filter(
            (f) =>
              f.name.toLowerCase().includes(searchB.toLowerCase()) ||
              f.city.toLowerCase().includes(searchB.toLowerCase())
          ).slice(0, 6)
        : [],
    [searchB]
  );

  const coordA: CityCoord | null = useCustomA
    ? customLatA && customLngA ? { lat: parseFloat(customLatA), lng: parseFloat(customLngA) } : null
    : pointA ? { lat: pointA.lat, lng: pointA.lng } : null;

  const coordB: CityCoord | null = useCustomB
    ? customLatB && customLngB ? { lat: parseFloat(customLatB), lng: parseFloat(customLngB) } : null
    : pointB ? { lat: pointB.lat, lng: pointB.lng } : null;

  const distance = coordA && coordB ? haversineDistance(coordA, coordB) : null;

  const googleMapsUrl =
    coordA && coordB
      ? `https://www.google.com/maps/dir/${coordA.lat},${coordA.lng}/${coordB.lat},${coordB.lng}`
      : null;

  const selectA = (f: FacilityOption) => {
    setPointA(f);
    setSearchA(f.name);
    setFocusA(false);
    setUseCustomA(false);
  };
  const selectB = (f: FacilityOption) => {
    setPointB(f);
    setSearchB(f.name);
    setFocusB(false);
    setUseCustomB(false);
  };

  const clearAll = () => {
    setPointA(null);
    setPointB(null);
    setSearchA("");
    setSearchB("");
    setCustomLatA("");
    setCustomLngA("");
    setCustomLatB("");
    setCustomLngB("");
    setUseCustomA(false);
    setUseCustomB(false);
  };

  return (
    <div className="absolute bottom-3 left-3 z-[1000] w-64">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-border bg-card/95 px-3 py-2 backdrop-blur-sm hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Ruler className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">Distance Calculator</span>
        </div>
        {open ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronUp className="h-3 w-3 text-muted-foreground" />}
      </button>

      {open && (
        <div className="mt-1 rounded-lg border border-border bg-card/95 p-3 backdrop-blur-sm space-y-3">
          {/* Point A */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-400" /> Point A
              </label>
              <button
                onClick={() => { setUseCustomA(!useCustomA); setPointA(null); setSearchA(""); }}
                className="text-[9px] text-primary hover:underline"
              >
                {useCustomA ? "Search facility" : "Enter coords"}
              </button>
            </div>
            {useCustomA ? (
              <div className="flex gap-1">
                <Input
                  value={customLatA}
                  onChange={(e) => setCustomLatA(e.target.value)}
                  placeholder="Lat"
                  className="h-6 text-[10px] px-1.5"
                />
                <Input
                  value={customLngA}
                  onChange={(e) => setCustomLngA(e.target.value)}
                  placeholder="Lng"
                  className="h-6 text-[10px] px-1.5"
                />
              </div>
            ) : (
              <div className="relative">
                <Input
                  value={searchA}
                  onChange={(e) => { setSearchA(e.target.value); setPointA(null); setFocusA(true); }}
                  onFocus={() => setFocusA(true)}
                  onBlur={() => setTimeout(() => setFocusA(false), 150)}
                  placeholder="Search facility..."
                  className="h-6 text-[10px] px-2"
                />
                {focusA && filteredA.length > 0 && (
                  <div className="absolute top-7 left-0 right-0 z-10 max-h-32 overflow-y-auto rounded border border-border bg-card shadow-lg">
                    {filteredA.map((f) => (
                      <button
                        key={f.id}
                        onMouseDown={() => selectA(f)}
                        className="w-full px-2 py-1 text-left text-[10px] text-foreground hover:bg-accent/50 truncate"
                      >
                        {f.name} <span className="text-muted-foreground">— {f.city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Point B */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-rose-400" /> Point B
              </label>
              <button
                onClick={() => { setUseCustomB(!useCustomB); setPointB(null); setSearchB(""); }}
                className="text-[9px] text-primary hover:underline"
              >
                {useCustomB ? "Search facility" : "Enter coords"}
              </button>
            </div>
            {useCustomB ? (
              <div className="flex gap-1">
                <Input
                  value={customLatB}
                  onChange={(e) => setCustomLatB(e.target.value)}
                  placeholder="Lat"
                  className="h-6 text-[10px] px-1.5"
                />
                <Input
                  value={customLngB}
                  onChange={(e) => setCustomLngB(e.target.value)}
                  placeholder="Lng"
                  className="h-6 text-[10px] px-1.5"
                />
              </div>
            ) : (
              <div className="relative">
                <Input
                  value={searchB}
                  onChange={(e) => { setSearchB(e.target.value); setPointB(null); setFocusB(true); }}
                  onFocus={() => setFocusB(true)}
                  onBlur={() => setTimeout(() => setFocusB(false), 150)}
                  placeholder="Search facility..."
                  className="h-6 text-[10px] px-2"
                />
                {focusB && filteredB.length > 0 && (
                  <div className="absolute top-7 left-0 right-0 z-10 max-h-32 overflow-y-auto rounded border border-border bg-card shadow-lg">
                    {filteredB.map((f) => (
                      <button
                        key={f.id}
                        onMouseDown={() => selectB(f)}
                        className="w-full px-2 py-1 text-left text-[10px] text-foreground hover:bg-accent/50 truncate"
                      >
                        {f.name} <span className="text-muted-foreground">— {f.city}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Result */}
          {distance !== null && (
            <div className="rounded-md border border-primary/30 bg-primary/10 p-2 text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Navigation className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{distance.toFixed(1)} km</span>
              </div>
              <p className="text-[9px] text-muted-foreground">Straight-line distance (approx)</p>
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> View route on Google Maps
                </a>
              )}
            </div>
          )}

          {/* Clear */}
          {(pointA || pointB || useCustomA || useCustomB) && (
            <button onClick={clearAll} className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
