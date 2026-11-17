import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CalendarCheck,
  Clock,
  Utensils,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Info,
  ChevronRight,
  ShieldAlert,
  Leaf,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MealType, PortionSize } from '../../types';
import { CrowdBadge } from '../../components/common/CrowdBadge';

export const MealBooking: React.FC = () => {
  const { messes, slots, createBooking, activeBooking } = useApp();
  const navigate = useNavigate();

  const [selectedMessId, setSelectedMessId] = useState(messes[0]?.id || 'mess-north');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Lunch');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [selectedPortion, setSelectedPortion] = useState<PortionSize>('Regular');
  const [dietaryPref, setDietaryPref] = useState('Standard Vegetarian');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentMess = messes.find(m => m.id === selectedMessId) || messes[0];

  // Available slots for selected mess & meal
  const availableSlots = slots.filter(
    s => s.messId === selectedMessId && s.mealType === selectedMeal
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedSlotId) {
      setErrorMessage('Please select a 15-minute time slot.');
      return;
    }

    setIsSubmitting(true);
    const result = createBooking(selectedMessId, selectedMeal, selectedSlotId, selectedPortion, dietaryPref);
    setIsSubmitting(false);

    if (result.success) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore confetti errors
      }
      navigate('/student/pass');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Smart Meal Slot Booking</h1>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Staggered Scheduling
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Lock in a guaranteed 15-minute serving window and choose your food portion to help the kitchen prepare the exact amount needed.
        </p>
      </div>

      {/* Warning if already holding an active pass */}
      {activeBooking && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <span className="font-bold">Active Booking in Progress:</span> You already have an active pass ({activeBooking.id}) for {activeBooking.mealType} at {activeBooking.messName}.
            <div className="pt-1">
              <button
                type="button"
                onClick={() => navigate('/student/pass')}
                className="font-bold underline text-amber-950 hover:text-black"
              >
                View Existing Pass &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 text-xs text-rose-800 font-semibold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleBookingSubmit} className="space-y-8">
        {/* Step 1: Select Mess */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold text-slate-900">Select Campus Mess</h2>
            </div>
            <span className="text-[11px] text-slate-400">Step 1 of 4</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {messes.map(mess => (
              <div
                key={mess.id}
                onClick={() => {
                  setSelectedMessId(mess.id);
                  setSelectedSlotId('');
                }}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                  selectedMessId === mess.id
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-900">{mess.name}</span>
                    <CrowdBadge level={mess.crowdLevel} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500">{mess.location}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span>Queue: {mess.currentQueue}</span>
                  <span className="text-blue-600">~{mess.estimatedWaitMinutes}m wait</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Select Meal Category */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-slate-900">Select Meal Category</h2>
            </div>
            <span className="text-[11px] text-slate-400">Step 2 of 4</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(meal => (
              <button
                key={meal}
                type="button"
                onClick={() => {
                  setSelectedMeal(meal);
                  setSelectedSlotId('');
                }}
                className={`py-3 px-4 rounded-xl border-2 font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  selectedMeal === meal
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{meal}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Choose 15-Minute Staggered Slot */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Choose 15-Minute Staggered Slot</h2>
                <p className="text-[11px] text-slate-500">
                  Each slot is capacity-capped to prevent overcrowding. Full slots are automatically locked.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">Step 3 of 4</span>
          </div>

          {availableSlots.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-xl text-xs text-slate-500">
              No slots scheduled for this meal period at the selected mess.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map(slot => {
                const isFull = slot.bookedCount >= slot.maxCapacity;
                const isSelected = selectedSlotId === slot.id;
                const percent = Math.round((slot.bookedCount / slot.maxCapacity) * 100);

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isFull}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all relative ${
                      isFull
                        ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200'
                        : isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-200 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{slot.timeWindow}</span>
                      </div>
                      {isFull ? (
                        <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                          FULL
                        </span>
                      ) : slot.isPeak ? (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                          Peak Wave
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          Available
                        </span>
                      )}
                    </div>

                    {/* Capacity Indicator Bar */}
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>Booked</span>
                        <span>{slot.bookedCount} / {slot.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percent >= 100
                              ? 'bg-rose-500'
                              : percent >= 75
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 4: Portion Selection & Anti-Waste Commitment */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Select Food Portion Size</h2>
                <p className="text-[11px] text-slate-500">
                  Pre-committing your portion tells the kitchen how much to prepare, preventing plate waste.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400">Step 4 of 4</span>
          </div>

          {/* Portion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Small */}
            <div
              onClick={() => setSelectedPortion('Small')}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                selectedPortion === 'Small'
                  ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-200 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-slate-900">Small Portion</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Light Appetite
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Ideal for light eaters or when you aren&apos;t very hungry.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">&bull; 2 Chapatis / Rotis</div>
                <div>&bull; 1 small katori rice (~150g)</div>
                <div>&bull; 1 katori dal & sabzi</div>
              </div>
            </div>

            {/* Regular */}
            <div
              onClick={() => setSelectedPortion('Regular')}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                selectedPortion === 'Regular'
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-200 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-slate-900">Regular Portion</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Standard Meal
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Standard balanced student meal portion.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">&bull; 3 Chapatis / Rotis</div>
                <div>&bull; 1 standard katori rice (~250g)</div>
                <div>&bull; Full dal, sabzi & raita</div>
              </div>
            </div>

            {/* Large */}
            <div
              onClick={() => setSelectedPortion('Large')}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                selectedPortion === 'Large'
                  ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-200 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-slate-900">Large Portion</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Hearty Appetite
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                For heavy workouts, sports days, or high appetite.
              </p>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">&bull; 4 Chapatis / Rotis</div>
                <div>&bull; Extra scoop rice (~350g)</div>
                <div>&bull; Generous curry & salad</div>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Why portion selection matters:</strong> In our field research at North Mess, 68% of returned plate waste consisted of excess rice forced on light eaters by fixed-ladle scoops. Selecting your portion upfront stops food waste at the source!
            </div>
          </div>
        </div>

        {/* Submit Booking Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            By confirming, your digital pass with scannable QR code will be generated instantly.
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !selectedSlotId}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              !selectedSlotId
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/30 hover:scale-102'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Confirm & Generate Meal Pass</span>
          </button>
        </div>
      </form>
    </div>
  );
};
