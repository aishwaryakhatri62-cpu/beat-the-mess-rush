import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChefHat,
  Users,
  CalendarCheck,
  TrendingDown,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Sliders,
  Utensils,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CrowdBadge } from '../../components/common/CrowdBadge';

export const StaffDashboard: React.FC = () => {
  const { messes, updateMessQueue, slots, bookings, markMealCollected, wasteRecords } = useApp();
  const navigate = useNavigate();

  const [selectedMessId, setSelectedMessId] = useState(messes[0]?.id || 'mess-north');
  const selectedMess = messes.find(m => m.id === selectedMessId) || messes[0];

  // Bookings for this mess
  const messBookings = bookings.filter(b => b.messId === selectedMessId);
  const confirmedBookings = messBookings.filter(b => b.status === 'CONFIRMED');

  // Portion Breakdown
  const smallCount = messBookings.filter(b => b.portion === 'Small').length;
  const regularCount = messBookings.filter(b => b.portion === 'Regular').length;
  const largeCount = messBookings.filter(b => b.portion === 'Large').length;
  const totalPortions = smallCount + regularCount + largeCount || 1;

  // Slots for this mess
  const messSlots = slots.filter(s => s.messId === selectedMessId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Mess Staff & Kitchen Operations</h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Kitchen Console
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time student arrival monitoring, portion-demand forecasting, and serving line crowd control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMessId}
            onChange={e => setSelectedMessId(e.target.value)}
            className="text-xs font-bold p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
          >
            {messes.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <CalendarCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{confirmedBookings.length}</div>
          <p className="text-[11px] text-slate-500">Active reservation passes today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Current Queue</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600">{selectedMess.currentQueue}</div>
          <p className="text-[11px] text-slate-500">~{selectedMess.estimatedWaitMinutes} min estimated line delay</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Crowd Status</span>
            <AlertTriangle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="pt-1">
            <CrowdBadge level={selectedMess.crowdLevel} size="sm" />
          </div>
          <p className="text-[11px] text-slate-500">Updates student app instantaneously</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Portion Orders</span>
            <Utensils className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xs font-bold text-slate-800 pt-1">
            S: <span className="text-emerald-600">{smallCount}</span> &bull; R: <span className="text-blue-600">{regularCount}</span> &bull; L: <span className="text-amber-600">{largeCount}</span>
          </div>
          <p className="text-[11px] text-slate-500">Advance prep guidance</p>
        </div>
      </div>

      {/* Real-Time Queue Updater Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">Physical Queue Controller ({selectedMess.code})</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Adjust the headcount standing in front of the serving counter. The student app reacts within seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateMessQueue(selectedMess.id, Math.max(0, selectedMess.currentQueue - 5))}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs flex items-center gap-1"
            >
              <Minus className="w-4 h-4" />
              <span>5</span>
            </button>
            <div className="px-5 py-2 bg-slate-800 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">HEADCOUNT</span>
              <span className="text-2xl font-mono font-extrabold text-amber-400">{selectedMess.currentQueue}</span>
            </div>
            <button
              onClick={() => updateMessQueue(selectedMess.id, selectedMess.currentQueue + 5)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>5</span>
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="70"
            value={selectedMess.currentQueue}
            onChange={e => updateMessQueue(selectedMess.id, parseInt(e.target.value, 10))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>0 (Empty hall)</span>
            <span>15 (Medium threshold)</span>
            <span>30 (High peak alert)</span>
            <span>60+ (Critical wave)</span>
          </div>
        </div>
      </div>

      {/* Portion Demand & Slot Occupancy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Portion Breakdown Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Today&apos;s Portion Demand Summary</h3>
              <p className="text-xs text-slate-500">Aggregated student preferences for cooking volume</p>
            </div>
            <button
              onClick={() => navigate('/staff/demand')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Detailed Prep Sheet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Small */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-emerald-950 block">Small Portion (Light)</span>
                <span className="text-[11px] text-emerald-800">2 Rotis + 150g Rice</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-emerald-800 font-mono">{smallCount}</span>
                <span className="text-[10px] text-emerald-600 block">students ({Math.round((smallCount / totalPortions) * 100)}%)</span>
              </div>
            </div>

            {/* Regular */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-blue-950 block">Regular Portion (Standard)</span>
                <span className="text-[11px] text-blue-800">3 Rotis + 250g Rice</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-blue-800 font-mono">{regularCount}</span>
                <span className="text-[10px] text-blue-600 block">students ({Math.round((regularCount / totalPortions) * 100)}%)</span>
              </div>
            </div>

            {/* Large */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-amber-950 block">Large Portion (Heavy)</span>
                <span className="text-[11px] text-amber-800">4 Rotis + 350g Rice</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-amber-800 font-mono">{largeCount}</span>
                <span className="text-[10px] text-amber-600 block">students ({Math.round((largeCount / totalPortions) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Upcoming Slot Occupancy */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Upcoming Slot Distribution</h3>
              <p className="text-xs text-slate-500">15-minute staggered arrival windows</p>
            </div>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {messSlots.map(slot => {
              const pct = Math.round((slot.bookedCount / slot.maxCapacity) * 100);
              return (
                <div key={slot.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-800">{slot.timeWindow} ({slot.mealType})</span>
                    <span className="text-slate-600">{slot.bookedCount} / {slot.maxCapacity} booked</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pct >= 100 ? 'bg-rose-500' : pct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmed Passes Verification List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Student Meal Collection & Verification</h3>
            <p className="text-xs text-slate-500">Scan or manually verify student arrival at serving counter</p>
          </div>
          <span className="text-xs font-bold text-blue-600">{messBookings.length} total entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Pass ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Reg No.</th>
                <th className="py-2.5 px-3">Slot Time</th>
                <th className="py-2.5 px-3">Portion</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {messBookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{b.id}</td>
                  <td className="py-2.5 px-3 text-slate-900">{b.studentName}</td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono">{b.studentReg}</td>
                  <td className="py-2.5 px-3 text-slate-700">{b.timeWindow}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      b.portion === 'Small' ? 'bg-emerald-100 text-emerald-800' :
                      b.portion === 'Regular' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {b.portion}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                      b.status === 'COLLECTED' ? 'bg-slate-100 text-slate-600' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {b.status === 'CONFIRMED' ? (
                      <button
                        onClick={() => markMealCollected(b.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors"
                      >
                        Verify & Serve
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
