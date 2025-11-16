import React from 'react';
import { APP_NAME, GENDER_OPTIONS, AGE_BRACKET_OPTIONS } from '../constants';
import { MissingPersonReport, Gender, AgeBracket } from '../types';

export const MissingPersonReportForm: React.FC = () => {
  const [formData, setFormData] = React.useState<Partial<MissingPersonReport>>({
    // reporterAgeConfirmed and missingFor24HoursPlus will be set explicitly when checks pass
    gender: Gender.PreferNotToSay,
    ageBracket: AgeBracket.YoungAdult_18_25,
  });
  const [errors, setErrors] = React.useState<{ lastSeenClothes?: string }>({});
  
  const [isMissingLongEnough, setIsMissingLongEnough] = React.useState<boolean | null>(null);
  const [isReporterOldEnough, setIsReporterOldEnough] = React.useState<boolean | null>(null);
  const [currentInitialStep, setCurrentInitialStep] = React.useState<'time' | 'age' | 'complete'>('time');
  const [locationInputMode, setLocationInputMode] = React.useState<'address' | 'coords'>('address');
  const [isFetchingLocation, setIsFetchingLocation] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear validation error for the current field on change
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name as keyof typeof errors];
            return newErrors;
        });
    }

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
        setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setIsFetchingLocation(false);
      },
      (error) => {
        alert(`Error getting location: ${error.message}`);
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const validateForm = (): boolean => {
    const newErrors: { lastSeenClothes?: string } = {};
    if (!formData.lastSeenClothes || formData.lastSeenClothes.trim().length < 5) {
        newErrors.lastSeenClothes = 'Please provide a more detailed description (at least 5 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return; // Stop submission if validation fails
    }

    const finalFormData = {
      ...formData,
      reporterAgeConfirmed: true, // Explicitly set as checks passed
      missingFor24HoursPlus: true, // Explicitly set as checks passed
      id: String(Date.now()), // Example ID
      reportedAt: new Date(), // Example reported time
      status: "Missing" // Default status
    } as MissingPersonReport;
    console.log("Form data submitted:", finalFormData);
    alert(`${APP_NAME} received your report. We will be in touch if more information is needed.`);
    // Reset form state for a new report
    setFormData({
        gender: Gender.PreferNotToSay,
        ageBracket: AgeBracket.YoungAdult_18_25,
    });
    setErrors({});
    setIsMissingLongEnough(null);
    setIsReporterOldEnough(null);
    setCurrentInitialStep('time');
    setLocationInputMode('address');
  };

  // Render logic for initial checks
  if (currentInitialStep === 'time') {
    if (isMissingLongEnough === false) { // Show error/info if 'No' was selected for time
      return (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl text-center">
          <h2 className="font-poppins text-[20px] font-bold text-orange-600 dark:text-orange-400 mb-4">Information Note</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Generally, a person should be missing for 24 hours or more before a formal report is filed, allowing time for them to return or make contact. However, if you have serious concerns for their immediate safety, please contact your nearest police station directly.
          </p>
          <button 
              onClick={() => { setIsMissingLongEnough(null); /* Stay on 'time' step */ }}
              className="mt-6 mr-2 px-6 py-2 bg-sky-500 text-white font-medium rounded-lg shadow-sm hover:bg-sky-600 transition-colors"
          >
              Go Back
          </button>
          <a 
              href="#/directory"
              onClick={(e) => { e.preventDefault(); window.location.hash = "/directory";}}
              className="mt-6 px-6 py-2 bg-slate-600 text-white font-medium rounded-lg shadow-sm hover:bg-slate-700 transition-colors"
          >
              Find Police Station
          </a>
        </div>
      );
    }
    // Show the time question
    return (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
            <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">Initial Check (Step 1 of 2)</h2>
            <div className="space-y-6">
                <div>
                    <p className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">Has the person been missing for 24 hours or more?</p>
                    <div className="flex space-x-4">
                        <button onClick={() => { setIsMissingLongEnough(true); setCurrentInitialStep('age'); }} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Yes</button>
                        <button onClick={() => setIsMissingLongEnough(false)} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">No</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  if (currentInitialStep === 'age') {
    if (isReporterOldEnough === false) { // Show error if 'No' was selected for age
        return (
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl text-center">
            <h2 className="font-poppins text-[20px] font-bold text-red-600 dark:text-red-400 mb-4">Unable to Proceed</h2>
            <p className="text-slate-600 dark:text-slate-300">
              You must be 18 years of age or older to file a missing person report.
            </p>
            <button 
                onClick={() => { 
                    setIsReporterOldEnough(null); 
                    setIsMissingLongEnough(null); // Reset previous step too
                    setCurrentInitialStep('time'); 
                }}
                className="mt-6 px-6 py-2 bg-sky-500 text-white font-medium rounded-lg shadow-sm hover:bg-sky-600 transition-colors"
            >
                Start Over
            </button>
          </div>
        );
    }
    // Show the age question
    return (
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
            <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">Initial Check (Step 2 of 2)</h2>
            <div className="space-y-6">
                <div>
                    <p className="block text-md font-medium text-slate-700 dark:text-slate-300 mb-2">Are you, the reporter, 18 years of age or older?</p>
                    <div className="flex space-x-4">
                        <button onClick={() => { 
                            setIsReporterOldEnough(true);
                            setCurrentInitialStep('complete'); 
                        }} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Yes</button>
                        <button onClick={() => setIsReporterOldEnough(false)} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">No</button>
                    </div>
                </div>
                 <button 
                    onClick={() => {
                        setIsReporterOldEnough(null);
                        // isMissingLongEnough remains true from previous step
                        setCurrentInitialStep('time'); // Go back to the first question
                    }} 
                    className="mt-4 text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline"
                >
                    Back to Previous Question
                </button>
            </div>
        </div>
    );
  }

  // Main form (currentInitialStep === 'complete' and implicitly isMissingLongEnough === true and isReporterOldEnough === true)
  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
      <header className="mb-8">
        <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-2">Report a Missing Person</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please provide as much detail as possible. All information is treated with confidentiality.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Reporter Details */}
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Your Information (Reporter)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="reporterIdDetails" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Full Name & ID Number</label>
              <input type="text" name="reporterIdDetails" id="reporterIdDetails" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                placeholder="e.g., Mary Wanjiku, ID: 12345678"
                value={formData.reporterIdDetails || ''} onChange={handleInputChange} 
              />
            </div>
          </div>
        </fieldset>

        {/* Missing Person Details */}
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Missing Person's Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="missingPersonName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name of Missing Person</label>
              <input type="text" name="missingPersonName" id="missingPersonName" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                placeholder="e.g., John Otieno Doe"
                value={formData.missingPersonName || ''} onChange={handleInputChange} 
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
              <select id="gender" name="gender" required value={formData.gender} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                {GENDER_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ageBracket" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age Bracket</label>
              <select id="ageBracket" name="ageBracket" required value={formData.ageBracket} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
                {AGE_BRACKET_OPTIONS.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ethnicity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ethnicity/Community (Optional)</label>
              <input type="text" name="ethnicity" id="ethnicity"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                placeholder="e.g., Kikuyu, Luo, Kalenjin"
                value={formData.ethnicity || ''} onChange={handleInputChange} 
              />
            </div>
             <div>
              <label htmlFor="religion" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Religion (Optional)</label>
              <input type="text" name="religion" id="religion"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                placeholder="e.g., Christian, Muslim, Hindu"
                value={formData.religion || ''} onChange={handleInputChange} 
              />
            </div>
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Occupation / Student Status</label>
              <input type="text" name="occupation" id="occupation" required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                placeholder="e.g., Teacher, Farmer, Student"
                value={formData.occupation || ''} onChange={handleInputChange} 
              />
            </div>
            {(formData.occupation?.toLowerCase().includes('student')) && (
              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">School/Institution Name (if student)</label>
                <input type="text" name="schoolName" id="schoolName"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="e.g., Nairobi Primary School"
                  value={formData.schoolName || ''} onChange={handleInputChange} 
                />
              </div>
            )}
          </div>
        </fieldset>

        {/* Last Seen Details */}
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Last Known Details</legend>
          <div className="space-y-6 mt-4">
              <div className="flex justify-end">
                <button type="button" onClick={() => setLocationInputMode(mode => mode === 'address' ? 'coords' : 'address')}
                    className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline focus:outline-none">
                    {locationInputMode === 'address' ? 'Enter Coordinates Instead' : 'Enter Address Instead'}
                </button>
              </div>

              {locationInputMode === 'address' ? (
                <div>
                  <label htmlFor="lastSeenLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Seen Location (Address)</label>
                  <input type="text" name="lastSeenLocation" id="lastSeenLocation" required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100" 
                    placeholder="e.g., Fig Tree Terminus, Ngara"
                    value={formData.lastSeenLocation || ''} onChange={handleInputChange} 
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="latitude" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Latitude</label>
                      <input type="number" step="any" name="latitude" id="latitude"
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        placeholder="-1.286389"
                        value={formData.latitude ?? ''} onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="longitude" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Longitude</label>
                      <input type="number" step="any" name="longitude" id="longitude"
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        placeholder="36.817223"
                        value={formData.longitude ?? ''} onChange={handleInputChange}
                      />
                    </div>
                  </div>
                   <button type="button" onClick={handleGeoLocation} disabled={isFetchingLocation}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${isFetchingLocation ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {isFetchingLocation ? 'Fetching...' : 'Use My Current Location'}
                  </button>
                </div>
              )}
            <div>
              <label htmlFor="lastSeenClothes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Seen Wearing</label>
              <input type="text" name="lastSeenClothes" id="lastSeenClothes" required
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${errors.lastSeenClothes ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`} 
                placeholder="e.g., Blue jeans, red t-shirt, black cap"
                value={formData.lastSeenClothes || ''} onChange={handleInputChange} 
                aria-invalid={!!errors.lastSeenClothes}
                aria-describedby={errors.lastSeenClothes ? "lastSeenClothes-error" : undefined}
              />
              {errors.lastSeenClothes && <p id="lastSeenClothes-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.lastSeenClothes}</p>}
            </div>
          </div>
        </fieldset>
        
        {/* Photo and Additional Info */}
        <fieldset className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <legend className="text-lg font-semibold text-sky-600 dark:text-sky-400 px-2">Photo & Additional Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Photo (Optional, Recommended)</label>
              <input type="file" name="photo" id="photo" accept="image/*" onChange={handlePhotoChange}
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-50 dark:file:bg-sky-900/50 file:text-sky-700 dark:file:text-sky-300 hover:file:bg-sky-100 dark:hover:file:bg-sky-900"
              />
              {formData.photo && <img src={formData.photo} alt="Preview" className="mt-2 rounded-lg max-h-40 shadow-sm"/>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Additional Information / Distinguishing Features</label>
              <textarea name="additionalInfo" id="additionalInfo" rows={4}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                placeholder="e.g., Scar on left cheek, walks with a limp, speaks fluent French..."
                value={formData.additionalInfo || ''} onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </fieldset>

        <div className="pt-5">
          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
          >
            Submit Missing Person Report
          </button>
        </div>
      </form>
    </div>
  );
};