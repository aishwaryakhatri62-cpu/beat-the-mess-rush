import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Info,
  CalendarCheck,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CrowdBadge } from '../../components/common/CrowdBadge';

export const CrowdMonitoring: React.FC = () => {
  const { messes, updateMessQueue, role, setRole } = useApp();
  const navigate = useNavigate();

  const [activeMessId, setActiveMessId] = useState(messes[0]?.id || 'mess-north');
  const activeMess = messes.find(m => m.id === activeMessId) || messes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Live Mess Crowd Monitor</h1>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Simulation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare real-time queue lengths across campus dining halls to avoid long lines during peak lunch and dinner hours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/student/book')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Staggered Slot</span>
          </button>
        </div>
      </div>

      {/* Simulated Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Prototype Simulation:</span> Crowd numbers and wait time estimates reflect modeled university meal arrival curves. Staff can adjust counts in real-time to test system response.
        </div>
      </div>

      {/* Mess Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {messes.map(mess => {
          const isSelected = mess.id === activeMessId;
          return (
            <div
              key={mess.id}
              onClick={() => setActiveMessId(mess.id)}
              className={`cursor-pointer rounded-2xl p-5 border-2 transition-all bg-white relative flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-4 ring-blue-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{mess.name}</h3>
                    <p className="text-[11px] text-slate-500">{mess.code} &bull; {mess.location}</p>
                  </div>
                  <CrowdBadge level={mess.crowdLevel} size="sm" />
                </div>

                <div className="my-3 py-2 px-3 rounded-xl bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>In Queue:</span>
                    <strong className="text-slate-900">{mess.currentQueue}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{mess.estimatedWaitMinutes} mins</span>
                  </div>
                </div>

                {/* Progress bar representing queue saturation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Queue load</span>
                    <span>{Math.round((mess.currentQueue / mess.maxCapacity) * 100)}% capacity</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mess.crowdLevel === 'HIGH'
                          ? 'bg-rose-500'
                          : mess.crowdLevel === 'MEDIUM'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (mess.currentQueue / mess.maxCapacity) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Peak: {mess.peakHours}</span>
                <span className="font-bold text-blue-600 flex items-center gap-0.5">
                  View Focus &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Focus Mess Detailed Card & Meter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                SELECTED MESS FOCUS
              </span>
              <span className="text-xs text-slate-400 font-mono">{activeMess.code}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{activeMess.name}</h2>
            <p className="text-xs text-slate-500">{activeMess.location}</p>
          </div>

          <div className="flex items-center gap-3">
            <CrowdBadge
              level={activeMess.crowdLevel}
              waitMinutes={activeMess.estimatedWaitMinutes}
              queueCount={activeMess.currentQueue}
              size="lg"
              showDetails
            />
          </div>
        </div>

        {/* Visual Crowd Meter Gauge */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Visual Crowd Saturation Meter</span>
            <span>Current: {activeMess.currentQueue} / {activeMess.maxCapacity} Max</span>
          </div>

          <div className="relative pt-2">
            <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div className="w-1/3 bg-emerald-400/80 border-r border-white flex items-center justify-center text-[10px] font-bold text-emerald-950">
                LOW (0-14)
              </div>
              <div className="w-1/3 bg-amber-400/80 border-r border-white flex items-center justify-center text-[10px] font-bold text-amber-950">
                MEDIUM (15-29)
              </div>
              <div className="w-1/3 bg-rose-400/80 flex items-center justify-center text-[10px] font-bold text-rose-950">
                HIGH (30+)
              </div>
            </div>

            {/* Indicator marker */}
            <div
              className="absolute top-0 transform -translate-x-1/2 transition-all duration-300"
              style={{
                left: `${Math.min(98, Math.max(2, (activeMess.currentQueue / 60) * 100))}%`
              }}
            >
              <div className="w-4 h-4 bg-slate-900 rounded-full border-2 border-white shadow-md flex items-center justify-center -mt-1 mx-auto" />
              <div className="text-[10px] font-bold text-slate-800 bg-white shadow-xs px-1.5 py-0.5 rounded border border-slate-200 mt-0.5 whitespace-nowrap">
                {activeMess.currentQueue} Queue
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Estimated Line Delay
            </div>
            <div className="text-2xl font-extrabold text-blue-600">
              ~{activeMess.estimatedWaitMinutes} <span className="text-xs font-medium text-slate-600">Minutes</span>
            </div>
            <p className="text-[11px] text-slate-500">Based on ~36 sec average serving cycle per student</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Peak Traffic Windows
            </div>
            <div className="text-sm font-bold text-slate-800 pt-1">
              {activeMess.peakHours}
            </div>
            <p className="text-[11px] text-slate-500">Expect 20-30 min wait during these times</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Recommended Action
            </div>
            <div className="text-xs font-semibold text-slate-800 pt-1">
              {activeMess.crowdLevel === 'HIGH' ? (
                <span className="text-rose-700 font-bold">
                  High wait! Consider South Mess or book a slot for 1:30 PM.
                </span>
              ) : activeMess.crowdLevel === 'MEDIUM' ? (
                <span className="text-amber-700 font-bold">
                  Moderate line. Book an immediate slot to skip the walk-in queue.
                </span>
              ) : (
                <span className="text-emerald-700 font-bold">
                  Great time to eat! Queue is short and fast.
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">Updated in real-time from staff desk</p>
          </div>
        </div>

        {/* Live Staff Simulation Controls */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                Staff Simulation Queue Slider
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Test how crowd badges dynamically react to queue fluctuations
            </span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="70"
              value={activeMess.currentQueue}
              onChange={e => updateMessQueue(activeMess.id, parseInt(e.target.value, 10))}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="font-mono font-bold text-base bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 w-16 text-center">
              {activeMess.currentQueue}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <button
              onClick={() => updateMessQueue(activeMess.id, 8)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-medium"
            >
              Simulate Low (8)
            </button>
            <button
              onClick={() => updateMessQueue(activeMess.id, 22)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-medium"
            >
              Simulate Medium (22)
            </button>
            <button
              onClick={() => updateMessQueue(activeMess.id, 45)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-medium"
            >
              Simulate High Rush (45)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
