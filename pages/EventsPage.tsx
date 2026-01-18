
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContent } from '../contentStore';

const EventsPage: React.FC = () => {
  const [content, setContent] = useState(getContent());

  useEffect(() => {
    const handleUpdate = () => setContent(getContent());
    window.addEventListener('contentUpdate', handleUpdate);
    return () => window.removeEventListener('contentUpdate', handleUpdate);
  }, []);

  const { events, eventList, design } = content;

  return (
    <div className={`py-20 px-4 bg-slate-50 min-h-screen ${design.fontFamily}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">{events.title}</h1>
          <p className="text-slate-500 text-lg max-w-2xl">{events.subtitle}</p>
        </header>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {eventList.length > 0 ? (
              eventList.map(event => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group flex flex-col md:flex-row">
                  <div className="md:w-48 text-white p-8 flex flex-col justify-center items-center text-center" style={{ backgroundColor: design.primaryColor }}>
                    <div className="text-sm font-bold opacity-80 uppercase mb-1">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </div>
                    <div className="text-5xl font-black">{new Date(event.date).getDate()}</div>
                    <div className="text-sm font-bold mt-1">{new Date(event.date).getFullYear()}</div>
                  </div>
                  <div className="p-8 flex-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{event.type}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{event.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 bg-white border rounded-3xl text-slate-400 font-medium">
                No upcoming events at this time.
              </div>
            )}
          </div>
        </section>

        <section className={`bg-white p-8 md:p-20 shadow-2xl relative overflow-hidden ${design.borderRadius}`}>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">{events.sponsorTitle}</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">{events.sponsorBody}</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/contact" className="text-white font-black py-4 px-10 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center" style={{ backgroundColor: design.primaryColor }}>
                  GET INVOLVED
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={events.sponsorImage1} alt="Sponsor 1" className="rounded-3xl shadow-lg mt-12" />
              <img src={events.sponsorImage2} alt="Sponsor 2" className="rounded-3xl shadow-lg -mt-12" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventsPage;
