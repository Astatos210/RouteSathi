import React from 'react';
import { useTrip } from '../../context/TripContext';
import { IndianRupee, PieChart, Users, CheckCircle2 } from 'lucide-react';

export const BudgetSummary: React.FC = () => {
  const { preferences, itinerary, selectedProviderIds, providers } = useTrip();

  // Calculate estimated costs
  const totalTravelers = preferences.groupSize || 4;
  const budgetPerPerson = preferences.budgetPerPerson || 6000;
  const totalTripBudget = totalTravelers * budgetPerPerson;

  // Itinerary items cost per person
  const activitiesAndFoodPerPerson = itinerary.reduce((acc, day) => {
    return (
      acc +
      day.items.reduce((dayAcc, item) => dayAcc + (item.estimatedCost || 0), 0)
    );
  }, 0);

  // Selected providers cost (e.g. homestay 1800 * 2 nights / 4 travelers = 900; taxi 2500 * 3 days / 4 = 1875)
  const stayCostPerPerson = 900; // 2 nights homestay split
  const transportCostPerPerson = 1875; // 3 days taxi split

  const totalEstimatedPerPerson = activitiesAndFoodPerPerson + stayCostPerPerson + transportCostPerPerson;
  const remainingBudgetPerPerson = budgetPerPerson - totalEstimatedPerPerson;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-slate-900 text-base">Budget Breakdown</h4>
          <p className="text-xs text-slate-500">
            For {totalTravelers} travelers • ₹{budgetPerPerson.toLocaleString()} target/person
          </p>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
          <PieChart className="w-5 h-5" />
        </div>
      </div>

      {/* Progress towards budget */}
      <div>
        <div className="flex justify-between text-xs mb-1.5 font-medium">
          <span className="text-slate-600">Estimated Spend</span>
          <span className="text-slate-900 font-bold">
            ₹{totalEstimatedPerPerson.toLocaleString()} / ₹{budgetPerPerson.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              remainingBudgetPerPerson >= 0 ? 'bg-emerald-600' : 'bg-red-500'
            }`}
            style={{
              width: `${Math.min(100, Math.round((totalEstimatedPerPerson / budgetPerPerson) * 100))}%`,
            }}
          />
        </div>
      </div>

      {/* Itemized Categories */}
      <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between text-slate-600">
          <span>Activities, Entries & Guides</span>
          <span className="font-semibold text-slate-800">
            ₹{activitiesAndFoodPerPerson.toLocaleString()} / person
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Accommodation (PineNest 2N split)</span>
          <span className="font-semibold text-slate-800">
            ₹{stayCostPerPerson.toLocaleString()} / person
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span>Transport (Taxi Union split)</span>
          <span className="font-semibold text-slate-800">
            ₹{transportCostPerPerson.toLocaleString()} / person
          </span>
        </div>
      </div>

      {/* Total per person highlight */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-500 block uppercase font-bold tracking-wider">
            Total Group Cost
          </span>
          <span className="text-base font-bold text-slate-900">
            ₹{(totalEstimatedPerPerson * totalTravelers).toLocaleString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-emerald-700 font-semibold block">
            {remainingBudgetPerPerson >= 0 ? 'Within Target' : 'Over Budget'}
          </span>
          <span className="text-xs font-mono font-medium text-slate-600">
            Buffer: ₹{Math.abs(remainingBudgetPerPerson * totalTravelers).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
