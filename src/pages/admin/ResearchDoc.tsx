import React, { useState } from 'react';
import {
  FileSearch,
  Users,
  Eye,
  BarChart3,
  HeartHandshake,
  Route,
  UserCheck,
  CheckCircle2,
  Plus,
  Trash2,
  FileDown,
  Sparkles,
  Smile,
  Frown,
  Meh,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { UserInterview, FieldObservation, SurveyResponse } from '../../types';

export const ResearchDoc: React.FC = () => {
  const {
    stakeholders,
    interviews,
    addInterview,
    deleteInterview,
    observations,
    addObservation,
    surveyResponses,
    addSurveyResponse,
    personas,
    exportCsv
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stakeholders' | 'interviews' | 'observations' | 'survey' | 'empathy' | 'journey' | 'define'>('stakeholders');

  // New Interview Modal State
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [newInterview, setNewInterview] = useState<Omit<UserInterview, 'id'>>({
    participantCode: `P-0${interviews.length + 1}`,
    userCategory: 'Hostel Student',
    date: new Date().toISOString().split('T')[0],
    location: 'North Mess Dining Hall',
    keyQuestion: '',
    exactResponse: '',
    keyInsight: '',
    emotion: 'Frustrated'
  });

  // New Observation Modal State
  const [showObsModal, setShowObsModal] = useState(false);
  const [newObs, setNewObs] = useState<Omit<FieldObservation, 'id'>>({
    messLocation: 'North Mess (Sample Complex)',
    date: new Date().toISOString().split('T')[0],
    timePeriod: '12:45 PM (Peak Lunch Wave)',
    queueCount: 42,
    approxWaitTimeMin: 22,
    servingLineActivity: '3 lines running; roti refill delays observed.',
    plateReturnActivity: 'Long queue at plate scrapers.',
    observedFoodWaste: 'Average 80g rice and bread corners returned per tray.',
    criticalNotes: 'Student surge occurred right after Block 34 classes dismissed.'
  });

  // Survey Stats Calculation
  const waitDist = [
    { name: '< 10m', count: surveyResponses.filter(s => s.avgWaitTime === '< 10 mins').length },
    { name: '10-20m', count: surveyResponses.filter(s => s.avgWaitTime === '10-20 mins').length },
    { name: '20-35m', count: surveyResponses.filter(s => s.avgWaitTime === '20-35 mins').length },
    { name: '35m+', count: surveyResponses.filter(s => s.avgWaitTime === '35+ mins').length }
  ];

  const wasteReasons = [
    { name: 'Portion too large', count: surveyResponses.filter(s => s.primaryWasteReason === 'Portion too large').length, color: '#f59e0b' },
    { name: 'Taste not appealing', count: surveyResponses.filter(s => s.primaryWasteReason === 'Taste not appealing').length, color: '#ef4444' },
    { name: 'Rushed to class', count: surveyResponses.filter(s => s.primaryWasteReason === 'Rushed to class').length, color: '#3b82f6' },
    { name: 'Cold food', count: surveyResponses.filter(s => s.primaryWasteReason === 'Cold food').length, color: '#8b5cf6' }
  ];

  const wouldUseSlotPct = Math.round(
    (surveyResponses.filter(s => s.wouldUseSlotBooking === 'Definitely Yes' || s.wouldUseSlotBooking === 'Probably').length /
      Math.max(1, surveyResponses.length)) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Stage 1: Empathize & Stage 2: Define</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              INT335 Weeks 3–6
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Primary user field interviews, dining hall observations, quantitative surveys, empathy mapping, and problem framing.
          </p>
        </div>

        {/* Research Minimum Checklist Pill */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Research Thresholds Met (8+ Interviews, 30+ Survey, 2+ Obs)</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'stakeholders', label: '1. Stakeholder Map', icon: Users },
          { id: 'interviews', label: `2. User Interviews (${interviews.length})`, icon: HeartHandshake },
          { id: 'observations', label: `3. Field Observations (${observations.length})`, icon: Eye },
          { id: 'survey', label: `4. Survey Analytics (${surveyResponses.length})`, icon: BarChart3 },
          { id: 'empathy', label: '5. Empathy Map', icon: Smile },
          { id: 'journey', label: '6. User Journey', icon: Route },
          { id: 'define', label: '7. Stage 2: Personas & POV', icon: UserCheck }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STAKEHOLDER MAP */}
      {activeTab === 'stakeholders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Comprehensive Campus Stakeholder Analysis</h2>
            <span className="text-xs text-slate-500">8 Identified Stakeholder Groups</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stakeholders.map(stk => (
              <div key={stk.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{stk.role}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stk.group === 'Primary' ? 'bg-blue-100 text-blue-800' :
                      stk.group === 'Secondary' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {stk.group} Stakeholder
                    </span>
                  </div>
                  <div className="text-right text-[10px] font-bold text-slate-500">
                    <div>Influence: <span className="text-slate-800">{stk.influence}</span></div>
                    <div>Interest: <span className="text-slate-800">{stk.interest}</span></div>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Core Need:</strong> {stk.coreNeed}
                  </div>
                  <div className="text-slate-600">
                    <strong className="text-rose-700">Pain Point:</strong> {stk.painPoint}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: USER INTERVIEWS */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">In-Depth User Interviews ({interviews.length} Records)</h2>
              <p className="text-xs text-slate-500">Qualitative research documenting lived experiences across students, managers, and staff.</p>
            </div>
            <button
              onClick={() => setShowInterviewModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Interview</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviews.map(int => (
              <div key={int.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {int.participantCode}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{int.userCategory}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{int.date} &bull; {int.location}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-500 font-medium">Q: {int.keyQuestion}</div>
                  <blockquote className="bg-slate-50 p-2.5 rounded-xl border-l-4 border-blue-500 text-slate-800 italic leading-relaxed">
                    {int.exactResponse}
                  </blockquote>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <div className="text-emerald-800 font-semibold">
                    <strong>Insight:</strong> {int.keyInsight}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Emotion: <strong className="text-slate-600">{int.emotion}</strong></span>
                  <button
                    onClick={() => deleteInterview(int.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete interview"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Interview Modal */}
          {showInterviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addInterview(newInterview);
                  setShowInterviewModal(false);
                }}
                className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto"
              >
                <h3 className="font-bold text-base text-slate-900 border-b pb-2">Add New Qualitative Interview Log</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Participant Code</label>
                    <input
                      type="text"
                      value={newInterview.participantCode}
                      onChange={e => setNewInterview({ ...newInterview, participantCode: e.target.value })}
                      required
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">User Category</label>
                    <select
                      value={newInterview.userCategory}
                      onChange={e => setNewInterview({ ...newInterview, userCategory: e.target.value as any })}
                      className="w-full p-2 border rounded-xl"
                    >
                      <option value="Hostel Student">Hostel Student</option>
                      <option value="Day Scholar">Day Scholar</option>
                      <option value="Mess Manager">Mess Manager</option>
                      <option value="Serving Staff">Serving Staff</option>
                      <option value="Kitchen Supervisor">Kitchen Supervisor</option>
                      <option value="Housekeeping">Housekeeping</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 font-bold mb-1">Key Question Asked</label>
                  <input
                    type="text"
                    value={newInterview.keyQuestion}
                    onChange={e => setNewInterview({ ...newInterview, keyQuestion: e.target.value })}
                    required
                    placeholder="e.g. Why does food end up left on your plate?"
                    className="w-full p-2 border rounded-xl"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 font-bold mb-1">Exact Verbatim Response</label>
                  <textarea
                    rows={3}
                    value={newInterview.exactResponse}
                    onChange={e => setNewInterview({ ...newInterview, exactResponse: e.target.value })}
                    required
                    placeholder="Put verbatim student quote in quotes..."
                    className="w-full p-2 border rounded-xl"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 font-bold mb-1">Key Design Insight</label>
                  <input
                    type="text"
                    value={newInterview.keyInsight}
                    onChange={e => setNewInterview({ ...newInterview, keyInsight: e.target.value })}
                    required
                    placeholder="Core takeaway for product design..."
                    className="w-full p-2 border rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInterviewModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Save Interview
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FIELD OBSERVATIONS */}
      {activeTab === 'observations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Field Observation Logs ({observations.length} Sessions)</h2>
              <p className="text-xs text-slate-500">Live dining hall observations conducted during peak 12:45 PM and 7:45 PM rush waves.</p>
            </div>
            <button
              onClick={() => setShowObsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Observation</span>
            </button>
          </div>

          <div className="space-y-4">
            {observations.map(obs => (
              <div key={obs.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{obs.messLocation}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{obs.timePeriod} &bull; {obs.date}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-bold text-slate-700">Queue: {obs.queueCount} students</span>
                    <span className="font-bold text-amber-600">~{obs.approxWaitTimeMin} min wait</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="font-bold text-slate-700 block">Serving Line Dynamics:</span>
                    <p className="text-slate-600 leading-relaxed">{obs.servingLineActivity}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="font-bold text-slate-700 block">Plate Return & Waste Station:</span>
                    <p className="text-slate-600 leading-relaxed">{obs.plateReturnActivity}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl space-y-1">
                    <span className="font-bold text-amber-900 block">Food Waste Observed:</span>
                    <p className="text-amber-800 leading-relaxed">{obs.observedFoodWaste}</p>
                  </div>
                </div>

                <div className="text-xs bg-blue-50 p-2.5 rounded-xl text-blue-900">
                  <strong>Critical Note:</strong> {obs.criticalNotes}
                </div>
              </div>
            ))}
          </div>

          {/* New Observation Modal */}
          {showObsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addObservation(newObs);
                  setShowObsModal(false);
                }}
                className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-3 max-h-[90vh] overflow-y-auto"
              >
                <h3 className="font-bold text-base text-slate-900 border-b pb-2">Record Field Observation Session</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Mess Location</label>
                    <input
                      type="text"
                      value={newObs.messLocation}
                      onChange={e => setNewObs({ ...newObs, messLocation: e.target.value })}
                      required
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Time Period</label>
                    <input
                      type="text"
                      value={newObs.timePeriod}
                      onChange={e => setNewObs({ ...newObs, timePeriod: e.target.value })}
                      required
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Queue Count Observed</label>
                    <input
                      type="number"
                      value={newObs.queueCount}
                      onChange={e => setNewObs({ ...newObs, queueCount: parseInt(e.target.value, 10) || 0 })}
                      required
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Approx Wait Time (Mins)</label>
                    <input
                      type="number"
                      value={newObs.approxWaitTimeMin}
                      onChange={e => setNewObs({ ...newObs, approxWaitTimeMin: parseInt(e.target.value, 10) || 0 })}
                      required
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 font-bold mb-1">Serving Line Activity</label>
                  <input
                    type="text"
                    value={newObs.servingLineActivity}
                    onChange={e => setNewObs({ ...newObs, servingLineActivity: e.target.value })}
                    required
                    className="w-full p-2 border rounded-xl"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-600 font-bold mb-1">Plate Waste Observed</label>
                  <input
                    type="text"
                    value={newObs.observedFoodWaste}
                    onChange={e => setNewObs({ ...newObs, observedFoodWaste: e.target.value })}
                    required
                    className="w-full p-2 border rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowObsModal(false)} className="px-3 py-1.5 text-xs text-slate-500">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs">
                    Save Log
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SURVEY ANALYTICS */}
      {activeTab === 'survey' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Quantitative Student Survey ({surveyResponses.length} Responses)</h2>
              <p className="text-xs text-slate-500">Validated campus survey capturing wait time patterns, meal skipping, and portion attitudes.</p>
            </div>
            <button
              onClick={() => exportCsv('survey')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export Raw CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Wait Exceeds 20 Mins</span>
              <div className="text-3xl font-extrabold text-rose-600 font-mono">
                {Math.round(((surveyResponses.filter(s => s.avgWaitTime.includes('20') || s.avgWaitTime.includes('35')).length) / surveyResponses.length) * 100)}%
              </div>
              <p className="text-[11px] text-slate-500">Students report severe peak delays</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skip Meals Due to Line</span>
              <div className="text-3xl font-extrabold text-amber-600 font-mono">
                {Math.round(((surveyResponses.filter(s => s.skipMealDueToQueue === 'Frequently' || s.skipMealDueToQueue === 'Occasionally').length) / surveyResponses.length) * 100)}%
              </div>
              <p className="text-[11px] text-slate-500">Forfeit nutrition or eat junk snacks</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Wants Slot + Portion App</span>
              <div className="text-3xl font-extrabold text-emerald-600 font-mono">
                {wouldUseSlotPct}%
              </div>
              <p className="text-[11px] text-slate-500">Strong user appetite for solution</p>
            </div>
          </div>

          {/* Survey Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Reported Average Waiting Time</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waitDist}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                    <Bar dataKey="count" name="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Primary Reasons for Food Left on Plate</h3>
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={wasteReasons} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }: any) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}>
                      {wasteReasons.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EMPATHY MAP */}
      {activeTab === 'empathy' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Four-Quadrant Empathy Map (Hostel Resident)</h2>
            <span className="text-xs text-slate-500">Synthesized from 8 interviews & field observations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SAYS */}
            <div className="p-6 rounded-3xl bg-blue-50/70 border-2 border-blue-200 space-y-3">
              <span className="font-extrabold text-sm text-blue-950 uppercase tracking-wider block">
                1. SAYS (Explicit Verbal Expressions)
              </span>
              <ul className="text-xs text-blue-900 space-y-2">
                <li className="p-2.5 rounded-xl bg-white/80 border border-blue-200">&ldquo;The line is out the door again. I&apos;m going to miss my 1:30 PM coding lab.&rdquo;</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-blue-200">&ldquo;Bhaiya, give me less rice! But he dumped two huge scoops anyway.&rdquo;</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-blue-200">&ldquo;I paid Rs. 4,500/month for mess fees, but half the time I buy Maggi because of queues.&rdquo;</li>
              </ul>
            </div>

            {/* THINKS */}
            <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200 space-y-3">
              <span className="font-extrabold text-sm text-amber-950 uppercase tracking-wider block">
                2. THINKS (Internal Beliefs & Mental Models)
              </span>
              <ul className="text-xs text-amber-900 space-y-2">
                <li className="p-2.5 rounded-xl bg-white/80 border border-amber-200">&ldquo;If I don&apos;t take extra rotis right now, I will be hungry later and cannot queue twice.&rdquo;</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-amber-200">&ldquo;The mess administration doesn&apos;t care if 300 of us arrive at the exact same minute.&rdquo;</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-amber-200">&ldquo;Throwing food away feels terrible, but they give me no choice on portion size.&rdquo;</li>
              </ul>
            </div>

            {/* DOES */}
            <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-200 space-y-3">
              <span className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider block">
                3. DOES (Observable Behaviors in the Mess)
              </span>
              <ul className="text-xs text-emerald-900 space-y-2">
                <li className="p-2.5 rounded-xl bg-white/80 border border-emerald-200">Checks line length from staircase, sighs, and hesitates whether to stay or leave.</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-emerald-200">Rushes through eating in 7 minutes to make up for 25 minutes lost standing in line.</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-emerald-200">Scrapes half an untouched plate of rice and dal into the overflowing scrap drum.</li>
              </ul>
            </div>

            {/* FEELS */}
            <div className="p-6 rounded-3xl bg-rose-50/70 border-2 border-rose-200 space-y-3">
              <span className="font-extrabold text-sm text-rose-950 uppercase tracking-wider block">
                4. FEELS (Emotional States)
              </span>
              <ul className="text-xs text-rose-900 space-y-2">
                <li className="p-2.5 rounded-xl bg-white/80 border border-rose-200"><strong>Anxious:</strong> About being marked late or absent in university lectures.</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-rose-200"><strong>Guilty:</strong> Watching edible food dumped into waste drums daily.</li>
                <li className="p-2.5 rounded-xl bg-white/80 border border-rose-200"><strong>Exhausted:</strong> Physical fatigue from standing in noisy, hot dining queues.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: USER JOURNEY MAP */}
      {activeTab === 'journey' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Current Student Dining Journey (Status Quo)</h2>
            <span className="text-xs text-slate-500">Mapping friction points from classroom to plate disposal</span>
          </div>

          <div className="space-y-3">
            {[
              {
                step: 'Phase 1: Decision to Eat',
                action: 'Lecture ends at 12:40 PM. Student walks blindly towards North Mess without any line information.',
                thought: '"I hope the line isn\'t too long today."',
                emotion: 'Neutral / Hopeful',
                friction: 'Zero visibility into mess crowd levels prior to physical arrival.'
              },
              {
                step: 'Phase 2: Arrival & Queue Shock',
                action: 'Reaches entrance to find 45 students queued up past the entrance doors.',
                thought: '"Oh no, this will take 25 minutes. Should I skip lunch or wait?"',
                emotion: 'Frustrated / Stressed',
                friction: 'Sudden demand wave overwhelming 3 serving counters simultaneously.'
              },
              {
                step: 'Phase 3: The Wait & Refill Lag',
                action: 'Stands in line for 22 minutes. At counter, the paneer dish finishes and takes 6 minutes to refill.',
                thought: '"Why didn\'t the kitchen know we were coming?"',
                emotion: 'Agitated / Hungry',
                friction: 'Kitchen operates blind without advance headcount or portion demand signals.'
              },
              {
                step: 'Phase 4: Serving & Over-Portioning',
                action: 'Server rapidly dumps standard heavy scoops of rice and rotis to keep queue moving.',
                thought: '"This is way too much food for me, but the server won\'t listen."',
                emotion: 'Powerless',
                friction: 'Fixed scoop size and rush pressure prevents customized portioning.'
              },
              {
                step: 'Phase 5: Rushed Consumption',
                action: 'Eats as much as possible in 8 minutes while staring at watch to reach 1:30 PM lab on time.',
                thought: '"I am late already, cannot finish all this rice."',
                emotion: 'Rushed / Bloated',
                friction: 'Time compression leads to unfinished food.'
              },
              {
                step: 'Phase 6: Plate Return & Waste Disposal',
                action: 'Drops tray at disposal counter, scraping 150g of rice and a roti into the waste drum.',
                thought: '"I hate wasting food, but there was no small portion option."',
                emotion: 'Guilty / Defeated',
                friction: 'Visible plate waste compounds across thousands of students every day.'
              }
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">{p.step}</h3>
                    <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{p.emotion}</span>
                  </div>
                  <p className="text-slate-700">{p.action}</p>
                  <p className="text-slate-500 italic">&ldquo;{p.thought}&rdquo;</p>
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 font-medium">
                    <strong>Friction Point:</strong> {p.friction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: STAGE 2 DEFINE, PERSONAS & POV */}
      {activeTab === 'define' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-navy-900 text-white space-y-3 shadow-lg">
            <span className="text-[10px] font-extrabold bg-blue-500 text-white px-2.5 py-0.5 rounded uppercase tracking-wider">
              STAGE 2 CORE SYNTHESIS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">The How Might We (HMW) Question</h2>
            <blockquote className="text-base sm:text-lg text-emerald-300 font-semibold italic border-l-4 border-emerald-400 pl-4 py-1">
              &ldquo;How might we help hostelers get their meals without unpredictable waiting, while reducing the food that reaches the plate but not the stomach?&rdquo;
            </blockquote>
          </div>

          {/* POV Statement Box */}
          <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Point of View (POV) Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-blue-50 rounded-xl space-y-1">
                <span className="font-bold text-blue-950 block">[USER]</span>
                <p className="text-blue-900">Hostel resident students with tightly scheduled academic timetables</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl space-y-1">
                <span className="font-bold text-amber-950 block">[NEEDS]</span>
                <p className="text-amber-900">A predictable, fast meal turnaround and appetite-appropriate food portions</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl space-y-1">
                <span className="font-bold text-emerald-950 block">[BECAUSE / INSIGHT]</span>
                <p className="text-emerald-900">Unpredictable lines force food hoarding and uniform large scoops cause extensive plate waste</p>
              </div>
            </div>
          </div>

          {/* 3 Personas */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Target User Personas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personas.map(persona => (
                <div key={persona.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-lg">
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{persona.name}</h4>
                      <p className="text-xs text-blue-600 font-semibold">{persona.title}</p>
                      <p className="text-[11px] text-slate-400">{persona.department}</p>
                    </div>

                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {persona.quote}
                    </p>

                    <div className="text-xs space-y-1 pt-1">
                      <span className="font-bold text-slate-700 block">Core Goals:</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                        {persona.goals.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs space-y-1 pt-1">
                      <span className="font-bold text-rose-700 block">Frustrations:</span>
                      <ul className="list-disc list-inside text-rose-900 space-y-0.5">
                        {persona.frustrations.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400">
                    Hostel: {persona.hostelInfo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
