import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  CalendarCheck,
  Clock,
  User,
  Utensils,
  MapPin,
  CheckCircle2,
  Printer,
  RotateCcw,
  MessageSquareHeart,
  AlertCircle,
  Hash,
  Home,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigitalPass: React.FC = () => {
  const { activeBooking, bookings, cancelBooking, markMealCollected, currentUser } = useApp();
  const navigate = useNavigate();

  // Find the primary booking to display (either current active or most recent)
  const booking = activeBooking || bookings.find(b => b.studentReg === currentUser.regNo) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <QrCode className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No Active Meal Pass Found</h2>
        <p className="text-xs text-slate-500">
          You don&apos;t have any confirmed meal bookings right now. Reserve a staggered time slot to get your digital pass.
        </p>
        <button
          onClick={() => navigate('/student/book')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Book Meal Slot Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Digital Meal Pass</h1>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                booking.status === 'CONFIRMED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : booking.status === 'COLLECTED'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {booking.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Present this scannable token at the mess entrance or express counter during your 15-minute slot.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors border border-slate-300"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>

      {/* Main Boarding-Card Style Digital Meal Pass */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden print:border-black print:shadow-none">
        {/* Pass Header Band */}
        <div className="bg-navy-800 text-white p-6 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold bg-blue-600 px-2 py-0.5 rounded text-white tracking-wider uppercase">
                  LPU MESS PASS
                </span>
                <span className="text-xs text-blue-200 font-semibold">INT335 PROTOTYPE</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-1">{booking.messName}</h2>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Express Staggered Serving Counter</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">PASS ID</span>
              <span className="text-lg font-mono font-extrabold text-amber-400">{booking.id}</span>
            </div>
          </div>
        </div>

        {/* Slot Window Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-semibold">Reserved Slot Window:</span>
            <span className="font-extrabold text-sm">{booking.timeWindow}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-lg text-xs font-bold">
            <Utensils className="w-3 h-3 text-white" />
            <span>{booking.mealType}</span>
          </div>
        </div>

        {/* Pass Details Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Student & Booking Metadata */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  STUDENT NAME & REGISTRATION
                </span>
                <div className="font-bold text-base text-slate-900">{booking.studentName}</div>
                <div className="text-xs text-slate-500 font-mono">Reg: {booking.studentReg}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    HOSTEL RESIDENCE
                  </span>
                  <div className="font-semibold text-xs text-slate-800">{booking.studentHostel}</div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    DATE
                  </span>
                  <div className="font-semibold text-xs text-slate-800">{booking.date}</div>
                </div>
              </div>

              {/* Portion Preference Highlight */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  PORTION PREFERENCE
                </span>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-extrabold text-sm px-3 py-1 rounded-lg ${
                      booking.portion === 'Small'
                        ? 'bg-emerald-100 text-emerald-800'
                        : booking.portion === 'Regular'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {booking.portion} Portion
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {booking.portion === 'Small'
                      ? '2 Rotis + 150g Rice'
                      : booking.portion === 'Regular'
                      ? '3 Rotis + 250g Rice'
                      : '4 Rotis + 350g Rice'}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200">
                <QRCodeSVG
                  value={booking.qrPayload}
                  size={140}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-3 font-semibold">
                SCAN TO VERIFY AT ENTRANCE
              </span>
              <span className="text-[9px] text-slate-400">
                Encodes: ID, RegNo, Slot, Portion
              </span>
            </div>
          </div>

          {/* Prototype Notice */}
          <div className="pt-4 border-t border-dashed border-slate-200 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> This QR code is a prototype demonstration for the INT335 Design Thinking showcase. It simulates orderly staggered gate check-in and is not connected to official LPU biometric or payment gateways.
            </p>
          </div>
        </div>

        {/* Action Bar (hidden in print) */}
        <div className="no-print bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {booking.status === 'CONFIRMED' && (
              <>
                <button
                  onClick={() => markMealCollected(booking.id)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simulate: Collect Meal</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Cancel this meal slot pass?')) {
                      cancelBooking(booking.id);
                    }
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs rounded-xl transition-colors"
                >
                  Cancel Pass
                </button>
              </>
            )}
            {booking.status === 'COLLECTED' && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Meal successfully collected!</span>
              </span>
            )}
          </div>

          <button
            onClick={() => navigate('/student/feedback')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Leave Meal Feedback &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
