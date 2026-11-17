import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UtensilsCrossed,
  User,
  Menu,
  X,
  Ticket,
  Bell,
  Clock,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProfileModal } from './ProfileModal';

interface NavbarProps {
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { role, setRole, currentUser, activeBooking, messes } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Quick stats for navbar
  const highCrowdCount = messes.filter(m => m.crowdLevel === 'HIGH').length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors">
                <UtensilsCrossed className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-navy-800 leading-none">
                    BEAT THE MESS RUSH
                  </span>
                  <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    INT335
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                  LPU Queues & Food Waste Solution
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Live Quick Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/student/crowd"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Queues</span>
              {highCrowdCount > 0 && (
                <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {highCrowdCount} Peak
                </span>
              )}
            </Link>

            <Link
              to="/student/book"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
            >
              <span>Book Slot</span>
            </Link>

            {activeBooking && (
              <Link
                to="/student/pass"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
              >
                <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active Pass ({activeBooking.id})</span>
              </Link>
            )}
          </div>

          {/* Right: Role & Profile */}
          <div className="flex items-center gap-3">
            {/* Role indicator pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => {
                  setRole('student');
                  navigate('/student');
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setRole('staff');
                  navigate('/staff');
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  role === 'staff'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  navigate('/admin');
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Profile Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">Reg: {currentUser.regNo}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};
