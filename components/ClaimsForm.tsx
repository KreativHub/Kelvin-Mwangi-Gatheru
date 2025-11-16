import React from 'react';
import { APP_NAME } from '../constants';
import { Claim, ClaimType } from '../types';

export const ClaimsForm: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<Claim>>({
    claimType: ClaimType.MysteriousLoss,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    console.log("Claim data submitted:", formData);
    alert(`${APP_NAME} has received your claim report. We may contact you for more details.`);
    // Reset form or navigate
  };

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
      <header className="mb-8">
        <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-2">File a Claim</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Report a mysterious loss or an arrest. Please provide accurate and detailed information.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Your Information (Reporter)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="reporterName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
              <input type="text" name="reporterName" id="reporterName" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Alex Kamau"
                value={formData.reporterName || ''} onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="reporterContact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Contact (Phone or Email)</label>
              <input type="text" name="reporterContact" id="reporterContact" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., 0712345678 or alex.k@example.com"
                value={formData.reporterContact || ''} onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Incident Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="claimType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type of Claim</label>
              <select id="claimType" name="claimType" required value={formData.claimType} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                {Object.values(ClaimType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="personInvolvedName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name of Person Involved</label>
              <input type="text" name="personInvolvedName" id="personInvolvedName" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Grace Adhiambo"
                value={formData.personInvolvedName || ''} onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="incidentDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date of Incident</label>
              <input type="date" name="incidentDate" id="incidentDate" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                value={formData.incidentDate || ''} onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="incidentLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location of Incident</label>
              <input type="text" name="incidentLocation" id="incidentLocation" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Near City Market, Nairobi"
                value={formData.incidentLocation || ''} onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="details" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Detailed Account of the Incident</label>
              <textarea name="details" id="details" rows={5} required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="Describe what happened, any witnesses, police involvement if any, vehicle details, etc."
                value={formData.details || ''} onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </fieldset>

        <div className="pt-5">
          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
          >
            Submit Claim
          </button>
        </div>
      </form>
       <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-r-lg text-yellow-800 dark:text-yellow-300">
        <p className="font-semibold">Note on Claims:</p>
        <p className="text-sm ">Filing a false report is a serious offense. Please ensure the information you provide is truthful and accurate to the best of your knowledge. For urgent matters concerning police misconduct, consider contacting IPOA directly through our Professional Support page.</p>
      </div>
    </div>
  );
};