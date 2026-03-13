import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';  // ← ADD
import HomepageInteractive from './pages/Home/index';
import AiMlPage from './pages/Services/AiMlPage';
import DataEngineeringPage from './pages/Services/DataEngineeringPage';
import CloudDevopsPage from './pages/Services/CloudDevopsPage';
import WebMobilePage from './pages/Services/WebMobilePage';
import IotPage from './pages/Services/IotPage';
import EnterprisePage from './pages/Services/EnterprisePage';
import CareersPage from './pages/Careers/index';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />  {/* ← ADD */}
      <Routes>
        <Route path="/" element={<HomepageInteractive />} />
        <Route path="/services/ai-ml" element={<AiMlPage />} />
        <Route path="/services/data-engineering" element={<DataEngineeringPage />} />
        <Route path="/services/cloud-devops" element={<CloudDevopsPage />} />
        <Route path="/services/web-mobile" element={<WebMobilePage />} />
        <Route path="/services/iot" element={<IotPage />} />
        <Route path="/services/enterprise" element={<EnterprisePage />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </BrowserRouter>
  );
}