import React from 'react';
import { CrowdLevel } from '../../types';
import { Users, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CrowdBadgeProps {
  level: CrowdLevel;
  waitMinutes?: number;
  queueCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const CrowdBadge: React.FC<CrowdBadgeProps> = ({
  level,
  waitMinutes,
  queueCount,
  size = 'md',
  showDetails = false
}) => {
  const styles = {
    LOW: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      pill: 'bg-emerald-500',
      text: 'LOW CROWD',
      sub: 'Fast entry & no line',
      icon: CheckCircle2
    },
    MEDIUM: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      pill: 'bg-amber-500',
      text: 'MODERATE CROWD',
      sub: 'Moderate steady line',
      icon: Users
    },
    HIGH: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      pill: 'bg-rose-500',
      text: 'HIGH CROWD (PEAK)',
      sub: 'Long wait expected',
      icon: AlertTriangle
    }
  }[level];

  const Icon = styles.icon;

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${styles.bg}`}
      >
        <span className={`w-2 h-2 rounded-full ${styles.pill} animate-pulse`} />
        {level} CROWD
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-2xl border ${styles.bg} shadow-xs`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-3.5 h-3.5 rounded-full ${styles.pill} animate-ping`} />
            <span className="font-extrabold text-base tracking-wide">{styles.text}</span>
          </div>
          {waitMinutes !== undefined && (
            <div className="flex items-center gap-1.5 font-bold text-sm bg-white/80 px-2.5 py-1 rounded-lg border border-current/20">
              <Clock className="w-4 h-4" />
              <span>~{waitMinutes} min wait</span>
            </div>
          )}
        </div>
        {showDetails && queueCount !== undefined && (
          <div className="mt-2 text-xs opacity-90 flex items-center justify-between">
            <span>Approx. {queueCount} students currently in queue</span>
            <span>{styles.sub}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold border ${styles.bg}`}>
      <span className={`w-2 h-2 rounded-full ${styles.pill}`} />
      <span>{level} CROWD</span>
      {waitMinutes !== undefined && (
        <span className="text-[11px] opacity-80 font-medium">({waitMinutes}m wait)</span>
      )}
    </div>
  );
};
