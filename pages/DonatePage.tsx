
import React, { useState, useEffect } from 'react';
import { getContent } from '../contentStore';

const DonatePage: React.FC = () => {
  const [content, setContent] = useState(getContent());
  const [activeTab, setActiveTab] = useState<'monetary' | 'bins' | 'pickup'>('bins');
  const [pickupForm, setPickupForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleUpdate = () => setContent(getContent());
    window.addEventListener('contentUpdate', handleUpdate);
    return () => window.removeEventListener('contentUpdate', handleUpdate);
  }, []);

  const { donate, design, binList } = content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xnjqneez', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ subject: 'New Home Pick-Up Request', ...pickupForm })
      });
      if (response.ok) {
        setStatus('success');
        setPickupForm({ name: '', email: '', phone: '', address: '', message: '' });
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className={`py-20 px-4 ${design.fontFamily}`}>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">{donate.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">{donate.subtitle}</p>
        </header>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          {['monetary', 'bins', 'pickup'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 max-w-xs py-6 px-8 rounded-3xl font-black text-lg transition-all border-2 ${
                activeTab === tab 
                  ? 'text-white shadow-xl scale-105' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'
              }`}
              style={{ backgroundColor: activeTab === tab ? design.primaryColor : undefined, borderColor: activeTab === tab ? design.primaryColor : undefined }}
            >
              <i className={`fa-solid ${tab === 'monetary' ? 'fa-hand-holding-dollar' : tab === 'bins' ? 'fa-box-open' : 'fa-truck-pickup'} mb-3 text-2xl`}></i><br/>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`bg-white border border-slate-200 p-8 md:p-12 shadow-sm min-h-[400px] ${design.borderRadius}`}>
          {activeTab === 'monetary' && (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-6">{donate.monetaryTitle}</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed whitespace-pre-line">{donate.monetaryBody}</p>
              <button className="text-white font-black py-4 px-12 rounded-full hover:opacity-90 transition-all text-xl" style={{ backgroundColor: design.primaryColor }}>
                DONATE VIA PAYPAL
              </button>
            </div>
          )}

          {activeTab === 'bins' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h2 className="text-3xl font-black">Drop-off Locations</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {binList.map(loc => (
                  <div key={loc.id} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl font-bold" style={{ backgroundColor: design.primaryColor + '20', color: design.primaryColor }}>
                        {loc.type[0]}
                      </div>
                      <div className="font-bold text-slate-800">{loc.name}</div>
                    </div>
                  </div>
                ))}
                {binList.length === 0 && <p className="col-span-full text-center text-slate-400 py-10">No locations available.</p>}
              </div>
            </div>
          )}

          {activeTab === 'pickup' && (
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                <div className="flex-1">
                  <h2 className="text-3xl font-black mb-6">{donate.pickupTitle}</h2>
                  <p className="text-slate-600 leading-relaxed">{donate.pickupBody}</p>
                </div>
                <div className={`flex-shrink-0 w-48 h-48 overflow-hidden ${design.borderRadius}`}>
                  <img src={donate.pickupImage} className="w-full h-full object-cover" alt="Pickup" />
                </div>
              </div>
              {status === 'success' ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-3xl border border-green-100 text-center">
                   <h3 className="text-2xl font-black mb-2">Request Received!</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="Name" className="w-full px-5 py-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setPickupForm({...pickupForm, name: e.target.value})} />
                  <input required type="email" placeholder="Email" className="w-full px-5 py-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setPickupForm({...pickupForm, email: e.target.value})} />
                  <button className="md:col-span-2 text-white font-black py-5 rounded-2xl shadow-lg" style={{ backgroundColor: design.primaryColor }}>SUBMIT REQUEST</button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
