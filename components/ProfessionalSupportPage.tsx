import React from 'react';
import { MOCK_PROFESSIONAL_SERVICES } from '../constants';
import { DirectoryItem } from '../types';

const SupportContactCard: React.FC<{ service: DirectoryItem }> = ({ service }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border border-slate-100 dark:border-slate-700 group">
    <div className="flex items-start mb-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/50 dark:to-blue-900/50 text-sky-600 dark:text-sky-400 mr-4 group-hover:scale-110 transition-transform">
         {service.type === "Lawyer" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}
         {service.type === "Journalist" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25-2.25H5.625a2.25 2.25 0 01-2.25-2.25V18m12.75-9.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-9H9M9 4.5v15m9-15V9" /></svg>}
         {service.type === "Therapist" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
         {service.type === "IPOA" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
         {service.type === "DCI" && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{service.name} ({service.type})</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{service.notes}</p>
        </div>
    </div>
    
    <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-sky-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            Location: {service.location}
        </div>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-sky-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            Contact: {service.contact}
        </div>
    </div>
    
    <a 
      href={service.contact.startsWith("http") || service.contact.startsWith("www") ? service.contact : `tel:${service.contact.replace(/\s|\//g, '')}`}
      target="_blank" 
      rel="noopener noreferrer"
      className="mt-6 inline-block w-full text-center bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium"
      aria-label={`Connect with ${service.name}`}
    >
      Connect / Learn More
    </a>
  </div>
);

const LAWYER_SPECIALIZATIONS = [
  "Human Rights Law", "Family Law", "Criminal Law", 
  "Legal Aid / Pro Bono Services", "Child Protection Law", 
  "Land & Property Law"
];
const THERAPIST_SPECIALIZATIONS = [
  "Trauma-Informed Therapy", "Grief and Loss Counseling", 
  "Child and Adolescent Psychology", "Marriage and Family Therapy", 
  "Addiction Counseling", "Cognitive Behavioral Therapy (CBT)"
];


interface ProfessionalSignupData {
  fullName: string;
  email: string;
  profession: 'Lawyer' | 'Therapist' | 'Journalist' | '';
  contactNumber: string;
  licenseNumber: string;
  specializations: string[];
  otherSpecialization: string;
  consent: boolean;
}

export const ProfessionalSupportPage: React.FC = () => {
  const [signupData, setSignupData] = React.useState<ProfessionalSignupData>({
    fullName: '',
    email: '',
    profession: '',
    contactNumber: '',
    licenseNumber: '',
    specializations: [],
    otherSpecialization: '',
    consent: false // Removed trailing comma here
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      if (name === 'consent') {
        setSignupData(prev => ({ ...prev, consent: checked }));
      } else { // Specialization checkbox
        setSignupData(prev => ({
          ...prev,
          specializations: checked 
            ? [...prev.specializations, value]
            : prev.specializations.filter(spec => spec !== value)
        }));
      }
    } else if (name === "profession") {
      // Reset specializations when profession changes
      setSignupData(prev => ({ 
        ...prev, 
        [name]: value as ProfessionalSignupData['profession'],
        specializations: [],
        otherSpecialization: '' 
      }));
    }
    
    else {
      setSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.consent) {
      alert("Please consent to the terms before submitting.");
      return;
    }
    // TODO: Implement actual submission logic (e.g., API call)
    console.log("Professional Signup Data:", signupData);
    alert(`Thank you, ${signupData.fullName}, for your interest! We will review your application and contact you.`);
    // Reset form
    setSignupData({
      fullName: '', email: '', profession: '', contactNumber: '', licenseNumber: '',
      specializations: [], otherSpecialization: '', consent: false,
    });
  };
  
  const currentSpecializations = signupData.profession === 'Lawyer' ? LAWYER_SPECIALIZATIONS :
                                 signupData.profession === 'Therapist' ? THERAPIST_SPECIALIZATIONS : [];


  return (
    <div className="space-y-10">
      <header className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-2">Professional Support Network</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Access a network of lawyers, journalists, therapists, and the Independent Policing Oversight Authority (IPOA) for specialized assistance and support.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {MOCK_PROFESSIONAL_SERVICES.map(service => <SupportContactCard key={service.id} service={service} />)}
      </div>
      
      {/* Sign-up as a Professional Section */}
      <section className="p-6 sm:p-8 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl shadow-xl border-t-4 border-sky-500">
        <h3 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300 mb-3 text-center">Join Our Professional Network</h3>
        <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-8">
          Are you a qualified and registered lawyer or therapist in Kenya, passionate about providing support? 
          Register your interest to be listed in the TUPATANE directory.
        </p>

        <form onSubmit={handleSignupSubmit} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input type="text" name="fullName" id="fullName" required value={signupData.fullName} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., Dr. Jane Doe / John Doe, Esq."
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" name="email" id="email" required value={signupData.email} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="profession" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Profession</label>
                <select name="profession" id="profession" required value={signupData.profession} onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                >
                    <option value="" disabled>Select your profession</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Therapist">Therapist</option>
                    {/* <option value="Journalist">Journalist (General Application)</option> */}
                </select>
            </div>
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Number</label>
              <input type="tel" name="contactNumber" id="contactNumber" required value={signupData.contactNumber} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g., 0712345678"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Practicing License / Registration Number 
              <span className="text-xs text-slate-500"> (e.g., LSK No., KMPDC No.)</span>
            </label>
            <input type="text" name="licenseNumber" id="licenseNumber" required value={signupData.licenseNumber} onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
              placeholder="Enter your professional registration number"
            />
          </div>

          {signupData.profession && currentSpecializations.length > 0 && (
            <fieldset className="pt-2">
              <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Areas of Specialization (select all that apply)</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {currentSpecializations.map(spec => (
                  <div key={spec} className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input id={`spec-${spec.replace(/\s/g, '')}`} name="specialization" type="checkbox" value={spec}
                        checked={signupData.specializations.includes(spec)}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-slate-300 dark:border-slate-500 text-sky-600 focus:ring-sky-500 bg-transparent dark:bg-slate-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor={`spec-${spec.replace(/\s/g, '')}`} className="font-medium text-slate-700 dark:text-slate-300">{spec}</label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          )}
          
          <div>
            <label htmlFor="otherSpecialization" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Other Specialization(s) <span className="text-xs text-slate-500">(if not listed, please specify)</span>
            </label>
            <input type="text" name="otherSpecialization" id="otherSpecialization" value={signupData.otherSpecialization} onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 dark:placeholder-slate-500"
              placeholder="e.g., Art Therapy, Mediation"
            />
          </div>

          <div className="relative flex items-start pt-2">
            <div className="flex h-6 items-center">
              <input id="consent" name="consent" type="checkbox" required checked={signupData.consent} onChange={handleInputChange}
                className="h-4 w-4 rounded border-slate-300 dark:border-slate-500 text-sky-600 focus:ring-sky-500 bg-transparent dark:bg-slate-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor="consent" className="font-medium text-slate-700 dark:text-slate-300">
                I confirm I am a qualified and registered professional in Kenya. I consent to TUPATANE contacting me regarding my application to join the network and agree to the terms of service (once available).
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-medium text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              Register My Interest
            </button>
          </div>
        </form>
      </section>

      <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300 rounded-r-lg shadow">
        <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
                <h4 className="font-poppins text-[20px] font-bold text-emerald-700 dark:text-emerald-200 mb-1">You Are Not Alone</h4>
                <p className="text-sm mt-1">These resources are here to guide and support you through challenging circumstances. Reach out and find the help you need.</p>
            </div>
        </div>
      </div>
    </div>
  );
};