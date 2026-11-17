# BEAT THE MESS RUSH
## Peak-Hour Queues and Food Waste in LPU Messes
### Lovely Professional University (LPU) &bull; School of Computer Science & Engineering
**Subject:** INT335 Design Thinking Project

---

## 1. Project Overview

At peak lunch (12:45 PM – 1:30 PM) and dinner (7:45 PM – 8:30 PM) hours, university residential students face unpredictable mess lines averaging 24.5 minutes. In parallel, catering waste audits reveal that 15% to 18% of prepared food is discarded daily, largely driven by uneaten rice, rotis, and dal left on student trays.

**Beat The Mess Rush** is an interactive, responsive web application that bridges students and mess operations. It connects three human-centered design interventions:
1. **Live Crowd-Level Indicators:** Real-time visibility into queue lengths and waiting delays across campus dining halls.
2. **Staggered 15-Minute Meal Slots:** Capped time windows distributing student arrival waves evenly across the meal period.
3. **Pre-Commit Portion Sizing:** Choice of Small, Regular, or Large portions giving students quantity control while providing kitchen chefs with advance batch cooking forecasts.

---

## 2. Core Features

### Student Application
- **Student Home Dashboard:** Current meal window, live crowd indicators for North Mess, Central Mess, and South Mess, today's menu, and food waste awareness insights.
- **Live Crowd Monitoring:** Color-coded status (`LOW`, `MEDIUM`, `HIGH`), queue counts, estimated wait times, and visual crowd saturation meter.
- **Smart Staggered Meal Booking:** 15-minute time slots with overbooking prevention and visual capacity bars.
- **Portion Selection:** Clear food item equivalents (e.g. Small = 2 Rotis + 150g Rice; Regular = 3 Rotis + 250g Rice; Large = 4 Rotis + 350g Rice) with anti-waste rationale.
- **Digital Meal Pass:** High-contrast boarding-card pass with dynamic QR code (containing booking token, student reg, slot time, and portion badge), printable view, and cancellation options.
- **Post-Meal Feedback:** Rating system for quality and taste, portion satisfaction, leftover reasons (e.g. portion too large, food quality, taste, student full), and suggestions.

### Mess Staff & Kitchen Portal
- **Operations Dashboard:** Live queue count updater slider, queue step controls (+5 / -5), crowd status toggle, upcoming slot distribution, and meal verification desk.
- **Food Demand Management:** Aggregated portion tally (Small vs Regular vs Large) converted into kitchen batch prep forecasts (Rice in Kg, Rotis in count, Dal in Liters, Sabzi in Kg), plus live menu item customizer.
- **Food Waste Monitoring:** Daily weighing audit logging food prepared, served, vessel leftovers (edible surplus), and plate waste (tray scrapings). Automated waste percentage calculations and Recharts visual trends.

### Admin & INT335 Design Thinking Workspace
- **Analytics & Impact Dashboard:** KPI metrics, interactive comparisons across messes, portion pie charts, and empirical impact analysis (74.6% wait reduction, 32.5% food waste drop).
- **Stage 1 & 2 (Empathize & Define):** 8-group Stakeholder Map, 8 in-depth qualitative interview logs, 4 field observation logs (12:45 PM & 7:45 PM), 32 survey responses with charts, 4-quadrant Empathy Map, 6-stage User Journey Map, Findings Affinity Grouping, 3 Personas, POV Framework, and the HMW Question.
- **Stage 3 & 5 (Ideate & Usability Testing):** 32 screened concepts across Brainstorming, Crazy 8s, Mind Mapping, and SCAMPER; multi-criteria weighted screening matrix; 5 neutral usability test tasks; Feedback Capture Matrices; Issue Log with severity ratings; and before-and-after Change Records.
- **Seven Checkpoints (CP1 to CP7):** Interactive milestone tracking from Project Registration (CP1) through Final Showcase (CP7), complete with deliverables checklist, evidence file attachments, and faculty feedback notes.
- **Stage 6 (Final Project Report):** Printable university project report format containing NABC framework analysis, cost of inaction, prototype summary, limitations, and future scope.
- **CP7 Final Showcase & Viva Preparation:** 2-minute elevator pitch script, 7 faculty viva defense question cards with model answers, and signed team contribution statements.

---

## 3. Technology Stack

- **Framework:** React.js 18+ with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS with custom university palette (`#142D4E` Navy, `#2563EB` Blue, `#F97316` Orange, `#16A34A` Green)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Navigation:** React Router v7
- **QR Generation:** `qrcode.react` (SVG)
- **Delight Effects:** `canvas-confetti`
- **Data Persistence:** LocalStorage with instant CSV export and reset capabilities

---

## 4. Installation and Setup Instructions

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Quick Start
1. Clone or navigate to the repository directory:
   ```bash
   cd "beat-the-mess-rush"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 5. Demo Roles & Navigation Guide

No complex user registration or passwords are required:
- Click the role switch buttons in the top demo banner (`Student`, `Mess Staff`, `Admin / DT Lead`) or use the interactive role cards on the welcome screen (`/`).
- Click **"Edit Demo Profile"** in the top navigation bar to test bookings under different student names, registration numbers, or hostel rooms.
- Click **"Reset Demo Data"** at any time in the top bar to restore default sample records.
- Click **"Export CSV"** on the Food Waste, Testing, or Survey screens to download raw research datasets.

---

## 6. Important Project Limitations

1. **Simulated Data:** Demonstration records are based on modeled campus dining arrival distributions and are not connected to live LPU mess turnstiles or university payment credentials.
2. **Crowd Counts:** Prototype queue inputs currently rely on staff manual sliders rather than automated overhead computer vision or IoT density sensors.
3. **Data Scope:** Designed as a localized prototype running on LocalStorage for evaluators to experience zero-friction demonstrations during vivas.

---

## 7. Future Scope

- Direct API integration with the official LPU Touch / University Management System (UMS) biometric attendance infrastructure.
- Digital load-cell plate scales at dish drop conveyors for automated plate waste weighing.
- Machine Learning demand forecasting factoring in class timetables, weather, and seasonal exam schedules.

---

*Submitted for INT335 Design Thinking Project Evaluation, School of Computer Science & Engineering, Lovely Professional University.*
