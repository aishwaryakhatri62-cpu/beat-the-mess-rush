import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  BookOpen,
  Users,
  CheckCircle2,
  Printer,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShowcaseViva: React.FC = () => {
  const { vivaQAs, updateVivaAnswer, teamMembers, updateTeamMember } = useApp();
  const navigate = useNavigate();

  const [expandedQaId, setExpandedQaId] = useState<string>(vivaQAs[0]?.id || 'viva-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingAnswers, setEditingAnswers] = useState<{ [key: string]: string }>({});

  const categories = ['All', 'Problem & Empathy', 'Ideation & Prototyping', 'Testing & Evidence', 'Impact & Scalability'];

  const filteredQAs = vivaQAs.filter(
    q => selectedCategory === 'All' || q.category === selectedCategory
  );

  const handleSaveAnswer = (id: string) => {
    if (editingAnswers[id] !== undefined) {
      updateVivaAnswer(id, editingAnswers[id]);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">CP7 Final Showcase & Viva Preparation</h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Final Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Presentation slides outline, 2-minute viva defense cards, and authenticated team contribution statements for INT335.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Viva Sheet</span>
          </button>
          <button
            onClick={() => navigate('/admin/report')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Project Report</span>
          </button>
        </div>
      </div>

      {/* 2-Minute Pitch Outline Card */}
      <div className="bg-gradient-to-br from-navy-800 via-navy-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl border border-navy-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold">2-Minute Viva Elevator Pitch Script</h2>
          </div>
          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded text-slate-300">
            Target Time: 120 Seconds
          </span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10">
          <p>
            &ldquo;Respected evaluators, in our INT335 field research across LPU residential messes, we identified a critical dual failure: at 12:45 PM and 7:45 PM, students wait an average of 24.5 minutes in unpredictable lines, while institutional dining halls discard over 15% of prepared food daily.
          </p>
          <p>
            Through 8 in-depth interviews and observation of plate return stations, we discovered that long queues cause student rush anxiety, prompting them to take oversized portions to avoid queuing twice—leading to plate waste.
          </p>
          <p>
            Our solution, <strong>BEAT THE MESS RUSH</strong>, solves this through three connected interventions: (1) live mobile crowd meters that guide students away from peak periods; (2) 15-minute staggered meal slots that cap arrival capacity and flatten peak surges; and (3) pre-commit portion sizing (Small, Regular, Large) that converts appetite into advance batch-cooking signals for chefs.
          </p>
          <p>
            In usability testing with 5 real users and shift waste tracking, our prototype achieved a 74.6% reduction in wait times (down to 6.2 minutes) and lowered food waste by 32.5% without requiring expensive biometric hardware.&rdquo;
          </p>
        </div>
      </div>

      {/* Viva Q&A Practice Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Faculty Defense & Viva Q&A Bank</h3>
            <p className="text-xs text-slate-500">Anticipated evaluator questions with model answers grounded in Design Thinking principles.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  selectedCategory === cat
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredQAs.map((qa, index) => {
            const isExpanded = expandedQaId === qa.id;
            return (
              <div
                key={qa.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedQaId(isExpanded ? '' : qa.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                        {qa.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">{qa.question}</h4>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </div>

                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3 animate-in fade-in">
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-1">Recommended Viva Response:</strong>
                      <p className="bg-white p-3.5 rounded-xl border border-slate-200 text-slate-800">
                        {qa.suggestedAnswer}
                      </p>
                    </div>

                    <div className="pt-2 text-xs">
                      <label className="block text-slate-500 font-bold text-[11px] uppercase mb-1">
                        Customize or Add Your Personal Speaking Notes:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingAnswers[qa.id] !== undefined ? editingAnswers[qa.id] : qa.suggestedAnswer}
                          onChange={e => setEditingAnswers({ ...editingAnswers, [qa.id]: e.target.value })}
                          className="flex-1 text-xs p-2 border border-slate-300 rounded-xl bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveAnswer(qa.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Contribution Statements with Signatures */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Signed Team Contribution Statements</h3>
          <p className="text-xs text-slate-500">Authenticated percentage allocations for university evaluation criteria.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">{member.name}</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {member.contributionPct}% Contribution
                </span>
              </div>
              <div className="text-slate-500 font-mono">Reg No: {member.regNo}</div>
              <div className="text-slate-700 font-medium">Assigned Role: {member.role}</div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Digital Signature:</span>
                <span className="font-serif italic font-bold text-slate-800 text-sm">{member.signature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
