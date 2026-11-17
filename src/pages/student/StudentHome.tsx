import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  CalendarCheck,
  QrCode,
  Utensils,
  AlertCircle,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Info,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CrowdBadge } from '../../components/common/CrowdBadge';
import { MealType } from '../../types';

export const StudentHome: React.FC = () => {
  const { currentUser, messes, activeBooking, cancelBooking } = useApp();
  const navigate = useNavigate();

  const [selectedMeal, setSelectedMeal] = useState<MealType>('Lunch');
  const [selectedMessId, setSelectedMessId] = useState(messes[0]?.id || 'mess-north');

  const selectedMess = messes.find(m => m.id === selectedMessId) || messes[0];

  // Menu items for the chosen meal
  const currentMenuItems = selectedMess.todaysMenu[selectedMeal.toLowerCase() as 'breakfast' | 'lunch' | 'dinner'] || [];

  return (
    <div className="space-y-6">
      {/* Welcome & Student Banner */}
      <div className="bg-gradient-to-r from-navy-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome back, {currentUser.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Today&apos;s Meal Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
            Reg: <span className="font-bold text-white">{currentUser.regNo}</span> &bull; {currentUser.hostel}, Room {currentUser.room}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/student/book')}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Quick Book Meal Slot</span>
          </button>
          <button
            onClick={() => navigate('/student/crowd')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            <Users className="w-4 h-4 text-blue-300" />
            <span>Live Queues</span>
          </button>
        </div>
      </div>

      {/* Active Booking Banner if exists */}
      {activeBooking && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                  Confirmed Pass
                </span>
                <span className="text-xs font-mono font-bold text-emerald-950">{activeBooking.id}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                {activeBooking.mealType} at {activeBooking.messName}
              </h3>
              <p className="text-xs text-slate-600">
                Slot: <span className="font-semibold text-slate-900">{activeBooking.timeWindow}</span> &bull; Portion: <span className="font-semibold text-emerald-800">{activeBooking.portion}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate('/student/pass')}
              className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors text-center"
            >
              View Digital Pass & QR
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel this booking?')) {
                  cancelBooking(activeBooking.id);
                }
              }}
              className="px-3 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Current Meal Selector & Mess Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mess Crowd Status Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Campus Mess Queue Status</h2>
              <p className="text-xs text-slate-500">Live crowd level indicators to help you avoid peak wait times.</p>
            </div>
            <button
              onClick={() => navigate('/student/crowd')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Full Comparison</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {messes.map(mess => (
              <div
                key={mess.id}
                onClick={() => setSelectedMessId(mess.id)}
                className={`cursor-pointer p-4 rounded-2xl bg-white border-2 transition-all hover:shadow-md ${
                  selectedMessId === mess.id
                    ? 'border-blue-600 shadow-sm ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{mess.name}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {mess.code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{mess.location}</p>
                  </div>
                  <CrowdBadge level={mess.crowdLevel} waitMinutes={mess.estimatedWaitMinutes} />
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <div className="flex items-center gap-4">
                    <span>
                      Queue: <strong className="text-slate-900">{mess.currentQueue}</strong> students
                    </span>
                    <span>
                      Peak: <strong className="text-slate-700">{mess.peakHours}</strong>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/student/book');
                    }}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Book Here</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Food Waste Awareness Card */}
          <div className="bg-gradient-to-r from-emerald-900 to-navy-900 rounded-2xl p-5 text-white shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-300 uppercase tracking-wide">Food Waste Awareness</span>
                <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Design Thinking Goal
                </span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                By choosing a <strong>Small</strong> or <strong>Regular</strong> portion before arriving at the counter, you help kitchen staff avoid over-cooking bulk vessels and prevent uneaten food from reaching the waste bin.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Today's Menu for selected mess */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Today&apos;s Mess Menu</h3>
                <p className="text-[11px] text-slate-500">{selectedMess.name}</p>
              </div>
              <Utensils className="w-4 h-4 text-blue-600" />
            </div>

            {/* Meal Switcher Buttons */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(meal => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    selectedMeal === meal
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Served Items for {selectedMeal}
              </div>
              <ul className="space-y-2">
                {currentMenuItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-100"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/student/book')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors text-center"
            >
              Reserve Slot for {selectedMeal}
            </button>
          </div>

          {/* Quick Feedback Prompt */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2">
            <h4 className="font-bold text-xs text-amber-900">Ate recently?</h4>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Help us identify which dishes cause plate waste. Share 30-second meal feedback.
            </p>
            <button
              onClick={() => navigate('/student/feedback')}
              className="text-xs font-bold text-amber-900 underline hover:text-amber-950 block pt-1"
            >
              Submit Meal Feedback &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
