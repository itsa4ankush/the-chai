// Real Ghana Healthcare Dataset - extracted from Virtue Foundation data
// Deduplicated by pk_unique_id, best row selected per facility

export interface RawFacility {
  id: number;
  name: string;
  type: "facility" | "ngo";
  facilityType: string | null;
  operatorType: string | null;
  specialties: string[];
  equipment: string[];
  capabilities: string[];
  procedures: string[];
  city: string;
  region: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  yearEstablished: number | null;
  capacity: number | null;
  numberDoctors: number | null;
}

export const rawFacilities: RawFacility[] = [
  {
    id: 1, name: "WAAF (West Africa AIDS Foundation)", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["infectiousDiseases", "publicHealth", "hospiceAndPalliativeInternalMedicine"],
    equipment: [], capabilities: ["HIV/AIDS services", "PMTCT", "Behavior Change Communication", "HIV Testing and Counseling", "Community Outreach", "Hospice/Home Based Care"],
    procedures: [], city: "Takoradi", region: "Western", address: "109/No 1 Bekwai Rd", description: "Committed to battling HIV/AIDS, TB, and other conditions through grassroot initiatives.", phone: "+233249354576", email: "", website: "waafweb.org", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 2, name: "1st Foundation Clinic", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Dansoman", region: "Greater Accra", address: "Opp. Standard Chartered Bank", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 3, name: "2BN Military Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine", "dentistry", "emergencyMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Apremdo", region: "Western", address: "", description: "Quasi-government hospital in Western, Apremdo Ghana.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 4, name: "37 Military Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Located at Liberation Rd. 37, Accra"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "Liberation Rd. 37", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 5, name: "3E Medical Center", type: "facility", facilityType: null, operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Always open"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "", description: "A health care institution providing patient treatment with specialized medical and nursing staff.", phone: "+233534382738", email: "3emedicalcenter@gmail.com", website: "3emedicalcenter.org", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 6, name: "3Way Family Care Clinic", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Acherensua", region: "Ahafo", address: "Behind Cuzi Soap Training Centre, Krofrom", description: "", phone: "+233551236606", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 7, name: "A&A Medlove Medical Centre", type: "facility", facilityType: null, operatorType: null,
    specialties: ["gynecologyAndObstetrics", "pediatrics", "ophthalmology", "diagnosticRadiology", "cardiology"],
    equipment: [], capabilities: ["Open 24 hours", "Established June 2016", "11-15 employees"],
    procedures: ["General medical consultations", "Specialist consultations", "Obstetrics and gynecology services", "Pediatrics consultations", "Eye care services", "Ultrasound scans", "ECG"],
    city: "Accra", region: "Greater Accra", address: "Ashongman-Abokobi road", description: "Medical facility established in June 2016.", phone: "+233554420306", email: "", website: "", yearEstablished: 2016, capacity: null, numberDoctors: null
  },
  {
    id: 8, name: "Abomosu Health Centre", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Always open"],
    procedures: [], city: "Abomosu", region: "Eastern", address: "", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 9, name: "Aboraa Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "Ring Road Central", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 10, name: "Abuakwa Maternity Home", type: "facility", facilityType: "hospital", operatorType: "private",
    specialties: ["gynecologyAndObstetrics", "internalMedicine", "obstetricsAndMaternityCare"],
    equipment: [], capabilities: [], procedures: [],
    city: "Abuakwa", region: "Ashanti", address: "", description: "Private maternity home.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 11, name: "Abura Health Centre", type: "facility", facilityType: null, operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["NHIS accredited"],
    procedures: [], city: "Abura", region: "Western", address: "P.O. Box 49, DHA", description: "Government-owned Health Centre offering general services.", phone: "+233209261873", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 12, name: "Accra Medical Centre", type: "facility", facilityType: null, operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "161 Ringway Estate, Osu", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 13, name: "Accra Newtown Islamic Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine", "ophthalmology", "nephrology", "generalSurgery", "radiology", "clinicalPathology"],
    equipment: ["Ultra-modern operating theatre", "On-site laboratory facilities"],
    capabilities: ["Lab tests 24/7", "Pharmacy 24/7", "Dialysis Center", "Insurance partnerships with Metro, Glico, Star, ACE Medical, NHIS"],
    procedures: ["Ultrasound scanning", "X-ray imaging", "Major and minor surgeries", "Laboratory testing"],
    city: "Accra", region: "Greater Accra", address: "Obaakrowa Close, Accra Newtown", description: "Modern Healthcare for everybody.", phone: "+233302229301", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 14, name: "Accra Physiotherapy & Sports Injury Clinic", type: "facility", facilityType: null, operatorType: null,
    specialties: ["sportsMedicinePMR"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "127/21 Saflo Link, Abelemkpe", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 15, name: "Accra Psychiatric Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["psychiatry", "emergencyMedicine", "pathology", "addictionPsychiatry", "physicalMedicineAndRehabilitation", "internalMedicine"],
    equipment: [], capabilities: ["24hr Emergency care", "15 wards with capacity 600 patients", "Currently 300 beds due to Covid-19"],
    procedures: ["OPD services", "Clinical Psychology services", "Electro Convulsive Therapy", "Laboratory Services", "24hr Pharmacy", "Occupational therapy"],
    city: "Accra", region: "Greater Accra", address: "Castle Road, Box 1305", description: "Psychiatric hospital providing mental health services.", phone: "+233577690753", email: "info@accrapsychiatrichospital.org", website: "accrapsychiatrichospital.org", yearEstablished: null, capacity: 600, numberDoctors: null
  },
  {
    id: 16, name: "Accra Specialist Eye Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["ophthalmology", "cataractAndAnteriorSegmentSurgery", "glaucomaOphthalmology", "retinaAndVitreoretinalOphthalmology"],
    equipment: ["Optical Coherence Tomography (OCT) machine", "Fundus photography equipment", "B-scan ocular ultrasonography device", "Gonioscopy equipment", "Visual field testing equipment"],
    capabilities: ["Voted Best Eye Hospital in Ghana", "Mon-Fri 8am-5pm, Sat 8:30am-1:30pm"],
    procedures: ["Cataract surgeries", "Laser eye surgeries", "Glaucoma surgeries", "Retina surgeries", "Cornea transplant", "Vitrectomy", "Pediatric eye care", "OCT imaging"],
    city: "Accra", region: "Greater Accra", address: "49 Nii Ayi Kushie St, Tantra Hill", description: "Excellence in Eye Care. Advanced laser and cataract surgeries.", phone: "+233500060545", email: "hello@accraspecialisteye.com", website: "accraspecialisteye.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 17, name: "Achiase Health Centre", type: "facility", facilityType: null, operatorType: "public",
    specialties: [], equipment: [], capabilities: ["NHIS accredited"],
    procedures: [], city: "Achiase", region: "Ashanti", address: "", description: "Government-owned health centre.", phone: "+233244531142", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 18, name: "Achimota Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "GA-297-6410", description: "", phone: "+233206945455", email: "achimota.dhgar@ghs.gov.gh", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 19, name: "Acrecity Medics", type: "facility", facilityType: "clinic", operatorType: "private",
    specialties: ["gynecologyAndObstetrics", "pediatrics", "otolaryngology", "internalMedicine", "ophthalmology", "dermatology", "orthopedicSurgery", "urology", "generalSurgery"],
    equipment: [], capabilities: ["Mon-Fri 08:00-19:00, Sat 09:00-14:00", "3 minutes from Kotoka International Airport"],
    procedures: ["Diagnostic imaging", "In-house laboratory"],
    city: "Accra", region: "Greater Accra", address: "Suite G05 Nester Square, Airport City", description: "Clinic in Airport City, Accra.", phone: "+233303976965", email: "info@acrecitymedics.com", website: "acrecitymedics.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 20, name: "Acres Medical Centre", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine", "pediatrics"], equipment: [], capabilities: [],
    procedures: ["Pediatric consultations"], city: "Accra", region: "Greater Accra", address: "82 Lakeside Estate Community 1, Ashaley Botwe", description: "", phone: "+233509899878", email: "acresmedicalcentre@gmail.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 21, name: "Adabraka Polyclinic (Ridge Hospital OPD)", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 35, name: "Agogo Presbyterian Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Oldest Mission Hospital in Ghana", "24/7 operations", "Ranks second to KATH in Ashanti Region"],
    procedures: [], city: "Agogo", region: "Ashanti", address: "", description: "Established 21 March 1931. Oldest Mission Hospital in Ghana.", phone: "+233322495750", email: "info@agogopresbyhospital.org", website: "agogopresbyhospital.org", yearEstablished: 1931, capacity: null, numberDoctors: null
  },
  {
    id: 38, name: "Ahmadiyya Muslim Hospital Asokore Ashanti", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Good hospitality and services"],
    procedures: [], city: "Asokore", region: "Ashanti", address: "Akwamase Street", description: "Noted for good hospitality and better services.", phone: "+233244222575", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 39, name: "Ahmadiyya Muslim Hospital, Techiman", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [],
    capabilities: ["100-bed capacity", "24 hours daily", "Laboratory Unit", "Theatre Unit", "Maternity Unit", "Male and Female Ward", "Children's Ward", "Emergency Ward"],
    procedures: ["Maternal and Child Health Service", "General OPD", "Ward admission", "Theatre services", "ART and HIV services"],
    city: "Techiman", region: "Bono East", address: "P.O.BOX 15", description: "100-bed facility providing primary level healthcare.", phone: "+233352522818", email: "amhttam@gmail.com", website: "", yearEstablished: 1972, capacity: 100, numberDoctors: null
  },
  {
    id: 40, name: "Ahmadiyya Muslim Mission Hospital Daboase", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["NHIS accredited"],
    procedures: [], city: "Daboase", region: "Western", address: "Ahmadiyya Hospital Compound, P.O.BOX 31", description: "Mission primary hospital.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 41, name: "AIH Lab & X-ray Center", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["clinicalPathology", "diagnosticRadiology"],
    equipment: [], capabilities: ["Diagnostic Center"],
    procedures: ["Medical laboratory tests", "X-ray imaging", "Ultrasound scans"],
    city: "Tema", region: "Greater Accra", address: "Community 22 Junction", description: "", phone: "+233303319319", email: "Aihospitaltema@gmail.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 42, name: "Airport Women's Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["gynecologyAndObstetrics", "pediatrics", "internalMedicine"],
    equipment: [], capabilities: ["Always open", "Pregnancy Care Center"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "No. 16 Kofi Annan Street, Airport Residential Area", description: "", phone: "+233545565525", email: "info@airportwomenshospital.com", website: "airportwomenshospital.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 43, name: "Aisha Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine", "generalSurgery", "gynecologyAndObstetrics", "ophthalmology", "otolaryngology", "dentistry", "nephrology", "urology", "radiology", "anesthesia", "emergencyMedicine"],
    equipment: ["X-ray machines", "CT scanners", "MRI scanners", "Ultrasound devices", "Nuclear medicine imaging equipment"],
    capabilities: ["VIP department", "Emergency care 24/7", "Renal and Dialysis Center", "Direct insurance billing"],
    procedures: ["Surgical procedures", "Pre-hospital emergency care", "Diagnostic imaging (X-ray, CT, MRI, ultrasound, nuclear medicine)"],
    city: "Tamale", region: "Northern", address: "Old Airport Road", description: "Located in Tamale on the Old Airport Road.", phone: "+233372097094", email: "info@aishahospital.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 44, name: "Ajumako Hospital", type: "facility", facilityType: "hospital", operatorType: "public",
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Ajumako", region: "Central", address: "", description: "Government district hospital.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 46, name: "Akatsi South Municipal Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["psychiatry", "gynecologyAndObstetrics", "pediatrics", "dentistry", "otolaryngology", "ophthalmology", "internalMedicine", "radiology", "publicHealth"],
    equipment: [], capabilities: ["24/7 operations", "Mental health services", "Breast and cervical screening", "Upgraded to Municipal status 2021"],
    procedures: ["OPD services", "Inpatient services", "Laboratory services", "Pharmacy services", "ART services", "Public health services"],
    city: "Akatsi", region: "Volta", address: "Gbalixorme, on the Akatsi-Tadzewu-Dzodze road", description: "Established as dental clinic in 1996, upgraded to municipal hospital.", phone: "+233544666114", email: "", website: "", yearEstablished: 1996, capacity: null, numberDoctors: null
  },
  {
    id: 52, name: "Al-Ayar Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "Dzagble Avenue", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 119, name: "Beulah Land International Hospital", type: "facility", facilityType: "hospital", operatorType: "private",
    specialties: ["internalMedicine", "pediatrics", "gynecologyAndObstetrics", "radiology", "cardiology", "urology", "pathology"],
    equipment: ["Operating rooms"], capabilities: ["UK and USA Christian Missionary Healthcare Provider", "Free medical care for religious leaders"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "35 Coconut Street, Amasaman", description: "Christian Missionary Healthcare Provider.", phone: "+233547715422", email: "info@beulahland.co.uk", website: "", yearEstablished: 2022, capacity: null, numberDoctors: null
  },
  {
    id: 120, name: "Bibiani Municipal Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Center of excellence in healthcare"],
    procedures: [], city: "Bibiani", region: "Western North", address: "", description: "Quality service by well-motivated staff.", phone: "+233243334801", email: "municipalhospital108bibiani@gmail.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 121, name: "Bimbilla Hospital", type: "facility", facilityType: "hospital", operatorType: "public",
    specialties: ["internalMedicine"], equipment: [], capabilities: ["NHIS accredited"],
    procedures: [], city: "Bimbilla", region: "Northern", address: "", description: "Government primary hospital.", phone: "+233244420879", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 128, name: "Bole Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["24/7 operations"],
    procedures: [], city: "Bole", region: "Savannah", address: "Mandari Road", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 131, name: "Bre Nye Kwa Hospital", type: "facility", facilityType: "hospital", operatorType: "public",
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Berekum", region: "Bono", address: "", description: "Government hospital.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 134, name: "Britannia Medical Centre", type: "facility", facilityType: "hospital", operatorType: "private",
    specialties: ["internalMedicine", "generalSurgery", "gynecologyAndObstetrics", "emergencyMedicine", "radiology", "pediatrics", "familyMedicine", "dentistry", "urology", "orthopedicSurgery"],
    equipment: [], capabilities: ["Emergency care 24 hours", "IVF services"],
    procedures: ["Antenatal clinics", "Fetal ultrasound examination", "General surgery", "IVF services", "Emergency care", "Pediatric care", "Dentistry", "Laboratory testing", "X-ray imaging"],
    city: "Tema", region: "Greater Accra", address: "", description: "", phone: "+233202400733", email: "info@britanniamedical.org", website: "britanniamedical.org", yearEstablished: 2020, capacity: null, numberDoctors: null
  },
  {
    id: 136, name: "Brong Ahafo Regional Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: ["Automatic changeover oxygen manifold"], capabilities: [],
    procedures: [], city: "Sunyani", region: "Bono", address: "", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 137, name: "Bryant Mission Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Obuasi", region: "Ashanti", address: "Obuasi Municipal", description: "Primary hospital.", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 138, name: "Buck Hospital & Fertility Center", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["gynecologyAndObstetrics", "reproductiveEndocrinologyAndInfertility", "pediatrics", "urology", "generalSurgery", "internalMedicine"],
    equipment: ["State-of-the-art operating room equipment"], capabilities: ["Fertility Clinic"],
    procedures: ["Fertility management", "Surgical procedures", "Urgent medical treatments", "Preventive OB/GYN", "Pediatric health management"],
    city: "Accra", region: "Greater Accra", address: "105-43 Gye Nyame St, Taifa", description: "", phone: "+233592196003", email: "buckspecialisthospital@gmail.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 228, name: "Elpis Wound Care Center", type: "facility", facilityType: null, operatorType: null,
    specialties: ["woundHealingAndDermatologicRegenerativeMedicine"], equipment: [], capabilities: [],
    procedures: [], city: "Accra", region: "Greater Accra", address: "Teshie, Ledzokuku-Krowor", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 229, name: "Elubo Health Center", type: "facility", facilityType: null, operatorType: "public",
    specialties: ["internalMedicine"], equipment: [], capabilities: ["NHIS accredited"],
    procedures: [], city: "Half Assini", region: "Western", address: "Box 96", description: "Government Health Centre.", phone: "+233240569304", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 230, name: "Emmanuel Eye Clinic", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["ophthalmology"], equipment: [], capabilities: ["Open 24/7"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "East Legon", description: "", phone: "", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 232, name: "Empat-Caiquo Medical Centre", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["24/7 operations"],
    procedures: [], city: "Tema", region: "Greater Accra", address: "Adjacent SOS Children's Village, Hermann-Gmeiner Road", description: "The hospital you trust to care for those you love.", phone: "+233303304484", email: "info@empatcaiquo.com", website: "empatcaiquo.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 233, name: "Enchi Government Hospital", type: "facility", facilityType: "hospital", operatorType: "public",
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Open 24/7", "Primary Care Municipal Hospital"],
    procedures: [], city: "Enchi", region: "Western North", address: "Aowin Municipality", description: "Primary Care Municipal Hospital.", phone: "+233546291705", email: "", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 234, name: "Eric Heymann Memorial Hospital", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["24/7 operations", "Community-based facility"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "CT 4242 Cantonments", description: "A community based facility providing accessible healthcare.", phone: "+233501636990", email: "ericheymannmemorialclinic@yahoo.com", website: "ericheymannmemorialclinic.webs.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 236, name: "Essence Medical Laboratory", type: "facility", facilityType: null, operatorType: null,
    specialties: ["clinicalPathology", "radiology", "andrology"],
    equipment: ["Radiography equipment (X-Ray, ECG, Ultrasound)", "Laboratory equipment for biochemistry, immunology, hematology, parasitology, microbiology"],
    capabilities: ["Health checkup packages", "Quality assurance"],
    procedures: ["Laboratory testing", "Radiography services (X-Ray, ECG, Ultrasound)"],
    city: "Accra", region: "Greater Accra", address: "Trade Fair, 25th Giffard Rd", description: "Professional Chinese-funded medical institution.", phone: "+233531055795", email: "info@essencemedlab.com", website: "essencemedlab.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 237, name: "Evangelical Church of Ghana Hospital, Kpandai", type: "facility", facilityType: "hospital", operatorType: null,
    specialties: ["internalMedicine"], equipment: [], capabilities: ["Member of CHAG"],
    procedures: [], city: "Kpandai", region: "Northern", address: "", description: "ECG Hospital, member of Christian Health Association of Ghana.", phone: "", email: "Kpandaiecghospital@gmail.com", website: "", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 241, name: "Excel Dental Clinic", type: "facility", facilityType: "clinic", operatorType: "private",
    specialties: ["dentistry", "cosmeticDentistry", "endodontics"],
    equipment: [], capabilities: ["Mon-Fri 9am-5pm, Sat 9am-3pm", "Certified dentists"],
    procedures: ["Oral Health Consultations", "Comprehensive dental services", "Restorative dentistry", "Cosmetic dentistry"],
    city: "Accra", region: "Greater Accra", address: "Achimota, Abofu Traffic Light", description: "Emphasis on prevention and personalized dental care.", phone: "+233542575691", email: "info@exceldentalghana.com", website: "exceldentalghana.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 242, name: "Excellent EyeCare Ghana", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["ophthalmology"],
    equipment: ["Modern eye equipment for comprehensive examination and diagnosis"],
    capabilities: ["Comprehensive eye examinations", "Glaucoma awareness programs"],
    procedures: [], city: "Kasoa", region: "Greater Accra", address: "Obom road", description: "Fully equipped with modern eye equipment.", phone: "+2332016711017", email: "excellenteyecareghltd@gmail.com", website: "excellent-eyecare-ghana-ltd.business.site", yearEstablished: null, capacity: null, numberDoctors: null
  },
  {
    id: 243, name: "Executive Heart Centre", type: "facility", facilityType: "clinic", operatorType: null,
    specialties: ["cardiology"],
    equipment: ["Cutting-edge cardiovascular technology"],
    capabilities: ["Ultra-modern cardiology clinic", "Diagnosing all types of CVDs"],
    procedures: [], city: "Accra", region: "Greater Accra", address: "37 Olusegun Obassanjo Highway", description: "Ultra-modern cardiology clinic with cutting-edge technology.", phone: "+233243918444", email: "executiveheartcentre.social@gmail.com", website: "executiveheartcentre.com", yearEstablished: null, capacity: null, numberDoctors: null
  },
];

// Specialty display names
export const specialtyLabels: Record<string, string> = {
  internalMedicine: "Internal Medicine",
  dentistry: "Dentistry",
  emergencyMedicine: "Emergency Medicine",
  gynecologyAndObstetrics: "OB/GYN",
  pediatrics: "Pediatrics",
  ophthalmology: "Ophthalmology",
  generalSurgery: "General Surgery",
  psychiatry: "Psychiatry",
  radiology: "Radiology",
  cardiology: "Cardiology",
  orthopedicSurgery: "Orthopedic Surgery",
  nephrology: "Nephrology",
  urology: "Urology",
  dermatology: "Dermatology",
  otolaryngology: "ENT",
  pathology: "Pathology",
  clinicalPathology: "Clinical Pathology",
  diagnosticRadiology: "Diagnostic Radiology",
  infectiousDiseases: "Infectious Diseases",
  publicHealth: "Public Health",
  familyMedicine: "Family Medicine",
  anesthesia: "Anesthesia",
  sportsMedicinePMR: "Sports Medicine",
  addictionPsychiatry: "Addiction Psychiatry",
  physicalMedicineAndRehabilitation: "Physical Medicine & Rehab",
  hospiceAndPalliativeInternalMedicine: "Hospice & Palliative Care",
  obstetricsAndMaternityCare: "Obstetrics & Maternity",
  cataractAndAnteriorSegmentSurgery: "Cataract Surgery",
  glaucomaOphthalmology: "Glaucoma",
  retinaAndVitreoretinalOphthalmology: "Retina & Vitreoretinal",
  cosmeticDentistry: "Cosmetic Dentistry",
  endodontics: "Endodontics",
  orthodontics: "Orthodontics",
  woundHealingAndDermatologicRegenerativeMedicine: "Wound Healing",
  andrology: "Andrology",
  reproductiveEndocrinologyAndInfertility: "Reproductive Medicine & IVF",
  hematology: "Hematology",
  transplantSurgery: "Transplant Surgery",
  medicalOncology: "Medical Oncology",
  communityAndPublicPsychiatry: "Community Psychiatry",
  amputeeAndProstheticsAndOrthoticsRehabilitation: "Prosthetics & Orthotics",
};
