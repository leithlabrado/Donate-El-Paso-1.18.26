
import React, { useState } from 'react';
import { getContent, saveContent } from '../contentStore';
import { SiteContent, Event, BinLocation } from '../types';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<keyof SiteContent | 'eventList' | 'binList'>('design');
  const [content, setContent] = useState(getContent());

  // Local state for "New Event" form
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: '',
    description: '',
    type: 'Clothing Drive'
  });

  // Local state for "New Bin" form
  const [newBin, setNewBin] = useState<Partial<BinLocation>>({
    name: '',
    type: 'High School'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'admin123') setIsAuthenticated(true);
  };

  const updateContent = (path: string, value: any) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    if (path === 'about.images.0') {
      newContent.about.images[0] = value;
    } else if (path === 'about.images.1') {
      newContent.about.images[1] = value;
    } else {
      current[keys[keys.length - 1]] = value;
    }
    
    setContent({ ...newContent });
    saveContent(newContent);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const eventToAdd: Event = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      date: newEvent.date || '',
      description: newEvent.description || '',
      type: (newEvent.type as any) || 'Clothing Drive'
    };
    const newContent = { ...content, eventList: [...content.eventList, eventToAdd] };
    setContent(newContent);
    saveContent(newContent);
    setNewEvent({ title: '', date: '', description: '', type: 'Clothing Drive' });
  };

  const handleDeleteEvent = (id: string) => {
    const newContent = { ...content, eventList: content.eventList.filter(e => e.id !== id) };
    setContent(newContent);
    saveContent(newContent);
  };

  const handleAddBin = () => {
    if (!newBin.name) return;
    const binToAdd: BinLocation = {
      id: Date.now().toString(),
      name: newBin.name || '',
      type: (newBin.type as any) || 'High School'
    };
    const newContent = { ...content, binList: [...content.binList, binToAdd] };
    setContent(newContent);
    saveContent(newContent);
    setNewBin({ name: '', type: 'High School' });
  };

  const handleDeleteBin = (id: string) => {
    const newContent = { ...content, binList: content.binList.filter(b => b.id !== id) };
    setContent(newContent);
    saveContent(newContent);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-6">Site Management</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full px-5 py-4 border rounded-2xl outline-none" placeholder="Password" />
            <button className="w-full bg-blue-700 text-white font-black py-4 rounded-2xl">LOGIN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-slate-900">SITE EDITOR</h1>
          <div className="flex flex-wrap bg-white p-1 rounded-2xl shadow-sm border mt-4 md:mt-0 gap-1">
            {['design', 'home', 'about', 'donate', 'binList', 'events', 'eventList', 'contact'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)} 
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {tab === 'eventList' ? 'Manage Events' : tab === 'binList' ? 'Manage Bins' : tab}
              </button>
            ))}
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border p-8">
          {activeTab === 'donate' && (
            <div className="space-y-12">
              <div>
                <h3 className="font-black text-lg mb-4 text-slate-800 border-b pb-2 uppercase tracking-tight">Main Header</h3>
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Page Title</label>
                  <input value={content.donate.title} onChange={e => updateContent('donate.title', e.target.value)} className="w-full p-4 border rounded-xl font-bold" />
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Page Subtitle</label>
                  <textarea value={content.donate.subtitle} onChange={e => updateContent('donate.subtitle', e.target.value)} className="w-full p-4 border rounded-xl h-24" />
                </div>
              </div>

              <div>
                <h3 className="font-black text-lg mb-4 text-slate-800 border-b pb-2 uppercase tracking-tight">Monetary Tab</h3>
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Headline</label>
                  <input value={content.donate.monetaryTitle} onChange={e => updateContent('donate.monetaryTitle', e.target.value)} className="w-full p-4 border rounded-xl font-bold" />
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Body Text Content</label>
                  <textarea value={content.donate.monetaryBody} onChange={e => updateContent('donate.monetaryBody', e.target.value)} className="w-full p-4 border rounded-xl h-40 leading-relaxed" />
                </div>
              </div>

              <div>
                <h3 className="font-black text-lg mb-4 text-slate-800 border-b pb-2 uppercase tracking-tight">Pick-Up Tab</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Headline</label>
                    <input value={content.donate.pickupTitle} onChange={e => updateContent('donate.pickupTitle', e.target.value)} className="w-full p-4 border rounded-xl font-bold" />
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Body Text</label>
                    <textarea value={content.donate.pickupBody} onChange={e => updateContent('donate.pickupBody', e.target.value)} className="w-full p-4 border rounded-xl h-32" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Reference Image URL</label>
                    <input value={content.donate.pickupImage} onChange={e => updateContent('donate.pickupImage', e.target.value)} className="w-full p-4 border rounded-xl mb-4" />
                    <div className="h-32 rounded-xl overflow-hidden border">
                      <img src={content.donate.pickupImage} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'binList' && (
            <div className="space-y-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-black text-lg mb-6">Add New Drop-off Bin</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    placeholder="Location Name (e.g. Montwood High)" 
                    className="p-4 border rounded-xl outline-none" 
                    value={newBin.name} 
                    onChange={e => setNewBin({...newBin, name: e.target.value})} 
                  />
                  <select 
                    className="p-4 border rounded-xl outline-none" 
                    value={newBin.type} 
                    onChange={e => setNewBin({...newBin, type: e.target.value as any})}
                  >
                    <option value="High School">High School</option>
                    <option value="Middle School">Middle School</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Daycare">Daycare</option>
                    <option value="Private">Private</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddBin}
                  className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Add Location
                </button>
              </div>

              <div>
                <h3 className="font-black text-lg mb-6 uppercase tracking-tight">Current Bin Network ({content.binList.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.binList.map(bin => (
                    <div key={bin.id} className="flex justify-between items-center p-4 border rounded-2xl bg-white shadow-sm hover:border-red-100 transition-colors group">
                      <div className="flex gap-4 items-center">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-black">
                          {bin.type[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{bin.name}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest">{bin.type}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteBin(bin.id)}
                        className="text-slate-300 group-hover:text-red-500 transition-colors"
                        title="Delete Location"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                  {content.binList.length === 0 && <div className="col-span-2 py-10 text-center text-slate-400 italic">No bin locations.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Standard Design / Home / About Tab Content remain the same */}
          {activeTab === 'design' && (
            <div className="space-y-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Primary Color</label>
              <input type="color" value={content.design.primaryColor} onChange={e => updateContent('design.primaryColor', e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-8">
                <h3 className="font-black text-lg mb-4 text-slate-800 uppercase tracking-tight">Hero Section</h3>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Hero Title</label>
                <textarea value={content.home.heroTitle} onChange={e => updateContent('home.heroTitle', e.target.value)} className="w-full p-4 border rounded-xl h-24 mb-4" />
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-10">
                <h3 className="font-black text-lg mb-4 text-slate-800 border-b pb-2 uppercase tracking-tight">Full History</h3>
                <textarea value={content.about.historyBody} onChange={e => updateContent('about.historyBody', e.target.value)} className="w-full p-4 border rounded-xl h-64 leading-relaxed" />
            </div>
          )}

          {activeTab === 'eventList' && (
            <div className="space-y-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-black text-lg mb-6">Add New Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder="Event Title" className="p-4 border rounded-xl outline-none" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                  <input type="date" className="p-4 border rounded-xl outline-none" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                </div>
                <button onClick={handleAddEvent} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl">Create Event</button>
              </div>
              <div className="space-y-4">
                {content.eventList.map(event => (
                  <div key={event.id} className="flex justify-between items-center p-4 border rounded-2xl">
                    <div className="font-bold">{event.title} ({event.date})</div>
                    <button onClick={() => handleDeleteEvent(event.id)} className="text-red-500"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm italic flex items-center gap-3">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Changes are saved to local storage and reflected immediately.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
