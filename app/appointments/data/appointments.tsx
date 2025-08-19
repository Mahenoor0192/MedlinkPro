// data/appointments.ts
export type SpecialtyId =
  | "cardiology"
  | "neurology"
  | "ophthalmology"
  | "orthopedics"
  | "pediatrics"
  | "general";
export type Doctor = {
  id: string;
  name: string;
  specialty: SpecialtyId;
  rating: number;
  reviews: number;
  years: number;
  hospitalId: string;
  avatar?: string;
};
export type Hospital = {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  openInfo: string; // "Open 24/7", "Closes at 6 PM" etc
  specialties: SpecialtyId[];
  doctors: Doctor[];
};

export const SPECIALTIES: { id: SpecialtyId; label: string; icon: any }[] = [
  { id: "cardiology", label: "Cardiology", icon: "heart" },
  { id: "neurology", label: "Neurology", icon: "brain" },
  { id: "ophthalmology", label: "Ophthalmology", icon: "eye" },
  { id: "orthopedics", label: "Orthopedics", icon: "bone" },
  { id: "pediatrics", label: "Pediatrics", icon: "baby" },
  { id: "general", label: "General", icon: "stethoscope" },
];

export const HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "City General Hospital",
    distanceKm: 0.5,
    address: "Downtown, Main Street",
    rating: 4.8,
    reviews: 1248,
    isOpen: true,
    openInfo: "Open 24/7",
    specialties: ["cardiology", "orthopedics", "general", "neurology"],
    doctors: [
      {
        id: "d1",
        name: "Dr. Sarah Chen",
        specialty: "neurology",
        rating: 4.7,
        reviews: 127,
        years: 12,
        hospitalId: "h1",
      },
      {
        id: "d2",
        name: "Dr. James Wilson",
        specialty: "cardiology",
        rating: 4.9,
        reviews: 324,
        years: 10,
        hospitalId: "h1",
      },
    ],
  },
  {
    id: "h2",
    name: "Metro Medical Center",
    distanceKm: 1.2,
    address: "Medical District, 2nd Ave",
    rating: 4.6,
    reviews: 856,
    isOpen: true,
    openInfo: "Open until 10 PM",
    specialties: ["ophthalmology", "general", "orthopedics"],
    doctors: [
      {
        id: "d3",
        name: "Dr. Michael Brown",
        specialty: "orthopedics",
        rating: 4.8,
        reviews: 267,
        years: 9,
        hospitalId: "h2",
      },
    ],
  },
  {
    id: "h3",
    name: "St. Mary's Hospital",
    distanceKm: 2.1,
    address: "Westside, Oak Street",
    rating: 4.5,
    reviews: 1052,
    isOpen: true,
    openInfo: "Open 24/7",
    specialties: ["pediatrics", "general", "cardiology"],
    doctors: [
      {
        id: "d4",
        name: "Dr. Emily Davis",
        specialty: "pediatrics",
        rating: 4.6,
        reviews: 415,
        years: 10,
        hospitalId: "h3",
      },
    ],
  },
  {
    id: "h4",
    name: "Sunshine Clinic",
    distanceKm: 3.5,
    address: "Eastside, Park Avenue",
    rating: 4.3,
    reviews: 298,
    isOpen: false,
    openInfo: "Closes at 6 PM",
    specialties: ["general", "ophthalmology"],
    doctors: [
      {
        id: "d5",
        name: "Dr. Robert Garcia",
        specialty: "general",
        rating: 4.4,
        reviews: 205,
        years: 8,
        hospitalId: "h4",
      },
    ],
  },
];

export const RECENT_DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Sarah Chen",
    specialty: "neurology",
    rating: 4.7,
    reviews: 127,
    years: 12,
    hospitalId: "h1",
  },
  {
    id: "d2",
    name: "Dr. James Wilson",
    specialty: "cardiology",
    rating: 4.9,
    reviews: 324,
    years: 10,
    hospitalId: "h1",
  },
  {
    id: "d4",
    name: "Dr. Emily Davis",
    specialty: "pediatrics",
    rating: 4.6,
    reviews: 415,
    years: 10,
    hospitalId: "h3",
  },
];
