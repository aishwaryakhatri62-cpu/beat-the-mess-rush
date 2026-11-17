import React, { useState } from 'react';
import {
  FlaskConical,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Filter,
  Plus,
  Scale,
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { IdeationIdea, TestingIssue } from '../../types';

export const TestingWorkspace: React.FC = () => {
  const {
    ideas,
    updateIdeaStatus,
    updateIdeaScores,
    testingIssues,
    addTestingIssue,
    updateIssueStatus,
    feedbackMatrices,
    changeRecords
  } = useApp();

  const [mainTab, setMainTab] = useState<'ideate' | 'test'>('ideate');
  const [ideationFilter, setIdeationFilter] = useState<'All' | 'Selected' | 'Shortlisted' | 'Rejected'>('All');
  const [methodFilter, setMethodFilter] = useState<'All' | 'Brainstorming' | 'Crazy 8s' | 'Mind Mapping' | 'SCAMPER'>('All');

  // Filtered ideas
  const filteredIdeas = ideas.filter(i => {
    const matchStatus = ideationFilter === 'All' || i.status === ideationFilter;
    const matchMethod = methodFilter === 'All' || i.method === methodFilter;
    return matchStatus && matchMethod;
  });

  // Count by status
  const selectedCount = ideas.filter(i => i.status === 'Selected').length;
  const shortlistedCount = ideas.filter(i => i.status === 'Shortlisted').length;
  const rejectedCount = ideas.filter(i => i.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Stage 3: Ideate & Stage 5: Usability Testing</h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              INT335 Weeks 6–12
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            30+ screened concepts across SCAMPER, Crazy 8s & Brainstorming, paired with empirical usability testing matrices and issue resolution records.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setMainTab('ideate')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              mainTab === 'ideate' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Stage 3: Ideate ({ideas.length})</span>
          </button>
          <button
            onClick={() => setMainTab('test')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              mainTab === 'test' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
            <span>Stage 5: Test & Retest</span>
          </button>
        </div>
      </div>

      {/* ================= STAGE 3: IDEATE TAB ================= */}
      {mainTab === 'ideate' && (
        <div className="space-y-6">
          {/* Method Overview Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Brainstorming</span>
              <div className="text-xl font-bold text-slate-900">8 Ideas</div>
              <p className="text-[10px] text-slate-500">Unconstrained generation</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Crazy 8s</span>
              <div className="text-xl font-bold text-slate-900">8 Boxes</div>
              <p className="text-[10px] text-slate-500">Rapid 1-minute sketch ideas</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Mind Mapping</span>
              <div className="text-xl font-bold text-slate-900">8 Concepts</div>
              <p className="text-[10px] text-slate-500">Spatial & logistical nodes</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">SCAMPER</span>
              <div className="text-xl font-bold text-slate-900">8 Transformative</div>
              <p className="text-[10px] text-slate-500">Substitute to Reverse</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-500 text-[11px] uppercase mr-1">Status:</span>
              {(['All', 'Selected', 'Shortlisted', 'Rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setIdeationFilter(st)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    ideationFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-500 text-[11px] uppercase mr-1">Method:</span>
              {(['All', 'Brainstorming', 'Crazy 8s', 'Mind Mapping', 'SCAMPER'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMethodFilter(m)}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    methodFilter === m
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Ideas Table / Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Multi-Criteria Screening Matrix</h3>
                <p className="text-[11px] text-slate-500">
                  Rated across Ease, Usefulness, Cost, Feasibility, and Impact (1–5 scale, Max 25 pts)
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Showing {filteredIdeas.length} of {ideas.length} ideas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50">
                    <th className="py-2.5 px-3">Title & Concept</th>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3 text-center">Ease</th>
                    <th className="py-2.5 px-3 text-center">Use</th>
                    <th className="py-2.5 px-3 text-center">Cost</th>
                    <th className="py-2.5 px-3 text-center">Feas</th>
                    <th className="py-2.5 px-3 text-center">Impact</th>
                    <th className="py-2.5 px-3 text-center font-bold">Total</th>
                    <th className="py-2.5 px-3">Decision</th>
                    <th className="py-2.5 px-3">Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIdeas.map(i => (
                    <tr key={i.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-bold text-slate-900 text-xs">{i.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{i.description}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                          {i.method}
                        </span>
                        {i.scamperCategory && (
                          <span className="block text-[9px] text-blue-600 font-semibold mt-0.5">
                            {i.scamperCategory}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center font-mono">{i.easeScore}</td>
                      <td className="py-3 px-3 text-center font-mono">{i.usefulnessScore}</td>
                      <td className="py-3 px-3 text-center font-mono">{i.costScore}</td>
                      <td className="py-3 px-3 text-center font-mono">{i.feasibilityScore}</td>
                      <td className="py-3 px-3 text-center font-mono">{i.impactScore}</td>
                      <td className="py-3 px-3 text-center font-mono font-extrabold text-blue-700 text-sm">
                        {i.totalScore}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={i.status}
                          onChange={e => updateIdeaStatus(i.id, e.target.value as any)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none ${
                            i.status === 'Selected' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                            i.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                            'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="Selected">Selected</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-slate-500 text-[11px] max-w-xs leading-relaxed">
                        {i.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= STAGE 5: TEST TAB ================= */}
      {mainTab === 'test' && (
        <div className="space-y-6">
          {/* Neutral Usability Test Plan (5 Neutral Tasks) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">A. Neutral Usability Test Plan</h3>
                <p className="text-xs text-slate-500">Participants were evaluated on objective task completion without prompting.</p>
              </div>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                5 Standardized Tasks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: 'Task 1', text: 'Find a mess with a lower crowd level currently.' },
                { step: 'Task 2', text: 'Choose a suitable staggered lunch slot for today.' },
                { step: 'Task 3', text: 'Select an appetite-appropriate food portion.' },
                { step: 'Task 4', text: 'Complete a meal reservation and secure pass.' },
                { step: 'Task 5', text: 'Locate the booking confirmation and QR pass.' }
              ].map((t, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-blue-700 text-[10px] uppercase block">{t.step}</span>
                  <p className="text-slate-800 font-medium">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Capture Matrices */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900">B. Four-Quadrant Feedback Capture Matrices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedbackMatrices.map(mat => (
                <div key={mat.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{mat.sessionTitle}</h4>
                      <p className="text-[11px] text-slate-500">{mat.participant} &bull; {mat.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                      <span className="font-bold text-emerald-950 uppercase text-[10px]">What Users Liked</span>
                      <ul className="list-disc list-inside text-emerald-900 space-y-1">
                        {mat.liked.map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                      <span className="font-bold text-rose-950 uppercase text-[10px]">What Users Criticised</span>
                      <ul className="list-disc list-inside text-rose-900 space-y-1">
                        {mat.criticised.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                      <span className="font-bold text-blue-950 uppercase text-[10px]">Questions Asked</span>
                      <ul className="list-disc list-inside text-blue-900 space-y-1">
                        {mat.questionsAsked.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 uppercase text-[10px]">New User Ideas</span>
                      <ul className="list-disc list-inside text-amber-900 space-y-1">
                        {mat.newIdeas.map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Tracking List with Severity */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">C. Usability Issue Log & Severity Categorization</h3>
                <p className="text-xs text-slate-500">Every recorded issue mapped to a verified resolution</p>
              </div>
            </div>

            <div className="space-y-3">
              {testingIssues.map(iss => (
                <div key={iss.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                        iss.severity === 'Serious' ? 'bg-rose-100 text-rose-800' :
                        iss.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {iss.severity} Severity
                      </span>
                      <span className="font-bold text-slate-900">{iss.description}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {iss.status}
                    </span>
                  </div>

                  <p className="text-slate-600">
                    <strong>Reported by:</strong> {iss.reportedBy} on {iss.date}
                  </p>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <strong>Proposed & Implemented Fix:</strong> {iss.proposedFix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documented Change Records */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">D. Evidence-Based Change Records (Before vs After)</h3>
                <p className="text-xs text-slate-500">Documenting concrete UI and functional evolution between iterations</p>
              </div>
            </div>

            <div className="space-y-3">
              {changeRecords.map(cr => (
                <div key={cr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{cr.changeImplemented}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{cr.versionBefore} &rarr; {cr.versionAfter}</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>User Quote:</strong> <span className="italic">{cr.userFeedback}</span>
                  </p>
                  <p className="text-slate-700">
                    <strong>Reason for Change:</strong> {cr.reasonForChange}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
