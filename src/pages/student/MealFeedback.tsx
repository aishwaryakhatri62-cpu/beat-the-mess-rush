import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquareHeart,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  Utensils,
  Leaf,
  Send,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MealFeedback as MealFeedbackType } from '../../types';

export const MealFeedback: React.FC = () => {
  const { messes, submitFeedback, feedbackList, currentUser, activeBooking } = useApp();
  const navigate = useNavigate();

  const [selectedMessId, setSelectedMessId] = useState(activeBooking?.messId || messes[0]?.id || 'mess-north');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner'>(activeBooking?.mealType || 'Lunch');
  const [foodQuality, setFoodQuality] = useState(4);
  const [tasteRating, setTasteRating] = useState(4);
  const [portionSatisfaction, setPortionSatisfaction] = useState<'Too Small' | 'Just Right' | 'Too Large'>('Just Right');
  const [leftUneaten, setLeftUneaten] = useState(false);
  const [leftoverReason, setLeftoverReason] = useState<MealFeedbackType['leftoverReason']>('Portion was too large');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedMess = messes.find(m => m.id === selectedMessId) || messes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      bookingId: activeBooking?.id || `LPU-WALKIN-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: currentUser.name,
      studentReg: currentUser.regNo,
      messId: selectedMessId,
      messName: selectedMess.name,
      mealType,
      foodQuality,
      tasteRating,
      portionSatisfaction,
      leftUneaten,
      leftoverReason: leftUneaten ? leftoverReason : undefined,
      suggestions
    });

    setSubmitted(true);
    setSuggestions('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Post-Meal Feedback</h1>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            Waste Reduction Signal
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Your feedback tells kitchen supervisors which dishes were enjoyed and why food ended up on the scrap tray, helping refine preparation recipes and portions.
        </p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 font-semibold text-xs shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Thank you! Your feedback has been logged in the mess analytics repository.</span>
        </div>
      )}

      {/* Main Feedback Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Mess and Meal Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Dining Mess
            </label>
            <select
              value={selectedMessId}
              onChange={e => setSelectedMessId(e.target.value)}
              className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {messes.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Meal Period
            </label>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {(['Breakfast', 'Lunch', 'Dinner'] as const).map(meal => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setMealType(meal)}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mealType === meal
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Star Ratings: Quality & Taste */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Food Quality */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Food Freshness & Quality
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFoodQuality(val)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      val <= foodQuality
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">{foodQuality} / 5</span>
            </div>
          </div>

          {/* Taste Rating */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <label className="block text-xs font-bold text-slate-700">
              Taste & Flavor Satisfaction
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTasteRating(val)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      val <= tasteRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">{tasteRating} / 5</span>
            </div>
          </div>
        </div>

        {/* Portion Satisfaction */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            How was the served portion quantity?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Too Small', 'Just Right', 'Too Large'] as const).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPortionSatisfaction(p)}
                className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold transition-all text-center ${
                  portionSatisfaction === p
                    ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Uneaten Food & Leftover Reasons */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-amber-950 block">Did you leave food uneaten on your plate?</span>
              <span className="text-[11px] text-amber-800">Crucial metric for the INT335 food waste study</span>
            </div>

            <div className="flex items-center bg-white p-1 rounded-xl border border-amber-300 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLeftUneaten(false)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  !leftUneaten ? 'bg-emerald-600 text-white' : 'text-slate-600'
                }`}
              >
                No Waste
              </button>
              <button
                type="button"
                onClick={() => setLeftUneaten(true)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  leftUneaten ? 'bg-rose-600 text-white' : 'text-slate-600'
                }`}
              >
                Yes, Leftovers
              </button>
            </div>
          </div>

          {leftUneaten && (
            <div className="space-y-2 pt-2 border-t border-amber-200">
              <label className="block text-xs font-bold text-amber-900">
                Primary reason why food was left uneaten:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Portion was too large',
                  'Food quality was poor',
                  'Taste was not satisfactory',
                  'Student was full',
                  'Other reason'
                ].map(reason => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setLeftoverReason(reason as any)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                      leftoverReason === reason
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold'
                        : 'bg-white border-amber-200 text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    &bull; {reason}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Written Suggestions */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Written Comments or Recommendations (Optional)
          </label>
          <textarea
            rows={3}
            value={suggestions}
            onChange={e => setSuggestions(e.target.value)}
            placeholder="e.g. Rice ladle scoop was too large, or paneer gravy was too salty today..."
            className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-101"
        >
          <Send className="w-4 h-4" />
          <span>Submit Anonymous Meal Feedback</span>
        </button>
      </form>

      {/* Submitted Feedbacks Log */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Recent Student Community Feedback</h3>
        <div className="space-y-2">
          {feedbackList.slice(0, 5).map(fb => (
            <div key={fb.id} className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-bold text-slate-800">{fb.messName} &bull; {fb.mealType}</span>
                <span>{fb.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700">Quality: {fb.foodQuality}/5</span>
                <span className="font-semibold text-slate-700">Taste: {fb.tasteRating}/5</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  fb.leftUneaten ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {fb.leftUneaten ? `Leftover: ${fb.leftoverReason}` : 'Zero Plate Waste'}
                </span>
              </div>
              {fb.suggestions && (
                <p className="text-slate-600 italic bg-slate-50 p-2 rounded-lg">&ldquo;{fb.suggestions}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
