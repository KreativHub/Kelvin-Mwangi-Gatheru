

import React from 'react';
import { DirectoryItem, EmergencyContact, Gender, AgeBracket } from './types';

export const APP_NAME = "TUPATANE";

export const GENDER_OPTIONS = Object.values(Gender);
export const AGE_BRACKET_OPTIONS = Object.values(AgeBracket);

export interface NavLink {
  name: string;
  path: string;
  // Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon?: React.ReactElement;
}

export const NAV_LINKS: NavLink[] = [
  {
    name: "Home",
    path: "/",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M1.5 10.5v8.25A2.25 2.25 0 003.75 21h16.5a2.25 2.25 0 002.25-2.25V10.5M9 21V12.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75V21" })
    )
  },
  {
    name: "Report Missing",
    path: "/report-missing",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" })
    )
  },
  {
    name: "View Missing",
    path: "/view-missing",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM3.75 12h.007v.008H3.75V12zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" })
    )
  },
  {
    name: "Claims",
    path: "/claims",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
    )
  },
  {
    name: "Unclaimed Persons",
    path: "/unclaimed-persons",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" })
    )
  },
  {
    name: "Directory",
    path: "/directory",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" })
    )
  },
  {
    name: "Professional Support",
    path: "/support",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" })
    )
  },
  {
    name: "Emergency",
    path: "/emergency",
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor" },
      React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" })
    )
  },
];

export const MOCK_POLICE_STATIONS: DirectoryItem[] = [
  { id: "ps1", name: "Central Police Station, Nairobi", type: "Police Station", location: "Harry Thuku Rd, Nairobi", contact: "020-2222222", latitude: -1.282, longitude: 36.821 },
  { id: "ps2", name: "Kilimani Police Station", type: "Police Station", location: "Kilimani Rd, Nairobi", contact: "020-2345678", latitude: -1.289, longitude: 36.793 },
  { id: "ps3", name: "Mombasa Central Police", type: "Police Station", location: "Moi Avenue, Mombasa", contact: "041-2223333", latitude: -4.062, longitude: 39.670 },
];

export const MOCK_HOSPITALS: DirectoryItem[] = [
  { id: "h1", name: "Kenyatta National Hospital", type: "Hospital", location: "Hospital Rd, Nairobi", contact: "020-2726300", services: ["General", "Emergency", "Specialty"], latitude: -1.300, longitude: 36.806 },
  { id: "h2", name: "Aga Khan University Hospital", type: "Hospital", location: "3rd Parklands Ave, Nairobi", contact: "020-3662000", services: ["General", "Emergency", "Maternity", "Cardiology"], latitude: -1.265, longitude: 36.818 },
  { id: "h3", name: "Nairobi Hospital", type: "Hospital", location: "Argwings Kodhek Rd, Nairobi", contact: "020-2845000", services: ["General", "Oncology", "Pediatrics"], latitude: -1.298, longitude: 36.804 },
];

export const MOCK_MORTUARIES: DirectoryItem[] = [
  { id: "m1", name: "Chiromo Funeral Parlour", type: "Mortuary", location: "University of Nairobi, Chiromo Campus", contact: "020-2726300 ext 43601", latitude: -1.275, longitude: 36.809 },
  { id: "m2", name: "City Mortuary", type: "Mortuary", location: "Ngong Rd, Nairobi", contact: "020-2720072", latitude: -1.296, longitude: 36.808 },
  { id: "m3", name: "Lee Funeral Home", type: "Mortuary", location: "Argwings Kodhek Rd, Nairobi", contact: "020-2846000", latitude: -1.297, longitude: 36.802 },
];

export const MOCK_PROFESSIONAL_SERVICES: DirectoryItem[] = [
    { id: "prof1", name: "Kituo Cha Sheria", type: "Lawyer", location: "Ole Odume Road, Off Argwings Kodhek Road, Nairobi", contact: "0734-874221", notes: "Legal aid for human rights." },
    { id: "prof2", name: "ICJ Kenya", type: "Lawyer", location: "Vihiga Road, Kileleshwa, Nairobi", contact: "0722-204629", notes: "International Commission of Jurists - Kenya Section." },
    { id: "prof3", name: "Media Council of Kenya", type: "Journalist", location: "Britam Centre, Upper Hill, Nairobi", contact: "0727-735252", notes: "Complaints and journalist accreditation." },
    { id: "prof4", name: "Kenya Psychiatric Association", type: "Therapist", location: "Nairobi", contact: "info@kpa.co.ke", notes: "Referrals to therapists." },
    { id: "prof5", name: "IPOA Headquarters", type: "IPOA", location: "ACK Garden Annex, 1st Ngong Avenue, Nairobi", contact: "1559 (Toll-Free)", notes: "Independent Policing Oversight Authority." },
    { id: "prof6", name: "DCI Headquarters", type: "DCI", location: "Kiambu Road, Nairobi", contact: "0800 722 203 (Toll-Free)", notes: "For reporting serious crimes, including suspected foul play in disappearances." }
];

export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: "Kenya Police Emergency", number: "999 / 112", description: "For all police emergencies, accidents, and urgent situations." },
  { name: "Ambulance Services (St. John)", number: "0721 225 225", description: "Medical emergencies and ambulance dispatch." },
  { name: "National Disaster Operations Centre", number: "020 2210267", description: "For large scale disasters and coordination." },
  { name: "Childline Kenya", number: "116 (Toll-Free)", description: "For reporting child abuse or if a child is in distress." },
  { name: "Anti-Terror Police Unit", number: "0701 290000", description: "To report suspected terrorism activities." },
];