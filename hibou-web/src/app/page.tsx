'use client';

import React from 'react';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-[#FFFDF9] text-[#2C2C2C] leading-relaxed antialiased font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        :root {
          --sage: #7A9A7E; --moss: #4A6741; --cream: #FAF7F2; --warm-white: #FFFDF9; --charcoal: #2C2C2C; --gold: #C9A97A;
        }
        h1, h2, h3, h4 { font-family: 'Noto Serif TC', serif; letter-spacing: 0.1em; }
      `}</style>

      {/* HERO Section */}
      <section className="bg-[#FAF7F2] text-center pt-32 pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              【HiBOU 喜福】機能防風罩｜抗UV、防潑水<br />定義推車與揹巾的質感防護標準
            </h1>
            <p className="text-xl text-[#4A6741] tracking-[0.4em] font-medium">「 育 兒 旅 程， 由 我 溫 柔 守 護 」</p>
          </div>
          <div className="max-w-4xl mx-auto relative group">
            <img 
              src="/images/detail_scenes/image_1.webp" 
              className="w-full opacity-90 transition-opacity group-hover:opacity-100 duration-700"
              style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)' }}
              alt="Hero" 
            />
          </div>
        </div>
      </section>

      {/* Usage Scenes Section (4 Images) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl text-[#4A6741] text-center mb-16 font-bold tracking-wider">多樣場景 質感守護</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group overflow-hidden rounded-2xl shadow-md">
              <img src="/images/usage_scenes/image_1.webp" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="揹巾使用" />
              <p className="text-center py-3 text-sm text-gray-500 bg-[#FAF7F2]">揹巾模式</p>
            </div>
            <div className="group overflow-hidden rounded-2xl shadow-md">
              <img src="/images/usage_scenes/image_2.webp" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="推車防護" />
              <p className="text-center py-3 text-sm text-gray-500 bg-[#FAF7F2]">推車防護</p>
            </div>
            <div className="group overflow-hidden rounded-2xl shadow-md">
              <img src="/images/usage_scenes/image_3.webp" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="哺乳巾功能" />
              <p className="text-center py-3 text-sm text-gray-500 bg-[#FAF7F2]">哺乳巾功能</p>
            </div>
            <div className="group overflow-hidden rounded-2xl shadow-md">
              <img src="/images/usage_scenes/image_4.webp" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" alt="分腿設計" />
              <p className="text-center py-3 text-sm text-gray-500 bg-[#FAF7F2]">分腿設計</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAS Section */}
      <section className="py-32 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 bg-white p-4 shadow-2xl rounded">
            <img src="/images/products/image_25.webp" className="w-full rounded" alt="Feature" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl text-[#4A6741] border-l-8 border-[#C9A97A] pl-6 mb-8 leading-tight font-bold">
              別讓突如其來的小雨，<br />打斷了寶寶探索世界的興致
            </h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p><b>[Problem]</b> 帶寶寶出門最怕變天。細雨、冷風或路邊的噴濺水花，常讓家長措手不及。</p>
              <p><b>[Agitation]</b> 濕冷的衣物不僅讓寶寶不適大哭，更增加了著涼風險。在戶外要即時清理更是挑戰。</p>
              <p><b>[Solution]</b> HiBOU 專用布料讓水珠觸碰瞬間自然滑落，髒汙一抹即淨。內層始終乾爽透氣。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Styles & Action Section */}
      <section className="py-32 bg-[#FFFDF9]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl text-[#4A6741] text-center mb-16 font-bold tracking-wider">挑選您的育兒風格</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            
            {/* Style 1: 灰灰藍 */}
            <div className="bg-white p-8 rounded shadow-lg text-center group hover:-translate-y-2 transition-transform border border-transparent hover:border-[#C9A97A]">
              <div className="aspect-square overflow-hidden mb-6 rounded">
                <img src="/images/products/style_blue.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Grey Blue" />
              </div>
              <h4 className="text-2xl font-bold mb-4">灰灰藍恐龍</h4>
              <p className="text-gray-400 mb-8">中性優雅的色調，百搭各式推車，展現家長的高雅品味。</p>
              <div className="flex flex-col gap-3">
                <Link href="/checkout?style=blue" className="w-full bg-[#7A8A99] text-white py-4 rounded-full font-bold tracking-[0.2em] hover:bg-[#5D6D7E] transition-colors shadow-lg flex justify-center items-center">
                  選購
                </Link>
              </div>
            </div>

            {/* Style 2: 花花粉 */}
            <div className="bg-white p-8 rounded shadow-lg text-center group hover:-translate-y-2 transition-transform border border-transparent hover:border-[#C9A97A]">
              <div className="aspect-square overflow-hidden mb-6 rounded">
                <img src="/images/products/style_pink.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Flower Pink" />
              </div>
              <h4 className="text-2xl font-bold mb-4">花花粉恐龍</h4>
              <p className="text-gray-400 mb-8">溫潤柔美的色彩，為寶寶的出遊增添一抹溫馨氛圍。</p>
              <div className="flex flex-col gap-3">
                <Link href="/checkout?style=pink" className="w-full bg-[#E5B6B6] text-white py-4 rounded-full font-bold tracking-[0.2em] hover:bg-[#D4A5A5] transition-colors shadow-lg flex justify-center items-center">
                  選購
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-6 bg-white p-16 shadow-sm rounded relative">
          <span className="absolute top-8 left-8 text-xs tracking-[0.3em] text-[#C9A97A] uppercase font-serif">Expert Specs</span>
          <h3 className="text-3xl text-center text-[#4A6741] mb-12 font-bold">專業規格與認證</h3>
          <div className="space-y-6 text-lg">
            <div className="border-b border-gray-100 pb-4"><b className="text-[#4A6741] w-32 inline-block">科技材質</b> 高機能 UPF50+ 專業抗UV布料 + 親膚透氣雙重紗</div>
            <div className="border-b border-gray-100 pb-4"><b className="text-[#4A6741] w-32 inline-block">核心工藝</b> 台灣在地職人手工製造 (MIT)</div>
            <div className="border-b border-gray-100 pb-4"><b className="text-[#4A6741] w-32 inline-block">安全檢驗</b> 國家級合格認證 BSMI: M55352</div>
          </div>
        </div>
      </section>

      {/* Hand-drawn Illustrations Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <img src="/images/illustrations/image_2.webp" className="w-24 h-24 mx-auto mb-4 opacity-70" alt="輕量便攜" />
              <h5 className="font-bold text-[#4A6741]">輕量便攜</h5>
            </div>
            <div className="text-center">
              <img src="/images/illustrations/image_6.webp" className="w-24 h-24 mx-auto mb-4 opacity-70" alt="抗UV防護" />
              <h5 className="font-bold text-[#4A6741]">抗UV防護</h5>
            </div>
            <div className="text-center">
              <img src="/images/illustrations/image_8.webp" className="w-24 h-24 mx-auto mb-4 opacity-70" alt="防潑水科技" />
              <h5 className="font-bold text-[#4A6741]">防潑水科技</h5>
            </div>
            <div className="text-center">
              <img src="/images/illustrations/image_21.webp" className="w-24 h-24 mx-auto mb-4 opacity-70" alt="親膚透氣" />
              <h5 className="font-bold text-[#4A6741]">親膚透氣</h5>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 text-center text-gray-400 text-sm tracking-[0.2em] border-t border-gray-100">
        <p>&copy; 2026 HIBOU 喜福生活苑 ｜ 讓科技機能成為育兒最溫柔的後盾</p>
      </footer>
    </main>
  );
}
