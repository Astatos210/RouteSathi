import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TripPreferences,
  DayItinerary,
  ReadinessFactors,
  Provider,
  TravelAlert,
  ChecklistItem,
} from '../types';
import { mockProviders } from '../data/mockProviders';
import { mockAlerts } from '../data/mockAlerts';
import { initialItinerary, alternateDay2, initialDay2 } from '../data/mockItinerary';
import { initialChecklist } from '../data/mockChecklist';

interface ToastInfo {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
}

interface TripContextType {
  preferences: TripPreferences;
  setPreferences: (prefs: TripPreferences) => void;
  itinerary: DayItinerary[];
  readiness: ReadinessFactors;
  isDisruptionActive: boolean;
  isAlternateApplied: boolean;
  alerts: TravelAlert[];
  providers: Provider[];
  selectedProviderIds: string[];
  savedProviderIds: string[];
  checklist: ChecklistItem[];
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Actions
  triggerDisruption: () => void;
  applyAlternatePlan: () => void;
  revertToOriginalPlan: () => void;
  resetDemo: () => void;
  toggleChecklist: (id: string) => void;
  toggleSelectProvider: (id: string) => void;
  toggleSaveProvider: (id: string) => void;
  addPartnerAlert: (alertData: Partial<TravelAlert>) => void;
  updateProviderAvailability: (id: string, availability: Provider['availability']) => void;
}

const defaultPreferences: TripPreferences = {
  destination: 'Manali',
  duration: 3,
  groupType: 'Friends',
  groupSize: 4,
  startDate: '2026-10-15',
  budgetCategory: 'Moderate',
  budgetPerPerson: 6000,
  interests: ['Adventure', 'Sightseeing', 'Local Food'],
  transport: 'Self-drive',
  prioritizeVerified: true,
  weatherBackup: true,
};

const INITIAL_READINESS: ReadinessFactors = {
  routeStatus: 92,
  stayBooking: 100,
  providerTrust: 88,
  destinationUpdates: 82,
  tripCompleteness: 76,
  overall: 86,
  status: 'Ready to Go',
};

const DISRUPTED_READINESS: ReadinessFactors = {
  routeStatus: 75,
  stayBooking: 100,
  providerTrust: 88,
  destinationUpdates: 45,
  tripCompleteness: 76,
  overall: 62,
  status: 'Needs Attention',
};

const ADAPTED_READINESS: ReadinessFactors = {
  routeStatus: 88,
  stayBooking: 100,
  providerTrust: 91,
  destinationUpdates: 82,
  tripCompleteness: 84,
  overall: 84,
  status: 'Ready to Go',
};

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'routesathi_trip_data_v2';

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or use defaults
  const loadInitialState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
    return null;
  };

  const savedState = loadInitialState();

  const [preferences, setPreferencesState] = useState<TripPreferences>(
    savedState?.preferences || defaultPreferences
  );
  const [itinerary, setItinerary] = useState<DayItinerary[]>(
    savedState?.itinerary || initialItinerary
  );
  const [readiness, setReadiness] = useState<ReadinessFactors>(
    savedState?.readiness || INITIAL_READINESS
  );
  const [isDisruptionActive, setIsDisruptionActive] = useState<boolean>(
    savedState?.isDisruptionActive ?? false
  );
  const [isAlternateApplied, setIsAlternateApplied] = useState<boolean>(
    savedState?.isAlternateApplied ?? false
  );
  const [alerts, setAlerts] = useState<TravelAlert[]>(
    savedState?.alerts || mockAlerts
  );
  const [providers, setProviders] = useState<Provider[]>(
    savedState?.providers || mockProviders
  );
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>(
    savedState?.selectedProviderIds || ['pinenest-homestay', 'mountain-ride-taxi']
  );
  const [savedProviderIds, setSavedProviderIds] = useState<string[]>(
    savedState?.savedProviderIds || ['kullu-culture-walks']
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    savedState?.checklist || initialChecklist
  );
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        preferences,
        itinerary,
        readiness,
        isDisruptionActive,
        isAlternateApplied,
        alerts,
        providers,
        selectedProviderIds,
        savedProviderIds,
        checklist,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [
    preferences,
    itinerary,
    readiness,
    isDisruptionActive,
    isAlternateApplied,
    alerts,
    providers,
    selectedProviderIds,
    savedProviderIds,
    checklist,
  ]);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setPreferences = (prefs: TripPreferences) => {
    setPreferencesState(prefs);
  };

  // Disruption Simulation
  const triggerDisruption = () => {
    setIsDisruptionActive(true);
    setIsAlternateApplied(false);
    setReadiness(DISRUPTED_READINESS);

    // Update Day 2 items to mark Solang Valley outdoor activity as Needs Review
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.day === 2) {
          return {
            ...day,
            title: 'Solang Valley Mountain Adventure (Alert Active)',
            isAdapted: false,
            items: initialDay2.map((item) =>
              item.id === 'solang-outdoor'
                ? {
                    ...item,
                    status: 'Needs Review',
                    statusNote: 'Weather Caution: High-altitude wind & drizzle alert active.',
                  }
                : item
            ),
          };
        }
        return day;
      })
    );

    // Update checklist
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === 'chk-backup' ? { ...item, completed: false } : item
      )
    );

    showToast('Simulated Disruption: Solang Valley Weather Alert Activated!', 'warning');
  };

  // Alternate Plan Application
  const applyAlternatePlan = () => {
    setIsAlternateApplied(true);
    setReadiness(ADAPTED_READINESS);

    // Replace Day 2 with alternate items
    setItinerary((prev) =>
      prev.map((day) => {
        if (day.day === 2) {
          return {
            ...day,
            title: 'Naggar Heritage Circuit & Artisan Trail',
            isAdapted: true,
            items: alternateDay2,
          };
        }
        return day;
      })
    );

    // Also auto-add Kullu Culture Walks to selected providers
    if (!selectedProviderIds.includes('kullu-culture-walks')) {
      setSelectedProviderIds((prev) => [...prev, 'kullu-culture-walks']);
    }

    // Mark backup checklist item completed
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === 'chk-backup' ? { ...item, completed: true } : item
      )
    );

    showToast('Your itinerary has been updated. You are ready to go.', 'success');
  };

  // Revert to original plan
  const revertToOriginalPlan = () => {
    setIsAlternateApplied(false);
    if (isDisruptionActive) {
      setReadiness(DISRUPTED_READINESS);
      setItinerary((prev) =>
        prev.map((day) => {
          if (day.day === 2) {
            return {
              ...day,
              title: 'Solang Valley Mountain Adventure (Alert Active)',
              isAdapted: false,
              items: initialDay2.map((item) =>
                item.id === 'solang-outdoor'
                  ? {
                      ...item,
                      status: 'Needs Review',
                      statusNote: 'Weather Caution: High-altitude wind & drizzle alert active.',
                    }
                  : item
              ),
            };
          }
          return day;
        })
      );
    } else {
      setReadiness(INITIAL_READINESS);
      setItinerary((prev) =>
        prev.map((day) => (day.day === 2 ? { ...day, title: 'Solang Valley Mountain Adventure', isAdapted: false, items: initialDay2 } : day))
      );
    }
    showToast('Reverted to original plan.', 'info');
  };

  // Reset Demo to pristine state
  const resetDemo = () => {
    setIsDisruptionActive(false);
    setIsAlternateApplied(false);
    setReadiness(INITIAL_READINESS);
    setItinerary(initialItinerary);
    setChecklist(initialChecklist);
    setAlerts(mockAlerts);
    setProviders(mockProviders);
    setSelectedProviderIds(['pinenest-homestay', 'mountain-ride-taxi']);
    setSavedProviderIds(['kullu-culture-walks']);
    setPreferences(defaultPreferences);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    showToast('Demo state successfully reset to default.', 'info');
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const toggleSelectProvider = (id: string) => {
    setSelectedProviderIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((p) => p !== id) : [...prev, id];
      const provider = providers.find((p) => p.id === id);
      showToast(
        exists
          ? `Removed ${provider?.name || 'Provider'} from trip`
          : `Added ${provider?.name || 'Provider'} to trip`,
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  const toggleSaveProvider = (id: string) => {
    setSavedProviderIds((prev) => {
      const exists = prev.includes(id);
      return exists ? prev.filter((p) => p !== id) : [...prev, id];
    });
  };

  const addPartnerAlert = (alertData: Partial<TravelAlert>) => {
    const newAlert: TravelAlert = {
      id: `alert-${Date.now()}`,
      title: alertData.title || 'Local Update',
      category: alertData.category || 'Activities',
      severity: alertData.severity || 'Moderate',
      source: alertData.source || 'Local Partner',
      sourceType: 'Local partner',
      status: 'Pending Moderator Review',
      reportedAgo: 'Just now',
      validUntil: alertData.validUntil || 'Today, 8:00 PM',
      location: alertData.location || 'Manali Valley',
      coordinates: alertData.coordinates || { x: 50, y: 50 },
      impact: alertData.impact || 'Community advisory submitted for moderator review.',
      actionText: 'Pending Review',
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast('Alert submitted! Status: Pending Moderator Review', 'info');
  };

  const updateProviderAvailability = (id: string, availability: Provider['availability']) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, availability } : p))
    );
    showToast(`Updated provider availability to "${availability}"`, 'success');
  };

  return (
    <TripContext.Provider
      value={{
        preferences,
        setPreferences,
        itinerary,
        readiness,
        isDisruptionActive,
        isAlternateApplied,
        alerts,
        providers,
        selectedProviderIds,
        savedProviderIds,
        checklist,
        demoMode,
        setDemoMode,
        toasts,
        showToast,
        removeToast,
        triggerDisruption,
        applyAlternatePlan,
        revertToOriginalPlan,
        resetDemo,
        toggleChecklist,
        toggleSelectProvider,
        toggleSaveProvider,
        addPartnerAlert,
        updateProviderAvailability,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
