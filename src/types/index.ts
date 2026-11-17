export type UserRole = 'student' | 'staff' | 'admin';

export type CrowdLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export type PortionSize = 'Small' | 'Regular' | 'Large';

export interface MessInfo {
  id: string;
  name: string;
  code: string;
  location: string;
  description: string;
  currentQueue: number;
  maxCapacity: number;
  crowdLevel: CrowdLevel;
  estimatedWaitMinutes: number;
  peakHours: string;
  todaysMenu: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
}

export interface MealSlot {
  id: string;
  messId: string;
  mealType: MealType;
  timeWindow: string; // e.g. "12:30 PM - 12:45 PM"
  maxCapacity: number;
  bookedCount: number;
  isPeak: boolean;
}

export interface MealBooking {
  id: string; // e.g. "LPU-MR-7391"
  studentName: string;
  studentReg: string;
  studentHostel: string;
  messId: string;
  messName: string;
  mealType: MealType;
  date: string;
  slotId: string;
  timeWindow: string;
  portion: PortionSize;
  status: 'CONFIRMED' | 'COLLECTED' | 'CANCELLED';
  createdAt: string;
  qrPayload: string;
  dietaryPreference?: string;
}

export interface MealFeedback {
  id: string;
  bookingId: string;
  studentName: string;
  studentReg: string;
  messId: string;
  messName: string;
  mealType: MealType;
  foodQuality: number; // 1-5
  tasteRating: number; // 1-5
  portionSatisfaction: 'Too Small' | 'Just Right' | 'Too Large';
  leftUneaten: boolean;
  leftoverReason?: 'Portion was too large' | 'Food quality was poor' | 'Taste was not satisfactory' | 'Student was full' | 'Other reason';
  suggestions: string;
  date: string;
}

export interface WasteRecord {
  id: string;
  messId: string;
  messName: string;
  date: string;
  mealType: MealType;
  foodPreparedKg: number;
  foodServedKg: number;
  foodReturnedKg: number;
  edibleLeftoverKg: number; // leftover in kitchen vessels
  plateWasteKg: number; // returned on student plates
  totalWasteKg: number; // edible leftover + plate waste
  wastePercentage: number; // (totalWasteKg / foodPreparedKg) * 100
  notes: string;
  isVerified: boolean;
  enteredBy: string;
}

export interface Stakeholder {
  id: string;
  role: string;
  group: 'Primary' | 'Secondary' | 'Tertiary';
  coreNeed: string;
  painPoint: string;
  influence: 'High' | 'Medium' | 'Low';
  interest: 'High' | 'Medium' | 'Low';
}

export interface UserInterview {
  id: string;
  participantCode: string; // e.g. "P-01"
  userCategory: 'Hostel Student' | 'Day Scholar' | 'Mess Manager' | 'Serving Staff' | 'Kitchen Supervisor' | 'Housekeeping';
  date: string;
  location: string;
  keyQuestion: string;
  exactResponse: string;
  keyInsight: string;
  emotion: string;
}

export interface FieldObservation {
  id: string;
  messLocation: string;
  date: string;
  timePeriod: string; // "12:45 PM (Peak Lunch)" or "7:45 PM (Peak Dinner)"
  queueCount: number;
  approxWaitTimeMin: number;
  servingLineActivity: string;
  plateReturnActivity: string;
  observedFoodWaste: string;
  criticalNotes: string;
}

export interface SurveyResponse {
  id: string;
  timestamp: string;
  userType: 'Hostel Resident' | 'Day Scholar';
  visitFrequency: 'Everyday' | '5-6 Days/Week' | '1-2 Days/Week';
  avgWaitTime: '< 10 mins' | '10-20 mins' | '20-35 mins' | '35+ mins';
  skipMealDueToQueue: 'Frequently' | 'Occasionally' | 'Rarely' | 'Never';
  foodLeftOnPlateFreq: 'Never' | 'Rarely' | 'Sometimes' | 'Often';
  primaryWasteReason: 'Portion too large' | 'Taste not appealing' | 'Rushed to class' | 'Cold food';
  wouldUseSlotBooking: 'Definitely Yes' | 'Probably' | 'Neutral' | 'No';
  wantsPortionSelection: 'Definitely Yes' | 'Probably' | 'Not Needed';
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  quote: string;
  age: number;
  department: string;
  hostelInfo: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  techProficiency: string;
  dailyRoutine: string;
}

export interface IdeationIdea {
  id: string;
  title: string;
  method: 'Brainstorming' | 'Crazy 8s' | 'Mind Mapping' | 'SCAMPER';
  scamperCategory?: 'Substitute' | 'Combine' | 'Adapt' | 'Modify' | 'Put to another use' | 'Eliminate' | 'Reverse';
  description: string;
  easeScore: number; // 1-5
  usefulnessScore: number; // 1-5
  costScore: number; // 1-5 (5 = cheapest)
  feasibilityScore: number; // 1-5
  impactScore: number; // 1-5
  totalScore: number;
  status: 'Selected' | 'Shortlisted' | 'Rejected';
  rationale: string;
}

export interface TestingIssue {
  id: string;
  description: string;
  reportedBy: string;
  severity: 'Serious' | 'Medium' | 'Small';
  date: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  proposedFix: string;
}

export interface TestingFeedbackMatrix {
  id: string;
  sessionTitle: string;
  participant: string;
  date: string;
  liked: string[];
  criticised: string[];
  questionsAsked: string[];
  newIdeas: string[];
}

export interface ChangeRecord {
  id: string;
  originalProblem: string;
  userFeedback: string;
  changeImplemented: string;
  reasonForChange: string;
  versionBefore: string;
  versionAfter: string;
  date: string;
}

export interface CheckpointItem {
  id: string;
  code: string; // "CP1" - "CP7"
  title: string;
  week: string;
  description: string;
  isComplete: boolean;
  deliverables: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  notes: string;
  evidenceFiles: string[];
  facultyFeedback?: string;
}

export interface VivaQA {
  id: string;
  question: string;
  suggestedAnswer: string;
  category: 'Problem & Empathy' | 'Ideation & Prototyping' | 'Testing & Evidence' | 'Impact & Scalability';
}
