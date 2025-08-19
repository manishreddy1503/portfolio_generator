import { CssBaseline } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProfilePage from './pages/dashboard/ProfilePage';
import SummaryPage from './pages/dashboard/SummaryPage';
import SkillsPage from './pages/dashboard/SkillsPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import CertificationsPage from './pages/dashboard/CertificationsPage';
import EducationPage from './pages/dashboard/EducationPage';
import ExperiencePage from './pages/dashboard/ExperiencePage';
import ThemePage from './pages/dashboard/ThemePage';
import AchievementsPage from './pages/dashboard/AchievementsPage';
import PortfolioPreviewPage from './pages/PortfolioPreviewPage';
import { AuthProvider, useAuth } from './providers/AuthProvider';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="certifications" element={<CertificationsPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="theme" element={<ThemePage />} />
          <Route path="achievements" element={<AchievementsPage />} />
        </Route>
        <Route
          path="/preview"
          element={
            <PrivateRoute>
              <PortfolioPreviewPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}


