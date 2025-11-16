import React from 'react';
import { APP_NAME } from '../constants';
import { MissingPersonReport, Gender, AgeBracket } from '../types'; 

// --- Map Component Logic (inlined for file constraint) ---

// Simplified bounding box for Kenya for mapping coordinates to the view
const KENYA_BOUNDS = {
  latMin: -4.7, latMax: 5.1, lonMin: 33.9, lonMax: 41.9,
};

const getPositionOnMap = (lat?: number, lon?: number) => {
  if (lat === undefined || lon === undefined) return null;
  const clampedLat = Math.max(KENYA_BOUNDS.latMin, Math.min(KENYA_BOUNDS.latMax, lat));
  const clampedLon = Math.max(KENYA_BOUNDS.lonMin, Math.min(KENYA_BOUNDS.lonMax, lon));
  const latRange = KENYA_BOUNDS.latMax - KENYA_BOUNDS.latMin;
  const lonRange = KENYA_BOUNDS.lonMax - KENYA_BOUNDS.lonMin;
  const top = ((KENYA_BOUNDS.latMax - clampedLat) / latRange) * 100;
  const left = ((clampedLon - KENYA_BOUNDS.lonMin) / lonRange) * 100;
  return { top: `${top}%`, left: `${left}%` };
};

interface MapViewProps {
  items: MissingPersonReport[];
  onMarkerClick: (id: string) => void;
  highlightedItemId?: string | null;
  selectedItemId?: string | null;
}

const MissingPersonsMapView: React.FC<MapViewProps> = ({ items, onMarkerClick, highlightedItemId, selectedItemId }) => {
  const plotableItems = items.filter(item => item.latitude !== undefined && item.longitude !== undefined);
  return (
    <div className="relative w-full min-h-[400px] h-full bg-slate-200 dark:bg-slate-900/50 rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-700">
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-semibold">
          {plotableItems.length === 0 ? 'No reports with coordinates to display on map.' : `Displaying ${plotableItems.length} locations.`}
        </p>
      </div>
      {plotableItems.map(item => {
        const position = getPositionOnMap(item.latitude, item.longitude);
        if (!position) return null;
        const isHighlighted = highlightedItemId === item.id;
        const isSelected = selectedItemId === item.id;
        return (
          <button key={item.id} onClick={() => onMarkerClick(item.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out group focus:outline-none"
            style={{ top: position.top, left: position.left }} aria-label={`Location of ${item.missingPersonName}`}>
            <span className={`absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ${isHighlighted || isSelected ? 'animate-ping' : ''}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-amber-400 scale-150' : isHighlighted ? 'bg-sky-300 scale-125' : 'bg-sky-500'}`}></span>
            <div className="absolute bottom-full mb-2 w-max hidden group-hover:block bg-slate-800 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 z-10">{item.missingPersonName}</div>
          </button>
        );
      })}
    </div>
  );
};


// --- Original Component Logic ---

const mockMissingPersons: MissingPersonReport[] = [
  {
    id: '1',
    reporterIdDetails: 'ReporterID123',
    reporterAgeConfirmed: true,
    missingFor24HoursPlus: true,
    missingPersonName: 'Jane Wanjiru Doe',
    gender: Gender.Female,
    ethnicity: 'Kikuyu',
    religion: 'Christian',
    ageBracket: AgeBracket.YoungAdult_18_25,
    occupation: 'University Student',
    schoolName: 'University of Nairobi, Chiromo',
    lastSeenLocation: 'Nairobi CBD, near National Archives',
    latitude: -1.286389,
    longitude: 36.817223,
    lastSeenClothes: 'Blue jeans, white graphic t-shirt, black sneakers',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60', 
    additionalInfo: 'Has a small butterfly tattoo on her right wrist. Was carrying a red backpack. Last contacted family at 2 PM.',
    reportedAt: new Date('2024-07-20T10:00:00Z'),
    status: 'Missing',
  },
  {
    id: '2',
    reporterIdDetails: 'ReporterID456',
    reporterAgeConfirmed: true,
    missingFor24HoursPlus: true,
    missingPersonName: 'John Otieno Smith',
    gender: Gender.Male,
    ethnicity: 'Luo',
    religion: 'Not Specified',
    ageBracket: AgeBracket.Adult_26_40,
    occupation: 'Accountant at TechSolutions Ltd',
    lastSeenLocation: 'Westlands Office Park, leaving work',
    latitude: -1.267,
    longitude: 36.803,
    lastSeenClothes: 'Grey suit, light blue shirt, no tie',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60',
    additionalInfo: 'Usually carries a brown leather briefcase. Drives a silver Toyota Fielder KCD 123X.',
    reportedAt: new Date('2024-07-19T15:30:00Z'),
    status: 'Missing',
  },
  {
    id: '3',
    reporterIdDetails: 'ReporterID789',
    reporterAgeConfirmed: true,
    missingFor24HoursPlus: true,
    missingPersonName: 'Aisha Fatuma Omar',
    gender: Gender.Female,
    ethnicity: 'Somali',
    religion: 'Muslim',
    ageBracket: AgeBracket.Teen_13_17,
    occupation: 'High School Student',
    schoolName: 'Mombasa Girls High School',
    lastSeenLocation: 'Likoni Ferry, Mombasa side',
    latitude: -4.068,
    longitude: 39.663,
    lastSeenClothes: 'School uniform (green skirt, white blouse), green hijab',
    additionalInfo: 'Last seen with a group of friends. Was carrying a blue school backpack. She wears glasses.',
    reportedAt: new Date('2024-07-21T08:00:00Z'),
    status: 'Missing',
  },
];


const MissingPersonCard: React.FC<{ person: MissingPersonReport; onHover: (id: string | null) => void; isSelected: boolean; }> = ({ person, onHover, isSelected }) => (
  <div 
    id={`person-card-${person.id}`}
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out border ${isSelected ? 'border-sky-500 shadow-2xl' : 'border-transparent'}`}
    onMouseEnter={() => onHover(person.id)}
    onMouseLeave={() => onHover(null)}
    >
    {person.photo ? (
      <img src={person.photo} alt={`Photo of ${person.missingPersonName}`} className="w-full h-56 object-cover object-center" />
    ) : (
      <div className="w-full h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center p-4">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">No Photo Available</p>
          </div>
      </div>
    )}
    <div className="p-5">
      <h3 className="text-[19px] font-poppins font-medium text-sky-700 dark:text-sky-400 mb-1">{person.missingPersonName}</h3>
      <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${ person.status === 'Missing' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'}`}>
        Status: {person.status}
      </span>
      <div className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
        <p><strong className="font-medium text-slate-700 dark:text-slate-300">Last Seen:</strong> {person.lastSeenLocation}</p>
      </div>
       <button 
        className="mt-4 w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md hover:from-sky-600 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        onClick={() => alert(`Viewing details for ${person.missingPersonName}. Feature to report sighting coming soon.`)}
        aria-label={`View details or report sighting for ${person.missingPersonName}`}>
        View Full Details
      </button>
    </div>
  </div>
);


export const ViewMissingPersonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [hoveredPersonId, setHoveredPersonId] = React.useState<string | null>(null);
  const [selectedPersonId, setSelectedPersonId] = React.useState<string | null>(null);
  
  const filteredPersons = mockMissingPersons.filter(person => 
    person.missingPersonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.lastSeenLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.additionalInfo && person.additionalInfo.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleMarkerClick = (id: string) => {
    setSelectedPersonId(prevId => prevId === id ? null : id);
    const cardElement = document.getElementById(`person-card-${id}`);
    cardElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="space-y-8">
      <header className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <h2 className="font-poppins text-[18px] font-bold text-sky-700 dark:text-sky-300 mb-2">Active Missing Person Reports</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Browse reports, view last known locations on the map, and report a sighting if you have information.
        </p>
      </header>

      <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl sticky top-16 z-30 print:hidden">
        <label htmlFor="searchMissingPersons" className="sr-only">Search Missing Persons</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input type="search" id="searchMissingPersons" placeholder="Search by name, location, or other details..." 
              className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="lg:flex lg:space-x-6 lg:items-start">
        <div className="lg:w-1/2 xl:w-2/3 mb-6 lg:mb-0 print:hidden">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl h-full flex flex-col sticky top-40">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Last Seen Locations Map</h3>
                <div className="flex-grow min-h-[500px] lg:min-h-0">
                    <MissingPersonsMapView 
                        items={filteredPersons} 
                        onMarkerClick={handleMarkerClick}
                        highlightedItemId={hoveredPersonId}
                        selectedItemId={selectedPersonId}
                    />
                </div>
            </div>
        </div>
        
        <div className="lg:w-1/2 xl:w-1/3">
          {filteredPersons.length > 0 ? (
            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
              {filteredPersons.map(person => (
                <MissingPersonCard 
                  key={person.id} 
                  person={person} 
                  onHover={setHoveredPersonId}
                  isSelected={selectedPersonId === person.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
              <p className="text-slate-600 dark:text-slate-300 text-xl font-semibold">No Reports Found</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};