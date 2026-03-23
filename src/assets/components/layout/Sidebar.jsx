import React from 'react';
import { Home, Briefcase, PlusSquare, Type, Image as ImageIcon, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'الرئيسية', active: true },
    { icon: Briefcase, label: 'العلامات التجارية', active: false },
    { icon: PlusSquare, label: 'إنشاء إعلان', active: false },
    { icon: Type, label: 'النصوص الإعلانية', active: false },
    { icon: ImageIcon, label: 'المكتبة', active: false },
    { icon: Settings, label: 'الإعدادات', active: false },
  ];

  return (
    <aside className="w-64 bg-white border-e border-gray-200 h-screen fixed top-0 start-0 flex flex-col shadow-sm z-10">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center me-3">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">
          ArabCreative<span className="text-blue-600">.ai</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5 me-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
