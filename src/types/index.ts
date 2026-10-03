export type TripStatus = 'Ready to Go' | 'Needs Attention' | 'Action Required';

export type ItemStatus = 'Confirmed' | 'Suggested' | 'Needs Review' | 'Alternative Available' | 'Adapted Plan';

export type AlertSeverity = 'Low' | 'Moderate' | 'High' | 'Informational';

export type AlertCategory = 'All' | 'Route & Transport' | 'Weather' | 'Activities' | 'Facilities' | 'Safety Advisories' | 'Local Experience';

export type VerificationStatus = 'Moderator Verified' | 'Community Confirmed' | 'Local Partner Update' | 'Demo Advisory' | 'Pending Moderator Review';

export interface ReadinessFactors {
  routeStatus: number;
  stayBooking: number;
  providerTrust: number;
  destinationUpdates: number;
  tripCompleteness: number;
  overall: number;
  status: TripStatus;
}

export interface ItineraryItemType {
  id: string;
  day: number;
  time: string;
  title: string;
  category: 'Sightseeing' | 'Adventure' | 'Food' | 'Culture' | 'Guide' | 'Transport' | 'Stay';
  description: string;
  location: string;
  duration: string;
  estimatedCost: number; // in INR per person
  status: ItemStatus;
  statusNote?: string;
  providerId?: string;
  providerName?: string;
  weatherSensitive?: boolean;
}

export interface DayItinerary {
  day: number;
  title: string;
  dateStr?: string;
  isAdapted?: boolean;
  items: ItineraryItemType[];
}

export interface Provider {
  id: string;
  name: string;
  category: 'Homestay' | 'Adventure Guide' | 'Culture / Local Guide' | 'Transport' | 'Food and Culture';
  location: string;
  priceDisplay: string;
  pricePerUnit: number;
  priceUnit: 'night' | 'day' | 'person' | 'trip';
  trustScore: number;
  verificationBadge: 'Verified' | 'Community Reviewed' | 'Local Partner';
  languages: string[];
  availability: 'Available Today' | 'Limited Slots' | 'Booked';
  shortDescription: string;
  fullOverview: string;
  coverImage: string;
  amenitiesOrHighlights: string[];
  includedServices: string[];
  sampleFeedback: {
    author: string;
    date: string;
    comment: string;
    rating: number;
  }[];
  recentActivity: string;
  responseTime?: string;
  tags: string[];
  whyTrusted: {
    identityVerified: boolean;
    recentlyActive: boolean;
    consistentFeedback: boolean;
    communityModerated: boolean;
    localBaseEstablished: boolean;
  };
}

export interface TravelAlert {
  id: string;
  title: string;
  category: 'Route & Transport' | 'Weather' | 'Activities' | 'Facilities' | 'Safety Advisories' | 'Local Experience';
  severity: AlertSeverity;
  source: string;
  sourceType: 'Local activity operator' | 'Community report' | 'Local partner' | 'System advisory';
  status: VerificationStatus;
  reportedAgo: string;
  validUntil: string;
  location: string;
  coordinates?: { x: number; y: number }; // percentage on custom map
  impact: string;
  affectedDay?: number;
  affectedItemId?: string;
  hasAlternative?: boolean;
  actionText?: string;
  actionRoute?: string;
  isSampleAdvisory?: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: 'essential' | 'recommended';
  info?: string;
}

export interface TripPreferences {
  destination: string;
  duration: number; // days
  groupType: 'Solo' | 'Friends' | 'Family';
  groupSize: number;
  startDate: string;
  budgetCategory: 'Budget' | 'Moderate' | 'Premium';
  budgetPerPerson: number;
  interests: string[];
  transport: 'Self-drive' | 'Taxi' | 'Bus';
  prioritizeVerified: boolean;
  weatherBackup: boolean;
}
