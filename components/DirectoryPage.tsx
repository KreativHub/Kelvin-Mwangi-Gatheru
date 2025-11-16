import React from 'react';
import { MOCK_POLICE_STATIONS, MOCK_HOSPITALS, MOCK_MORTUARIES } from '../constants';
import { DirectoryItem } from '../types';

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

interface DirectoryMapViewProps {
  items: DirectoryItem[];
  onMarkerClick: (id: string) => void;
  highlightedItemId?: string | null;
  selectedItemId?: string | null;
}

const DirectoryMapView: React.FC<DirectoryMapViewProps> = ({ items, onMarkerClick, highlightedItemId, selectedItemId }) => {
  const plotableItems = items.filter(item => item.latitude !== undefined && item.longitude !== undefined);
  return (
    <div className="relative w-full min-h-[400px] h-full bg-slate-200 dark:bg-slate-900/50 rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-700">
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <p className="text-slate-500 dark:text-slate-400 font-semibold">
            {plotableItems.length === 0 ? 'No locations with coordinates to display on map.' : `Displaying ${plotableItems.length} locations.`}
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
            style={{ top: position.top, left: position.left }} aria-label={`Location of ${item.name}`}>
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                item.type === 'Police Station' ? 'bg-blue-400' : item.type === 'Hospital' ? 'bg-red-400' : 'bg-slate-400'
            } ${isHighlighted || isSelected ? 'animate-ping' : ''}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 transition-all ${
                isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-amber-400 scale-150' : isHighlighted ? 'scale-125' : ''
            } ${item.type === 'Police Station' ? 'bg-blue-500' : item.type === 'Hospital' ? 'bg-red-500' : 'bg-slate-500'}`}></span>
            <div className="absolute bottom-full mb-2 w-max hidden group-hover:block bg-slate-800 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 z-10">{item.name}</div>
          </button>
        );
      })}
    </div>
  );
};

// --- Original Component Logic ---

const DirectoryCard: React.FC<{ item: DirectoryItem, onHover: (id: string | null) => void, isHovered: boolean }> = ({ item, onHover, isHovered }) => (
  <div 
    className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border group ${isHovered ? 'border-sky-500 shadow-xl' : 'border-slate-200 dark:border-slate-700'}`}
    onMouseEnter={() => onHover(item.id)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="flex items-center mb-3">
       <div className={`p-2 rounded-full mr-3 ${
        item.type === 'Police Station' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' :
        item.type === 'Hospital' ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' :
        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
      }`}>
        {item.type === 'Police Station' && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
        {item.type === 'Hospital' && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>}
        {item.type === 'Mortuary' && <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.43 11 22 10.43 22 10V9c0-.43-.57-.848-1.055-.848H19a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H9a1 1 0 00-1 1v2H7a2 2 0 00-2 2H3.055c-.55 0-1 .43-1 .945V10c0 .55.45.945 1.055.945z" /></svg>}
      </div>
      <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{item.name}</h3>
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1"><strong className="font-medium text-slate-600 dark:text-slate-300">Location:</strong> {item.location}</p>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3"><strong className="font-medium text-slate-600 dark:text-slate-300">Contact:</strong> {item.contact}</p>
  </div>
);

export const DirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<'All' | DirectoryItem["type"]>('All');
  const [hoveredItemId, setHoveredItemId] = React.useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  const allDirectoryItems = [...MOCK_POLICE_STATIONS, ...MOCK_HOSPITALS, ...MOCK_MORTUARIES];

  const filteredItems = allDirectoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.services && item.services.join(' ').toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const itemTypes: DirectoryItem["type"][] = ["Police Station", "Hospital", "Mortuary"];

  return (
    <div className="space-y-8">
      <header className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-2">Services Directory</h2>
        <p className="text-slate-600 dark:text-slate-400">Find police stations, hospitals, and mortuaries. Use the interactive map and filters for precise results.</p>
      </header>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl sticky top-16 z-40 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="searchDirectory" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Search Directory</label>
            <input type="search" id="searchDirectory" placeholder="Search by name, location, service..." 
              className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div>
            <label htmlFor="filterType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Filter by Type</label>
            <select id="filterType" className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
              value={filterType} onChange={(e) => setFilterType(e.target.value as DirectoryItem["type"] | 'All')}>
              <option value="All">All Types</option>
              {itemTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:space-x-6">
        <div className="lg:w-2/3 mb-6 lg:mb-0 print:hidden">
           <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl h-full flex flex-col">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Service Location Map</h3>
            <div className="flex-grow">
                <DirectoryMapView 
                    items={filteredItems} 
                    onMarkerClick={(id) => setSelectedItemId(id === selectedItemId ? null : id)}
                    highlightedItemId={hoveredItemId}
                    selectedItemId={selectedItemId}
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">Hover over list items to highlight on map. Click markers for details.</p>
          </div>
        </div>

        <div className="lg:w-1/3">
           <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl h-full">
             <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-2">
                {filterType === 'All' ? 'All Listings' : `${filterType}s`} ({filteredItems.length})
            </h3>
            {filteredItems.length > 0 ? (
              <div className="space-y-4 max-h-[600px] lg:max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                {filteredItems.map(item => <DirectoryCard key={item.id} item={item} onHover={setHoveredItemId} isHovered={hoveredItemId === item.id || selectedItemId === item.id} />)}
              </div>
            ) : (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-slate-500 dark:text-slate-400 text-lg mt-4">No services found.</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};