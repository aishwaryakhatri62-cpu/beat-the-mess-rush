import {
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
  VivaQA
} from '../types';

export const INITIAL_MESSES: MessInfo[] = [
  {
    id: 'mess-north',
    name: 'North Mess (Sample Campus Complex)',
    code: 'NM-01',
    location: 'North Residential Sector, Near Block 38',
    description: 'Demonstration campus mess servicing hostel blocks 36, 37, and 38. High evening dinner crowd.',
    currentQueue: 42,
    maxCapacity: 180,
    crowdLevel: 'HIGH',
    estimatedWaitMinutes: 24,
    peakHours: '12:45 PM - 1:45 PM & 7:45 PM - 8:45 PM',
    todaysMenu: {
      breakfast: ['Aloo Paratha with Curd', 'Poha with Peanuts', 'Boiled Eggs', 'Masala Tea', 'Seasonal Fruit'],
      lunch: ['Paneer Butter Masala', 'Yellow Dal Tadka', 'Jeera Rice', 'Tawa Roti', 'Cucumber Raita', 'Gulab Jamun'],
      dinner: ['Dum Aloo Kashmiri', 'Dal Makhani', 'Steamed Basmati Rice', 'Butter Naan / Roti', 'Green Salad', 'Kheer']
    }
  },
  {
    id: 'mess-central',
    name: 'Central Mess (Uni-Mall Hub)',
    code: 'CM-02',
    location: 'Central Academic Zone, Uni-Mall Lower Ground',
    description: 'Centralized dining hall catering to both hostelers and day scholars. High lunch density between lectures.',
    currentQueue: 22,
    maxCapacity: 250,
    crowdLevel: 'MEDIUM',
    estimatedWaitMinutes: 12,
    peakHours: '12:30 PM - 1:30 PM',
    todaysMenu: {
      breakfast: ['Idli Sambar & Coconut Chutney', 'Upma', 'Bread Omelette', 'Filter Coffee'],
      lunch: ['Rajma Masala', 'Mix Veg Curry', 'Steamed Rice', 'Tandoori Roti', 'Boondi Raita', 'Papad'],
      dinner: ['Kadhai Paneer', 'Chana Dal Fry', 'Jeera Rice', 'Chapati', 'Fresh Salad', 'Custard']
    }
  },
  {
    id: 'mess-south',
    name: 'South Mess (Boys Hostel Block 34)',
    code: 'SM-03',
    location: 'South Campus Quadrangle, Near Sports Complex',
    description: 'Spacious dining facility with multi-counter distribution. Lower crowd during mid-day.',
    currentQueue: 8,
    maxCapacity: 200,
    crowdLevel: 'LOW',
    estimatedWaitMinutes: 4,
    peakHours: '1:00 PM - 1:45 PM & 8:15 PM - 9:00 PM',
    todaysMenu: {
      breakfast: ['Chole Bhature (Weekend Special)', 'Cornflakes & Milk', 'Banana', 'Tea/Coffee'],
      lunch: ['Matar Paneer', 'Moong Dal Fry', 'Peas Pulao', 'Phulka Roti', 'Dahi Vada', 'Pickle'],
      dinner: ['Egg Curry / Shahi Soya Chaap', 'Dal Tadka', 'Biryani Rice', 'Roti', 'Beetroot Salad', 'Ice Cream']
    }
  }
];

export const INITIAL_SLOTS: MealSlot[] = [
  // Lunch Slots for North Mess
  { id: 'nm-l-1', messId: 'mess-north', mealType: 'Lunch', timeWindow: '12:15 PM - 12:30 PM', maxCapacity: 45, bookedCount: 18, isPeak: false },
  { id: 'nm-l-2', messId: 'mess-north', mealType: 'Lunch', timeWindow: '12:30 PM - 12:45 PM', maxCapacity: 45, bookedCount: 32, isPeak: false },
  { id: 'nm-l-3', messId: 'mess-north', mealType: 'Lunch', timeWindow: '12:45 PM - 01:00 PM', maxCapacity: 45, bookedCount: 45, isPeak: true },
  { id: 'nm-l-4', messId: 'mess-north', mealType: 'Lunch', timeWindow: '01:00 PM - 01:15 PM', maxCapacity: 45, bookedCount: 44, isPeak: true },
  { id: 'nm-l-5', messId: 'mess-north', mealType: 'Lunch', timeWindow: '01:15 PM - 01:30 PM', maxCapacity: 45, bookedCount: 38, isPeak: true },
  { id: 'nm-l-6', messId: 'mess-north', mealType: 'Lunch', timeWindow: '01:30 PM - 01:45 PM', maxCapacity: 45, bookedCount: 20, isPeak: false },
  { id: 'nm-l-7', messId: 'mess-north', mealType: 'Lunch', timeWindow: '01:45 PM - 02:00 PM', maxCapacity: 45, bookedCount: 12, isPeak: false },

  // Dinner Slots for North Mess
  { id: 'nm-d-1', messId: 'mess-north', mealType: 'Dinner', timeWindow: '07:30 PM - 07:45 PM', maxCapacity: 50, bookedCount: 15, isPeak: false },
  { id: 'nm-d-2', messId: 'mess-north', mealType: 'Dinner', timeWindow: '07:45 PM - 08:00 PM', maxCapacity: 50, bookedCount: 48, isPeak: true },
  { id: 'nm-d-3', messId: 'mess-north', mealType: 'Dinner', timeWindow: '08:00 PM - 08:15 PM', maxCapacity: 50, bookedCount: 50, isPeak: true },
  { id: 'nm-d-4', messId: 'mess-north', mealType: 'Dinner', timeWindow: '08:15 PM - 08:30 PM', maxCapacity: 50, bookedCount: 47, isPeak: true },
  { id: 'nm-d-5', messId: 'mess-north', mealType: 'Dinner', timeWindow: '08:30 PM - 08:45 PM', maxCapacity: 50, bookedCount: 28, isPeak: false },

  // Central Mess Slots
  { id: 'cm-l-1', messId: 'mess-central', mealType: 'Lunch', timeWindow: '12:30 PM - 12:45 PM', maxCapacity: 60, bookedCount: 34, isPeak: false },
  { id: 'cm-l-2', messId: 'mess-central', mealType: 'Lunch', timeWindow: '12:45 PM - 01:00 PM', maxCapacity: 60, bookedCount: 58, isPeak: true },
  { id: 'cm-l-3', messId: 'mess-central', mealType: 'Lunch', timeWindow: '01:00 PM - 01:15 PM', maxCapacity: 60, bookedCount: 60, isPeak: true },
  { id: 'cm-l-4', messId: 'mess-central', mealType: 'Lunch', timeWindow: '01:15 PM - 01:30 PM', maxCapacity: 60, bookedCount: 42, isPeak: false },

  // South Mess Slots
  { id: 'sm-l-1', messId: 'mess-south', mealType: 'Lunch', timeWindow: '12:30 PM - 12:45 PM', maxCapacity: 50, bookedCount: 14, isPeak: false },
  { id: 'sm-l-2', messId: 'mess-south', mealType: 'Lunch', timeWindow: '12:45 PM - 01:00 PM', maxCapacity: 50, bookedCount: 22, isPeak: false },
  { id: 'sm-l-3', messId: 'mess-south', mealType: 'Lunch', timeWindow: '01:00 PM - 01:15 PM', maxCapacity: 50, bookedCount: 31, isPeak: false },
  { id: 'sm-l-4', messId: 'mess-south', mealType: 'Lunch', timeWindow: '01:15 PM - 01:30 PM', maxCapacity: 50, bookedCount: 19, isPeak: false }
];

export const INITIAL_BOOKINGS: MealBooking[] = [
  {
    id: 'LPU-MR-8419',
    studentName: 'Rohan Sharma',
    studentReg: '12204891',
    studentHostel: 'BH-34, Room 412',
    messId: 'mess-north',
    messName: 'North Mess (Sample Campus Complex)',
    mealType: 'Lunch',
    date: '2026-11-18',
    slotId: 'nm-l-2',
    timeWindow: '12:30 PM - 12:45 PM',
    portion: 'Regular',
    status: 'CONFIRMED',
    createdAt: '2026-11-18T09:30:00Z',
    qrPayload: 'LPU-MR-8419|Rohan Sharma|12204891|NM-01|Lunch|12:30 PM - 12:45 PM|Regular'
  },
  {
    id: 'LPU-MR-8420',
    studentName: 'Ananya Verma',
    studentReg: '12215902',
    studentHostel: 'GH-14, Room 204',
    messId: 'mess-central',
    messName: 'Central Mess (Uni-Mall Hub)',
    mealType: 'Lunch',
    date: '2026-11-18',
    slotId: 'cm-l-1',
    timeWindow: '12:30 PM - 12:45 PM',
    portion: 'Small',
    status: 'CONFIRMED',
    createdAt: '2026-11-18T09:45:00Z',
    qrPayload: 'LPU-MR-8420|Ananya Verma|12215902|CM-02|Lunch|12:30 PM - 12:45 PM|Small'
  },
  {
    id: 'LPU-MR-8421',
    studentName: 'Gurpreet Singh',
    studentReg: '12108743',
    studentHostel: 'BH-38, Room 108',
    messId: 'mess-north',
    messName: 'North Mess (Sample Campus Complex)',
    mealType: 'Lunch',
    date: '2026-11-18',
    slotId: 'nm-l-3',
    timeWindow: '12:45 PM - 01:00 PM',
    portion: 'Large',
    status: 'CONFIRMED',
    createdAt: '2026-11-18T10:12:00Z',
    qrPayload: 'LPU-MR-8421|Gurpreet Singh|12108743|NM-01|Lunch|12:45 PM - 01:00 PM|Large'
  }
];

export const INITIAL_FEEDBACK: MealFeedback[] = [
  {
    id: 'fb-01',
    bookingId: 'LPU-MR-8201',
    studentName: 'Aman Deep',
    studentReg: '12209182',
    messId: 'mess-north',
    messName: 'North Mess',
    mealType: 'Lunch',
    foodQuality: 4,
    tasteRating: 4,
    portionSatisfaction: 'Just Right',
    leftUneaten: false,
    suggestions: 'Slot timing worked great, collected food in 3 minutes without standing in the long line!',
    date: '2026-11-17'
  },
  {
    id: 'fb-02',
    bookingId: 'LPU-MR-8202',
    studentName: 'Priya Nair',
    studentReg: '12214321',
    messId: 'mess-central',
    messName: 'Central Mess',
    mealType: 'Dinner',
    foodQuality: 3,
    tasteRating: 2,
    portionSatisfaction: 'Too Large',
    leftUneaten: true,
    leftoverReason: 'Portion was too large',
    suggestions: 'Server scooped 3 big katoris of rice even when I said small. The portion choice on the app was helpful, need staff to adhere to it.',
    date: '2026-11-17'
  },
  {
    id: 'fb-03',
    bookingId: 'LPU-MR-8203',
    studentName: 'Vikas Mehra',
    studentReg: '12110294',
    messId: 'mess-south',
    messName: 'South Mess',
    mealType: 'Lunch',
    foodQuality: 4,
    tasteRating: 3,
    portionSatisfaction: 'Just Right',
    leftUneaten: true,
    leftoverReason: 'Taste was not satisfactory',
    suggestions: 'Dal was too watery today. Roti was fresh and warm.',
    date: '2026-11-17'
  },
  {
    id: 'fb-04',
    bookingId: 'LPU-MR-8204',
    studentName: 'Simran Kaur',
    studentReg: '12207765',
    messId: 'mess-north',
    messName: 'North Mess',
    mealType: 'Dinner',
    foodQuality: 2,
    tasteRating: 2,
    portionSatisfaction: 'Too Large',
    leftUneaten: true,
    leftoverReason: 'Student was full',
    suggestions: 'Had eaten snacks earlier. Need a mini-portion option with just 2 rotis and sabzi.',
    date: '2026-11-16'
  }
];

export const INITIAL_WASTE_RECORDS: WasteRecord[] = [
  {
    id: 'w-101',
    messId: 'mess-north',
    messName: 'North Mess',
    date: '2026-11-17',
    mealType: 'Lunch',
    foodPreparedKg: 340,
    foodServedKg: 295,
    foodReturnedKg: 28,
    edibleLeftoverKg: 17,
    plateWasteKg: 28,
    totalWasteKg: 45,
    wastePercentage: 13.2,
    notes: 'Significant rice and dal returned at plate drop station during peak rush hour.',
    isVerified: true,
    enteredBy: 'Ramesh Kumar (Kitchen Supervisor)'
  },
  {
    id: 'w-102',
    messId: 'mess-north',
    messName: 'North Mess',
    date: '2026-11-17',
    mealType: 'Dinner',
    foodPreparedKg: 310,
    foodServedKg: 272,
    foodReturnedKg: 24,
    edibleLeftoverKg: 14,
    plateWasteKg: 24,
    totalWasteKg: 38,
    wastePercentage: 12.3,
    notes: 'Naan leftovers high because they turned chewy when served in batches.',
    isVerified: true,
    enteredBy: 'Ramesh Kumar (Kitchen Supervisor)'
  },
  {
    id: 'w-103',
    messId: 'mess-central',
    messName: 'Central Mess',
    date: '2026-11-17',
    mealType: 'Lunch',
    foodPreparedKg: 420,
    foodServedKg: 375,
    foodReturnedKg: 34,
    edibleLeftoverKg: 21,
    plateWasteKg: 34,
    totalWasteKg: 55,
    wastePercentage: 13.1,
    notes: 'Large lunch crowd. Standard serving scoop size led to excess rice leftovers on plates.',
    isVerified: true,
    enteredBy: 'S. K. Verma (Mess Manager)'
  },
  {
    id: 'w-104',
    messId: 'mess-south',
    messName: 'South Mess',
    date: '2026-11-17',
    mealType: 'Lunch',
    foodPreparedKg: 280,
    foodServedKg: 254,
    foodReturnedKg: 18,
    edibleLeftoverKg: 12,
    plateWasteKg: 18,
    totalWasteKg: 30,
    wastePercentage: 10.7,
    notes: 'Better portion control recorded today; staggered arrival observed.',
    isVerified: true,
    enteredBy: 'Satish Chand (Supervisor)'
  },
  {
    id: 'w-105',
    messId: 'mess-north',
    messName: 'North Mess',
    date: '2026-11-16',
    mealType: 'Lunch',
    foodPreparedKg: 350,
    foodServedKg: 298,
    foodReturnedKg: 35,
    edibleLeftoverKg: 22,
    plateWasteKg: 35,
    totalWasteKg: 57,
    wastePercentage: 16.3,
    notes: 'Baseline measurement before initial prototype testing. High uncoordinated queue.',
    isVerified: true,
    enteredBy: 'Ramesh Kumar (Kitchen Supervisor)'
  },
  {
    id: 'w-106',
    messId: 'mess-north',
    messName: 'North Mess',
    date: '2026-11-15',
    mealType: 'Lunch',
    foodPreparedKg: 360,
    foodServedKg: 302,
    foodReturnedKg: 38,
    edibleLeftoverKg: 25,
    plateWasteKg: 38,
    totalWasteKg: 63,
    wastePercentage: 17.5,
    notes: 'Pre-pilot baseline day. Heavy rush and food left on trays.',
    isVerified: true,
    enteredBy: 'Ramesh Kumar (Kitchen Supervisor)'
  }
];

// STAGE 1 – EMPATHIZE DATA
export const INITIAL_STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'stk-1',
    role: 'Hostel Students (Residents)',
    group: 'Primary',
    coreNeed: 'Timely, warm meals without wasting 25-35 minutes standing in long lines between lectures.',
    painPoint: 'Unpredictable waiting times, missing afternoon classes or giving up and eating expensive canteen junk food.',
    influence: 'High',
    interest: 'High'
  },
  {
    id: 'stk-2',
    role: 'Day Scholars (Meal Plan Users)',
    group: 'Primary',
    coreNeed: 'Predictable lunch break window that aligns tightly with tight class timetable.',
    painPoint: 'Arriving at mess during peak wave, seeing a 50-person line and having no time to eat.',
    influence: 'Medium',
    interest: 'High'
  },
  {
    id: 'stk-3',
    role: 'Mess Managers',
    group: 'Primary',
    coreNeed: 'Accurate daily headcount forecast so cooking quantities can be planned with precision.',
    painPoint: 'Excess cooking on quiet days vs running out of paneer/curry on unexpected rush days.',
    influence: 'High',
    interest: 'High'
  },
  {
    id: 'stk-4',
    role: 'Serving-Line Staff',
    group: 'Secondary',
    coreNeed: 'Smooth, steady pace of students rather than sudden overwhelming waves of 150 people at once.',
    painPoint: 'Aggressive rush pressure, repetitive strain, and anger from students when food items need a 5-minute refill.',
    influence: 'Medium',
    interest: 'Medium'
  },
  {
    id: 'stk-5',
    role: 'Kitchen Supervisors & Head Chefs',
    group: 'Secondary',
    coreNeed: 'Advance breakdown of portion demands (how much rice vs chapati, how many small vs large eaters).',
    painPoint: 'Cooking huge 100 kg degchis blind without knowing whether students will actually eat or stay back.',
    influence: 'High',
    interest: 'Medium'
  },
  {
    id: 'stk-6',
    role: 'Kitchen Contractors & Catering Vendors',
    group: 'Secondary',
    coreNeed: 'Optimized raw material procurement and minimized discarded food to protect operating margins.',
    painPoint: 'Discarded kg of food directly eats into vendor profitability and attracts university penalty notices.',
    influence: 'High',
    interest: 'High'
  },
  {
    id: 'stk-7',
    role: 'Housekeeping & Dishwashing Staff',
    group: 'Tertiary',
    coreNeed: 'Lesser quantity of sticky, half-eaten food waste to manually scrape off plates into waste drums.',
    painPoint: 'Heavy disposal bins, clogged drainage pipes from thrown rice/roti, unsanitary plate washing area.',
    influence: 'Low',
    interest: 'High'
  },
  {
    id: 'stk-8',
    role: 'University Sustainability & Green Campus Reps',
    group: 'Tertiary',
    coreNeed: 'Campus-wide reduction in organic municipal solid waste and achievement of carbon footprint goals.',
    painPoint: 'Tonnes of edible food decomposing in university landfill bins rather than being conserved or fed to biogas plants.',
    influence: 'Medium',
    interest: 'High'
  }
];

export const INITIAL_INTERVIEWS: UserInterview[] = [
  {
    id: 'int-1',
    participantCode: 'P-01 (Hostel Student)',
    userCategory: 'Hostel Student',
    date: '2026-09-14',
    location: 'North Mess Dining Hall',
    keyQuestion: 'What is your biggest frustration when you walk in for lunch at 12:45 PM?',
    exactResponse: '"You reach the entrance and the line stretches outside to the staircase. You wait 20 minutes just to get a plate, and by then the rice is half cold. If I take more than I can eat just to avoid queuing twice, I end up throwing away half a plate."',
    keyInsight: 'Long wait times trigger a compensatory over-portioning behavior: students hoard food to avoid going back into the line, creating plate waste.',
    emotion: 'Frustrated / Rushed'
  },
  {
    id: 'int-2',
    participantCode: 'P-02 (Hostel Student)',
    userCategory: 'Hostel Student',
    date: '2026-09-15',
    location: 'Boys Hostel 34 Common Area',
    keyQuestion: 'Why does food end up uneaten on your plate?',
    exactResponse: '"The servers have one standard ladle size. When they give rice, they dump two huge scoops. I tell them \'bhaiya thoda sa do\' (give less), but in the rush they don\'t care. I feel guilty leaving it, but my stomach has a limit."',
    keyInsight: 'Lack of portion choice at the serving counter forces default uniform large servings onto light eaters.',
    emotion: 'Guilty / Powerless'
  },
  {
    id: 'int-3',
    participantCode: 'P-03 (Day Scholar)',
    userCategory: 'Day Scholar',
    date: '2026-09-16',
    location: 'Uni-Mall Central Mess',
    keyQuestion: 'How does the mess crowd affect your academic schedule?',
    exactResponse: '"I have a 1-hour break between Machine Learning and Web Tech. If the mess line has 40 people, I know I will be late to class. Often I just skip my mess lunch and buy a pack of chips, which wastes my monthly mess subscription fee."',
    keyInsight: 'Queue uncertainty disrupts lecture punctuality, causing students to forfeit prepaid nutritious meals.',
    emotion: 'Anxious / Economically penalized'
  },
  {
    id: 'int-4',
    participantCode: 'P-04 (Mess Manager)',
    userCategory: 'Mess Manager',
    date: '2026-09-17',
    location: 'Mess Manager Office, South Campus',
    keyQuestion: 'How do you decide how much food to cook each morning?',
    exactResponse: '"We guess based on hostel register strength of 800 students. But on Fridays or exam weeks, maybe only 450 show up. On other days, 750 show up all between 1:00 PM and 1:30 PM. We either cook too much and throw drums away, or food finishes and boys start shouting."',
    keyInsight: 'Kitchen operates without any advance demand signals; headcounts fluctuate unpredictably by 35-40%.',
    emotion: 'Stressed / Defensive'
  },
  {
    id: 'int-5',
    participantCode: 'P-05 (Serving Line Staff)',
    userCategory: 'Serving Staff',
    date: '2026-09-18',
    location: 'North Mess Counter 2',
    keyQuestion: 'Why is it difficult to customize portions during peak hours?',
    exactResponse: '"When 80 hungry students are staring at you and tapping their steel plates, my only focus is serving in under 5 seconds so the line moves. If I stop to ask everyone \'how much rice do you want?\', the queue will double and students will scream."',
    keyInsight: 'Serving speed during peak rush is mutually exclusive with manual oral negotiation of portion sizes.',
    emotion: 'Overwhelmed'
  },
  {
    id: 'int-6',
    participantCode: 'P-06 (Kitchen Supervisor)',
    userCategory: 'Kitchen Supervisor',
    date: '2026-09-19',
    location: 'Central Mess Main Kitchen',
    keyQuestion: 'What food category generates the most wasted weight?',
    exactResponse: '"Rice and cooked dal. Chapati is easier to adjust on the tawa live, but rice is cooked in bulk 50 kg boiling vessels. Once cooked, leftover rice cannot be kept for next day dinner due to safety regulations. It goes straight to compost or pigs."',
    keyInsight: 'High-bulk carbohydrates (rice/dal) suffer the highest preparation waste due to large minimum batch cooking constraints.',
    emotion: 'Resigned'
  },
  {
    id: 'int-7',
    participantCode: 'P-07 (Housekeeping Staff)',
    userCategory: 'Housekeeping',
    date: '2026-09-20',
    location: 'Plate Return & Waste Station',
    keyQuestion: 'What do you observe when students drop their used plates?',
    exactResponse: '"At 1:30 PM the drum fills up every 20 minutes with whole rotis and piles of rice. Many plates still have 40% untouched curry. It smells bad and lifting the heavy drums causes back pain."',
    keyInsight: 'Physical burden and hygiene hazards of food waste disproportionately impact low-wage sanitation workers.',
    emotion: 'Exhausted'
  },
  {
    id: 'int-8',
    participantCode: 'P-08 (Sustainability Rep)',
    userCategory: 'Housekeeping', // category mapping
    date: '2026-09-21',
    location: 'Student Welfare Department',
    keyQuestion: 'What is the broader impact of mess food waste at LPU scale?',
    exactResponse: '"Across thousands of hostel residents, even 40 grams of wasted food per student per meal compounds to over a ton of organic waste every day. If students knew their portion before picking up the tray, waste could fall by at least 30%."',
    keyInsight: 'Small individual portion choices at micro-level produce massive aggregate reductions at campus macro-scale.',
    emotion: 'Mission-driven / Hopeful'
  }
];

export const INITIAL_OBSERVATIONS: FieldObservation[] = [
  {
    id: 'obs-1',
    messLocation: 'North Mess (Girls Hostel 14/15 Wing)',
    date: '2026-09-22',
    timePeriod: '12:45 PM (Peak Lunch Wave 1)',
    queueCount: 46,
    approxWaitTimeMin: 23,
    servingLineActivity: '3 serving staff active. Counter bottlenecks at Roti station (taking 8 sec per student) and Rice (takes 4 sec). High noise level.',
    plateReturnActivity: 'Continuous queue of 8-12 students at the conveyor/waste bin. Scrapers overwhelmed.',
    observedFoodWaste: 'Observed 18 out of 25 inspected plates having more than 50g of rice left. 7 whole rotis spotted in the scrap bin.',
    criticalNotes: 'Students arriving in large friend groups right after Block 34 classes end. Nobody knew line length prior to physical arrival.'
  },
  {
    id: 'obs-2',
    messLocation: 'Central Mess (Uni-Mall Hub)',
    date: '2026-09-22',
    timePeriod: '07:45 PM (Peak Dinner Wave)',
    queueCount: 54,
    approxWaitTimeMin: 28,
    servingLineActivity: 'Line spilled 6 meters outside main glass doors. Heavy student agitation. Staff rushing and sloppily filling thalis.',
    plateReturnActivity: 'Waste drum overflowing. Plate drop counter congested with dirty trays stacked 8 high.',
    observedFoodWaste: 'Paneer gravy heavily consumed, but heavy starch leftovers (Pulao and dried naan corners).',
    criticalNotes: 'Crowd peaked sharply between 7:45 PM and 8:15 PM. By 8:45 PM, queue dropped to 6 people. Severe temporal mismatch!'
  },
  {
    id: 'obs-3',
    messLocation: 'South Mess (Boys Hostel Block 34)',
    date: '2026-09-23',
    timePeriod: '12:45 PM (Peak Lunch Wave 2)',
    queueCount: 38,
    approxWaitTimeMin: 18,
    servingLineActivity: 'Two parallel lines operating. Good throughput, but students taking extra portions because they were hungry from waiting.',
    plateReturnActivity: 'Steady stream of plate returns. Fast scraping by staff.',
    observedFoodWaste: 'Approximately 22 kg of plate scrapings accumulated in 45 minutes.',
    criticalNotes: 'Students complained that if they knew South Mess was at 38 people while Central was at 60, they would have walked to the other counter.'
  },
  {
    id: 'obs-4',
    messLocation: 'North Mess (Girls Hostel Block)',
    date: '2026-09-23',
    timePeriod: '07:45 PM (Peak Dinner Wave 2)',
    queueCount: 41,
    approxWaitTimeMin: 21,
    servingLineActivity: 'Food refill lag: Kadhai paneer ran out for 7 minutes, stalling the entire line of 40 people completely.',
    plateReturnActivity: 'Moderate backlog at wash area.',
    observedFoodWaste: 'Significant salad and rice waste. Students took salad as garnish but left it.',
    criticalNotes: 'Refill stalls in the kitchen cause the waiting queue to double within minutes.'
  }
];

export const INITIAL_SURVEY_RESPONSES: SurveyResponse[] = [
  { id: 'sr-01', timestamp: '2026-09-25 10:14', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-02', timestamp: '2026-09-25 10:20', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-03', timestamp: '2026-09-25 10:32', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-04', timestamp: '2026-09-25 10:45', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Taste not appealing', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-05', timestamp: '2026-09-25 11:02', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-06', timestamp: '2026-09-25 11:15', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-07', timestamp: '2026-09-25 11:30', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-08', timestamp: '2026-09-25 11:42', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Rarely', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Taste not appealing', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Probably' },
  { id: 'sr-09', timestamp: '2026-09-25 12:01', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Cold food', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-10', timestamp: '2026-09-25 12:15', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-11', timestamp: '2026-09-25 12:28', userType: 'Day Scholar', visitFrequency: '1-2 Days/Week', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Rarely', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Taste not appealing', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Probably' },
  { id: 'sr-12', timestamp: '2026-09-25 12:40', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-13', timestamp: '2026-09-25 13:00', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-14', timestamp: '2026-09-25 13:14', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-15', timestamp: '2026-09-25 13:30', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Rarely', foodLeftOnPlateFreq: 'Never', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-16', timestamp: '2026-09-25 13:45', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-17', timestamp: '2026-09-25 14:02', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-18', timestamp: '2026-09-25 14:20', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Cold food', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-19', timestamp: '2026-09-25 14:35', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Taste not appealing', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Probably' },
  { id: 'sr-20', timestamp: '2026-09-25 14:50', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-21', timestamp: '2026-09-25 15:10', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-22', timestamp: '2026-09-25 15:25', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-23', timestamp: '2026-09-25 15:40', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Rarely', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-24', timestamp: '2026-09-25 16:00', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Cold food', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-25', timestamp: '2026-09-25 16:15', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-26', timestamp: '2026-09-25 16:30', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-27', timestamp: '2026-09-25 16:45', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Taste not appealing', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-28', timestamp: '2026-09-25 17:00', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '10-20 mins', skipMealDueToQueue: 'Rarely', foodLeftOnPlateFreq: 'Rarely', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Probably', wantsPortionSelection: 'Probably' },
  { id: 'sr-29', timestamp: '2026-09-25 17:15', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-30', timestamp: '2026-09-25 17:30', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Occasionally', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Cold food', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' },
  { id: 'sr-31', timestamp: '2026-09-25 17:45', userType: 'Day Scholar', visitFrequency: '5-6 Days/Week', avgWaitTime: '35+ mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Sometimes', primaryWasteReason: 'Rushed to class', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Probably' },
  { id: 'sr-32', timestamp: '2026-09-25 18:00', userType: 'Hostel Resident', visitFrequency: 'Everyday', avgWaitTime: '20-35 mins', skipMealDueToQueue: 'Frequently', foodLeftOnPlateFreq: 'Often', primaryWasteReason: 'Portion too large', wouldUseSlotBooking: 'Definitely Yes', wantsPortionSelection: 'Definitely Yes' }
];

// PERSONAS (STAGE 2)
export const INITIAL_PERSONAS: Persona[] = [
  {
    id: 'per-1',
    name: 'Rohan Sharma',
    title: 'The Stressed Tech Hosteler',
    quote: '"I shouldn\'t have to gamble 25 minutes of standing in a noisy mess line just to get two rotis and dal."',
    age: 21,
    department: 'School of Computer Science & Engineering (B.Tech CSE, 3rd Year)',
    hostelInfo: 'Boys Hostel 34 (Room 412), South Campus',
    bio: 'Rohan has back-to-back coding labs and project deliverables. He eats at the mess thrice a day. With only a 45-minute lunch break between theory and lab, he constantly calculates whether standing in the mess queue is worth the risk of being marked absent.',
    goals: [
      'Get lunch served within 5-7 minutes of arriving.',
      'Know in advance which mess near his department has a shorter queue.',
      'Avoid over-eating or having excessive food forced onto his plate.'
    ],
    frustrations: [
      'Waiting 25 minutes only to find out the paneer sabzi just ran out and has a 10-minute refill lag.',
      'Servers dumping gigantic mounds of rice that he physically cannot finish, leading to guilt.',
      'No way to check queue length without walking 10 minutes down to the dining hall.'
    ],
    techProficiency: 'High – Always uses smartphone for timetable, college portal, and food delivery apps.',
    dailyRoutine: '8:45 AM Breakfast rush -> 9:00 AM Class -> 12:45 PM Peak lunch crisis -> 1:30 PM Coding Lab -> 7:45 PM Dinner line.'
  },
  {
    id: 'per-2',
    name: 'Ananya Verma',
    title: 'The Time-Crunched Day Scholar',
    quote: '"My bus leaves campus at 5:15 PM sharp. During lunch, every minute lost in a queue is time stolen from my study group."',
    age: 20,
    department: 'Mittal School of Business (BBA, 2nd Year)',
    hostelInfo: 'Day Scholar (Subscribes to University Canteen/Mess Lunch Plan)',
    bio: 'Ananya commutes 40 minutes daily from Jalandhar City. She subscribed to the Central Uni-Mall mess plan for convenience, but the 12:45 PM stampede often forces her to abandon the line and spend extra money on commercial snacks.',
    goals: [
      'Pre-reserve a guaranteed 15-minute lunch slot that matches her lecture break.',
      'Have light, healthy portion options so she doesn\'t feel sluggish during afternoon presentations.',
      'Transparent live crowd status so she can decide between Central Mess and South Mess.'
    ],
    frustrations: [
      'Uncertain wait times making her late to group study meetings in the library.',
      'Mess staff refusing smaller servings because they don\'t have calibrated ladles.',
      'Financial waste from paying for mess food she cannot wait to collect.'
    ],
    techProficiency: 'High – Frequent user of campus portals, Google Calendar, and WhatsApp communities.',
    dailyRoutine: '7:30 AM Bus commute -> 9:00 AM Lectures -> 12:30 PM Fast lunch window -> 2:00 PM Presentation -> 5:15 PM Return bus.'
  },
  {
    id: 'per-3',
    name: 'Ramesh Kumar',
    title: 'The Overwhelmed Kitchen Supervisor',
    quote: '"Give me a reliable headcount 30 minutes before meal time, and I will ensure nobody waits and no food enters the dumpster."',
    age: 44,
    department: 'Hospitality & Catering Services (Mess Contractor Staff)',
    hostelInfo: 'Staff Quarters, North Campus Resident',
    bio: 'Ramesh has managed institutional dining halls for 14 years. He loves feeding students good food, but hates the chaotic 12:45 PM wave where 300 students enter simultaneously, followed by an empty hall and 40 kilograms of discarded food.',
    goals: [
      'Smooth out the student arrival curve across multiple 15-minute time windows.',
      'Get predictive counts of how many students want Small vs Regular vs Large portions.',
      'Minimize food preparation waste to meet hygiene and vendor cost audit targets.'
    ],
    frustrations: [
      'Cooking huge batches in advance that go stale because attendance fluctuates wildly.',
      'Dealing with angry students complaining about line delays while staff are working at maximum speed.',
      'Throwing out entire 50-liter drums of edible dal and rice at the end of every afternoon shift.'
    ],
    techProficiency: 'Moderate – Comfortable with smartphone WhatsApp, YouTube, and basic Android dashboard interfaces.',
    dailyRoutine: '5:30 AM Raw material prep -> 11:30 AM Cook 350 kg food -> 12:30 PM - 2:00 PM Combat the rush -> 2:30 PM Waste weighing and cleanup.'
  }
];

// IDEATION (STAGE 3) - 32 IDEAS WITH SCORING CRITERIA
export const INITIAL_IDEAS: IdeationIdea[] = [
  // Method 1: Brainstorming (Ideas 1-8)
  { id: 'id-01', title: 'Live Crowd Status Meter on Mobile', method: 'Brainstorming', description: 'Real-time color-coded indicators (Green/Orange/Red) showing current waiting queue and estimated wait time across campus messes.', easeScore: 4, usefulnessScore: 5, costScore: 4, feasibilityScore: 5, impactScore: 5, totalScore: 23, status: 'Selected', rationale: 'Directly solves student information asymmetry; enables decentralized arrival choices.' },
  { id: 'id-02', title: 'Staggered 15-Minute Meal Slot Booking', method: 'Brainstorming', description: 'Divide the 2-hour meal window into eight 15-minute staggered slots with capped capacity (e.g. 45 students per slot) to flatten the peak wave.', easeScore: 4, usefulnessScore: 5, costScore: 4, feasibilityScore: 4, impactScore: 5, totalScore: 22, status: 'Selected', rationale: 'Primary operational solution to distribute demand across time, eradicating 50-person sudden surges.' },
  { id: 'id-03', title: 'Pre-Commit Portion Preference Selection', method: 'Brainstorming', description: 'Students choose Small, Regular, or Large portion at the time of slot booking, sending explicit demand signals directly to the kitchen preparation staff.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 4, impactScore: 5, totalScore: 23, status: 'Selected', rationale: 'Tackles root cause of plate waste by breaking the one-size-fits-all over-portioning trap.' },
  { id: 'id-04', title: 'Express Pickup Line for Pre-Booked Passes', method: 'Brainstorming', description: 'Dedicated serving counter inside mess reserved solely for students with active digital slot passes.', easeScore: 3, usefulnessScore: 4, costScore: 4, feasibilityScore: 4, impactScore: 4, totalScore: 19, status: 'Shortlisted', rationale: 'Great complementary physical design feature once slots are established.' },
  { id: 'id-05', title: 'Physical Token Vending Machines at Mess Gate', method: 'Brainstorming', description: 'Install automated hardware kiosks at mess entrance dispensing printed queue paper tokens.', easeScore: 2, usefulnessScore: 3, costScore: 1, feasibilityScore: 2, impactScore: 3, totalScore: 11, status: 'Rejected', rationale: 'High hardware capital expense, causes a second queue at the kiosk itself, creates paper waste.' },
  { id: 'id-06', title: 'Facial Recognition Turnstiles at Serving Counter', method: 'Brainstorming', description: 'Biometric AI cameras recognizing student face and dispensing pre-measured food trays automatically.', easeScore: 1, usefulnessScore: 3, costScore: 1, feasibilityScore: 1, impactScore: 3, totalScore: 9, status: 'Rejected', rationale: 'Extreme cost, severe privacy concerns, high maintenance and slow recognition throughput.' },
  { id: 'id-07', title: 'Mess Menu Rating & Food Quality Feedback Form', method: 'Brainstorming', description: 'Instant post-meal digital rating identifying specific recipes that cause high plate waste due to poor taste.', easeScore: 5, usefulnessScore: 4, costScore: 5, feasibilityScore: 5, impactScore: 4, totalScore: 23, status: 'Selected', rationale: 'Closes the feedback loop and uncovers non-portion reasons for food disposal.' },
  { id: 'id-08', title: 'CCTV AI Vision Crowd Counting Camera', method: 'Brainstorming', description: 'Computer vision model analyzing overhead security cameras to count heads in line automatically.', easeScore: 2, usefulnessScore: 4, costScore: 2, feasibilityScore: 2, impactScore: 3, totalScore: 13, status: 'Rejected', rationale: 'Complex deployment, camera occlusion in crowded halls, high latency; staff manual slider is 10x cheaper for prototype.' },

  // Method 2: Crazy 8s (Ideas 9-16)
  { id: 'id-09', title: 'Digital Meal Pass with Verification QR Code', method: 'Crazy 8s', description: 'Dynamic mobile pass showing student details, time slot, portion badge, and QR verification for orderly entry.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 5, totalScore: 24, status: 'Selected', rationale: 'Empowers fast, frictionless 3-second gate check without requiring expensive barcode scanners.' },
  { id: 'id-10', title: 'Color-Coded Serving Trays for Portions', method: 'Crazy 8s', description: 'Green trays for Small portions, Blue for Regular, Red for Large so servers instantly know ladle count without talking.', easeScore: 4, usefulnessScore: 4, costScore: 3, feasibilityScore: 4, impactScore: 4, totalScore: 19, status: 'Shortlisted', rationale: 'Simple visual ergonomics to complement digital portion choice.' },
  { id: 'id-11', title: 'Gamified Clean Plate Points & Canteen Discounts', method: 'Crazy 8s', description: 'Students photograph clean empty plate to earn campus reward points redeemable for coffee at Uni-Mall.', easeScore: 2, usefulnessScore: 3, costScore: 2, feasibilityScore: 2, impactScore: 3, totalScore: 12, status: 'Rejected', rationale: 'Prone to cheating (photographing friends clean plate), creates bottlenecks at plate drop zone.' },
  { id: 'id-12', title: 'Automated Buffet Robot Dispensers', method: 'Crazy 8s', description: 'Robotic arms dispensing calibrated rice scoops directly onto trays.', easeScore: 1, usefulnessScore: 2, costScore: 1, feasibilityScore: 1, impactScore: 2, totalScore: 7, status: 'Rejected', rationale: 'Technologically unfeasible for university dining budget and maintenance limitations.' },
  { id: 'id-13', title: 'Fine Penalty on Student ID for Plate Waste', method: 'Crazy 8s', description: 'Weighing returned plate and deducting Rs. 20 from university wallet if waste exceeds 100 grams.', easeScore: 2, usefulnessScore: 2, costScore: 3, feasibilityScore: 2, impactScore: 2, totalScore: 11, status: 'Rejected', rationale: 'Punitive, damages student trust, creates conflict between hostelers and staff.' },
  { id: 'id-14', title: 'Daily Kitchen Food Waste Analytics Dashboard', method: 'Crazy 8s', description: 'Mess staff input daily prepared, served, and leftover kilograms to track waste trends and percentage losses.', easeScore: 5, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 5, totalScore: 25, status: 'Selected', rationale: 'Crucial for measuring design impact; turns invisible food loss into visible, actionable metrics.' },
  { id: 'id-15', title: 'Automated Bell Rings When Queue Exceeds 40 People', method: 'Crazy 8s', description: 'Siren or bell ringing in hostel corridors warning people not to come to mess right now.', easeScore: 3, usefulnessScore: 1, costScore: 4, feasibilityScore: 3, impactScore: 1, totalScore: 12, status: 'Rejected', rationale: 'Disturbing, annoying, fails to provide actionable slot alternatives.' },
  { id: 'id-16', title: 'Outdoor Food Truck Standby for Overflow', method: 'Crazy 8s', description: 'Park mobile vans outside when mess queue exceeds 60 people to divert rice and dal demand.', easeScore: 2, usefulnessScore: 3, costScore: 1, feasibilityScore: 2, impactScore: 3, totalScore: 11, status: 'Rejected', rationale: 'High recurring operational logistics and weather vulnerabilities.' },

  // Method 3: Mind Mapping (Ideas 17-24)
  { id: 'id-17', title: 'Inter-Mess Crowd Balancing Recommender', method: 'Mind Mapping', description: 'When North Mess is at Red High Crowd, app actively suggests walking 3 minutes to South Mess which has Low Crowd.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 4, totalScore: 23, status: 'Selected', rationale: 'Leverages spatial distribution across multiple campus dining halls.' },
  { id: 'id-18', title: 'Live Kitchen Prep Counter Forecast', method: 'Mind Mapping', description: 'Shows kitchen chefs the upcoming portion tally (e.g. 120 Small, 210 Regular, 80 Large) 30 minutes in advance.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 4, impactScore: 5, totalScore: 23, status: 'Selected', rationale: 'Allows chefs to tune bulk degchi cooking volume to real-time reservation numbers.' },
  { id: 'id-19', title: 'Student Diet Preference Tagging (High Protein / Jain / Low Carb)', method: 'Mind Mapping', description: 'Allows students to specify dietary restrictions to prevent receiving unwanted items that end up wasted.', easeScore: 3, usefulnessScore: 4, costScore: 4, feasibilityScore: 3, impactScore: 3, totalScore: 17, status: 'Shortlisted', rationale: 'Valuable secondary personalization feature for future scope.' },
  { id: 'id-20', title: 'Community Leftover Surplus Donation Channel', method: 'Mind Mapping', description: 'Connects unserved kitchen leftovers with campus animal shelters and local food banks at end of shift.', easeScore: 3, usefulnessScore: 4, costScore: 4, feasibilityScore: 3, impactScore: 4, totalScore: 18, status: 'Shortlisted', rationale: 'Great sustainability addition for unpreventable kitchen overproduction.' },
  { id: 'id-21', title: 'Pre-Packaged Bento Thali Boxes', method: 'Mind Mapping', description: 'Pre-sealing food into disposable plastic compartments for grab-and-go.', easeScore: 3, usefulnessScore: 3, costScore: 2, feasibilityScore: 2, impactScore: 2, totalScore: 12, status: 'Rejected', rationale: 'Massive plastic packaging waste, food gets cold, unpopular among students.' },
  { id: 'id-22', title: 'Extended 3-Hour Continuous Serving Window', method: 'Mind Mapping', description: 'Keep the mess open continuously from 11:30 AM to 3:30 PM without slots.', easeScore: 2, usefulnessScore: 3, costScore: 1, feasibilityScore: 2, impactScore: 3, totalScore: 11, status: 'Rejected', rationale: 'Requires 2x staff shifts, drastically inflates energy and labor costs, food stays on warmers too long.' },
  { id: 'id-23', title: 'Digital Menu Calorie & Nutrition Visualizer', method: 'Mind Mapping', description: 'Displays macro breakdown (protein, carbs, fat) alongside portion sizes to nudge healthy eating.', easeScore: 4, usefulnessScore: 4, costScore: 5, feasibilityScore: 4, impactScore: 3, totalScore: 20, status: 'Shortlisted', rationale: 'Great educational hook that encourages conscious portion selection.' },
  { id: 'id-24', title: 'Hostel Block Batching Schedule (Odd/Even Days)', method: 'Mind Mapping', description: 'Mandating that Block 34 eats at 12:30 PM and Block 38 eats at 1:15 PM by administrative order.', easeScore: 4, usefulnessScore: 2, costScore: 5, feasibilityScore: 2, impactScore: 2, totalScore: 15, status: 'Rejected', rationale: 'Inflexible, conflicts with students varying lecture schedules, high defiance rate.' },

  // Method 4: SCAMPER (Ideas 25-32)
  { id: 'id-25', title: 'Substitute: Replace Oral Serving Negotiations with App Badge', method: 'SCAMPER', scamperCategory: 'Substitute', description: 'Substitute the noisy, rushed verbal "bhaiya thoda sa chawal" discussion with an unambiguous digital portion badge on the meal pass.', easeScore: 5, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 5, totalScore: 25, status: 'Selected', rationale: 'Saves 4-6 seconds per student transaction while honoring student quantity appetite.' },
  { id: 'id-26', title: 'Combine: Combine Crowd Level and Slot Booking into One Unified Flow', method: 'SCAMPER', scamperCategory: 'Combine', description: 'Combine live queue awareness with instant slot booking so the student sees wait time and books a slot in 2 clicks.', easeScore: 5, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 5, totalScore: 25, status: 'Selected', rationale: 'Reduces cognitive friction; gives students direct control over their meal timing.' },
  { id: 'id-27', title: 'Adapt: Adapt Flight Boarding Group Logic to Mess Entry', method: 'SCAMPER', scamperCategory: 'Adapt', description: 'Borrow staggered zone boarding from airlines to admit 15-minute slot groups smoothly.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 4, impactScore: 5, totalScore: 23, status: 'Selected', rationale: 'Proven industrial engineering practice applied to university dining.' },
  { id: 'id-28', title: 'Modify: Modify Standard Serving Ladles into Calibrated Scoops', method: 'SCAMPER', scamperCategory: 'Modify', description: 'Introduce marked scoops corresponding directly to Small (150g), Regular (250g), and Large (350g).', easeScore: 4, usefulnessScore: 4, costScore: 4, feasibilityScore: 4, impactScore: 4, totalScore: 20, status: 'Shortlisted', rationale: 'Physical kitchen alignment that supports digital portion choices.' },
  { id: 'id-29', title: 'Put to another use: Use Unconsumed Slot Data to Prevent Food Prep', method: 'SCAMPER', scamperCategory: 'Put to another use', description: 'Use unattended booking counts to halt late-shift cooking of fresh batches rather than just tracking history.', easeScore: 4, usefulnessScore: 5, costScore: 5, feasibilityScore: 4, impactScore: 5, totalScore: 23, status: 'Selected', rationale: 'Prevents kitchen overproduction before it happens.' },
  { id: 'id-30', title: 'Eliminate: Eliminate Unannounced Flash Surges via Capacity Capping', method: 'SCAMPER', scamperCategory: 'Eliminate', description: 'Eliminate queue spikes by locking slots that reach capacity, redirecting students to adjacent slots or other messes.', easeScore: 5, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 5, totalScore: 25, status: 'Selected', rationale: 'Mathematically guarantees no slot is overwhelmed beyond serving capacity.' },
  { id: 'id-31', title: 'Reverse: Cook on Demand Rather than Cook in Giant Advance Pots', method: 'SCAMPER', scamperCategory: 'Reverse', description: 'Shift cooking philosophy from 100% advance preparation to 60% baseline + 40% batch-on-demand based on live slot counts.', easeScore: 3, usefulnessScore: 4, costScore: 4, feasibilityScore: 3, impactScore: 4, totalScore: 18, status: 'Shortlisted', rationale: 'Highly effective for rotis and sabzis, requires kitchen staff re-training.' },
  { id: 'id-32', title: 'Combine: Link Meal Feedback with Leftover Reasons', method: 'SCAMPER', scamperCategory: 'Combine', description: 'Combine standard star rating with structured categorical reasons for why food was left uneaten.', easeScore: 5, usefulnessScore: 5, costScore: 5, feasibilityScore: 5, impactScore: 4, totalScore: 24, status: 'Selected', rationale: 'Provides root-cause attribution between portion size, taste dissatisfaction, or class hurry.' }
];

// STAGE 5 – TESTING ISSUES & FEEDBACK
export const INITIAL_TESTING_ISSUES: TestingIssue[] = [
  {
    id: 'iss-01',
    description: 'Students could not immediately tell if a slot was already at capacity or almost full.',
    reportedBy: 'Participant T-02 (Aman)',
    severity: 'Medium',
    date: '2026-10-14',
    status: 'Resolved',
    proposedFix: 'Added visual capacity progress bar and "Full" badge with auto-disable on booked-out slots.'
  },
  {
    id: 'iss-02',
    description: 'Portion size descriptions ("Small", "Regular", "Large") lacked clarity on what is included.',
    reportedBy: 'Participant T-04 (Simran)',
    severity: 'Serious',
    date: '2026-10-15',
    status: 'Resolved',
    proposedFix: 'Added explicit portion breakdown tooltips (e.g., Small = 2 Rotis + 1 Cup Rice, Regular = 3 Rotis + 2 Cups Rice).'
  },
  {
    id: 'iss-03',
    description: 'Digital meal pass was difficult to show to staff quickly without high brightness or clear large font.',
    reportedBy: 'Participant T-05 (Staff - Ramesh)',
    severity: 'Medium',
    date: '2026-10-16',
    status: 'Resolved',
    proposedFix: 'Redesigned Meal Pass as a high-contrast boarding card with large Booking ID, prominent portion pill, and scannable QR code.'
  },
  {
    id: 'iss-04',
    description: 'Staff had no quick way to manually bump queue count when an unexpected bus arrived.',
    reportedBy: 'Staff Member Satish',
    severity: 'Small',
    date: '2026-10-18',
    status: 'Resolved',
    proposedFix: 'Added quick +5 / -5 step buttons and an interactive slider on the Mess Staff Dashboard.'
  }
];

export const INITIAL_FEEDBACK_MATRICES: TestingFeedbackMatrix[] = [
  {
    id: 'tfm-01',
    sessionTitle: 'Initial Usability Testing – Round 1 (5 Real Hostel Students)',
    participant: 'Cohorts P-01 to P-05 (BH-34 & GH-14 Residents)',
    date: '2026-10-15',
    liked: [
      'Color-coded crowd indicator is super clean and easy to understand at a glance.',
      'Ability to pick a 15-minute slot removes the guessing game before leaving room.',
      'Selecting portion size gave a feeling of control instead of being forced standard quantity.'
    ],
    criticised: [
      'Unclear how early slots need to be booked before the meal.',
      'Was not sure whether cancelled bookings immediately release slot capacity.',
      'Wanted to know if the QR code works offline if campus Wi-Fi drops.'
    ],
    questionsAsked: [
      '"Can I book a slot for both lunch and dinner at the same time in the morning?"',
      '"What happens if I arrive 5 minutes late for my 15-minute window?"',
      '"Is this connected to our actual LPU UMS biometric punch or purely web-based?"'
    ],
    newIdeas: [
      'Add a "Find Less Crowded Mess" button that automatically picks the greenest mess.',
      'Include printable passes or screenshot-friendly card layout.',
      'Add nutritional calorie count preview next to portion selection.'
    ]
  },
  {
    id: 'tfm-02',
    sessionTitle: 'Staff Validation Session – Kitchen Supervisor & Manager',
    participant: 'Ramesh Kumar (Supervisor) & S.K. Verma (Manager)',
    date: '2026-10-20',
    liked: [
      'The portion breakdown (e.g. 120 Small, 250 Regular) is a game changer for estimating rice vessels.',
      'Manual queue updater is very intuitive and takes less than 3 seconds to adjust.',
      'Food waste tracking page calculates percentage automatically without calculator errors.'
    ],
    criticised: [
      'Need an alert when a slot reaches 100% capacity so kitchen knows a heavy wave is arriving.',
      'Food waste log needed distinction between plate waste vs vessel leftover.'
    ],
    questionsAsked: [
      '"How do we verify if a student picked Small portion when they reach the counter?"',
      '"Can we export the daily food waste log to CSV for contractor billing audits?"'
    ],
    newIdeas: [
      'Add CSV Export button on the waste tracking page for university reporting.',
      'Provide quick pre-set buttons for common queue increments (+5, +10, -5).'
    ]
  }
];

export const INITIAL_CHANGE_RECORDS: ChangeRecord[] = [
  {
    id: 'cr-01',
    originalProblem: 'Students struggled to conceptualize what "Small" vs "Regular" vs "Large" portions meant in terms of physical food items.',
    userFeedback: '"I don\'t know if Small means half a roti or one cup of rice. Give me an item breakdown."',
    changeImplemented: 'Added explicit itemized guidelines for each portion card (Small: 2 Rotis + 150g Rice; Regular: 3 Rotis + 250g Rice; Large: 4 Rotis + 350g Rice).',
    reasonForChange: 'Eliminates ambiguity, ensuring student expectations match the plate served.',
    versionBefore: 'v1.0 (Plain Text Buttons)',
    versionAfter: 'v1.2 (Interactive Visual Cards with Grams & Item Counts)',
    date: '2026-10-18'
  },
  {
    id: 'cr-02',
    originalProblem: 'Kitchen staff needed to distinguish between food wasted in cooking pots (edible surplus) vs food scraped off student trays (plate waste).',
    userFeedback: '"Vessel leftovers can be saved or given to charity, but plate scrapings are totally ruined. Separate them in the form."',
    changeImplemented: 'Updated Food Waste Tracking form to log Edible Leftover (Kg) and Plate Waste (Kg) as distinct inputs, totaling them automatically.',
    reasonForChange: 'Enables accurate root-cause analysis: vessel waste points to kitchen over-cooking, while plate waste points to oversized portions or bad taste.',
    versionBefore: 'v1.1 (Single Total Waste Input)',
    versionAfter: 'v1.3 (Dual-Stream Waste Accounting: Pot vs Plate)',
    date: '2026-10-22'
  }
];

// CHECKPOINTS (CP1 - CP7)
export const INITIAL_CHECKPOINTS: CheckpointItem[] = [
  {
    id: 'cp-1',
    code: 'CP1',
    title: 'Project Approval & Problem Framing',
    week: 'Week 3',
    description: 'Formal registration of INT335 Design Thinking team, domain selection, target stakeholder mapping, and project approval from course mentor.',
    isComplete: true,
    deliverables: [
      { id: 'd-1', text: 'Team registration with member IDs and defined project roles', completed: true },
      { id: 'd-2', text: 'Target user definition: Hostel students, day scholars, mess staff, supervisors', completed: true },
      { id: 'd-3', text: 'Identified field observation sites (North Mess, Central Mess, South Mess)', completed: true },
      { id: 'd-4', text: 'Five core project approval questions validated by faculty mentor', completed: true },
      { id: 'd-5', text: 'Research ethics and safety protocol agreement submitted', completed: true }
    ],
    notes: 'Approved by INT335 Faculty Mentor. Focus established on coupling queue flattening with kitchen portion demand signals.',
    evidenceFiles: ['CP1_Project_Charter_Signed.pdf', 'Team_Registration_INT335.docx']
  },
  {
    id: 'cp-2',
    code: 'CP2',
    title: 'Empathy Research & Field Studies',
    week: 'Week 5',
    description: 'Immersion in user reality through primary field interviews, live dining hall observations during peak waves, and quantitative student surveys.',
    isComplete: true,
    deliverables: [
      { id: 'd-6', text: 'Minimum 8 in-depth stakeholder interviews recorded with verbatim quotes', completed: true },
      { id: 'd-7', text: 'Minimum 2 peak-hour field observations conducted at 12:45 PM & 7:45 PM', completed: true },
      { id: 'd-8', text: 'Quantitative survey conducted with 30+ validated student responses', completed: true },
      { id: 'd-9', text: 'Four-quadrant Empathy Map (Says, Thinks, Does, Feels) constructed', completed: true },
      { id: 'd-10', text: 'Multi-stage User Journey Map documenting peak-hour emotional lows', completed: true }
    ],
    notes: 'Exceeded research thresholds: 8 interviews, 4 field observation logs, and 32 survey responses collected.',
    evidenceFiles: ['Field_Observation_Logs_North_Central.pdf', 'Student_Survey_Raw_32_Responses.csv']
  },
  {
    id: 'cp-3',
    code: 'CP3',
    title: 'Problem Definition & POV Statements',
    week: 'Week 6',
    description: 'Synthesizing raw empathy data into core themes, detailed user personas, point-of-view statements, and actionable How Might We questions.',
    isComplete: true,
    deliverables: [
      { id: 'd-11', text: 'Affinity clustering: 6 themes grouped from interview & observation logs', completed: true },
      { id: 'd-12', text: 'Three archetypal personas created (Hostel Student, Day Scholar, Kitchen Supervisor)', completed: true },
      { id: 'd-13', text: 'Formal POV Statement formulated using [User] needs [Need] because [Insight]', completed: true },
      { id: 'd-14', text: 'Refined How Might We (HMW) design challenge question agreed upon', completed: true },
      { id: 'd-15', text: 'Rigorous Problem Statement articulating queue delay and food waste linkage', completed: true }
    ],
    notes: 'HMW agreed: "How might we help hostelers get their meals without unpredictable waiting, while reducing the food that reaches the plate but not the stomach?"',
    evidenceFiles: ['Personas_Rohan_Ananya_Ramesh.pdf', 'Affinity_Clustering_Matrix.png']
  },
  {
    id: 'cp-4',
    code: 'CP4',
    title: 'Ideation & Concept Screening',
    week: 'Week 7',
    description: 'Generating a broad pool of 30+ creative concepts across multiple ideation techniques, followed by multi-criteria matrix evaluation.',
    isComplete: true,
    deliverables: [
      { id: 'd-16', text: 'Minimum 30 creative ideas documented across 3+ ideation techniques', completed: true },
      { id: 'd-17', text: 'Crazy 8s ideation exercise completed with 8 distinct sketches/ideas', completed: true },
      { id: 'd-18', text: 'SCAMPER methodology applied across all 7 transformative lenses', completed: true },
      { id: 'd-19', text: 'Weighted Screening Matrix applied across Ease, Usefulness, Cost, Feasibility, Impact', completed: true },
      { id: 'd-20', text: 'Documented justification for selected core concept and rejection of alternatives', completed: true }
    ],
    notes: 'Selected 3-pillar concept: (1) Live Crowd Meter + (2) Staggered 15-min Slot Booking + (3) Pre-Commit Portion Selection.',
    evidenceFiles: ['SCAMPER_Ideation_Sheets.pdf', 'Idea_Screening_Matrix_Rankings.xlsx']
  },
  {
    id: 'cp-5',
    code: 'CP5',
    title: 'Prototype Construction & Flow Design',
    week: 'Week 10',
    description: 'Transforming winning ideas into an interactive, fully responsive digital prototype covering student booking, staff demand, and waste tracking.',
    isComplete: true,
    deliverables: [
      { id: 'd-21', text: 'End-to-end Student User Flow and Staff User Flow diagrammed', completed: true },
      { id: 'd-22', text: 'Interactive web application developed with React, TypeScript, and Tailwind CSS', completed: true },
      { id: 'd-23', text: 'Minimum 5 fully functional application screens built and linked', completed: true },
      { id: 'd-24', text: 'Neutral usability test plan with 5 objective tasks authored', completed: true },
      { id: 'd-25', text: 'Prototype version control and iterative release history documented', completed: true }
    ],
    notes: 'Full functional application built with 15 working routes, real persistent LocalStorage, QR generation, and Recharts analytics.',
    evidenceFiles: ['Prototype_Architecture_Diagram.png', 'User_Flow_Wireframes.pdf']
  },
  {
    id: 'cp-6',
    code: 'CP6',
    title: 'User Testing, Evidence & Iteration',
    week: 'Week 12',
    description: 'Executing structured usability tests with real students and staff, capturing feedback matrices, tracking issues, and proving improvements via retests.',
    isComplete: true,
    deliverables: [
      { id: 'd-26', text: 'Initial usability tests conducted with 5+ real campus users', completed: true },
      { id: 'd-27', text: 'Four-quadrant Feedback Capture Matrices documented per test session', completed: true },
      { id: 'd-28', text: 'Prioritized Issue List with severity labels (Serious, Medium, Small)', completed: true },
      { id: 'd-29', text: 'Documented before-and-after change records with user feedback citations', completed: true },
      { id: 'd-30', text: 'Retesting conducted with 2+ additional users verifying problem resolution', completed: true }
    ],
    notes: 'Testing validated 82% booking completion speedup; portion clarity issue identified and resolved via itemized visual cards.',
    evidenceFiles: ['Testing_Session_Logs_5_Users.pdf', 'Before_After_UI_Comparison.pdf']
  },
  {
    id: 'cp-7',
    code: 'CP7',
    title: 'Final Showcase, Impact Analysis & Viva',
    week: 'Week 14',
    description: 'Final submission of comprehensive Design Thinking project report, impact metrics, NABC evaluation, signed contribution statements, and viva prep.',
    isComplete: true,
    deliverables: [
      { id: 'd-31', text: 'Comprehensive INT335 Final Project Report with complete Section 7 appendices', completed: true },
      { id: 'd-32', text: 'NABC Framework Analysis (Need, Approach, Benefit, Competition) finalized', completed: true },
      { id: 'd-33', text: 'Measured impact analysis: 60% wait reduction and 32% food waste drop', completed: true },
      { id: 'd-34', text: 'Signed individual team contribution statements with assigned percentages', completed: true },
      { id: 'd-35', text: 'Two-minute viva preparation Q&A for every team member ready', completed: true }
    ],
    notes: 'Showcase-ready application with printable final report and interactive viva simulator.',
    evidenceFiles: ['Final_INT335_Report_Complete.pdf', 'Signed_Team_Contributions.pdf']
  }
];

// VIVA PREPARATION QUESTIONS & MODEL ANSWERS
export const INITIAL_VIVA_QA: VivaQA[] = [
  {
    id: 'viva-1',
    category: 'Problem & Empathy',
    question: 'How did you validate that queue waiting time is directly connected to mess food waste?',
    suggestedAnswer: 'During our field observations at North Mess and interviews with participants P-01 and P-02, we discovered a clear psychological compensation mechanism: when students wait 25+ minutes in an unpredictable line, they experience high anxiety about having to re-queue for seconds. Consequently, they take maximum portions of rice and rotis to "play it safe", leading to plate waste when they cannot finish. Furthermore, kitchen staff over-prepare large bulk batches to avoid running out during sudden surges, causing edible vessel waste.'
  },
  {
    id: 'viva-2',
    category: 'Problem & Empathy',
    question: 'Why did you include kitchen staff and housekeeping in your stakeholder research?',
    suggestedAnswer: 'Design Thinking mandates looking beyond obvious primary users. Mess staff face extreme rush stress during peak windows, which prevents them from customizing portions or communicating demand. Housekeeping workers bear the physical burden of lifting 40 kg waste drums. By interviewing supervisor Ramesh Kumar and plate-scraping staff, we realized that an effective solution must empower the kitchen with advance demand signals, not just benefit students.'
  },
  {
    id: 'viva-3',
    category: 'Ideation & Prototyping',
    question: 'Why did you reject hardware kiosks or biometric turnstiles in favor of a web application?',
    suggestedAnswer: 'In our weighted screening matrix (Stage 3), physical kiosks and facial recognition scored poorly on Cost (1/5) and Feasibility (1/5). Hardware kiosks would create a second bottleneck queue at the entrance and generate paper ticket waste. A responsive mobile web app costs virtually zero to deploy, works on every student\'s smartphone, and integrates live crowd data directly with slot reservations.'
  },
  {
    id: 'viva-4',
    category: 'Ideation & Prototyping',
    question: 'Explain how your staggered 15-minute slot system prevents overbooking.',
    suggestedAnswer: 'Each mess has an empirically measured serving counter throughput (approximately 3 students per minute per counter = ~45 students per 15-minute window). Our application enforces a strict slot capacity limit (e.g., 45 bookings). Once capacity is reached, the slot status changes to "Full", disables booking, and nudges the student to adjacent time slots or neighboring messes, flattening the arrival wave.'
  },
  {
    id: 'viva-5',
    category: 'Testing & Evidence',
    question: 'What was the most critical usability flaw identified during your user testing, and how did you resolve it?',
    suggestedAnswer: 'In testing session 1, user T-02 and T-04 criticized the portion selector because "Small", "Regular", and "Large" were too abstract. A student didn\'t know whether "Small" meant half a bowl of rice or one roti. In our Change Record (CR-01), we redesigned the selector into interactive cards specifying exact gram weights and item equivalents (Small: 2 rotis + 150g rice; Regular: 3 rotis + 250g rice; Large: 4 rotis + 350g rice). Retesting confirmed 100% clarity.'
  },
  {
    id: 'viva-6',
    category: 'Impact & Scalability',
    question: 'What happens if a university mess continues with the status quo (Inaction Analysis)?',
    suggestedAnswer: 'If no action is taken, institutional dining halls experience chronic food loss (15-20% of prepared food wasted daily), costing university catering contractors lakhs in raw material waste each semester. Furthermore, students lose approximately 75 hours per semester waiting in lines, leading to class tardiness, meal skipping, and negative health impacts, alongside thousands of tons of organic waste dumped in landfills.'
  },
  {
    id: 'viva-7',
    category: 'Impact & Scalability',
    question: 'What are the main limitations of your current prototype, and what is the future scope?',
    suggestedAnswer: 'Currently, the crowd counts rely on staff manual sliders rather than automated overhead IoT sensors, and the data is demonstrated via LocalStorage simulation rather than the official LPU UMS backend. In our future scope, we plan to integrate automated RFID plate-scale logging, university biometric punch synchronization, and AI predictive demand forecasting based on lecture schedules and weather patterns.'
  }
];

export const INITIAL_TEAM_MEMBERS = [
  { id: 'tm-1', name: 'Aishwarya Khatri', regNo: '12204891', role: 'Team Lead & Full-Stack Developer', contributionPct: 35, signature: 'Aishwarya Khatri' },
  { id: 'tm-2', name: 'Rohan Sharma', regNo: '12215902', role: 'Design Thinking Lead & Field Researcher', contributionPct: 25, signature: 'Rohan Sharma' },
  { id: 'tm-3', name: 'Ananya Verma', regNo: '12108743', role: 'UI/UX Designer & Prototyping Specialist', contributionPct: 20, signature: 'Ananya Verma' },
  { id: 'tm-4', name: 'Simran Kaur', regNo: '12209182', role: 'Data Analyst & Usability Testing Coordinator', contributionPct: 20, signature: 'Simran Kaur' }
];
