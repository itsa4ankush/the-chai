// Approximate coordinates for Ghana cities and regions in the dataset

export interface CityCoord {
  lat: number;
  lng: number;
}

// City-level coordinates (approximate)
export const cityCoordinates: Record<string, CityCoord> = {
  "Accra": { lat: 5.6037, lng: -0.1870 },
  "Tema": { lat: 5.6698, lng: -0.0166 },
  "Kumasi": { lat: 6.6885, lng: -1.6244 },
  "Tamale": { lat: 9.4008, lng: -0.8393 },
  "Takoradi": { lat: 4.8826, lng: -1.7554 },
  "Sunyani": { lat: 7.3349, lng: -2.3266 },
  "Cape Coast": { lat: 5.1036, lng: -1.2466 },
  "Ho": { lat: 6.6006, lng: 0.4703 },
  "Koforidua": { lat: 6.0940, lng: -0.2588 },
  "Obuasi": { lat: 6.2024, lng: -1.6628 },
  "Techiman": { lat: 7.5833, lng: -1.9333 },
  "Kasoa": { lat: 5.5348, lng: -0.4196 },
  "Dansoman": { lat: 5.5528, lng: -0.2603 },
  "Apremdo": { lat: 4.9167, lng: -1.7500 },
  "Acherensua": { lat: 7.0833, lng: -2.3667 },
  "Abomosu": { lat: 6.3500, lng: -0.9833 },
  "Abuakwa": { lat: 6.7333, lng: -1.5500 },
  "Abura": { lat: 5.1000, lng: -1.2833 },
  "Agogo": { lat: 6.8000, lng: -1.0833 },
  "Asokore": { lat: 6.7167, lng: -1.5833 },
  "Daboase": { lat: 5.3333, lng: -1.6333 },
  "Akatsi": { lat: 6.1333, lng: 0.8000 },
  "Ajumako": { lat: 5.2667, lng: -1.1333 },
  "Achiase": { lat: 6.5000, lng: -1.5000 },
  "Bibiani": { lat: 6.4667, lng: -2.3333 },
  "Bimbilla": { lat: 8.8500, lng: -0.0500 },
  "Bole": { lat: 9.0333, lng: -2.4833 },
  "Berekum": { lat: 7.4528, lng: -2.5833 },
  "Half Assini": { lat: 5.0000, lng: -2.8667 },
  "Kpandai": { lat: 8.4667, lng: -0.0167 },
  "Enchi": { lat: 5.8333, lng: -2.8333 },
};

// Region center coordinates for facilities without specific city matches
export const regionCoordinates: Record<string, CityCoord> = {
  "Greater Accra": { lat: 5.6037, lng: -0.1870 },
  "Ashanti": { lat: 6.7470, lng: -1.5209 },
  "Western": { lat: 5.0527, lng: -1.9821 },
  "Eastern": { lat: 6.2374, lng: -0.4502 },
  "Central": { lat: 5.1600, lng: -1.2230 },
  "Northern": { lat: 9.5439, lng: -0.9057 },
  "Volta": { lat: 6.5781, lng: 0.4502 },
  "Bono": { lat: 7.5000, lng: -2.5000 },
  "Bono East": { lat: 7.7500, lng: -1.6500 },
  "Ahafo": { lat: 7.0833, lng: -2.3667 },
  "Western North": { lat: 6.1500, lng: -2.5000 },
  "Savannah": { lat: 9.0000, lng: -1.8000 },
  "Upper East": { lat: 10.7000, lng: -1.0500 },
  "Upper West": { lat: 10.0500, lng: -2.5000 },
  "North East": { lat: 10.2500, lng: -0.3500 },
  "Oti": { lat: 7.8000, lng: 0.3000 },
};

export function getFacilityCoordinates(city: string, region: string): CityCoord | null {
  if (city && cityCoordinates[city]) {
    // Add small random offset so markers don't stack
    const offset = () => (Math.random() - 0.5) * 0.02;
    const base = cityCoordinates[city];
    return { lat: base.lat + offset(), lng: base.lng + offset() };
  }
  if (region && regionCoordinates[region]) {
    const offset = () => (Math.random() - 0.5) * 0.05;
    const base = regionCoordinates[region];
    return { lat: base.lat + offset(), lng: base.lng + offset() };
  }
  return null;
}
