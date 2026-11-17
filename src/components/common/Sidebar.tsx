import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  CalendarCheck,
  QrCode,
  MessageSquareHeart,
  ChefHat,
  TrendingDown,
  BarChart3,
  FileSearch,
  FlaskConical,
  CheckCircle2,
  FileText,
  Award,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, activeBooking, checkpoints } = useApp();
  const location = useLocation();

  const completedCheckpointsCount = checkpoints.filter(c => c.isComplete).length;

  const studentNav = [
    { name: 'Student Home', path: '/student', icon: Home },
    { name: 'Live Crowd Monitor', path: '/student/crowd', icon: Users, badge: 'Live' },
    { name: 'Smart Meal Booking', path: '/student/book', icon: CalendarCheck },
    { name: 'Digital Meal Pass', path: '/student/pass', icon: QrCode, hasActiveBadge: !!activeBooking },
    { name: 'Meal Feedback', path: '/student/feedback', icon: MessageSquareHeart },
  ];

  const staffNav = [
    { name: 'Staff Dashboard', path: '/staff', icon: ChefHat },
    { name: 'Demand Management', path: '/staff/demand', icon: Layers },
    { name: 'Food Waste Tracking', path: '/staff/waste', icon: TrendingDown },
  ];

  const adminNav = [
    { name: 'Admin Analytics', path: '/admin', icon: BarChart3 },
    { name: 'Stage 1-2: Empathize & Define', path: '/admin/research', icon: FileSearch },
    { name: 'Stage 3 & 5: Ideate & Test', path: '/admin/testing', icon: FlaskConical },
    {
      name: 'Seven Checkpoints (CP1-7)',
      path: '/admin/checkpoints',
      icon: CheckCircle2,
      badge: `${completedCheckpointsCount}/7`
    },
    { name: 'Stage 6: Final Report', path: '/admin/report', icon: FileText },
    { name: 'Final Showcase & Viva', path: '/admin/showcase', icon: Award, highlight: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden no-print"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto no-print ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Welcome Screen Link */}
          <div>
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Welcome & Overview</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </NavLink>
          </div>

          {/* Student Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Student App
              </span>
              {role === 'student' && (
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.2 rounded-full">
                  Active
                </span>
              )}
            </div>

            {studentNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600 pl-2'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-slate-500 group-hover:text-blue-600" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.hasActiveBadge && (
                    <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                      Pass Ready
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Mess Staff Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Mess Staff
              </span>
              {role === 'staff' && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                  Active
                </span>
              )}
            </div>

            {staffNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-50 text-amber-800 font-bold border-l-4 border-amber-600 pl-2'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Design Thinking & Admin Section */}
          <div className="space-y-1 pb-6">
            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                INT335 Design Thinking
              </span>
              {role === 'admin' && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                  Active
                </span>
              )}
            </div>

            {adminNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600 pl-2'
                        : item.highlight
                        ? 'bg-gradient-to-r from-emerald-50 to-blue-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !item.badge && (
                    <span className="text-[9px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded">
                      CP7
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* LPU Footer in Sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500">
          <p className="font-semibold text-slate-700">Lovely Professional University</p>
          <p>School of Computer Science & Eng.</p>
          <p className="text-[10px] text-slate-400 mt-1">INT335 Design Thinking Project</p>
        </div>
      </aside>
    </>
  );
};
