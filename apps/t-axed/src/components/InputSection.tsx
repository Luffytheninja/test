import {
  Shield,
  Heart,
  AlertCircle,
  FileText,
  UserCircle,
  Briefcase,
  Globe,
  Info,
} from 'lucide-react';
import { UserCategory } from '../types';

interface InputSectionProps {
  monthlyIncome: number;
  setMonthlyIncome: (val: number) => void;
  employeeCount: number;
  setEmployeeCount: (val: number) => void;
  rentPaid: number;
  setRentPaid: (val: number) => void;
  monthlyUtilities: number;
  setMonthlyUtilities: (val: number) => void;
  utilityPercentage: number;
  setUtilityPercentage: (val: number) => void;

  lifePremium: number;
  setLifePremium: (val: number) => void;
  healthPremium: number;
  setHealthPremium: (val: number) => void;
  nhiaVoluntary: number;
  setNhiaVoluntary: (val: number) => void;

  isTrackerActive: boolean;
  nhiaMandatory: boolean;

  showInsuranceAPI: boolean;
  setShowInsuranceAPI: (val: boolean) => void;

  userCategory: UserCategory;
  setUserCategory: (val: UserCategory) => void;
  voluntaryPension: number;
  setVoluntaryPension: (val: number) => void;
  mortgageInterest: number;
  setMortgageInterest: (val: number) => void;
}

const CATEGORIES: { id: UserCategory; label: string; icon: any; desc: string }[] = [
  { id: 'PAYE', label: 'Salary Earner', icon: UserCircle, desc: 'Tax deducted by employer' },
  { id: 'SmallBusiness', label: 'Small Business', icon: Briefcase, desc: 'Turnover < ₦50M' },
  {
    id: 'Professional',
    label: 'Professional/Freelancer',
    icon: FileText,
    desc: 'Independent consultant',
  },
  { id: 'DigitalNomad', label: 'Digital Nomad', icon: Globe, desc: 'Earns in foreign currency' },
];

export default function InputSection({
  monthlyIncome,
  setMonthlyIncome,
  employeeCount,
  setEmployeeCount,
  rentPaid,
  setRentPaid,
  monthlyUtilities,
  setMonthlyUtilities,
  utilityPercentage,
  setUtilityPercentage,
  lifePremium,
  setLifePremium,
  healthPremium,
  setHealthPremium,
  nhiaVoluntary,
  setNhiaVoluntary,
  isTrackerActive,
  nhiaMandatory,
  showInsuranceAPI,
  setShowInsuranceAPI,
  userCategory,
  setUserCategory,
  voluntaryPension,
  setVoluntaryPension,
  mortgageInterest,
  setMortgageInterest,
}: InputSectionProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 px-2">
        <div className="w-12 h-12 rounded-2xl bg-white/5 shadow-sm border border-white/10 flex items-center justify-center">
          <UserCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Business Profile</h2>
          <p className="text-gray-400 text-sm font-medium">Configure your commercial fingerprint</p>
        </div>
      </div>

      {/* Category Selector */}
      <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Info className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Tax Classification</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setUserCategory(cat.id)}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-2 ${
                userCategory === cat.id
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/50'
                  : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <cat.icon
                className={`w-6 h-6 ${userCategory === cat.id ? 'text-white' : 'text-emerald-500'}`}
              />
              <div>
                <div className="text-xs font-bold leading-tight uppercase tracking-wider">
                  {cat.label}
                </div>
                <div
                  className={`text-[10px] mt-1 opacity-70 ${userCategory === cat.id ? 'text-emerald-50' : 'text-gray-500'}`}
                >
                  {cat.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Income Input */}
        <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Commercial Core</h3>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                Base Monthly Income
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isTrackerActive}
                placeholder="0"
              />
            </div>
            {isTrackerActive && (
              <div className="px-4 py-2 bg-emerald-500/10 text-[10px] text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-2 rounded-lg border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Synced with Tracker
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                Headcount
              </label>
              <input
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                Annual Rent
              </label>
              <input
                type="number"
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                Utilities (Monthly)
              </label>
              <input
                type="number"
                value={monthlyUtilities}
                onChange={(e) => setMonthlyUtilities(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="0"
              />
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex justify-between mb-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Business Allocation
                </label>
                <span className="text-sm font-black text-emerald-500">{utilityPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={utilityPercentage}
                onChange={(e) => setUtilityPercentage(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-1"
              />
            </div>
          </div>
        </div>

        {/* Insurance Inputs */}
        <div className="bg-zinc-900 rounded-3xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Tax Relief Modules</h3>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Heart className="w-3 h-3 text-red-400" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Life Insur.
                </label>
              </div>
              <input
                type="number"
                value={lifePremium}
                onChange={(e) => setLifePremium(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Deductible"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-3 h-3 text-indigo-400" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Medical
                </label>
              </div>
              <input
                type="number"
                value={healthPremium}
                onChange={(e) => setHealthPremium(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Tracking"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertCircle className="w-3 h-3 text-orange-400" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  NHIA
                </label>
              </div>
              <input
                type="number"
                value={nhiaVoluntary}
                onChange={(e) => setNhiaVoluntary(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder={nhiaMandatory ? 'Required' : 'Voluntary'}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="w-3 h-3 text-emerald-400" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Vol. Pension
                </label>
              </div>
              <input
                type="number"
                value={voluntaryPension}
                onChange={(e) => setVoluntaryPension(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Tax-Free"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Briefcase className="w-3 h-3 text-blue-400" />
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Mortgage Int.
                </label>
              </div>
              <input
                type="number"
                value={mortgageInterest}
                onChange={(e) => setMortgageInterest(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="Deductible"
              />
            </div>
          </div>

          <button
            onClick={() => setShowInsuranceAPI(!showInsuranceAPI)}
            className="w-full p-4 rounded-xl bg-purple-500/10 text-purple-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-purple-500/20 transition-colors border border-purple-500/20"
          >
            <FileText className="w-5 h-5" />
            {showInsuranceAPI ? 'Hide Integrations' : 'Sync Insurance API'}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 py-2 rounded-xl border border-white/5">
            <Shield className="w-3 h-3" />
            E2E Encrypted Protocol
          </div>
        </div>
      </div>
    </div>
  );
}
