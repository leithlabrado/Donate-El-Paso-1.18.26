
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../constants';
import { getContent } from '../contentStore';

const HomePage: React.FC = () => {
  const [content, setContent] = useState(getContent());

  useEffect(() => {
    const handleUpdate = () => setContent(getContent());
    window.addEventListener('contentUpdate', handleUpdate);
    return () => window.removeEventListener('contentUpdate', handleUpdate);
  }, []);

  const { home, design } = content;

  return (
    <div className={design.fontFamily}>
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: design.primaryColor }}>
        <img 
          src={home.heroImage} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none tracking-tighter uppercase">
            {home.heroTitle}
          </h1>
          <p className="text-xl text-blue-100 mb-10 font-light max-w-2xl mx-auto">
            {home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/donate" 
              className="text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl"
              style={{ backgroundColor: design.primaryColor, filter: 'brightness(1.2)' }}
            >
              MAKE A DONATION
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: design.primaryColor }}>Our Purpose</h3>
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              {home.missionTitle}
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              {home.missionBody}
            </p>
            <Link to="/about" className="font-bold flex items-center gap-2 hover:gap-4 transition-all" style={{ color: design.primaryColor }}>
              READ OUR FULL STORY <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className={`${design.borderRadius} overflow-hidden shadow-2xl rotate-2`}>
            <img src={home.missionImage} alt="Mission" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
