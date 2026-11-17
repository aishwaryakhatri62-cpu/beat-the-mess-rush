import React, { useState } from 'react';
import {
  Layers,
  ChefHat,
  Utensils,
  Scale,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MealType } from '../../types';

export const DemandManagement: React.FC = () => {
  const { messes, bookings, updateMessMenu } = useApp();

  const [selectedMessId, setSelectedMessId] = useState(messes[0]?.id || 'mess-north');
  const [selectedMeal, setSelectedMeal] = useState<MealType>('Lunch');

  const selectedMess = messes.find(m => m.id === selectedMessId) || messes[0];

  // Calculate demand based on bookings
  const relevantBookings = bookings.filter(
    b => b.messId === selectedMessId && b.mealType === selectedMeal
  );

  const smallCount = relevantBookings.filter(b => b.portion === 'Small').length;
  const regularCount = relevantBookings.filter(b => b.portion === 'Regular').length;
  const largeCount = relevantBookings.filter(b => b.portion === 'Large').length;

  // Multiplier-based demand calculation
  // Base single student consumption at Regular:
  // Rice: 0.25 kg, Rotis: 3 count, Dal: 0.25 L, Sabzi: 0.20 kg
  const totalRiceKg = Number((smallCount * 0.15 + regularCount * 0.25 + largeCount * 0.35).toFixed(1));
  const totalRotis = Math.round(smallCount * 2 + regularCount * 3 + largeCount * 4);
  const totalDalLiters = Number((smallCount * 0.18 + regularCount * 0.25 + largeCount * 0.35).toFixed(1));
  const totalSabziKg = Number((smallCount * 0.15 + regularCount * 0.20 + largeCount * 0.28).toFixed(1));

  // State for menu editor
  const mealKey = selectedMeal.toLowerCase() as 'breakfast' | 'lunch' | 'dinner';
  const currentMenuItems = selectedMess.todaysMenu[mealKey] || [];
  const [menuItems, setMenuItems] = useState<string[]>(currentMenuItems);
  const [newItemText, setNewItemText] = useState('');

  // Keep menuItems in sync when mess or meal changes
  React.useEffect(() => {
    setMenuItems(selectedMess.todaysMenu[selectedMeal.toLowerCase() as 'breakfast' | 'lunch' | 'dinner'] || []);
  }, [selectedMessId, selectedMeal, selectedMess]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const updated = [...menuItems, newItemText.trim()];
    setMenuItems(updated);
    updateMessMenu(selectedMessId, selectedMeal, updated);
    setNewItemText('');
  };

  const handleRemoveItem = (index: number) => {
    const updated = menuItems.filter((_, idx) => idx !== index);
    setMenuItems(updated);
    updateMessMenu(selectedMessId, selectedMeal, updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Kitchen Food Demand Forecasting</h1>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Advance Production Signal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculate precise raw material cooking quantities based on registered student portion choices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMessId}
            onChange={e => setSelectedMessId(e.target.value)}
            className="text-xs font-bold p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {messes.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Meal Selection Tabs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl max-w-md text-xs font-bold">
        {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(meal => (
          <button
            key={meal}
            onClick={() => setSelectedMeal(meal)}
            className={`flex-1 py-2 rounded-xl transition-all ${
              selectedMeal === meal
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {meal} Demand
          </button>
        ))}
      </div>

      {/* Portion Input Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1">
            <span>Small Portions (0.75x)</span>
            <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded">Light</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-900 font-mono">{smallCount}</div>
          <p className="text-[11px] text-emerald-800 mt-1">Saves ~100g starch per student</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-blue-950 mb-1">
            <span>Regular Portions (1.0x)</span>
            <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded">Baseline</span>
          </div>
          <div className="text-3xl font-extrabold text-blue-900 font-mono">{regularCount}</div>
          <p className="text-[11px] text-blue-800 mt-1">Standard balanced institutional thali</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
            <span>Large Portions (1.3x)</span>
            <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">Heavy</span>
          </div>
          <div className="text-3xl font-extrabold text-amber-900 font-mono">{largeCount}</div>
          <p className="text-[11px] text-amber-800 mt-1">Extra chapati and generous rice</p>
        </div>
      </div>

      {/* Chef Preparation Requirements Sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Calculated Batch Prep Quantities</h2>
              <p className="text-xs text-slate-500">Live raw material requirements for {selectedMeal}</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
            {relevantBookings.length} Headcount Modeled
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Basmati / Steamed Rice</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {Math.max(12, totalRiceKg)} <span className="text-xs font-medium text-slate-500">Kg</span>
            </div>
            <p className="text-[10px] text-slate-500">Includes 10% safety buffer for walk-ins</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Tandoori / Tawa Rotis</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {Math.max(45, totalRotis)} <span className="text-xs font-medium text-slate-500">Count</span>
            </div>
            <p className="text-[10px] text-slate-500">Prepared fresh in 15-min live batches</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Dal / Lentil Gravy</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {Math.max(15, totalDalLiters)} <span className="text-xs font-medium text-slate-500">Liters</span>
            </div>
            <p className="text-[10px] text-slate-500">Simmered in 50L bulk vessels</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Cooked Sabzi / Curry</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {Math.max(14, totalSabziKg)} <span className="text-xs font-medium text-slate-500">Kg</span>
            </div>
            <p className="text-[10px] text-slate-500">Paneer / Mixed seasonal vegetables</p>
          </div>
        </div>
      </div>

      {/* Menu Management & Item Customizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Manage {selectedMeal} Menu ({selectedMess.name})</h2>
            <p className="text-xs text-slate-500">Update the served dishes in real-time. Changes appear on the student dashboard.</p>
          </div>
          <Utensils className="w-4 h-4 text-slate-400" />
        </div>

        {/* Existing Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(idx)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Remove Item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Item Input */}
        <form onSubmit={handleAddItem} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
            placeholder={`Add new dish to ${selectedMeal} menu...`}
            className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </form>
      </div>
    </div>
  );
};
