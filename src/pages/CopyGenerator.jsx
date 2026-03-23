import React, { useState } from 'react';
import { Type, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ضع مفتاح الـ API الخاص بك هنا بين علامتي التنصيص
const API_KEY = "AIzaSyBnJu8vRHjP8NbCagJNbDZbOnTV06_S7O8"; 
const genAI = new GoogleGenerativeAI(API_KEY);

const CopyGenerator = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateAdCopy = async () => {
    if (!productName) return;
    setLoading(true);
    
    try {
      // إعداد نموذج جوجل
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      // الـ Prompt الذي نرسله للذكاء الاصطناعي (مكتوب بهندسة دقيقة)
      const prompt = `
        أنت خبير كتابة إعلانات (Copywriter) محترف ومختص في السوق العربي والمصري.
        مهمتك كتابة محتوى إعلاني جذاب لمنتج اسمه: "${productName}"
        وصف المنتج: "${description}"
        
        أريد المخرجات بالتنسيق التالي فقط (بدون أي مقدمات أو خاتمة):
        العنوان الإعلاني: [اكتب عنوان جذاب ومثير للانتباه هنا]
        النص الرئيسي: [اكتب نص الإعلان الذي يقنع العميل بالشراء بطريقة سردية أو مشكلة وحل]
        الـ CTA (الدعوة لاتخاذ إجراء): [اكتب جملة قصيرة وقوية تحث على الشراء أو الضغط على الرابط]
      `;

      const aiResponse = await model.generateContent(prompt);
      const text = aiResponse.response.text();
      
      // تحليل الرد لعرضه بشكل جميل
      setResult(text);
    } catch (error) {
      console.error("Error generating copy:", error);
      setResult("عذراً، حدث خطأ في الاتصال بالذكاء الاصطناعي. تأكد من صحة الـ API Key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">مولد النصوص الإعلانية (AI Copywriter)</h2>
        <p className="text-gray-500">اكتب تفاصيل منتجك وسيقوم الذكاء الاصطناعي بكتابة إعلان احترافي جاهز للنشر.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* قسم الإدخال */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المنتج أو الخدمة *</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="مثال: حذاء رياضي مريح، دورة تسويق..." 
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف مختصر للمنتج (اختياري)</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ما هي مميزات المنتج؟ لمن هو موجه؟..." 
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 h-32 resize-none" 
              />
            </div>

            <button 
              onClick={generateAdCopy}
              disabled={loading || !productName}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin me-2" /> : <Type className="w-5 h-5 me-2" />}
              {loading ? 'جاري كتابة الإعلان...' : 'توليد النص الإعلاني'}
            </button>
          </div>
        </div>

        {/* قسم النتيجة المولدّة */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative min-h-[300px]">
          {result ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">النتيجة الاحترافية:</h3>
                <button onClick={copyToClipboard} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                  {copied ? <CheckCircle2 className="w-4 h-4 me-1" /> : <Copy className="w-4 h-4 me-1" />}
                  {copied ? 'تم النسخ' : 'نسخ النص'}
                </button>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-gray-200 whitespace-pre-wrap text-gray-700 leading-relaxed shadow-sm">
                {result}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Type className="w-12 h-12 mb-3 opacity-20" />
              <p>ستظهر النتيجة الإعلانية هنا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyGenerator;
