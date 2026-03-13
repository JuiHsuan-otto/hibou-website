import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#7A9A7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#4A6741] mb-4 font-serif">感謝您的選購</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          訂單已成功送出！我們將儘速為您安排出貨，讓機能守護陪伴寶寶的每一趟旅程。
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[#7A9A7E] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
        >
          返回首頁
        </Link>
      </div>
    </div>
  );
}
