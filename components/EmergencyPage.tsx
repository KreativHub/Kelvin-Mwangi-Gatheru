import React from 'react';
import { MOCK_EMERGENCY_CONTACTS } from '../constants'; // Use constants
import { EmergencyContact } from '../types'; // Use types

export const EmergencyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h2 className="font-poppins text-[20px] font-bold text-red-600 dark:text-red-400">Emergency Support</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300">
          Quick access to essential emergency service numbers in Kenya. 
          <strong className="text-red-700 dark:text-red-400"> In case of immediate danger, call these numbers directly.</strong>
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EMERGENCY_CONTACTS.map(service => (
          <div key={service.name} className="bg-white dark:bg-slate-800 border-l-4 border-red-500 p-5 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-1">{service.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{service.description}</p>
            </div>
            <div>
              <a href={`tel:${service.number.replace(/\s|\//g, '')}`} className="block text-2xl font-bold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 my-3 transition-colors">
                {service.number}
              </a>
              <a 
                  href={`tel:${service.number.replace(/\s|\//g, '')}`}
                  className="w-full inline-block bg-red-500 text-white text-center px-5 py-2.5 rounded-lg shadow-md hover:bg-red-600 focus:bg-red-700 transition-all duration-150 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Call ${service.name} at ${service.number}`}
              >
                  Call Now
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-800 dark:text-yellow-300 rounded-r-lg shadow">
         <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
                <h4 className="font-poppins text-[20px] font-bold text-yellow-800 dark:text-yellow-200 mb-1">Important Considerations:</h4>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Clearly state your emergency and precise location.</li>
                  <li>Remain calm and follow all instructions given by the operator.</li>
                  <li>Do not misuse these numbers; they are strictly for genuine emergencies.</li>
                  <li>Ensure your phone has network service and sufficient battery to make calls.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};