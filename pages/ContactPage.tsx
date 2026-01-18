
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { getContent } from '../contentStore';

const ContactPage: React.FC = () => {
  const [content, setContent] = useState(getContent());
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleUpdate = () => setContent(getContent());
    window.addEventListener('contentUpdate', handleUpdate);
    return () => window.removeEventListener('contentUpdate', handleUpdate);
  }, []);

  const { contact, design } = content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xnjqneez', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ type: 'General Contact Inquiry', ...formData })
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className={`py-20 px-4 bg-slate-50 min-h-screen ${design.fontFamily}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter uppercase">{contact.title}</h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">{contact.subtitle}</p>
            <div className="space-y-4">
               <div className="p-6 bg-white border rounded-2xl font-bold">{CONTACT_INFO.phone}</div>
               <div className="p-6 bg-white border rounded-2xl font-bold">{CONTACT_INFO.email}</div>
            </div>
          </div>

          <div className={`bg-white p-10 md:p-12 border shadow-2xl ${design.borderRadius}`}>
            {status === 'success' ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h2>
                <button onClick={() => setStatus('idle')} className="font-bold py-4 px-10 rounded-full text-white" style={{ backgroundColor: design.primaryColor }}>NEW MESSAGE</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 mb-8">Send a Message</h2>
                <input required placeholder="Your Name" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Your Email" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea required rows={6} placeholder="Message" className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none resize-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button disabled={status === 'submitting'} className="w-full text-white font-black py-5 rounded-2xl shadow-xl" style={{ backgroundColor: design.primaryColor }}>
                  {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
