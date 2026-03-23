import React from 'react';
import { Bell, Zap, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const TopNav = () => {
  const { user } = useAppContext();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">الرئيسية</h1>

      <div className="flex items-center space-x-reverse space-x-6">
        <div className="flex items-center bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full border border-yellow-200">
          <Zap className="w-4 h-4 me-2 fill-yellow-500 text-yellow-500" />
          <span className="text-sm font-bold">{user.available_credits}</span>
          <span className="text-sm ms-1">رصيد متبقي</span>
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="flex items-center hover:bg-gray-50 p-1 rounded-lg transition">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm me-2">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col text-start me-2">
            <span className="text-sm font-semibold text-gray-700">{user.name}</span>
            <span className="text-xs text-gray-500 capitalize">{user.subscription_plan} Plan</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
