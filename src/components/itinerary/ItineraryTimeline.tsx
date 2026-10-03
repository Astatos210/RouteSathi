import React, { useState } from 'react';
import { DayItinerary } from '../../types';
import { ItineraryItem } from './ItineraryItem';
import { Calendar, Sparkles, AlertTriangle } from 'lucide-react';

interface ItineraryTimelineProps {
  itinerary: DayItinerary[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ itinerary }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {itinerary.map((day) => {
          const hasDisruptedItem = day.items.some((i) => i.status === 'Needs Review');
          const isAdapted = day.isAdapted || day.items.some((i) => i.status === 'Adapted Plan');

          return (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedDay === day.day
                  ? 'bg-[#0B1F33] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4 opacity-75" />
              <span>Day {day.day}</span>

              {hasDisruptedItem && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
              {isAdapted && (
                <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded">
                  Adapted
                </span>
              )}
            </button>
          );
        })}

        <button
          onClick={() => setSelectedDay(0)} // View All
          className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            selectedDay === 0
              ? 'bg-slate-800 text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          View All Days
        </button>
      </div>

      {/* Day Content */}
      <div className="space-y-8">
        {itinerary
          .filter((d) => selectedDay === 0 || d.day === selectedDay)
          .map((day) => {
            const hasDisruptedItem = day.items.some((i) => i.status === 'Needs Review');
            const isAdapted = day.isAdapted || day.items.some((i) => i.status === 'Adapted Plan');

            return (
              <div key={day.day} className="space-y-4">
                {/* Day Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-100/80 border border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0E7490] text-white font-bold text-xs flex items-center justify-center">
                      D{day.day}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {day.title}
                      </h3>
                      <span className="text-xs text-slate-500">{day.dateStr}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasDisruptedItem && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Disruption Alert
                      </span>
                    )}
                    {isAdapted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-100 border border-teal-300 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Weather-Adapted Plan
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-500">
                      {day.items.length} Activities
                    </span>
                  </div>
                </div>

                {/* Items in Day */}
                <div className="space-y-3.5 pl-2 sm:pl-4 border-l-2 border-slate-200 ml-3">
                  {day.items.map((item) => (
                    <ItineraryItem
                      key={item.id}
                      item={item}
                      isAffected={item.status === 'Needs Review'}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
