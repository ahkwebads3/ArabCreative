import React, { useState } from 'react';
import { UploadCloud, Palette } from 'lucide-react';

const BrandWorkspace = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">إعداد العلامة التجارية</h2>
      <p className="text-gray-500 mb-8">قم بإعداد ألوان وشعار علامتك التجارية ليقوم الذكاء الاصطناعي باستخدامها تلقائياً.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اسم العلامة التجارية</label>
          <input type="text" placeholder="مثال: متجر الأناقة" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شعار العلامة التجارية (Logo)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer">
            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">اضغط لرفع الشعار أو قم بسحبه وإفلاته هنا</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input type="color" defaultValue="#3B82F6" className="w-8 h-8 rounded cursor-pointer" />
              <span className="ms-3 text-gray-600 text-sm">#3B82F6</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <input type="color" defaultValue="#1E40AF" className="w-8 h-8 rounded cursor-pointer" />
              <span className="ms-3 text-gray-600 text-sm">#1E40AF</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-4">
          حفظ العلامة التجارية
        </button>
      </div>
    </div>
  );
};

export default BrandWorkspace;
