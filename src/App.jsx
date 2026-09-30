import React, { useState } from 'react';
import { 
  Download, Plus, Trash2, User, Briefcase, GraduationCap, 
  Layers, MapPin, Mail, Phone, Globe, Sparkles, Layout, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [field, setField] = useState('Marketing');
  const [data, setData] = useState({
    name: "SARAH JENKINS",
    role: "Senior Marketing Manager",
    email: "sarah@apex.com",
    phone: "123-456-7890",
    location: "South, Twm",
    website: "linkedin.com/in/sarah",
    profile: "Strategic marketing professional with 10+ years experience in driving brand growth. Increased dominant strategy and market appearance by 25% through effective processes.",
    experience: [
      { id: 1, company: "TechCorp Inc.", role: "Senior Manager", duration: "2021 - May 2022", desc: "Developed comprehensive multi-channel marketing strategies and managed a $2M annual budget." }
    ],
    skills: ["SEO & SEM", "Google Analytics", "Content Strategy"],
    softSkills: ["Leadership", "Communication", "Strategic Planning"],
    education: [
      { id: 1, school: "Columbia University", degree: "MBA, Marketing", year: "Graduation 2023" }
    ]
  });

  const updateField = (key, val) => setData({ ...data, [key]: val });
  
  const addList = (key) => {
    const newItem = key === 'experience' 
      ? { id: Date.now(), company: "", role: "", duration: "", desc: "" }
      : { id: Date.now(), school: "", degree: "", year: "" };
    setData({ ...data, [key]: [...data[key], newItem] });
  };

  const removeItem = (key, id) => {
    setData({ ...data, [key]: data[key].filter(item => item.id !== id) });
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-sans text-[#37474F] overflow-hidden">
      {/* SIDEBAR EDITOR */}
      <aside className="w-[480px] bg-white border-r border-slate-200 flex flex-col no-print shadow-xl z-20">
        <header className="p-6 bg-[#0056D2] text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1 rounded shadow-lg">
                <Layers size={24} className="text-[#0056D2]" />
              </div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">APEX <span className="font-light text-blue-200 italic text-sm">Architect</span></h1>
            </div>
            <div className="flex items-center gap-2 bg-[#1E88E5] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
              <Sparkles size={12} /> {field} Optimized
            </div>
          </div>
          <select 
            className="w-full bg-blue-800/50 border border-blue-400 text-white rounded p-2 text-sm outline-none cursor-pointer"
            onChange={(e) => setField(e.target.value)}
          >
            <option>Marketing</option>
            <option>Software Engineering</option>
            <option>Executive Leadership</option>
          </select>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          {/* Section: Identity */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-[#0056D2] font-bold text-xs uppercase tracking-[0.2em] border-b pb-2">
              <User size={14} /> Identity
            </h2>
            <input className="w-full p-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-[#0056D2] outline-none" placeholder="Full Name" value={data.name} onChange={(e) => updateField('name', e.target.value.toUpperCase())} />
            <input className="w-full p-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-[#0056D2] outline-none" placeholder="Role Title" value={data.role} onChange={(e) => updateField('role', e.target.value)} />
          </section>

          {/* Section: Experience */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="flex items-center gap-2 text-[#0056D2] font-bold text-xs uppercase tracking-[0.2em]">
                <Briefcase size={14} /> Experience
              </h2>
              <button onClick={() => addList('experience')} className="text-[#1E88E5] hover:bg-blue-50 p-1 rounded-full"><Plus size={18} /></button>
            </div>
            <AnimatePresence>
              {data.experience.map((exp) => (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={exp.id} className="p-4 bg-slate-50 rounded-xl relative group border border-transparent hover:border-blue-100 transition">
                  <button onClick={() => removeItem('experience', exp.id)} className="absolute top-2 right-2 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={14} /></button>
                  <input className="w-full bg-transparent font-bold mb-1 outline-none text-sm" placeholder="Company" value={exp.company} onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp.find(i => i.id === exp.id).company = e.target.value;
                    setData({...data, experience: newExp});
                  }} />
                  <textarea className="w-full bg-white border border-slate-200 rounded p-2 text-xs" rows="2" placeholder="Responsibilities..." />
                </motion.div>
              ))}
            </AnimatePresence>
          </section>
        </div>

        <div className="p-6 bg-white border-t mt-auto shadow-2xl">
          <button onClick={() => window.print()} className="w-full bg-[#0056D2] hover:bg-[#1E88E5] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition active:scale-95">
            <Download size={20} /> PRINT MAJESTIC PDF
          </button>
        </div>
      </aside>

      {/* PREVIEW CANVAS */}
      <main className="flex-1 bg-slate-200 overflow-y-auto p-12 flex justify-center items-start">
        <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex print:m-0 print:shadow-none">
          {/* Main Column */}
          <div className="flex-[2] p-16">
            <h1 className="text-5xl font-black text-[#37474F] tracking-tighter mb-1 uppercase">{data.name}</h1>
            <h2 className="text-[#1E88E5] text-xl font-medium tracking-[0.2em] mb-12 uppercase">{data.role}</h2>
            
            <h3 className="text-[#1E88E5] font-black text-[10px] uppercase tracking-[0.3em] mb-4 border-b border-slate-100 pb-1">Profile</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">{data.profile}</p>

            <h3 className="text-[#1E88E5] font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-slate-100 pb-1">Professional Experience</h3>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-800 uppercase text-sm">{exp.company || "Company Name"}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{exp.duration || "2021 - Present"}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Executive-level contributions to project architecture and market growth.</p>
              </div>
            ))}
          </div>

          {/* Sidebar Column */}
          <aside className="flex-1 bg-[#ECEFF1] p-10">
            <h3 className="text-[#37474F] font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-slate-300 pb-1">Contact</h3>
            <div className="space-y-3 text-[10px] font-bold text-slate-500 uppercase">
              <div className="flex items-center gap-2"><Mail size={12} className="text-[#0056D2]" /> {data.email}</div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-[#0056D2]" /> {data.phone}</div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-[#0056D2]" /> {data.location}</div>
            </div>

            <div className="mt-12">
              <h3 className="text-[#37474F] font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-slate-300 pb-1">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => <span key={s} className="bg-white px-2 py-1 rounded text-[9px] shadow-sm">{s}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}