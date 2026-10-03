import React from 'react';
import { useTrip } from '../../context/TripContext';
import { CheckCircle2, Circle, AlertCircle, Sparkles } from 'lucide-react';

export const ChecklistCard: React.FC = () => {
  const { checklist, toggleChecklist } = useTrip();

  const completedCount = checklist.filter((i) => i.completed).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <h4 className="font-semibold text-slate-900 text-base">Travel Essentials Checklist</h4>
          <p className="text-xs text-slate-500">
            Readiness safeguards before departure for Manali
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-[#0E7490]">
            {completedCount}/{totalCount}
          </span>
          <span className="text-xs text-slate-400 block font-medium">Completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-[#0E7490] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleChecklist(item.id)}
            className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
              item.completed
                ? 'bg-slate-50/60 border-slate-200/70 text-slate-700'
                : 'bg-amber-50/50 border-amber-200/80 text-amber-900 font-medium'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 shrink-0 focus:outline-none"
              aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Circle className="w-4 h-4 text-amber-500" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${item.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {item.label}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                    item.category === 'essential'
                      ? 'bg-slate-200/70 text-slate-600'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {item.category}
                </span>
              </div>
              {item.info && (
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
