import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Save,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CheckpointsPage: React.FC = () => {
  const {
    checkpoints,
    toggleCheckpointDeliverable,
    updateCheckpointNotes,
    setCheckpointCompleted
  } = useApp();

  const [expandedId, setExpandedId] = useState<string>(checkpoints[0]?.id || 'cp-1');
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>({});

  const completedCount = checkpoints.filter(c => c.isComplete).length;
  const progressPercent = Math.round((completedCount / checkpoints.length) * 100);

  const handleNotesChange = (id: string, text: string) => {
    setEditingNotes(prev => ({ ...prev, [id]: text }));
  };

  const handleSaveNotes = (id: string) => {
    if (editingNotes[id] !== undefined) {
      updateCheckpointNotes(id, editingNotes[id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Seven Checkpoints (CP1 – CP7)</h1>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              INT335 Evaluation Milestones
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track, audit, and document the 7 mandatory semester review checkpoints from project registration to final viva.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              PROGRESS
            </span>
            <span className="text-base font-extrabold text-emerald-600 font-mono">
              {completedCount} / {checkpoints.length} Passed ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Checkpoints Progress Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Overall Course Progression</span>
          <span>{completedCount === 7 ? 'Showcase Ready' : `${7 - completedCount} Checkpoints Remaining`}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checkpoints Accordion List */}
      <div className="space-y-4">
        {checkpoints.map(cp => {
          const isExpanded = expandedId === cp.id;
          const completedDeliverables = cp.deliverables.filter(d => d.completed).length;
          const totalDeliverables = cp.deliverables.length;
          const hasMissingDeliverables = completedDeliverables < totalDeliverables;

          return (
            <div
              key={cp.id}
              className={`rounded-3xl border-2 transition-all bg-white overflow-hidden shadow-xs ${
                cp.isComplete ? 'border-emerald-300' : 'border-slate-200'
              }`}
            >
              {/* Card Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? '' : cp.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs ${
                      cp.isComplete
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cp.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{cp.week}</span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-xs font-medium text-slate-500">
                        {completedDeliverables}/{totalDeliverables} deliverables verified
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{cp.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                      cp.isComplete
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {cp.isComplete ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>PASSED & VERIFIED</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>PENDING REVIEW</span>
                      </>
                    )}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-5 animate-in fade-in">
                  <p className="text-xs text-slate-600 leading-relaxed">{cp.description}</p>

                  {/* Missing Requirement Warning */}
                  {hasMissingDeliverables && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-xs text-amber-900 font-semibold">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Missing {totalDeliverables - completedDeliverables} required items before formal faculty sign-off.
                      </span>
                    </div>
                  )}

                  {/* Deliverables Checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Mandatory Deliverables Checklist:
                    </span>
                    <div className="space-y-2">
                      {cp.deliverables.map(del => (
                        <label
                          key={del.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 cursor-pointer hover:bg-blue-50/40 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={del.completed}
                            onChange={() => toggleCheckpointDeliverable(cp.id, del.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span className={del.completed ? 'line-through text-slate-400' : 'text-slate-800'}>
                            {del.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Files Attached */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Audited Evidence Artifacts:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cp.evidenceFiles.map((f, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-mono text-slate-700"
                        >
                          <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notes / Mentor Feedback */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Evaluation Notes & Faculty Feedback:
                    </span>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={editingNotes[cp.id] !== undefined ? editingNotes[cp.id] : cp.notes}
                        onChange={e => handleNotesChange(cp.id, e.target.value)}
                        className="flex-1 text-xs p-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveNotes(cp.id)}
                        className="px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-end py-3 flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>

                  {/* Manual Sign-off Toggle */}
                  <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                    <span className="text-[11px] text-slate-500">
                      Toggle checkpoint verification status:
                    </span>
                    <button
                      type="button"
                      onClick={() => setCheckpointCompleted(cp.id, !cp.isComplete)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                        cp.isComplete
                          ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      }`}
                    >
                      {cp.isComplete ? 'Mark as Incomplete' : 'Approve & Mark Passed'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
