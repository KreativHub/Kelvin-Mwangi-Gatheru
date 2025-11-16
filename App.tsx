

import React from 'react';
import { APP_NAME, NAV_LINKS } from './constants';
import { MissingPersonReportForm } from './components/MissingPersonReportForm';
import { ClaimsForm } from './components/ClaimsForm';
import { UnclaimedPersonForm } from './components/UnclaimedPersonForm';
import { DirectoryPage } from './components/DirectoryPage';
import { ProfessionalSupportPage } from './components/ProfessionalSupportPage';
import { EmergencyPage } from './components/EmergencyPage';
import { ViewMissingPersonsPage } from './components/ViewMissingPersonsPage';

const initializeMobileMenu = () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuButton && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
      menuButton.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex'); // Use flex for display

      // Toggle icons
      const openIcon = menuButton.querySelector('.menu-open-icon');
      const closeIcon = menuButton.querySelector('.menu-close-icon');
      openIcon?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');
    };

    // Clean up previous listener if any
    const oldToggleMenu = (menuButton as any)._toggleMenuHandler;
    if (oldToggleMenu) {
        menuButton.removeEventListener('click', oldToggleMenu);
    }
    menuButton.addEventListener('click', toggleMenu);
    (menuButton as any)._toggleMenuHandler = toggleMenu; // Store reference for cleanup
  }
};

const ThemeToggle: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-300 hover:bg-slate-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )}
    </button>
);


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(window.location.hash.substring(1) || NAV_LINKS[0].path);
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  React.useEffect(() => {
    const handleHashChange = () => {
      const newPath = window.location.hash.substring(1) || NAV_LINKS[0].path;
      setCurrentPage(newPath);
      window.scrollTo(0, 0); // Scroll to top on page change
    };
    window.addEventListener('hashchange', handleHashChange);
    // Set initial page based on hash
    handleHashChange(); 
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  React.useEffect(() => {
    initializeMobileMenu();
    // Ensure icons are correctly set on page load/refresh for mobile menu button
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        const isExpanded = mobileMenu.classList.contains('flex');
        const openIcon = menuButton.querySelector('.menu-open-icon');
        const closeIcon = menuButton.querySelector('.menu-close-icon');
        if (isExpanded) {
            openIcon?.classList.add('hidden');
            closeIcon?.classList.remove('hidden');
        } else {
            openIcon?.classList.remove('hidden');
            closeIcon?.classList.add('hidden');
        }
    }
  }, [currentPage]); // Re-initialize if page changes, in case of dynamic content affecting menu

  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/report-missing':
        return <MissingPersonReportForm />;
      case '/view-missing':
        return <ViewMissingPersonsPage />;
      case '/claims':
        return <ClaimsForm />;
      case '/unclaimed-persons':
        return <UnclaimedPersonForm />;
      case '/directory':
        return <DirectoryPage />;
      case '/support':
        return <ProfessionalSupportPage />;
      case '/emergency':
        return <EmergencyPage />;
      default:
        const activeLink = NAV_LINKS.find(link => link.path === currentPage);
        return <GenericPage pageName={activeLink ? activeLink.name : "404 - Page Not Found"} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col text-slate-800 dark:text-slate-200">
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white shadow-lg sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a 
                href="#/" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  window.location.hash = "/";
                }} 
                className="text-2xl sm:text-3xl font-poppins font-normal tracking-tight hover:opacity-90 transition-opacity flex items-center"
                aria-label={`${APP_NAME} Home`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-sky-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
                </svg>
                tupatane
              </a>
            </div>
             <div className="flex items-center">
              <nav className="hidden md:flex md:items-center md:space-x-1" id="desktop-menu">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.path}
                    href={`#${link.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = link.path;
                    }}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out ${
                      currentPage === link.path 
                        ? 'bg-sky-500 text-white shadow-md' 
                        : 'text-slate-300 hover:bg-slate-600 hover:text-white'
                    }`}
                    aria-current={currentPage === link.path ? 'page' : undefined}
                  >
                    {link.icon && <span className="mr-2 h-5 w-5">{link.icon}</span>}
                    {link.name}
                  </a>
                ))}
              </nav>
               <div className="hidden md:flex items-center ml-2 border-l border-slate-600 pl-2">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
              <div className="md:hidden ml-4">
                <button 
                  id="mobile-menu-button"
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors" 
                  aria-label="Toggle menu"
                  aria-expanded="false"
                  aria-controls="mobile-menu"
                >
                  <svg className="h-7 w-7 block menu-open-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                   <svg className="h-7 w-7 hidden menu-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu (initially hidden, uses flex for display) */}
        <div className="md:hidden hidden flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 dark:border-slate-700" id="mobile-menu">
           <div className="flex justify-between items-center px-3 py-2">
                <span className="text-sm font-medium text-slate-400">Theme</span>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          {NAV_LINKS.map((link) => (
            <a
              key={`${link.path}-mobile`}
              href={`#${link.path}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = link.path;
                // Logic to close menu moved to initializeMobileMenu to be centralized
                const menuButton = document.getElementById('mobile-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');
                if (menuButton && mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    menuButton.setAttribute('aria-expanded', 'false');
                    const openIcon = menuButton.querySelector('.menu-open-icon');
                    const closeIcon = menuButton.querySelector('.menu-close-icon');
                    openIcon?.classList.remove('hidden');
                    closeIcon?.classList.add('hidden');
                }
              }}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                currentPage === link.path 
                  ? 'bg-sky-500 text-white shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
              aria-current={currentPage === link.path ? 'page' : undefined}
            >
              {link.icon && <span className="mr-3 h-5 w-5">{link.icon}</span>}
              {link.name}
            </a>
          ))}
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 print:p-0">
        {renderPage()}
      </main>

      <footer className="bg-slate-800 dark:bg-slate-900/50 text-slate-300 text-center p-8 print:hidden">
        <p className="font-semibold">&copy; {new Date().getFullYear()} {APP_NAME}. Umoja ni Nguvu. Pamoja Tupatane.</p>
        <p className="text-xs mt-2 opacity-75">Working towards a safer Kenya, together. All rights reserved.</p>
        {/* Optional: Add social media links or other footer content here */}
      </footer>
    </div>
  );
};

// Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const HomePageFeatureCard: React.FC<{title: string, description: string, path: string, icon: React.ReactElement}> = ({title, description, path, icon}) => (
    <a 
        href={`#${path}`} 
        onClick={(e) => { e.preventDefault(); window.location.hash = path;}}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-sky-900/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 group"
    >
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg text-white mb-4 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>
        <p className="text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 font-medium text-sm mt-3 transition-colors">Learn More &rarr;</p>
    </a>
);

const HomePage: React.FC = () => (
  <div className="space-y-10">
    <section 
      className="relative text-center py-16 sm:py-20 md:py-24 bg-cover bg-center p-8 rounded-xl shadow-2xl overflow-hidden"
      style={{ backgroundImage: "url('https://storage.googleapis.com/generative-ai-downloads/images/DQEQBq5N08M1399Y.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div> {/* Dark overlay for legibility */}
      
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Find Missing</span> Persons <span className="block sm:inline">in Kenya</span>
        </h1>
        <p className="text-base text-sky-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          tupatane helps reunite missing persons with their families through community support, professional assistance, and real-time tracking.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#/report-missing" 
            onClick={(e) => { e.preventDefault(); window.location.hash = "/report-missing";}}
            className="inline-flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            File a Report
          </a>
          <a 
            href="#/view-missing" 
            onClick={(e) => { e.preventDefault(); window.location.hash = "/view-missing";}}
            className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-slate-100 border-2 border-slate-300 font-semibold rounded-lg shadow-sm hover:bg-slate-100/10 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM3.75 12h.007v.008H3.75V12zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" />
            </svg>
            View Active Reports
          </a>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <HomePageFeatureCard 
            title="Report Missing" 
            description="File a detailed report for a missing individual after 24 hours."
            path="/report-missing"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <HomePageFeatureCard 
            title="Claims & Incidents" 
            description="Report mysterious disappearances or arrests with relevant details."
            path="/claims"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <HomePageFeatureCard 
            title="Services Directory" 
            description="Find police stations, hospitals, mortuaries, and support services near you."
            path="/directory"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}
        />
    </section>
    
    <section className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-l-4 border-sky-500">
      <div className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-500 dark:text-sky-400 mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h2 className="font-poppins text-[20px] font-bold text-sky-700 dark:text-sky-300">Important Notice</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            This platform is a community-driven initiative. Please ensure all information provided is accurate and use the resources responsibly. If you or someone you know is in immediate danger, contact emergency services (999/112) directly.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const GenericPage: React.FC<{ pageName: string }> = ({ pageName }) => (
  <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-sky-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h2 className="font-poppins text-[20px] font-bold text-slate-700 dark:text-slate-200 mb-3">{pageName}</h2>
    {pageName.includes("404") ?
      <p className="text-slate-500 dark:text-slate-400">Sorry, the page you are looking for does not exist or may have been moved.</p>
      :
      <p className="text-slate-500 dark:text-slate-400">Content for the {pageName} page is currently under development. Please check back soon for updates.</p>
    }
    <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-300 rounded-r-lg max-w-md">
      <p><strong className="font-semibold">Under Construction:</strong> We are working hard to bring you this feature with the best experience!</p>
    </div>
     <a 
        href="#/" 
        onClick={(e) => { e.preventDefault(); window.location.hash = "/";}}
        className="mt-8 px-6 py-2 bg-sky-500 text-white font-medium rounded-lg shadow-sm hover:bg-sky-600 transition-colors"
    >
        Go to Homepage
    </a>
  </div>
);

export default App;