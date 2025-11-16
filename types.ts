

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  PreferNotToSay = "Prefer Not to Say"
}

export enum AgeBracket {
  Child_0_12 = "0-12 years (Child)",
  Teen_13_17 = "13-17 years (Teenager)",
  YoungAdult_18_25 = "18-25 years (Young Adult)",
  Adult_26_40 = "26-40 years (Adult)",
  MidAdult_41_60 = "41-60 years (Middle-aged Adult)",
  Senior_61_Plus = "61+ years (Senior)"
}

export interface MissingPersonReport {
  id: string;
  reporterIdDetails: string;
  reporterAgeConfirmed: boolean;
  missingFor24HoursPlus: boolean;
  missingPersonName: string;
  gender: Gender;
  ethnicity: string;
  religion: string;
  ageBracket: AgeBracket;
  occupation: string;
  schoolName?: string; // Optional, if student
  lastSeenLocation: string;
  latitude?: number;
  longitude?: number;
  lastSeenClothes: string;
  photo?: string; // base64 string or URL
  additionalInfo?: string;
  reportedAt: Date;
  status: "Missing" | "Found" | "Sighting Reported";
}

export interface SightingReport {
  id: string;
  missingPersonId: string;
  finderName: string;
  finderContact: string;
  sightingLocation: string;
  sightingTime: Date;
  sightingDetails: string;
  reportedAt: Date;
}


export enum ClaimType {
  MysteriousLoss = "Mysterious Loss",
  Arrested = "Arrested"
}

export interface Claim {
  id: string;
  claimType: ClaimType;
  reporterName: string;
  reporterContact: string;
  personInvolvedName: string;
  incidentDate: string;
  incidentLocation: string;
  details: string;
  reportedAt: Date;
}

export interface UnclaimedPerson {
  id: string;
  mortuaryName: string;
  mortuaryContact: string;
  timeReceived: string; // Could be ISO string or specific format
  reportedCauseOfDeath: string;
  stateOfDeceased: string;
  gender: Gender;
  estimatedAge?: string;
  distinguishingFeatures?: string;
  photo?: string; // base64 string or URL
  reportedAt: Date;
}

export interface DirectoryItem {
  id: string;
  name: string;
  type: "Police Station" | "Hospital" | "Mortuary" | "IPOA" | "Lawyer" | "Journalist" | "Therapist" | "DCI";
  location: string; // Could be an address or "GPS coordinates" string
  latitude?: number;
  longitude?: number;
  contact: string;
  services?: string[]; // For hospitals or other services
  notes?: string;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}