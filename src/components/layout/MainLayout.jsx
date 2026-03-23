import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="ps-64 flex flex-col min-h-screen">
        <TopNav />
        <div className="flex-1 p-8">
          {/* هنا سيتم عرض محتوى الصفحات المتغيرة */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
