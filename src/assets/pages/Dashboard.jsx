import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopNav from '../components/layout/TopNav';
import { useAppContext } from '../context/AppContext';
import { Zap, Image as ImageIcon, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user, stats } = useAppContext();

  const metrics = [
    { title: 'الرصيد المتاح', value: user.available_credits, icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { title: 'إجمالي التصميمات', value: stats.totalCreativesGenerated, icon: ImageIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'الأفضل أداءً', value: stats.topPerformingCreatives, icon: BarChart3, color: 'text-green-600', bgColor: 'bg-green-100' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="ps-64 flex flex-col min-h-screen">
        <TopNav />
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-xl text-gray-600">مرحباً بعودتك، <span className="font-bold text-gray-900">{user.name}</span> 👋</h2>
            <p className="text-gray-500 mt-1 text-sm">إليك نظرة عامة على أداء حملاتك وتصميماتك اليوم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{metric.title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{metric.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center border-dashed border-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">مساحة العمل قيد التجهيز</h3>
            <p className="text-gray-500">سيتم إضافة "مولد الإعلانات" هنا في الخطوة القادمة.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
