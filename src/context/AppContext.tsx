import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  MessInfo,
  MealSlot,
  MealBooking,
  MealFeedback,
  WasteRecord,
  Stakeholder,
  UserInterview,
  FieldObservation,
  SurveyResponse,
  Persona,
  IdeationIdea,
  TestingIssue,
  TestingFeedbackMatrix,
  ChangeRecord,
  CheckpointItem,
  VivaQA,
  CrowdLevel,
  PortionSize,
  MealType
} from '../types';
import {
  INITIAL_MESSES,
  INITIAL_SLOTS,
  INITIAL_BOOKINGS,
  INITIAL_FEEDBACK,
  INITIAL_WASTE_RECORDS,
  INITIAL_STAKEHOLDERS,
  INITIAL_INTERVIEWS,
  INITIAL_OBSERVATIONS,
  INITIAL_SURVEY_RESPONSES,
  INITIAL_PERSONAS,
  INITIAL_IDEAS,
  INITIAL_TESTING_ISSUES,
  INITIAL_FEEDBACK_MATRICES,
  INITIAL_CHANGE_RECORDS,
  INITIAL_CHECKPOINTS,
  INITIAL_VIVA_QA,
  INITIAL_TEAM_MEMBERS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: {
    name: string;
    regNo: string;
    hostel: string;
    room: string;
    phone: string;
  };
  updateCurrentUser: (details: Partial<AppContextType['currentUser']>) => void;

  messes: MessInfo[];
  updateMessQueue: (messId: string, newQueueCount: number) => void;
  updateMessMenu: (messId: string, mealType: MealType, items: string[]) => void;

  slots: MealSlot[];
  getSlotsForMessAndMeal: (messId: string, mealType: MealType) => MealSlot[];

  bookings: MealBooking[];
  activeBooking: MealBooking | null;
  createBooking: (messId: string, mealType: MealType, slotId: string, portion: PortionSize, studentDiet?: string) => { success: boolean; message: string; booking?: MealBooking };
  cancelBooking: (bookingId: string) => void;
  markMealCollected: (bookingId: string) => void;

  feedbackList: MealFeedback[];
  submitFeedback: (feedback: Omit<MealFeedback, 'id' | 'date'>) => void;

  wasteRecords: WasteRecord[];
  addWasteRecord: (record: Omit<WasteRecord, 'id' | 'totalWasteKg' | 'wastePercentage'>) => void;
  deleteWasteRecord: (id: string) => void;

  // Design Thinking State
  stakeholders: Stakeholder[];
  updateStakeholder: (updated: Stakeholder) => void;

  interviews: UserInterview[];
  addInterview: (interview: Omit<UserInterview, 'id'>) => void;
  deleteInterview: (id: string) => void;

  observations: FieldObservation[];
  addObservation: (obs: Omit<FieldObservation, 'id'>) => void;

  surveyResponses: SurveyResponse[];
  addSurveyResponse: (resp: Omit<SurveyResponse, 'id' | 'timestamp'>) => void;

  personas: Persona[];
  updatePersona: (updated: Persona) => void;

  ideas: IdeationIdea[];
  addIdea: (idea: Omit<IdeationIdea, 'id' | 'totalScore'>) => void;
  updateIdeaStatus: (id: string, status: IdeationIdea['status']) => void;
  updateIdeaScores: (id: string, scores: Partial<Pick<IdeationIdea, 'easeScore' | 'usefulnessScore' | 'costScore' | 'feasibilityScore' | 'impactScore'>>) => void;

  testingIssues: TestingIssue[];
  addTestingIssue: (issue: Omit<TestingIssue, 'id' | 'date'>) => void;
  updateIssueStatus: (id: string, status: TestingIssue['status'], proposedFix?: string) => void;

  feedbackMatrices: TestingFeedbackMatrix[];
  addFeedbackMatrix: (matrix: Omit<TestingFeedbackMatrix, 'id'>) => void;

  changeRecords: ChangeRecord[];
  addChangeRecord: (record: Omit<ChangeRecord, 'id' | 'date'>) => void;

  checkpoints: CheckpointItem[];
  toggleCheckpointDeliverable: (checkpointId: string, deliverableId: string) => void;
  updateCheckpointNotes: (checkpointId: string, notes: string) => void;
  setCheckpointCompleted: (checkpointId: string, isComplete: boolean) => void;

  vivaQAs: VivaQA[];
  updateVivaAnswer: (id: string, newAnswer: string) => void;

  teamMembers: typeof INITIAL_TEAM_MEMBERS;
  updateTeamMember: (id: string, updates: Partial<(typeof INITIAL_TEAM_MEMBERS)[0]>) => void;

  // Global utilities
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
  exportCsv: (dataType: 'bookings' | 'waste' | 'survey' | 'ideas') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'btmr_user_role',
  USER: 'btmr_user_profile',
  MESSES: 'btmr_messes',
  SLOTS: 'btmr_slots',
  BOOKINGS: 'btmr_bookings',
  FEEDBACK: 'btmr_feedback',
  WASTE: 'btmr_waste',
  STAKEHOLDERS: 'btmr_stakeholders',
  INTERVIEWS: 'btmr_interviews',
  OBSERVATIONS: 'btmr_observations',
  SURVEY: 'btmr_survey',
  PERSONAS: 'btmr_personas',
  IDEAS: 'btmr_ideas',
  TESTING_ISSUES: 'btmr_testing_issues',
  FEEDBACK_MATRICES: 'btmr_feedback_matrices',
  CHANGE_RECORDS: 'btmr_change_records',
  CHECKPOINTS: 'btmr_checkpoints',
  VIVA: 'btmr_viva',
  TEAM: 'btmr_team'
};

function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => getStoredItem<UserRole>(STORAGE_KEYS.ROLE, 'student'));
  const [currentUser, setCurrentUser] = useState(() =>
    getStoredItem(STORAGE_KEYS.USER, {
      name: 'Rohan Sharma',
      regNo: '12204891',
      hostel: 'Boys Hostel 34',
      room: '412',
      phone: '+91 98765 43210'
    })
  );

  const [messes, setMesses] = useState<MessInfo[]>(() => getStoredItem(STORAGE_KEYS.MESSES, INITIAL_MESSES));
  const [slots, setSlots] = useState<MealSlot[]>(() => getStoredItem(STORAGE_KEYS.SLOTS, INITIAL_SLOTS));
  const [bookings, setBookings] = useState<MealBooking[]>(() => getStoredItem(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS));
  const [feedbackList, setFeedbackList] = useState<MealFeedback[]>(() => getStoredItem(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK));
  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>(() => getStoredItem(STORAGE_KEYS.WASTE, INITIAL_WASTE_RECORDS));

  // Design Thinking datasets
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(() => getStoredItem(STORAGE_KEYS.STAKEHOLDERS, INITIAL_STAKEHOLDERS));
  const [interviews, setInterviews] = useState<UserInterview[]>(() => getStoredItem(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS));
  const [observations, setObservations] = useState<FieldObservation[]>(() => getStoredItem(STORAGE_KEYS.OBSERVATIONS, INITIAL_OBSERVATIONS));
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>(() => getStoredItem(STORAGE_KEYS.SURVEY, INITIAL_SURVEY_RESPONSES));
  const [personas, setPersonas] = useState<Persona[]>(() => getStoredItem(STORAGE_KEYS.PERSONAS, INITIAL_PERSONAS));
  const [ideas, setIdeas] = useState<IdeationIdea[]>(() => getStoredItem(STORAGE_KEYS.IDEAS, INITIAL_IDEAS));
  const [testingIssues, setTestingIssues] = useState<TestingIssue[]>(() => getStoredItem(STORAGE_KEYS.TESTING_ISSUES, INITIAL_TESTING_ISSUES));
  const [feedbackMatrices, setFeedbackMatrices] = useState<TestingFeedbackMatrix[]>(() => getStoredItem(STORAGE_KEYS.FEEDBACK_MATRICES, INITIAL_FEEDBACK_MATRICES));
  const [changeRecords, setChangeRecords] = useState<ChangeRecord[]>(() => getStoredItem(STORAGE_KEYS.CHANGE_RECORDS, INITIAL_CHANGE_RECORDS));
  const [checkpoints, setCheckpoints] = useState<CheckpointItem[]>(() => getStoredItem(STORAGE_KEYS.CHECKPOINTS, INITIAL_CHECKPOINTS));
  const [vivaQAs, setVivaQAs] = useState<VivaQA[]>(() => getStoredItem(STORAGE_KEYS.VIVA, INITIAL_VIVA_QA));
  const [teamMembers, setTeamMembers] = useState(() => getStoredItem(STORAGE_KEYS.TEAM, INITIAL_TEAM_MEMBERS));

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Show Toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ROLE, JSON.stringify(role)); }, [role]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.MESSES, JSON.stringify(messes)); }, [messes]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slots)); }, [slots]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList)); }, [feedbackList]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.WASTE, JSON.stringify(wasteRecords)); }, [wasteRecords]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.STAKEHOLDERS, JSON.stringify(stakeholders)); }, [stakeholders]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews)); }, [interviews]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.OBSERVATIONS, JSON.stringify(observations)); }, [observations]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SURVEY, JSON.stringify(surveyResponses)); }, [surveyResponses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas)); }, [personas]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas)); }, [ideas]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TESTING_ISSUES, JSON.stringify(testingIssues)); }, [testingIssues]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.FEEDBACK_MATRICES, JSON.stringify(feedbackMatrices)); }, [feedbackMatrices]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CHANGE_RECORDS, JSON.stringify(changeRecords)); }, [changeRecords]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CHECKPOINTS, JSON.stringify(checkpoints)); }, [checkpoints]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.VIVA, JSON.stringify(vivaQAs)); }, [vivaQAs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers)); }, [teamMembers]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(`Switched active view to ${newRole.toUpperCase()} mode`, 'info');
  };

  const updateCurrentUser = (details: Partial<typeof currentUser>) => {
    setCurrentUser(prev => ({ ...prev, ...details }));
    showToast('Profile information updated successfully');
  };

  // Crowd & Mess helpers
  const updateMessQueue = (messId: string, newQueueCount: number) => {
    setMesses(prev =>
      prev.map(m => {
        if (m.id === messId) {
          let crowdLevel: CrowdLevel = 'LOW';
          let estWait = Math.round(newQueueCount * 0.6); // ~36 sec per person
          if (newQueueCount >= 30) {
            crowdLevel = 'HIGH';
          } else if (newQueueCount >= 15) {
            crowdLevel = 'MEDIUM';
          }
          return {
            ...m,
            currentQueue: newQueueCount,
            crowdLevel,
            estimatedWaitMinutes: Math.max(2, estWait)
          };
        }
        return m;
      })
    );
    showToast('Mess queue count & crowd status updated');
  };

  const updateMessMenu = (messId: string, mealType: MealType, items: string[]) => {
    setMesses(prev =>
      prev.map(m => {
        if (m.id === messId) {
          const key = mealType.toLowerCase() as 'breakfast' | 'lunch' | 'dinner';
          return {
            ...m,
            todaysMenu: {
              ...m.todaysMenu,
              [key]: items
            }
          };
        }
        return m;
      })
    );
    showToast(`Updated ${mealType} menu successfully`);
  };

  const getSlotsForMessAndMeal = (messId: string, mealType: MealType) => {
    return slots.filter(s => s.messId === messId && s.mealType === mealType);
  };

  // Active student booking (most recent confirmed booking)
  const activeBooking = bookings.find(b => b.status === 'CONFIRMED' && b.studentReg === currentUser.regNo) || null;

  // Booking Flow with Overbooking Prevention
  const createBooking = (
    messId: string,
    mealType: MealType,
    slotId: string,
    portion: PortionSize,
    studentDiet?: string
  ) => {
    const targetSlot = slots.find(s => s.id === slotId);
    if (!targetSlot) {
      return { success: false, message: 'Selected meal slot could not be found.' };
    }

    if (targetSlot.bookedCount >= targetSlot.maxCapacity) {
      return { success: false, message: 'This slot is completely full! Please select an alternate time window.' };
    }

    // Check if student already has a confirmed booking for this meal
    const existing = bookings.find(
      b => b.studentReg === currentUser.regNo && b.mealType === mealType && b.status === 'CONFIRMED'
    );
    if (existing) {
      return {
        success: false,
        message: `You already hold an active pass (${existing.id}) for ${mealType}. Cancel it first to re-book.`
      };
    }

    const mess = messes.find(m => m.id === messId);
    const bookingId = `LPU-MR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: MealBooking = {
      id: bookingId,
      studentName: currentUser.name,
      studentReg: currentUser.regNo,
      studentHostel: `${currentUser.hostel}, Room ${currentUser.room}`,
      messId,
      messName: mess?.name || 'LPU Mess',
      mealType,
      date: new Date().toISOString().split('T')[0],
      slotId,
      timeWindow: targetSlot.timeWindow,
      portion,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      qrPayload: `${bookingId}|${currentUser.name}|${currentUser.regNo}|${mess?.code || 'LPU'}|${mealType}|${targetSlot.timeWindow}|${portion}`,
      dietaryPreference: studentDiet || 'Standard Vegetarian'
    };

    // Increment slot booked count
    setSlots(prev =>
      prev.map(s => (s.id === slotId ? { ...s, bookedCount: s.bookedCount + 1 } : s))
    );

    // Save booking
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Meal booked! Your pass ID is ${bookingId}`);
    return { success: true, message: 'Booking confirmed!', booking: newBooking };
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Release capacity on slot
    setSlots(prev =>
      prev.map(s => (s.id === booking.slotId ? { ...s, bookedCount: Math.max(0, s.bookedCount - 1) } : s))
    );

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
    showToast(`Pass ${bookingId} has been cancelled.`);
  };

  const markMealCollected = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'COLLECTED' } : b))
    );
    showToast(`Pass ${bookingId} marked as meal collected by staff.`);
  };

  // Feedback
  const submitFeedback = (data: Omit<MealFeedback, 'id' | 'date'>) => {
    const newFeedback: MealFeedback = {
      ...data,
      id: `fb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setFeedbackList(prev => [newFeedback, ...prev]);
    showToast('Thank you! Meal feedback saved persistently.');
  };

  // Waste Tracking
  const addWasteRecord = (data: Omit<WasteRecord, 'id' | 'totalWasteKg' | 'wastePercentage'>) => {
    const totalWasteKg = Number((data.edibleLeftoverKg + data.plateWasteKg).toFixed(1));
    const wastePercentage = Number(((totalWasteKg / Math.max(1, data.foodPreparedKg)) * 100).toFixed(1));
    const newRecord: WasteRecord = {
      ...data,
      id: `w-${Date.now()}`,
      totalWasteKg,
      wastePercentage
    };
    setWasteRecords(prev => [newRecord, ...prev]);
    showToast('Kitchen food waste log recorded successfully!');
  };

  const deleteWasteRecord = (id: string) => {
    setWasteRecords(prev => prev.filter(r => r.id !== id));
    showToast('Food waste record deleted');
  };

  // Design Thinking Helpers
  const updateStakeholder = (updated: Stakeholder) => {
    setStakeholders(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    showToast('Stakeholder details updated');
  };

  const addInterview = (interview: Omit<UserInterview, 'id'>) => {
    const newInterview: UserInterview = { ...interview, id: `int-${Date.now()}` };
    setInterviews(prev => [newInterview, ...prev]);
    showToast('New user interview log added');
  };

  const deleteInterview = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
    showToast('Interview log removed');
  };

  const addObservation = (obs: Omit<FieldObservation, 'id'>) => {
    const newObs: FieldObservation = { ...obs, id: `obs-${Date.now()}` };
    setObservations(prev => [newObs, ...prev]);
    showToast('Field observation session logged');
  };

  const addSurveyResponse = (resp: Omit<SurveyResponse, 'id' | 'timestamp'>) => {
    const newResp: SurveyResponse = {
      ...resp,
      id: `sr-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setSurveyResponses(prev => [newResp, ...prev]);
    showToast('Survey response registered');
  };

  const updatePersona = (updated: Persona) => {
    setPersonas(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Persona ${updated.name} updated`);
  };

  const addIdea = (idea: Omit<IdeationIdea, 'id' | 'totalScore'>) => {
    const totalScore = idea.easeScore + idea.usefulnessScore + idea.costScore + idea.feasibilityScore + idea.impactScore;
    const newIdea: IdeationIdea = {
      ...idea,
      id: `id-${Date.now()}`,
      totalScore
    };
    setIdeas(prev => [newIdea, ...prev]);
    showToast('Idea recorded in ideation repository');
  };

  const updateIdeaStatus = (id: string, status: IdeationIdea['status']) => {
    setIdeas(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
    showToast('Idea status updated');
  };

  const updateIdeaScores = (
    id: string,
    scores: Partial<Pick<IdeationIdea, 'easeScore' | 'usefulnessScore' | 'costScore' | 'feasibilityScore' | 'impactScore'>>
  ) => {
    setIdeas(prev =>
      prev.map(i => {
        if (i.id === id) {
          const easeScore = scores.easeScore ?? i.easeScore;
          const usefulnessScore = scores.usefulnessScore ?? i.usefulnessScore;
          const costScore = scores.costScore ?? i.costScore;
          const feasibilityScore = scores.feasibilityScore ?? i.feasibilityScore;
          const impactScore = scores.impactScore ?? i.impactScore;
          const totalScore = easeScore + usefulnessScore + costScore + feasibilityScore + impactScore;
          return {
            ...i,
            easeScore,
            usefulnessScore,
            costScore,
            feasibilityScore,
            impactScore,
            totalScore
          };
        }
        return i;
      })
    );
    showToast('Screening matrix scores updated');
  };

  const addTestingIssue = (issue: Omit<TestingIssue, 'id' | 'date'>) => {
    const newIssue: TestingIssue = {
      ...issue,
      id: `iss-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTestingIssues(prev => [newIssue, ...prev]);
    showToast('Testing issue logged');
  };

  const updateIssueStatus = (id: string, status: TestingIssue['status'], proposedFix?: string) => {
    setTestingIssues(prev =>
      prev.map(i => (i.id === id ? { ...i, status, proposedFix: proposedFix ?? i.proposedFix } : i))
    );
    showToast(`Issue status changed to ${status}`);
  };

  const addFeedbackMatrix = (matrix: Omit<TestingFeedbackMatrix, 'id'>) => {
    const newMatrix: TestingFeedbackMatrix = { ...matrix, id: `tfm-${Date.now()}` };
    setFeedbackMatrices(prev => [newMatrix, ...prev]);
    showToast('Feedback capture matrix session saved');
  };

  const addChangeRecord = (record: Omit<ChangeRecord, 'id' | 'date'>) => {
    const newRecord: ChangeRecord = {
      ...record,
      id: `cr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setChangeRecords(prev => [newRecord, ...prev]);
    showToast('Evidence-based change record saved');
  };

  // Checkpoints
  const toggleCheckpointDeliverable = (checkpointId: string, deliverableId: string) => {
    setCheckpoints(prev =>
      prev.map(cp => {
        if (cp.id === checkpointId) {
          const updatedDeliverables = cp.deliverables.map(d =>
            d.id === deliverableId ? { ...d, completed: !d.completed } : d
          );
          const allCompleted = updatedDeliverables.every(d => d.completed);
          return {
            ...cp,
            deliverables: updatedDeliverables,
            isComplete: allCompleted
          };
        }
        return cp;
      })
    );
  };

  const updateCheckpointNotes = (checkpointId: string, notes: string) => {
    setCheckpoints(prev =>
      prev.map(cp => (cp.id === checkpointId ? { ...cp, notes } : cp))
    );
    showToast('Checkpoint notes saved');
  };

  const setCheckpointCompleted = (checkpointId: string, isComplete: boolean) => {
    setCheckpoints(prev =>
      prev.map(cp => (cp.id === checkpointId ? { ...cp, isComplete } : cp))
    );
    showToast('Checkpoint status updated');
  };

  const updateVivaAnswer = (id: string, newAnswer: string) => {
    setVivaQAs(prev =>
      prev.map(v => (v.id === id ? { ...v, suggestedAnswer: newAnswer } : v))
    );
    showToast('Viva model answer updated');
  };

  const updateTeamMember = (id: string, updates: Partial<(typeof INITIAL_TEAM_MEMBERS)[0]>) => {
    setTeamMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updates } : m))
    );
    showToast('Team member contribution details updated');
  };

  // Reset Data to Default
  const resetAllData = () => {
    setMesses(INITIAL_MESSES);
    setSlots(INITIAL_SLOTS);
    setBookings(INITIAL_BOOKINGS);
    setFeedbackList(INITIAL_FEEDBACK);
    setWasteRecords(INITIAL_WASTE_RECORDS);
    setStakeholders(INITIAL_STAKEHOLDERS);
    setInterviews(INITIAL_INTERVIEWS);
    setObservations(INITIAL_OBSERVATIONS);
    setSurveyResponses(INITIAL_SURVEY_RESPONSES);
    setPersonas(INITIAL_PERSONAS);
    setIdeas(INITIAL_IDEAS);
    setTestingIssues(INITIAL_TESTING_ISSUES);
    setFeedbackMatrices(INITIAL_FEEDBACK_MATRICES);
    setChangeRecords(INITIAL_CHANGE_RECORDS);
    setCheckpoints(INITIAL_CHECKPOINTS);
    setVivaQAs(INITIAL_VIVA_QA);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    showToast('Reset all demonstration datasets to initial state', 'info');
  };

  // CSV Export
  const exportCsv = (dataType: 'bookings' | 'waste' | 'survey' | 'ideas') => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let filename = `beat-the-mess-rush-${dataType}-${new Date().toISOString().split('T')[0]}.csv`;

    if (dataType === 'bookings') {
      csvContent += 'Booking ID,Student Name,Reg No,Hostel,Mess,Meal Type,Date,Slot Time,Portion,Status\n';
      bookings.forEach(b => {
        csvContent += `"${b.id}","${b.studentName}","${b.studentReg}","${b.studentHostel}","${b.messName}","${b.mealType}","${b.date}","${b.timeWindow}","${b.portion}","${b.status}"\n`;
      });
    } else if (dataType === 'waste') {
      csvContent += 'Log ID,Mess,Date,Meal,Prepared (Kg),Served (Kg),Returned (Kg),Edible Leftover (Kg),Plate Waste (Kg),Total Waste (Kg),Waste %,Notes\n';
      wasteRecords.forEach(w => {
        csvContent += `"${w.id}","${w.messName}","${w.date}","${w.mealType}",${w.foodPreparedKg},${w.foodServedKg},${w.foodReturnedKg},${w.edibleLeftoverKg},${w.plateWasteKg},${w.totalWasteKg},${w.wastePercentage},"${w.notes.replace(/"/g, '""')}"\n`;
      });
    } else if (dataType === 'survey') {
      csvContent += 'ID,Timestamp,User Type,Visit Frequency,Avg Wait Time,Skip Meal Freq,Food Left on Plate,Primary Waste Reason,Would Use Slots,Wants Portions\n';
      surveyResponses.forEach(s => {
        csvContent += `"${s.id}","${s.timestamp}","${s.userType}","${s.visitFrequency}","${s.avgWaitTime}","${s.skipMealDueToQueue}","${s.foodLeftOnPlateFreq}","${s.primaryWasteReason}","${s.wouldUseSlotBooking}","${s.wantsPortionSelection}"\n`;
      });
    } else if (dataType === 'ideas') {
      csvContent += 'ID,Title,Method,SCAMPER Category,Description,Ease (1-5),Usefulness (1-5),Cost (1-5),Feasibility (1-5),Impact (1-5),Total Score,Status,Rationale\n';
      ideas.forEach(i => {
        csvContent += `"${i.id}","${i.title}","${i.method}","${i.scamperCategory || 'N/A'}","${i.description.replace(/"/g, '""')}",${i.easeScore},${i.usefulnessScore},${i.costScore},${i.feasibilityScore},${i.impactScore},${i.totalScore},"${i.status}","${i.rationale.replace(/"/g, '""')}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${dataType} data to CSV successfully!`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        updateCurrentUser,
        messes,
        updateMessQueue,
        updateMessMenu,
        slots,
        getSlotsForMessAndMeal,
        bookings,
        activeBooking,
        createBooking,
        cancelBooking,
        markMealCollected,
        feedbackList,
        submitFeedback,
        wasteRecords,
        addWasteRecord,
        deleteWasteRecord,
        stakeholders,
        updateStakeholder,
        interviews,
        addInterview,
        deleteInterview,
        observations,
        addObservation,
        surveyResponses,
        addSurveyResponse,
        personas,
        updatePersona,
        ideas,
        addIdea,
        updateIdeaStatus,
        updateIdeaScores,
        testingIssues,
        addTestingIssue,
        updateIssueStatus,
        feedbackMatrices,
        addFeedbackMatrix,
        changeRecords,
        addChangeRecord,
        checkpoints,
        toggleCheckpointDeliverable,
        updateCheckpointNotes,
        setCheckpointCompleted,
        vivaQAs,
        updateVivaAnswer,
        teamMembers,
        updateTeamMember,
        toasts,
        showToast,
        removeToast,
        resetAllData,
        exportCsv
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
