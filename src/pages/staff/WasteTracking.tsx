import React, { useState } from 'react';
import {
  TrendingDown,
  Scale,
  Plus,
  Trash2,
  FileDown,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Calendar,
  Layers,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { MealType } from '../../types';

export const WasteTracking: React.FC = () => {
  const { wasteRecords, addWasteRecord, deleteWasteRecord, messes, exportCsv, currentUser } = useApp();

  const [selectedMessId, setSelectedMessId] = useState(messes[0]?.id || 'mess-north');
  const [mealType, setMealType] = useState<MealType>('Lunch');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodPreparedKg, setFoodPreparedKg] = useState(320);
  const [foodServedKg, setFoodServedKg] = useState(280);
  const [foodReturnedKg, setFoodReturnedKg] = useState(26);
  const [edibleLeftoverKg, setEdibleLeftoverKg] = useState(14);
  const [plateWasteKg, setPlateWasteKg] = useState(26);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const selectedMess = messes.find(m => m.id === selectedMessId) || messes[0];

  // Aggregate stats
  const totalPrepared = wasteRecords.reduce((acc, r) => acc + r.foodPreparedKg, 0);
  const totalWaste = wasteRecords.reduce((acc, r) => acc + r.totalWasteKg, 0);
  const avgWastePct = totalPrepared > 0 ? ((totalWaste / totalPrepared) * 100).toFixed(1) : '0';
  const totalPlateWaste = wasteRecords.reduce((acc, r) => acc + r.plateWasteKg, 0);
  const totalEdibleLeftover = wasteRecords.reduce((acc, r) => acc + r.edibleLeftoverKg, 0);

  // Chart data
  const chartData = wasteRecords.slice(0, 7).reverse().map(r => ({
    date: r.date.slice(5),
    meal: `${r.mealType.slice(0, 1)}`,
    prepared: r.foodPreparedKg,
    served: r.foodServedKg,
    waste: r.totalWasteKg,
    plateWaste: r.plateWasteKg,
    edibleLeftover: r.edibleLeftoverKg,
    wastePct: r.wastePercentage
  }));

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    addWasteRecord({
      messId: selectedMessId,
      messName: selectedMess.name,
      date,
      mealType,
      foodPreparedKg: Number(foodPreparedKg),
      foodServedKg: Number(foodServedKg),
      foodReturnedKg: Number(foodReturnedKg),
      edibleLeftoverKg: Number(edibleLeftoverKg),
      plateWasteKg: Number(plateWasteKg),
      notes: notes || 'Standard shift weighing log.',
      isVerified: true,
      enteredBy: `${currentUser.name} (Staff)`
    });

    setNotes('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Mess Food Waste Monitoring</h1>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Sustainability Metric
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track daily kitchen production vs plate-scrapings in kilograms to measure the impact of slot leveling and portion choice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCsv('waste')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Record Waste Log</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Avg Waste Rate
          </span>
          <div className="text-3xl font-extrabold text-rose-600 font-mono">
            {avgWastePct}%
          </div>
          <p className="text-[11px] text-slate-500">Target is under 8% with slots</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Waste Measured
          </span>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {totalWaste.toFixed(1)} <span className="text-sm font-normal text-slate-500">Kg</span>
          </div>
          <p className="text-[11px] text-slate-500">Across recorded observation shifts</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Plate Scrapings
          </span>
          <div className="text-3xl font-extrabold text-amber-600 font-mono">
            {totalPlateWaste.toFixed(1)} <span className="text-sm font-normal text-slate-500">Kg</span>
          </div>
          <p className="text-[11px] text-slate-500">Ruined uneaten food on trays</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Pot Leftovers (Edible)
          </span>
          <div className="text-3xl font-extrabold text-blue-600 font-mono">
            {totalEdibleLeftover.toFixed(1)} <span className="text-sm font-normal text-slate-500">Kg</span>
          </div>
          <p className="text-[11px] text-slate-500">Kitchen vessel surplus</p>
        </div>
      </div>

      {/* Log New Measurement Form Drawer */}
      {showForm && (
        <form onSubmit={handleAddLog} className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm">New Shift Food Waste Measurement</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Mess Facility</label>
              <select
                value={selectedMessId}
                onChange={e => setSelectedMessId(e.target.value)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
              >
                {messes.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Meal Period</label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value as MealType)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Food Prepared (Kg)</label>
              <input
                type="number"
                step="0.5"
                value={foodPreparedKg}
                onChange={e => setFoodPreparedKg(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Food Served (Kg)</label>
              <input
                type="number"
                step="0.5"
                value={foodServedKg}
                onChange={e => setFoodServedKg(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Pot Leftover (Kg)</label>
              <input
                type="number"
                step="0.5"
                value={edibleLeftoverKg}
                onChange={e => setEdibleLeftoverKg(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Plate Waste (Kg)</label>
              <input
                type="number"
                step="0.5"
                value={plateWasteKg}
                onChange={e => {
                  const val = parseFloat(e.target.value) || 0;
                  setPlateWasteKg(val);
                  setFoodReturnedKg(val);
                }}
                className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Shift Notes / Observations</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Rice returned heavily due to dry texture during late lunch wave..."
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Save Shift Log
            </button>
          </div>
        </form>
      )}

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Food Waste Trend Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Food Prepared vs Discarded (Kg)</h3>
              <p className="text-[11px] text-slate-500">Historical shift measurements</p>
            </div>
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="prepared" name="Prepared (Kg)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="waste" name="Total Waste (Kg)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Breakdown: Plate vs Pot Leftovers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Waste Source: Plate vs Pot Leftover</h3>
              <p className="text-[11px] text-slate-500">Differentiates portion waste from kitchen overproduction</p>
            </div>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="plateWaste" name="Plate Waste (Kg)" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="edibleLeftover" name="Pot Leftover (Kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Shift Log Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Shift Weighing Audit Table</h3>
            <p className="text-xs text-slate-500">Verified weights recorded on campus dining scales</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">{wasteRecords.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Date & Shift</th>
                <th className="py-2.5 px-3">Mess Facility</th>
                <th className="py-2.5 px-3">Prepared</th>
                <th className="py-2.5 px-3">Pot Leftover</th>
                <th className="py-2.5 px-3">Plate Waste</th>
                <th className="py-2.5 px-3">Total Waste</th>
                <th className="py-2.5 px-3">Waste %</th>
                <th className="py-2.5 px-3">Supervisor Notes</th>
                <th className="py-2.5 px-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {wasteRecords.map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 text-slate-900 font-semibold">
                    {r.date} <span className="text-slate-400">({r.mealType})</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{r.messName}</td>
                  <td className="py-2.5 px-3 font-mono">{r.foodPreparedKg} kg</td>
                  <td className="py-2.5 px-3 font-mono text-blue-600">{r.edibleLeftoverKg} kg</td>
                  <td className="py-2.5 px-3 font-mono text-amber-600">{r.plateWasteKg} kg</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-600">{r.totalWasteKg} kg</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      r.wastePercentage >= 15 ? 'bg-rose-100 text-rose-800' :
                      r.wastePercentage >= 10 ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {r.wastePercentage}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 max-w-xs truncate" title={r.notes}>{r.notes}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => deleteWasteRecord(r.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
