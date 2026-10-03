import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { DemoControlPanel } from './components/common/DemoControlPanel';

// Pages
import { LandingPage } from './pages/LandingPage';
import { PlanTripPage } from './pages/PlanTripPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { ReadinessDashboardPage } from './pages/ReadinessDashboardPage';
import { AlternatePlanPage } from './pages/AlternatePlanPage';
import { AlertsPage } from './pages/AlertsPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProviderDetailPage } from './pages/ProviderDetailPage';
import { PartnerDashboardPage } from './pages/PartnerDashboardPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1F33]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/plan" element={<PlanTripPage />} />
              <Route path="/trip/demo-trip" element={<ItineraryPage />} />
              <Route path="/trip/demo-trip/readiness" element={<ReadinessDashboardPage />} />
              <Route path="/trip/demo-trip/alternate-plan" element={<AlternatePlanPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/provider/:id" element={<ProviderDetailPage />} />
              <Route path="/partner" element={<PartnerDashboardPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />

          {/* Floating Global Overlays */}
          <ToastContainer />
          <DemoControlPanel />
        </div>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;
