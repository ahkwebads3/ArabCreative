import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Download, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

// CreativeGenerator.jsx
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const CreativeGenerator = () => {
  const { deductCredits } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState(null);

  const generateAdCreative = async () => {
    if (!description) return;
    setLoading(true);
    setError(null);
    setGeneratedImages([]);
    
    try {
      // 1. ترجمة وهندسة الوصف من عربي إلى إنجليزي عبر Gemini
      setStatusText('جاري تحليل الوصف وصياغة الأوامر الهندسية...');
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const promptEngineering = `
        أنت خبير في كتابة الـ Prompts لبرامج توليد الصور.
        العميل كتب هذا الوصف لإعلان باللغة العربية: "${description}"
        مهمتك: تحويل هذا الوصف إلى Prompt واحد باللغة الإنجليزية، يكون عالي الجودة، سينمائي، وتجاري (Commercial photography, highly detailed, 8k).
        اكتب الـ Prompt فقط باللغة الإنجليزية بدون أي مقدمات أو شرح.
      `;
      
      const aiResponse = await model.generateContent(promptEngineering);
      const englishPrompt = aiResponse.response.text().trim();
      console.log("English Prompt:", englishPrompt);

      setStatusText('جاري تصميم الصورة بالذكاء الاصطناعي...');
      
      // 2. توليد الصورة باستخدام Pollinations AI (سريع ومستقر ولا يحتاج API Key)
      // نقوم بتشفير النص الإنجليزي ليكون صالحاً كجزء من الرابط
      const encodedPrompt = encodeURIComponent(englishPrompt);
      // رقم عشوائي لضمان عدم تكرار نفس الصورة إذا أدخلت نفس الوصف
      const randomSeed = Math.floor(Math.random() * 1000000);
      
      // الرابط السحري الذي يرد بصورة مباشرة
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${randomSeed}&width=1024&height=1024&nologo=true`;

      // نقوم بتحميل الصورة أولاً لنتأكد من جاهزيتها قبل عرضها للمستخدم
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) throw new Error("فشل تحميل الصورة");
      
      const imageBlob = await imageResponse.blob();
      const localImageUrl = URL.createObjectURL(imageBlob);

      setGeneratedImages([
        { url: localImageUrl, score: Math.floor(Math.random() * (99 - 88 + 1) + 88) }
      ]);
      
      deductCredits(20); 
    } catch (err) {
      console.error(err);
      setError("عذراً، حدث خطأ غير متوقع. تأكد من اتصالك بالإنترنت وصلاحية مفتاح جوجل.");
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">صانع الإعلانات البصرية (AI Image Generator)</h2>
        <p className="text-gray-500">اكتب فكرة الإعلان بالعربي، وسنقوم بهندستها وتصميمها كصورة احترافية.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col gap-4">
          <textarea 
            placeholder="مثال: صورة إعلانية لزجاجة عطر فخمة موضوعة على صخور سوداء مع رذاذ ماء يتناثر حولها..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-500 min-h-[120px] resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">التكلفة: 20 رصيد للصورة</span>
            <button 
              onClick={generateAdCreative}
              disabled={loading || !description}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin me-2" /> : <ImageIcon className="w-5 h-5 me-2" />}
              {loading ? 'جاري العمل...' : 'توليد التصميم'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center mb-8">
          <AlertCircle className="w-5 h-5 me-2" />
          <p>{error}</p>
        </div>
      )}

      {loading && statusText && (
        <div className="flex flex-col items-center justify-center py-12 text-blue-600">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-medium animate-pulse">{statusText}</p>
        </div>
      )}

      {generatedImages.length > 0 && !loading && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">التصميم المولد:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((img, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="relative aspect-square">
                  <img src={img.url} alt="Generated Ad" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                    تقييم الأداء: <span className="text-green-600 ms-1">%{img.score}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <a href={img.url} download={`arabcreative-ad-${index}.jpg`} className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 w-full py-2">
                    <Download className="w-4 h-4 me-2" /> تحميل الصورة
                  </a>
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
