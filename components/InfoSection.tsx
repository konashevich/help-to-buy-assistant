import React from 'react';
import { ShieldCheck, TrendingUp, AlertOctagon, UserCheck } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">How "Help to Buy" Works</h2>
        <p className="text-slate-600">
          The government contributes up to 40% of the property value, reducing your deposit and monthly mortgage repayments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">Low Deposit</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            You only need a minimum 2% deposit. You also avoid paying Lenders Mortgage Insurance (LMI), saving thousands upfront.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center mb-4">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">Shared Equity</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Gov contributes 30% for existing homes or 40% for new builds. You don't pay rent or interest on this portion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">Income Caps</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Strict limits apply: $100,000 for singles and $160,000 for couples/single parents. You must not own other property.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-800">Repayment</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            When you sell, you pay back the government's share of the sale price (including capital gains). You can also buy them out over time.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-300 rounded-2xl p-8 md:p-10">
         <h3 className="text-xl font-bold text-white mb-4">Important Considerations</h3>
         <ul className="list-disc list-outside ml-5 space-y-2 text-sm md:text-base">
           <li><strong>Strings Attached:</strong> You are sharing any profits with the government. If your income rises above the cap for two consecutive years, you might be required to start buying out the government's share.</li>
           <li><strong>Limited Lenders:</strong> Commonwealth Bank and Bank Australia are the initial participating lenders, limiting your ability to shop around for rates.</li>
           <li><strong>Limited Spots:</strong> Capped at 10,000 places per year for four years.</li>
           <li><strong>Eligibility Check:</strong> Always check the official government tools before applying.</li>
         </ul>
      </div>
    </div>
  );
};

export default InfoSection;