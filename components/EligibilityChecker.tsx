import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { INCOME_LIMITS } from '../constants';

const EligibilityChecker: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isEligible, setIsEligible] = useState(true);
  const [failReason, setFailReason] = useState<string | null>(null);

  const questions = [
    {
      id: 'citizenship',
      text: 'Are you an Australian Citizen?',
      subText: 'The scheme is currently open to Australian citizens.',
      check: (val: boolean) => val, // Must be true
      failMessage: 'Currently, the scheme is available to Australian citizens.'
    },
    {
      id: 'age',
      text: 'Are you at least 18 years old?',
      subText: '',
      check: (val: boolean) => val,
      failMessage: 'You must be at least 18 years of age to apply.'
    },
    {
      id: 'ownership',
      text: 'Do you currently own a home or land?',
      subText: 'Includes residential property in Australia or overseas.',
      check: (val: boolean) => !val, // Must be false
      failMessage: 'You generally cannot currently own a property. (Exceptions apply for single parents buying out a partner).',
      note: 'Note: Single parents buying out a partner may still be eligible.'
    },
    {
      id: 'income',
      text: 'Is your income within the limits?',
      subText: `$${INCOME_LIMITS[0].limit.toLocaleString()} for singles, $${INCOME_LIMITS[1].limit.toLocaleString()} for couples/single parents.`,
      check: (val: boolean) => val,
      failMessage: 'Your income exceeds the thresholds for the Help to Buy scheme.'
    },
    {
      id: 'deposit',
      text: 'Do you have at least 2% deposit saved?',
      subText: 'You need a minimum 2% of the property purchase price.',
      check: (val: boolean) => val,
      failMessage: 'A minimum 2% genuine savings deposit is required.'
    }
  ];

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[step];
    const passed = currentQuestion.check(answer);

    if (!passed) {
      setIsEligible(false);
      setFailReason(currentQuestion.failMessage);
    } else {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        // Finished
        setStep(step + 1);
      }
    }
  };

  const reset = () => {
    setStep(0);
    setIsEligible(true);
    setFailReason(null);
  };

  if (!isEligible) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col items-center text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-900 mb-2">Likely Ineligible</h3>
        <p className="text-red-700 mb-6">{failReason}</p>
        <button 
          onClick={reset}
          className="text-sm font-semibold text-red-600 hover:text-red-800 underline"
        >
          Check again
        </button>
      </div>
    );
  }

  if (step >= questions.length) {
    return (
      <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex flex-col items-center text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Looks Good!</h3>
        <p className="text-green-700 mb-6">Based on your answers, you appear to meet the basic eligibility criteria.</p>
        <button 
          onClick={reset}
          className="text-sm font-semibold text-green-600 hover:text-green-800 underline"
        >
          Start over
        </button>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step {step + 1} of {questions.length}</span>
        {q.note && <div className="group relative">
             <AlertCircle className="w-4 h-4 text-amber-500 cursor-help" />
             <div className="absolute right-0 w-48 p-2 bg-amber-50 text-amber-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {q.note}
             </div>
          </div>}
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-2">{q.text}</h3>
      <p className="text-slate-500 text-sm mb-8">{q.subText}</p>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleAnswer(true)}
          className="py-3 px-4 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 border border-transparent font-medium transition-all"
        >
          Yes
        </button>
        <button 
          onClick={() => handleAnswer(false)}
          className="py-3 px-4 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 border border-transparent font-medium transition-all"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default EligibilityChecker;