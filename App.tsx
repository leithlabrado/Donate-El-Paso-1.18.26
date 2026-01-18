
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import { CONTACT_INFO } from './constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'DONATE', path: '/donate' },
    { name: 'EVENTS', path: '/events' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black text-blue-700 tracking-tighter">
              DONATE EL PASO
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-700' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-xs text-slate-400 font-medium self-center hover:text-slate-600"
            >
              ADMIN
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-bold text-slate-800 hover:text-blue-700"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="block text-sm text-slate-500 font-medium"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-black mb-6 tracking-tighter">DONATE EL PASO</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            A Partner in Education with local school districts, dedicated to providing 
            essential clothing and support to families across our community.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-location-dot mt-1 text-blue-500"></i>
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-phone text-blue-500"></i>
              <span>{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-envelope text-blue-500"></i>
              <span>{CONTACT_INFO.email}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/donate" className="hover:text-blue-400 transition-colors">How to Donate</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">Our Mission</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Donate El Paso. All rights reserved.
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
