import { ChecklistItem } from '../types';

export const initialChecklist: ChecklistItem[] = [
  {
    id: 'chk-stay',
    label: 'Accommodation selected & confirmed',
    completed: true,
    category: 'essential',
    info: 'PineNest Homestay (Old Manali) pre-selected.',
  },
  {
    id: 'chk-transport',
    label: 'Transport preference added',
    completed: true,
    category: 'essential',
    info: 'Self-drive / Taxi preference recorded with Mountain Ride Taxi fallback.',
  },
  {
    id: 'chk-itinerary',
    label: 'Day-wise itinerary created',
    completed: true,
    category: 'essential',
    info: '3-day structured itinerary populated for 4 travelers.',
  },
  {
    id: 'chk-guide',
    label: 'Trusted local guide chosen',
    completed: true,
    category: 'recommended',
    info: 'Local verified guide options linked for safety & valley insights.',
  },
  {
    id: 'chk-alerts',
    label: 'Destination alerts checked',
    completed: true,
    category: 'essential',
    info: 'Monitored across 4 active sector advisories.',
  },
  {
    id: 'chk-emergency',
    label: 'Emergency contact saved',
    completed: true,
    category: 'essential',
    info: 'Local Sub-Divisional Magistrate & Tourist Assistance numbers cached offline.',
  },
  {
    id: 'chk-backup',
    label: 'Backup activity added',
    completed: false,
    category: 'recommended',
    info: 'Smart alternative triggered if outdoor mountain activities face weather disruption.',
  },
];
