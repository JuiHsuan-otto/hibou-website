import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const style = formData.get('style') as string || '預設花色';
    const name = formData.get('name') as string || '未提供';
    const phone = formData.get('phone') as string || '未提供';
    const address = formData.get('address') as string || '未提供';
    
    const orderId = `HIBOU-LP-${Date.now().toString().slice(-8)}`;

    // 模擬 LINE Pay V3 請求流程
    console.log(`--- [MOCK LINE PAY V3 REQUEST] ---`);
    console.log(`OrderId: ${orderId}`);
    console.log(`Product: 機能防風罩(${style})`);
    console.log(`Customer: ${name}, ${phone}, ${address}`);
    console.log(`Amount: 1680`);
    console.log(`----------------------------------`);

    // 模擬 LINE Pay 回傳的付款網址 (這在真實環境是由 LINE API 回傳)
    // 我們導向一個模擬的 LINE Pay 支付成功確認頁面
    const mockPaymentUrl = `https://sandbox-web-pay.line.me/web/payment/wait?transactionId=MOCK${Date.now()}`;

    // 模擬紀錄訂單到「後台」
    console.log(`[Mock System] LINE Pay 訂單已暫存: ${orderId}`);

    return NextResponse.redirect(mockPaymentUrl, 303);
  } catch (error) {
    return NextResponse.json({ error: 'LINE Pay checkout failed' }, { status: 500 });
  }
}
