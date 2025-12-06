import React, { useState } from 'react';
import Calculator from './components/Calculator';
import EligibilityChecker from './components/EligibilityChecker';
import InfoSection from './components/InfoSection';
import { Home } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'eligibility'>('calculator');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
               <Home className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Help to Buy <span className="text-brand-600">Assistant</span>
            </h1>
          </div>
          <div className="text-xs text-slate-500 hidden sm:block">
            Unofficial Guide based on Gov Scheme
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Hero Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full border border-brand-100 uppercase tracking-wide">
            New Dec 2025 Initiative
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Housing dream <br className="hidden md:block" />
            <span className="text-brand-600">within reach.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Calculate your shared equity savings and check eligibility for the Australian Government's new Help to Buy scheme.
          </p>
        </div>

        {/* Interactive Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 flex flex-row">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 py-4 text-center text-sm font-semibold transition-colors
                ${activeTab === 'calculator' 
                  ? 'bg-white text-brand-600 border-b-2 border-brand-600' 
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('eligibility')}
              className={`flex-1 py-4 text-center text-sm font-semibold transition-colors
                ${activeTab === 'eligibility' 
                  ? 'bg-white text-brand-600 border-b-2 border-brand-600' 
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
            >
              Check Eligibility
            </button>
          </div>
          
          <div className="p-4 md:p-8 bg-slate-50/50">
            {activeTab === 'calculator' ? <Calculator /> : (
              <div className="max-w-2xl mx-auto">
                 <EligibilityChecker />
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-8">
           <InfoSection />
        </div>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm mb-4">
            This tool is for educational purposes only and is not official government advice. 
            <br />Data based on scheme details released Dec 2025.
          </p>
          <div className="flex justify-center gap-4 text-sm font-medium">
             <a href="#" className="hover:text-white transition-colors">Official Website</a>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}