import React from 'react';
import { APP_NAME, GENDER_OPTIONS } from '../constants';
import { UnclaimedPerson, Gender } from '../types';

export const UnclaimedPersonForm: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<UnclaimedPerson>>({
    gender: Gender.PreferNotToSay,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic (e.g., API call to a secure endpoint)
    console.log("Unclaimed person data submitted:", formData);
    alert(`${APP_NAME} has received the report. This information will be vital for identification.`);
    // Reset form or navigate
  };

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
      <header className="mb-8">
        <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-2">Report an Unclaimed Person</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          This form is for authorized mortuary facilities to report details of unclaimed persons to aid in identification.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Mortuary Facility Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="mortuaryName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mortuary Name</label>
              <input type="text" name="mortuaryName" id="mortuaryName" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., City Mortuary Services"
                value={formData.mortuaryName || ''} onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="mortuaryContact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mortuary Contact (Phone/Email)</label>
              <input type="text" name="mortuaryContact" id="mortuaryContact" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., 020-1234567 or contact@citymortuary.org"
                value={formData.mortuaryContact || ''} onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Deceased Person's Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="timeReceived" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date and Time Received</label>
              <input type="datetime-local" name="timeReceived" id="timeReceived" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                value={formData.timeReceived || ''} onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="reportedCauseOfDeath" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reported/Suspected Cause of Death</label>
              <input type="text" name="reportedCauseOfDeath" id="reportedCauseOfDeath"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Road accident, natural causes, unknown"
                value={formData.reportedCauseOfDeath || ''} onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="stateOfDeceased" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">State of Deceased When Received</label>
              <textarea name="stateOfDeceased" id="stateOfDeceased" rows={3}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="Describe physical condition, clothing if any, any items found..."
                value={formData.stateOfDeceased || ''} onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender of Deceased</label>
              <select id="gender" name="gender" required value={formData.gender} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                {GENDER_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="estimatedAge" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Age</label>
              <input type="text" name="estimatedAge" id="estimatedAge"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Approx 30-35 years"
                value={formData.estimatedAge || ''} onChange={handleInputChange}
              />
            </div>
             <div className="md:col-span-2">
              <label htmlFor="distinguishingFeatures" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Distinguishing Features (Scars, Tattoos, etc.)</label>
              <textarea name="distinguishingFeatures" id="distinguishingFeatures" rows={3}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Large tattoo of a dragon on right arm, surgical scar on abdomen..."
                value={formData.distinguishingFeatures || ''} onChange={handleInputChange}
              ></textarea>
            </div>
             <div>
              <label htmlFor="photo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Photo (Optional, Highly Recommended)</label>
              <input type="file" name="photo" id="photo" accept="image/*" onChange={handlePhotoChange}
                 className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-50 dark:file:bg-sky-900/50 file:text-sky-700 dark:file:text-sky-300 hover:file:bg-sky-100 dark:hover:file:bg-sky-900"
              />
              {formData.photo && <img src={formData.photo} alt="Deceased Preview" className="mt-2 rounded-lg max-h-40 shadow-sm"/>}
            </div>
          </div>
        </fieldset>

        <div className="pt-5">
          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
          >
            Submit Unclaimed Person Report
          </button>
        </div>
      </form>
      <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 rounded-r-lg text-red-800 dark:text-red-300">
        <p className="font-semibold">Authorization Required:</p>
        <p className="text-sm ">This form is intended for use by authorized personnel of registered mortuary facilities only. Misuse of this form may lead to legal consequences. All submissions are logged and may be audited.</p>
      </div>
    </div>
  );
};