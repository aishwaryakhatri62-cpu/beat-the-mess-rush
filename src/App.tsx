import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/common/Layout';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { StudentHome } from './pages/student/StudentHome';
import { CrowdMonitoring } from './pages/student/CrowdMonitoring';
import { MealBooking } from './pages/student/MealBooking';
import { DigitalPass } from './pages/student/DigitalPass';
import { MealFeedback } from './pages/student/MealFeedback';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { DemandManagement } from './pages/staff/DemandManagement';
import { WasteTracking } from './pages/staff/WasteTracking';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { ResearchDoc } from './pages/admin/ResearchDoc';
import { TestingWorkspace } from './pages/admin/TestingWorkspace';
import { CheckpointsPage } from './pages/admin/CheckpointsPage';
import { FinalReport } from './pages/admin/FinalReport';
import { ShowcaseViva } from './pages/admin/ShowcaseViva';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 1. Welcome / Landing */}
            <Route index element={<WelcomePage />} />

            {/* 2. Student Application */}
            <Route path="student" element={<StudentHome />} />
            <Route path="student/crowd" element={<CrowdMonitoring />} />
            <Route path="student/book" element={<MealBooking />} />
            <Route path="student/pass" element={<DigitalPass />} />
            <Route path="student/feedback" element={<MealFeedback />} />

            {/* 3. Mess Staff Application */}
            <Route path="staff" element={<StaffDashboard />} />
            <Route path="staff/demand" element={<DemandManagement />} />
            <Route path="staff/waste" element={<WasteTracking />} />

            {/* 4. Admin & Design Thinking Documentation (INT335) */}
            <Route path="admin" element={<AdminAnalytics />} />
            <Route path="admin/research" element={<ResearchDoc />} />
            <Route path="admin/testing" element={<TestingWorkspace />} />
            <Route path="admin/checkpoints" element={<CheckpointsPage />} />
            <Route path="admin/report" element={<FinalReport />} />
            <Route path="admin/showcase" element={<ShowcaseViva />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
