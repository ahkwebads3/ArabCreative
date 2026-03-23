import React, { useState } from 'react';
import { Link, Loader2, Download, Edit } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CreativeGenerator = () => {
  const { deductCredits } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [url, setUrl] = useState('');

  const handleGenerate = () => {
    setLoading(true);
    // محاكاة قراءة الرابط وتوليد الإعلانات لمدة 3 ثواني
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      deductCredits(10); // خصم 10 نقاط رصيد
    }, 3000);
  };

  return (
    <div>
      {/* قسم إدخال البيانات */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">توليد إعلانات من الرابط الذكي</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Link className="w-5 h-5 text-gray-400 absolute top-3.5 right-4" />
            <input 
              type="text" 
              placeholder="ضع رابط المنتج هنا (مثال: https://store.com/product)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 pr-12 pl-4 outline-none focus:border-blue-500"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading || !url}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin me-2" /> : null}
            {loading ? 'جاري التحليل والتصميم...' : 'توليد الإعلانات (10 رصيد)'}
          </button>
        </div>
      </div>

      {/* قسم عرض النتائج */}
      {generated && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">النتائج المقترحة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[98, 92, 85].map((score, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <div className="h-64 bg-gray-200 relative">
                  {/* صورة إعلان وهمية */}
                  <img src={`https://placehold.co/400x400/3B82F6/FFF?text=Ad+Banner+${index + 1}`} alt="Ad" className="w-full h-full object-cover" />
                  
                  {/* تقييم الأداء Predictive Score */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center shadow-sm">
                    تقييم الأداء: <span className={`ms-2 ${score > 90 ? 'text-green-600' : 'text-yellow-600'}`}>%{score}</span>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center bg-gray-50 border-t border-gray-100">
                  <button className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600">
                    <Download className="w-4 h-4 me-1.5" /> تحميل
                  </button>
                  <button className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600">
                    <Edit className="w-4 h-4 me-1.5" /> تعديل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeGenerator;
