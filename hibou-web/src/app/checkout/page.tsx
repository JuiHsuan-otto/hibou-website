'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const products = [
  { id: 'blue', name: '機能防風罩 - 灰灰藍恐龍', price: 1680, image: '/images/products/style_blue.jpg' },
  { id: 'pink', name: '機能防風罩 - 花花粉恐龍', price: 1680, image: '/images/products/style_pink.jpg' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [paymentMethod, setPaymentMethod] = useState('ecpay');

  useEffect(() => {
    const style = searchParams.get('style');
    const product = products.find(p => p.id === style);
    if (product) setSelectedProduct(product);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 左側：商品選擇與預覽 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-[#4A6741] mb-6 font-serif">1. 選擇您的款式</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedProduct.id === product.id ? 'border-[#7A9A7E] bg-[#FAF7F2]' : 'border-gray-100'
                }`}
              >
                <img src={product.image} className="w-20 h-20 object-cover rounded-lg mr-4" alt={product.name} />
                <div>
                  <div className="font-bold text-gray-800">{product.name}</div>
                  <div className="text-[#C9A97A] font-bold">NT$ {product.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>總計金額</span>
              <span className="text-[#C9A97A]">NT$ {selectedProduct.price}</span>
            </div>
          </div>
        </div>

        {/* 右側：結帳資訊與按鈕 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-[#4A6741] mb-6 font-serif">2. 付款與配送方式</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">付款方式</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('ecpay')}
                  className={`py-3 px-4 border-2 rounded-xl font-medium transition-all ${
                    paymentMethod === 'ecpay' ? 'border-[#7A9A7E] bg-[#FAF7F2] text-[#4A6741]' : 'border-gray-100 text-gray-500'
                  }`}
                >
                  信用卡 / ATM
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('linepay')}
                  className={`py-3 px-4 border-2 rounded-xl font-medium transition-all ${
                    paymentMethod === 'linepay' ? 'border-[#06C755] bg-[#E8F9EE] text-[#06C755]' : 'border-gray-100 text-gray-500'
                  }`}
                >
                  LINE Pay
                </button>
              </div>
            </div>

            <form action={paymentMethod === 'linepay' ? '/api/checkout-linepay' : '/api/checkout'} method="POST">
              <input type="hidden" name="style" value={selectedProduct.name} />
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">收件人姓名</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#7A9A7E] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#7A9A7E] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">收件地址</label>
                  <input type="text" name="address" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#7A9A7E] outline-none" />
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full mt-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ${
                  paymentMethod === 'linepay' ? 'bg-[#06C755]' : 'bg-[#7A9A7E]'
                }`}
              >
                立即付款 NT$ {selectedProduct.price}
              </button>
            </form>
          </div>

          <p className="mt-6 text-xs text-gray-400 text-center italic">
            本網站使用 SSL 加密連線，保障您的交易安全
          </p>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">載入中...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
