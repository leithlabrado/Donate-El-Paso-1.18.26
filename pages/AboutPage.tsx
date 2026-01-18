
import React, { useState, useEffect } from 'react';
import { getContent } from '../contentStore';

const AboutPage: React.FC = () => {
  const [content, setContent] = useState(getContent());

  useEffect(() => {
    const handleUpdate = () => setContent(getContent());
    window.addEventListener('contentUpdate', handleUpdate);
    return () => window.removeEventListener('contentUpdate', handleUpdate);
  }, []);

  const { about, design } = content;

  return (
    <div className={`py-20 px-4 ${design.fontFamily}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase">{about.title}</h1>
          <p className="text-2xl text-slate-600 font-light leading-relaxed">
            {about.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className={`h-[500px] ${design.borderRadius} overflow-hidden`}>
            <img src={about.images[0]} alt="Story" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-8">
            <div className={`h-[500px] ${design.borderRadius} overflow-hidden`}>
              <img src={about.images[1]} alt="Work" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-black mb-6 tracking-tight" style={{ color: design.primaryColor }}>
                {about.historyTitle}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {about.historyBody}
              </p>
            </div>
          </div>

          <div className={`text-white p-12 shadow-xl h-fit sticky top-32 ${design.borderRadius}`} style={{ backgroundColor: design.primaryColor }}>
            <h3 className="text-2xl font-black mb-6">Environmental Impact</h3>
            <div className="space-y-8">
              <div>
                <div className="text-4xl font-black mb-2">11.3M Tons</div>
                <p className="text-blue-100 text-sm leading-relaxed">Of clothing discarded annually.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
