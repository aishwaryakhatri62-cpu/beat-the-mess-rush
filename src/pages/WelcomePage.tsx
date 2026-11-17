import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  Clock,
  TrendingDown,
  Users,
  ChefHat,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  QrCode,
  Layers,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CrowdBadge } from '../components/common/CrowdBadge';

export const WelcomePage: React.FC = () => {
  const { role, setRole, messes, activeBooking, bookings, wasteRecords } = useApp();
  const navigate = useNavigate();

  // Quick calculations
  const totalBookings = bookings.length;
  const totalWasteRecorded = wasteRecords.reduce((acc, curr) => acc + curr.totalWasteKg, 0);

  const handleRoleSelect = (selectedRole: 'student' | 'staff' | 'admin', targetRoute: string) => {
    setRole(selectedRole);
    navigate(targetRoute);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-navy-700">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>LOVELY PROFESSIONAL UNIVERSITY &bull; INT335 DESIGN THINKING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            BEAT THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">MESS RUSH</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium">
            Peak-Hour Queues and Food Waste in LPU Messes.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-slate-200 leading-relaxed">
            <span className="font-bold text-amber-300 uppercase tracking-wide block mb-1">
              Core Design Challenge:
            </span>
            &ldquo;How might we help hostelers get their meals without unpredictable waiting, while reducing the food that reaches the plate but not the stomach?&rdquo;
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleRoleSelect('student', '/student')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/40 transition-all hover:scale-102"
            >
              <span>Explore Student Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleRoleSelect('admin', '/admin/showcase')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>CP7 Final Showcase & Viva</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Selection Grid */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Select Interactive Demo Role</h2>
          <p className="text-xs text-slate-500">
            Experience the three distinct stakeholder portals without complex login procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Student Card */}
          <div
            onClick={() => handleRoleSelect('student', '/student')}
            className={`cursor-pointer rounded-2xl p-6 bg-white border-2 transition-all hover:shadow-xl relative flex flex-col justify-between ${
              role === 'student' ? 'border-blue-600 ring-4 ring-blue-50' : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Role: Student
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Student Portal</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                For hostel residents & day scholars. Check live crowd meters, reserve 15-minute staggered lunch/dinner slots, select food portions, and get a digital QR meal pass.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Real-time queue & wait estimates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Staggered slot booking (overbooking safe)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Portion choice (Small / Regular / Large)</span>
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
              <span>Launch Student Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. Staff Card */}
          <div
            onClick={() => handleRoleSelect('staff', '/staff')}
            className={`cursor-pointer rounded-2xl p-6 bg-white border-2 transition-all hover:shadow-xl relative flex flex-col justify-between ${
              role === 'staff' ? 'border-amber-600 ring-4 ring-amber-50' : 'border-slate-200 hover:border-amber-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ChefHat className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Role: Mess Staff
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mess Staff & Kitchen</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                For kitchen supervisors & serving staff. Adjust live queue meters, inspect upcoming portion breakdowns (Small vs Regular vs Large), and track daily food waste logs.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive queue updater slider</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Portion-demand forecast for chefs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Plate vs Pot waste accounting</span>
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
              <span>Launch Staff Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Admin / Design Thinking Card */}
          <div
            onClick={() => handleRoleSelect('admin', '/admin')}
            className={`cursor-pointer rounded-2xl p-6 bg-white border-2 transition-all hover:shadow-xl relative flex flex-col justify-between ${
              role === 'admin' ? 'border-emerald-600 ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Role: Admin & DT Lead
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Design Thinking Workspace</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Full academic workspace for INT335: 6 Stages, 7 Checkpoints (CP1-CP7), 8+ Interviews, 30+ Survey records, 32 Ideation items, Test logs, and Viva Prep.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CP1 to CP7 tracking & checklist</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Empathy & Persona documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Viva Q&A cards & printable report</span>
                </li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
              <span>Open DT Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Campus Mess Status Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Live Campus Mess Overview (Simulated)</h2>
            <p className="text-xs text-slate-500">
              Demonstration data representing student distribution across campus dining facilities.
            </p>
          </div>
          <button
            onClick={() => navigate('/student/crowd')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View Detailed Queue Comparisons</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {messes.map(mess => (
            <div key={mess.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-800 leading-tight">{mess.name}</h3>
                  <p className="text-[11px] text-slate-500">{mess.location}</p>
                </div>
                <CrowdBadge level={mess.crowdLevel} size="sm" />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-600">Queue:</span>
                <span className="font-bold text-slate-900">{mess.currentQueue} students</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">Est. Wait:</span>
                <span className="font-bold text-blue-600">~{mess.estimatedWaitMinutes} mins</span>
              </div>

              <button
                onClick={() => {
                  setRole('student');
                  navigate('/student/book');
                }}
                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Book Slot at this Mess
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* The 3 Core Solution Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="font-bold text-sm text-blue-950">Crowd-Level Indicators</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Eliminates queue uncertainty by surfacing color-coded wait times before students leave their hostel rooms.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="font-bold text-sm text-amber-950">Staggered 15-Min Slots</h3>
          <p className="text-xs text-amber-800 leading-relaxed">
            Spreads high meal demand evenly across time windows to eliminate sudden 150-person wave bottlenecks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="font-bold text-sm text-emerald-950">Portion Selection</h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Signals appetite requirements (Small / Regular / Large) in advance to prevent kitchen over-preparation and plate leftovers.
          </p>
        </div>
      </div>
    </div>
  );
};
