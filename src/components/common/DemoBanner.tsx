import React from 'react';
import { AlertCircle, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { role, setRole, resetAllData } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded border border-blue-500/30">
            <Sparkles className="w-3 h-3 text-blue-400" />
            LPU INT335 DESIGN THINKING
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Demonstration Prototype: Real-time mess crowd leveling & food waste mitigation
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Role Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 px-2 font-medium">VIEW AS:</span>
            <button
              onClick={() => setRole('student')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                role === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('staff')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                role === 'staff'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Mess Staff
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Admin / DT Lead
            </button>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demonstration data to default sample records?')) {
                resetAllData();
              }
            }}
            title="Reset data back to initial baseline"
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
