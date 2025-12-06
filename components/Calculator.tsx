import React, { useState, useEffect, useMemo } from 'react';
import { REGION_CAPS, MIN_DEPOSIT_PERCENT, GOV_SHARE_EXISTING, GOV_SHARE_NEW, INTEREST_RATE_ESTIMATE, LOAN_TERM_YEARS } from '../constants';
import { PropertyType, CalculationResult } from '../types';
import { Building2, Calculator as CalcIcon, Home, DollarSign, MapPin, AlertTriangle } from 'lucide-react';
import DonutChart from './DonutChart';

const Calculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(600000);
  const [regionId, setRegionId] = useState<string>(REGION_CAPS[0].id);
  const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.EXISTING);
  
  const selectedRegion = useMemo(() => REGION_CAPS.find(r => r.id === regionId) || REGION_CAPS[0], [regionId]);

  const result: CalculationResult = useMemo(() => {
    const govSharePct = propertyType === PropertyType.NEW_BUILD ? GOV_SHARE_NEW : GOV_SHARE_EXISTING;
    const depositAmount = propertyPrice * MIN_DEPOSIT_PERCENT;
    const govContributionAmount = propertyPrice * govSharePct;
    // Loan is remainder
    const bankLoanAmount = propertyPrice - depositAmount - govContributionAmount;
    
    // Mortgage repayment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    // i = monthly interest rate, n = number of payments (months)
    const monthlyRate = INTEREST_RATE_ESTIMATE / 12;
    const numPayments = LOAN_TERM_YEARS * 12;
    const monthlyRepayment = bankLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    return {
      propertyPrice,
      depositAmount,
      govContributionAmount,
      bankLoanAmount,
      monthlyRepayment,
      isPriceEligible: propertyPrice <= selectedRegion.priceCap,
      capLimit: selectedRegion.priceCap
    };
  }, [propertyPrice, selectedRegion, propertyType]);

  // Formatter
  const formatMoney = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
              <CalcIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Estimate Costs</h2>
          </div>

          <div className="space-y-6">
            {/* Location Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                Location
              </label>
              <select
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3"
              >
                {REGION_CAPS.map((cap) => (
                  <option key={cap.id} value={cap.id} disabled={cap.priceCap === 0}>
                    {cap.name} {cap.priceCap === 0 ? '(Not Participating)' : `(Cap: ${formatMoney(cap.priceCap)})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Home className="w-4 h-4 text-slate-400" />
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPropertyType(PropertyType.EXISTING)}
                  className={`p-3 text-sm font-medium rounded-lg border flex flex-col items-center justify-center gap-1 transition-all
                    ${propertyType === PropertyType.EXISTING 
                      ? 'bg-brand-50 border-brand-500 text-brand-700 ring-1 ring-brand-500' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Building2 className="w-5 h-5" />
                  Existing Home
                  <span className="text-xs font-normal opacity-75">Gov Share: 30%</span>
                </button>
                <button
                  onClick={() => setPropertyType(PropertyType.NEW_BUILD)}
                  className={`p-3 text-sm font-medium rounded-lg border flex flex-col items-center justify-center gap-1 transition-all
                    ${propertyType === PropertyType.NEW_BUILD 
                      ? 'bg-brand-50 border-brand-500 text-brand-700 ring-1 ring-brand-500' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  <Home className="w-5 h-5" />
                  New Build
                  <span className="text-xs font-normal opacity-75">Gov Share: 40%</span>
                </button>
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                Property Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-bold">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className={`block w-full pl-8 p-3 text-slate-900 border rounded-lg focus:ring-brand-500 focus:border-brand-500 ${
                    !result.isPriceEligible ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 bg-slate-50'
                  }`}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                 <span>Min: $0</span>
                 <span>Max Cap: {formatMoney(result.capLimit)}</span>
              </div>
              <input 
                type="range" 
                min="300000" 
                max="1400000" 
                step="10000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              
              {!result.isPriceEligible && (
                <div className="mt-3 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    This price exceeds the <strong>{formatMoney(result.capLimit)}</strong> limit for {selectedRegion.name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Payment Breakdown</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="order-2 sm:order-1 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Your Deposit</span>
                    <span className="text-xs text-emerald-500">Minimum 2%</span>
                  </div>
                  <span className="text-lg font-bold text-emerald-700">{formatMoney(result.depositAmount)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-sky-50 rounded-lg border border-sky-100">
                  <div>
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Gov Share</span>
                    <span className="text-xs text-sky-500">{propertyType === PropertyType.NEW_BUILD ? '40%' : '30%'} Equity</span>
                  </div>
                  <span className="text-lg font-bold text-sky-700">{formatMoney(result.govContributionAmount)}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Bank Loan</span>
                    <span className="text-xs text-slate-500">Remaining amount</span>
                  </div>
                  <span className="text-lg font-bold text-slate-700">{formatMoney(result.bankLoanAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 sm:order-2 flex items-center justify-center relative">
               <DonutChart 
                 deposit={result.depositAmount}
                 govShare={result.govContributionAmount}
                 bankLoan={result.bankLoanAmount}
               />
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                  <h4 className="text-slate-500 text-sm font-medium">Estimated Monthly Repayments</h4>
                  <p className="text-xs text-slate-400 mt-1">Based on {INTEREST_RATE_ESTIMATE * 100}% interest over 30 years</p>
               </div>
               <div className="text-3xl font-extrabold text-brand-700">
                 {formatMoney(result.monthlyRepayment)}
                 <span className="text-base font-medium text-slate-400 ml-1">/mo</span>
               </div>
            </div>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              *Disclaimer: This is an estimate only. Actual repayments depend on your lender and interest rates. Lenders Mortgage Insurance (LMI) is avoided under this scheme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;