// Ghana Healthcare Dataset for Graph RAG Demo

export type NodeType = "facility" | "doctor" | "equipment" | "region";

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

const regions: GraphNode[] = [
  { id: "r1", label: "Greater Accra", type: "region", details: { capital: "Accra", population: "5,455,692" } },
  { id: "r2", label: "Ashanti", type: "region", details: { capital: "Kumasi", population: "5,924,498" } },
  { id: "r3", label: "Northern", type: "region", details: { capital: "Tamale", population: "2,479,461" } },
  { id: "r4", label: "Western", type: "region", details: { capital: "Sekondi-Takoradi", population: "2,060,585" } },
  { id: "r5", label: "Eastern", type: "region", details: { capital: "Koforidua", population: "2,633,154" } },
  { id: "r6", label: "Central", type: "region", details: { capital: "Cape Coast", population: "2,563,228" } },
  { id: "r7", label: "Volta", type: "region", details: { capital: "Ho", population: "1,907,679" } },
  { id: "r8", label: "Upper East", type: "region", details: { capital: "Bolgatanga", population: "1,301,221" } },
  { id: "r9", label: "Upper West", type: "region", details: { capital: "Wa", population: "901,502" } },
  { id: "r10", label: "Bono", type: "region", details: { capital: "Sunyani", population: "1,208,649" } },
];

const facilities: GraphNode[] = [
  { id: "f1", label: "Korle Bu Teaching Hospital", type: "facility", details: { type: "Teaching Hospital", beds: "2000", founded: "1923" } },
  { id: "f2", label: "37 Military Hospital", type: "facility", details: { type: "Military Hospital", beds: "600", founded: "1941" } },
  { id: "f3", label: "Ridge Hospital", type: "facility", details: { type: "Regional Hospital", beds: "420", founded: "1928" } },
  { id: "f4", label: "Komfo Anokye Teaching Hospital", type: "facility", details: { type: "Teaching Hospital", beds: "1000", founded: "1954" } },
  { id: "f5", label: "Tamale Teaching Hospital", type: "facility", details: { type: "Teaching Hospital", beds: "450", founded: "1974" } },
  { id: "f6", label: "Effia Nkwanta Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "300", founded: "1908" } },
  { id: "f7", label: "Koforidua Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "360", founded: "1925" } },
  { id: "f8", label: "Cape Coast Teaching Hospital", type: "facility", details: { type: "Teaching Hospital", beds: "400", founded: "1962" } },
  { id: "f9", label: "Ho Teaching Hospital", type: "facility", details: { type: "Teaching Hospital", beds: "300", founded: "1927" } },
  { id: "f10", label: "Bolgatanga Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "200", founded: "1945" } },
  { id: "f11", label: "Wa Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "180", founded: "1955" } },
  { id: "f12", label: "Sunyani Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "250", founded: "1940" } },
  { id: "f13", label: "Greater Accra Regional Hospital", type: "facility", details: { type: "Regional Hospital", beds: "350", founded: "2017" } },
  { id: "f14", label: "Tema General Hospital", type: "facility", details: { type: "General Hospital", beds: "200", founded: "1965" } },
  { id: "f15", label: "Lekma Hospital", type: "facility", details: { type: "District Hospital", beds: "100", founded: "2012" } },
  { id: "f16", label: "La General Hospital", type: "facility", details: { type: "General Hospital", beds: "120", founded: "1963" } },
  { id: "f17", label: "Princess Marie Louise Hospital", type: "facility", details: { type: "Children's Hospital", beds: "80", founded: "1928" } },
  { id: "f18", label: "Manhyia District Hospital", type: "facility", details: { type: "District Hospital", beds: "150", founded: "1930" } },
  { id: "f19", label: "Agogo Presbyterian Hospital", type: "facility", details: { type: "Mission Hospital", beds: "200", founded: "1931" } },
  { id: "f20", label: "St. Patrick's Hospital Offinso", type: "facility", details: { type: "Mission Hospital", beds: "120", founded: "1950" } },
  { id: "f21", label: "Tarkwa Municipal Hospital", type: "facility", details: { type: "Municipal Hospital", beds: "100", founded: "1948" } },
  { id: "f22", label: "Axim Government Hospital", type: "facility", details: { type: "District Hospital", beds: "80", founded: "1940" } },
  { id: "f23", label: "Keta Municipal Hospital", type: "facility", details: { type: "Municipal Hospital", beds: "90", founded: "1936" } },
  { id: "f24", label: "Bawku Presbyterian Hospital", type: "facility", details: { type: "Mission Hospital", beds: "120", founded: "1942" } },
  { id: "f25", label: "Nandom District Hospital", type: "facility", details: { type: "District Hospital", beds: "60", founded: "1960" } },
  { id: "f26", label: "Techiman Holy Family Hospital", type: "facility", details: { type: "Mission Hospital", beds: "180", founded: "1958" } },
  { id: "f27", label: "Nsawam Government Hospital", type: "facility", details: { type: "District Hospital", beds: "80", founded: "1945" } },
  { id: "f28", label: "Winneba Trauma & Specialist Hospital", type: "facility", details: { type: "Specialist Hospital", beds: "150", founded: "2014" } },
  { id: "f29", label: "Battor Catholic Hospital", type: "facility", details: { type: "Mission Hospital", beds: "100", founded: "1953" } },
  { id: "f30", label: "Yendi Municipal Hospital", type: "facility", details: { type: "Municipal Hospital", beds: "80", founded: "1970" } },
];

const equipment: GraphNode[] = [
  { id: "e1", label: "MRI Scanner", type: "equipment", details: { category: "Imaging", manufacturer: "Siemens" } },
  { id: "e2", label: "CT Scanner", type: "equipment", details: { category: "Imaging", manufacturer: "GE Healthcare" } },
  { id: "e3", label: "X-Ray Machine", type: "equipment", details: { category: "Imaging", manufacturer: "Philips" } },
  { id: "e4", label: "Ultrasound Machine", type: "equipment", details: { category: "Imaging", manufacturer: "Mindray" } },
  { id: "e5", label: "Ventilator", type: "equipment", details: { category: "Life Support", manufacturer: "Dräger" } },
  { id: "e6", label: "Dialysis Machine", type: "equipment", details: { category: "Renal Care", manufacturer: "Fresenius" } },
  { id: "e7", label: "ECG Machine", type: "equipment", details: { category: "Cardiac", manufacturer: "GE Healthcare" } },
  { id: "e8", label: "Defibrillator", type: "equipment", details: { category: "Cardiac", manufacturer: "Philips" } },
  { id: "e9", label: "Surgical Laser", type: "equipment", details: { category: "Surgery", manufacturer: "Lumenis" } },
  { id: "e10", label: "Endoscope", type: "equipment", details: { category: "Diagnostic", manufacturer: "Olympus" } },
  { id: "e11", label: "Incubator", type: "equipment", details: { category: "Neonatal", manufacturer: "Dräger" } },
  { id: "e12", label: "Anesthesia Machine", type: "equipment", details: { category: "Surgery", manufacturer: "GE Healthcare" } },
  { id: "e13", label: "Blood Bank Refrigerator", type: "equipment", details: { category: "Blood Services", manufacturer: "Haier" } },
  { id: "e14", label: "Autoclave", type: "equipment", details: { category: "Sterilization", manufacturer: "Tuttnauer" } },
  { id: "e15", label: "Mammography Machine", type: "equipment", details: { category: "Imaging", manufacturer: "Hologic" } },
  { id: "e16", label: "PET Scanner", type: "equipment", details: { category: "Imaging", manufacturer: "Siemens" } },
  { id: "e17", label: "Oxygen Concentrator", type: "equipment", details: { category: "Respiratory", manufacturer: "Invacare" } },
  { id: "e18", label: "Patient Monitor", type: "equipment", details: { category: "Monitoring", manufacturer: "Mindray" } },
  { id: "e19", label: "Electrosurgical Unit", type: "equipment", details: { category: "Surgery", manufacturer: "Covidien" } },
  { id: "e20", label: "Laboratory Analyzer", type: "equipment", details: { category: "Pathology", manufacturer: "Roche" } },
];

const doctors: GraphNode[] = [
  { id: "d1", label: "Dr. Kwame Asante", type: "doctor", details: { specialty: "Cardiology", qualification: "MD, FWACP" } },
  { id: "d2", label: "Dr. Ama Mensah", type: "doctor", details: { specialty: "Pediatrics", qualification: "MBChB, DCH" } },
  { id: "d3", label: "Dr. Kofi Boateng", type: "doctor", details: { specialty: "Neurosurgery", qualification: "MD, FRCS" } },
  { id: "d4", label: "Dr. Efua Owusu", type: "doctor", details: { specialty: "Obstetrics & Gynecology", qualification: "MBChB, FWACS" } },
  { id: "d5", label: "Dr. Yaw Adjei", type: "doctor", details: { specialty: "Orthopedics", qualification: "MD, FACS" } },
  { id: "d6", label: "Dr. Abena Darko", type: "doctor", details: { specialty: "Ophthalmology", qualification: "MBChB, FRCOphth" } },
  { id: "d7", label: "Dr. Kwesi Appiah", type: "doctor", details: { specialty: "General Surgery", qualification: "MD, FWACS" } },
  { id: "d8", label: "Dr. Akosua Tetteh", type: "doctor", details: { specialty: "Dermatology", qualification: "MBChB, MWACP" } },
  { id: "d9", label: "Dr. Nana Osei", type: "doctor", details: { specialty: "Radiology", qualification: "MD, FRCR" } },
  { id: "d10", label: "Dr. Afia Badu", type: "doctor", details: { specialty: "Anesthesiology", qualification: "MBChB, DA" } },
  { id: "d11", label: "Dr. Kojo Mensah-Bonsu", type: "doctor", details: { specialty: "Nephrology", qualification: "MD, FWACP" } },
  { id: "d12", label: "Dr. Adwoa Frimpong", type: "doctor", details: { specialty: "Psychiatry", qualification: "MBChB, MRCPsych" } },
  { id: "d13", label: "Dr. Fiifi Agyeman", type: "doctor", details: { specialty: "ENT Surgery", qualification: "MD, FRCS" } },
  { id: "d14", label: "Dr. Maame Serwaa", type: "doctor", details: { specialty: "Oncology", qualification: "MBChB, FWACP" } },
  { id: "d15", label: "Dr. Paa Kwesi Edusei", type: "doctor", details: { specialty: "Urology", qualification: "MD, FWACS" } },
  { id: "d16", label: "Dr. Akua Nyarko", type: "doctor", details: { specialty: "Endocrinology", qualification: "MBChB, MRCP" } },
  { id: "d17", label: "Dr. Yaw Agyapong", type: "doctor", details: { specialty: "Gastroenterology", qualification: "MD, FWACP" } },
  { id: "d18", label: "Dr. Esi Asiedu", type: "doctor", details: { specialty: "Hematology", qualification: "MBChB, FRCPath" } },
  { id: "d19", label: "Dr. Kwabena Ofori", type: "doctor", details: { specialty: "Pulmonology", qualification: "MD, FCCP" } },
  { id: "d20", label: "Dr. Adjoa Amponsah", type: "doctor", details: { specialty: "Rheumatology", qualification: "MBChB, MRCP" } },
  { id: "d21", label: "Dr. Kofi Antwi", type: "doctor", details: { specialty: "Emergency Medicine", qualification: "MBChB, FWACP" } },
  { id: "d22", label: "Dr. Akosua Boateng", type: "doctor", details: { specialty: "Family Medicine", qualification: "MBChB, MGCP" } },
  { id: "d23", label: "Dr. Yaw Mensah", type: "doctor", details: { specialty: "Plastic Surgery", qualification: "MD, FWACS" } },
  { id: "d24", label: "Dr. Ama Oforiwaa", type: "doctor", details: { specialty: "Infectious Disease", qualification: "MBChB, DTM&H" } },
  { id: "d25", label: "Dr. Kwame Duah", type: "doctor", details: { specialty: "Cardiothoracic Surgery", qualification: "MD, FRCS" } },
  { id: "d26", label: "Dr. Abena Pokua", type: "doctor", details: { specialty: "Neonatology", qualification: "MBChB, FWACP" } },
  { id: "d27", label: "Dr. Nana Acheampong", type: "doctor", details: { specialty: "Pathology", qualification: "MD, FRCPath" } },
  { id: "d28", label: "Dr. Efua Ansah", type: "doctor", details: { specialty: "Public Health", qualification: "MBChB, MPH" } },
  { id: "d29", label: "Dr. Kojo Asare", type: "doctor", details: { specialty: "Trauma Surgery", qualification: "MD, FACS" } },
  { id: "d30", label: "Dr. Adwoa Mensah", type: "doctor", details: { specialty: "Pediatric Surgery", qualification: "MBChB, FWACS" } },
];

// Facility → Region relationships
const facilityRegionEdges: GraphEdge[] = [
  // Greater Accra
  { source: "f1", target: "r1", relation: "located_in" },
  { source: "f2", target: "r1", relation: "located_in" },
  { source: "f3", target: "r1", relation: "located_in" },
  { source: "f13", target: "r1", relation: "located_in" },
  { source: "f14", target: "r1", relation: "located_in" },
  { source: "f15", target: "r1", relation: "located_in" },
  { source: "f16", target: "r1", relation: "located_in" },
  { source: "f17", target: "r1", relation: "located_in" },
  // Ashanti
  { source: "f4", target: "r2", relation: "located_in" },
  { source: "f18", target: "r2", relation: "located_in" },
  { source: "f19", target: "r2", relation: "located_in" },
  { source: "f20", target: "r2", relation: "located_in" },
  // Northern
  { source: "f5", target: "r3", relation: "located_in" },
  { source: "f30", target: "r3", relation: "located_in" },
  // Western
  { source: "f6", target: "r4", relation: "located_in" },
  { source: "f21", target: "r4", relation: "located_in" },
  { source: "f22", target: "r4", relation: "located_in" },
  // Eastern
  { source: "f7", target: "r5", relation: "located_in" },
  { source: "f27", target: "r5", relation: "located_in" },
  // Central
  { source: "f8", target: "r6", relation: "located_in" },
  { source: "f28", target: "r6", relation: "located_in" },
  // Volta
  { source: "f9", target: "r7", relation: "located_in" },
  { source: "f23", target: "r7", relation: "located_in" },
  { source: "f29", target: "r7", relation: "located_in" },
  // Upper East
  { source: "f10", target: "r8", relation: "located_in" },
  { source: "f24", target: "r8", relation: "located_in" },
  // Upper West
  { source: "f11", target: "r9", relation: "located_in" },
  { source: "f25", target: "r9", relation: "located_in" },
  // Bono
  { source: "f12", target: "r10", relation: "located_in" },
  { source: "f26", target: "r10", relation: "located_in" },
];

// Doctor → Facility relationships (works_at)
const doctorFacilityEdges: GraphEdge[] = [
  { source: "d1", target: "f1", relation: "works_at" },
  { source: "d2", target: "f1", relation: "works_at" },
  { source: "d3", target: "f1", relation: "works_at" },
  { source: "d4", target: "f1", relation: "works_at" },
  { source: "d25", target: "f1", relation: "works_at" },
  { source: "d26", target: "f17", relation: "works_at" },
  { source: "d5", target: "f2", relation: "works_at" },
  { source: "d29", target: "f2", relation: "works_at" },
  { source: "d6", target: "f3", relation: "works_at" },
  { source: "d7", target: "f4", relation: "works_at" },
  { source: "d8", target: "f4", relation: "works_at" },
  { source: "d9", target: "f4", relation: "works_at" },
  { source: "d10", target: "f5", relation: "works_at" },
  { source: "d21", target: "f5", relation: "works_at" },
  { source: "d11", target: "f6", relation: "works_at" },
  { source: "d12", target: "f7", relation: "works_at" },
  { source: "d13", target: "f8", relation: "works_at" },
  { source: "d14", target: "f8", relation: "works_at" },
  { source: "d15", target: "f9", relation: "works_at" },
  { source: "d16", target: "f10", relation: "works_at" },
  { source: "d17", target: "f12", relation: "works_at" },
  { source: "d18", target: "f13", relation: "works_at" },
  { source: "d19", target: "f14", relation: "works_at" },
  { source: "d20", target: "f4", relation: "works_at" },
  { source: "d22", target: "f15", relation: "works_at" },
  { source: "d23", target: "f1", relation: "works_at" },
  { source: "d24", target: "f5", relation: "works_at" },
  { source: "d27", target: "f1", relation: "works_at" },
  { source: "d28", target: "f11", relation: "works_at" },
  { source: "d30", target: "f17", relation: "works_at" },
];

// Facility → Equipment relationships (has_equipment)
const facilityEquipmentEdges: GraphEdge[] = [
  // Korle Bu - well equipped
  { source: "f1", target: "e1", relation: "has_equipment" },
  { source: "f1", target: "e2", relation: "has_equipment" },
  { source: "f1", target: "e3", relation: "has_equipment" },
  { source: "f1", target: "e4", relation: "has_equipment" },
  { source: "f1", target: "e5", relation: "has_equipment" },
  { source: "f1", target: "e6", relation: "has_equipment" },
  { source: "f1", target: "e7", relation: "has_equipment" },
  { source: "f1", target: "e8", relation: "has_equipment" },
  { source: "f1", target: "e9", relation: "has_equipment" },
  { source: "f1", target: "e10", relation: "has_equipment" },
  { source: "f1", target: "e11", relation: "has_equipment" },
  { source: "f1", target: "e12", relation: "has_equipment" },
  { source: "f1", target: "e15", relation: "has_equipment" },
  { source: "f1", target: "e16", relation: "has_equipment" },
  { source: "f1", target: "e20", relation: "has_equipment" },
  // 37 Military
  { source: "f2", target: "e1", relation: "has_equipment" },
  { source: "f2", target: "e2", relation: "has_equipment" },
  { source: "f2", target: "e3", relation: "has_equipment" },
  { source: "f2", target: "e5", relation: "has_equipment" },
  { source: "f2", target: "e7", relation: "has_equipment" },
  { source: "f2", target: "e12", relation: "has_equipment" },
  // Ridge
  { source: "f3", target: "e2", relation: "has_equipment" },
  { source: "f3", target: "e3", relation: "has_equipment" },
  { source: "f3", target: "e4", relation: "has_equipment" },
  { source: "f3", target: "e7", relation: "has_equipment" },
  // KATH
  { source: "f4", target: "e1", relation: "has_equipment" },
  { source: "f4", target: "e2", relation: "has_equipment" },
  { source: "f4", target: "e3", relation: "has_equipment" },
  { source: "f4", target: "e4", relation: "has_equipment" },
  { source: "f4", target: "e5", relation: "has_equipment" },
  { source: "f4", target: "e6", relation: "has_equipment" },
  { source: "f4", target: "e7", relation: "has_equipment" },
  { source: "f4", target: "e10", relation: "has_equipment" },
  { source: "f4", target: "e11", relation: "has_equipment" },
  { source: "f4", target: "e12", relation: "has_equipment" },
  { source: "f4", target: "e15", relation: "has_equipment" },
  { source: "f4", target: "e20", relation: "has_equipment" },
  // Tamale
  { source: "f5", target: "e2", relation: "has_equipment" },
  { source: "f5", target: "e3", relation: "has_equipment" },
  { source: "f5", target: "e4", relation: "has_equipment" },
  { source: "f5", target: "e5", relation: "has_equipment" },
  { source: "f5", target: "e7", relation: "has_equipment" },
  { source: "f5", target: "e11", relation: "has_equipment" },
  { source: "f5", target: "e17", relation: "has_equipment" },
  // Effia Nkwanta
  { source: "f6", target: "e3", relation: "has_equipment" },
  { source: "f6", target: "e4", relation: "has_equipment" },
  { source: "f6", target: "e7", relation: "has_equipment" },
  { source: "f6", target: "e17", relation: "has_equipment" },
  // Others - basic equipment
  { source: "f7", target: "e3", relation: "has_equipment" },
  { source: "f7", target: "e4", relation: "has_equipment" },
  { source: "f7", target: "e18", relation: "has_equipment" },
  { source: "f8", target: "e2", relation: "has_equipment" },
  { source: "f8", target: "e3", relation: "has_equipment" },
  { source: "f8", target: "e4", relation: "has_equipment" },
  { source: "f8", target: "e7", relation: "has_equipment" },
  { source: "f8", target: "e10", relation: "has_equipment" },
  { source: "f8", target: "e12", relation: "has_equipment" },
  { source: "f9", target: "e3", relation: "has_equipment" },
  { source: "f9", target: "e4", relation: "has_equipment" },
  { source: "f9", target: "e7", relation: "has_equipment" },
  { source: "f9", target: "e18", relation: "has_equipment" },
  { source: "f10", target: "e3", relation: "has_equipment" },
  { source: "f10", target: "e4", relation: "has_equipment" },
  { source: "f10", target: "e17", relation: "has_equipment" },
  { source: "f11", target: "e3", relation: "has_equipment" },
  { source: "f11", target: "e4", relation: "has_equipment" },
  { source: "f11", target: "e14", relation: "has_equipment" },
  { source: "f12", target: "e3", relation: "has_equipment" },
  { source: "f12", target: "e4", relation: "has_equipment" },
  { source: "f12", target: "e7", relation: "has_equipment" },
  { source: "f12", target: "e18", relation: "has_equipment" },
  { source: "f13", target: "e2", relation: "has_equipment" },
  { source: "f13", target: "e3", relation: "has_equipment" },
  { source: "f13", target: "e4", relation: "has_equipment" },
  { source: "f13", target: "e5", relation: "has_equipment" },
  { source: "f13", target: "e7", relation: "has_equipment" },
  { source: "f13", target: "e18", relation: "has_equipment" },
  { source: "f14", target: "e3", relation: "has_equipment" },
  { source: "f14", target: "e4", relation: "has_equipment" },
  { source: "f14", target: "e17", relation: "has_equipment" },
  { source: "f17", target: "e4", relation: "has_equipment" },
  { source: "f17", target: "e11", relation: "has_equipment" },
  { source: "f17", target: "e18", relation: "has_equipment" },
];

// Facility referral edges
const referralEdges: GraphEdge[] = [
  { source: "f3", target: "f1", relation: "refers_to" },
  { source: "f14", target: "f1", relation: "refers_to" },
  { source: "f15", target: "f3", relation: "refers_to" },
  { source: "f16", target: "f1", relation: "refers_to" },
  { source: "f17", target: "f1", relation: "refers_to" },
  { source: "f18", target: "f4", relation: "refers_to" },
  { source: "f19", target: "f4", relation: "refers_to" },
  { source: "f20", target: "f4", relation: "refers_to" },
  { source: "f22", target: "f6", relation: "refers_to" },
  { source: "f21", target: "f6", relation: "refers_to" },
  { source: "f27", target: "f7", relation: "refers_to" },
  { source: "f23", target: "f9", relation: "refers_to" },
  { source: "f29", target: "f9", relation: "refers_to" },
  { source: "f24", target: "f10", relation: "refers_to" },
  { source: "f25", target: "f11", relation: "refers_to" },
  { source: "f26", target: "f12", relation: "refers_to" },
  { source: "f30", target: "f5", relation: "refers_to" },
];

export const ghanaHealthcareData: GraphData = {
  nodes: [...regions, ...facilities, ...equipment, ...doctors],
  edges: [...facilityRegionEdges, ...doctorFacilityEdges, ...facilityEquipmentEdges, ...referralEdges],
};

// Node color mapping
export const nodeColors: Record<NodeType, string> = {
  facility: "#3b82f6",  // blue
  doctor: "#22c55e",    // green
  equipment: "#f97316", // orange
  region: "#a855f7",    // purple
};

export const nodeIcons: Record<NodeType, string> = {
  facility: "🏥",
  doctor: "👨‍⚕️",
  equipment: "🔧",
  region: "📍",
};
