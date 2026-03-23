import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BrandWorkspace from './pages/BrandWorkspace';
import CreativeGenerator from './pages/CreativeGenerator';
import CopyGenerator from './pages/CopyGenerator';


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="brands" element={<BrandWorkspace />} />
            <Route path="generate" element={<CreativeGenerator />} />
            {/* صفحات احتياطية لباقي القائمة */}
            <Route path="copy" element={<CopyGenerator />} />

            <Route path="library" element={<div className="p-8 text-center text-gray-500">المكتبة (قريباً)</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-gray-500">الإعدادات (قريباً)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
