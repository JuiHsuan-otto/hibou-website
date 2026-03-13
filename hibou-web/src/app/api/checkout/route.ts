import { NextResponse } from 'next/server';
import { ECPayHelper } from '@/lib/ecpay';
import { logOrderToSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const style = formData.get('style') as string || '預設花色';
    const name = formData.get('name') as string || '未提供';
    const phone = formData.get('phone') as string || '未提供';
    const address = formData.get('address') as string || '未提供';
    
    const tradeNo = `HIBOU${Date.now().toString().slice(-10)}`;
    const now = new Date();
    const tradeDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const ecpay = new ECPayHelper(true); // 使用 Stage 測試環境
    const callbackBase = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const orderParams: any = {
      MerchantID: ecpay.getMerchantID(),
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: tradeDate,
      PaymentType: 'aio',
      TotalAmount: 1680,
      TradeDesc: `喜福機能防風罩 - ${style}`,
      ItemName: `機能防風罩(${style}) x 1`,
      ReturnURL: `${callbackBase}/api/checkout/callback`,
      ChoosePayment: 'ALL',
      ClientBackURL: `${callbackBase}/thank-you`,
      EncryptType: 1
    };

    // 傳遞收件人資訊（不參與 CheckMacValue 計算，但放入表單）
    const customFields = {
      CustomField1: name,
      CustomField2: phone,
      CustomField3: address
    };

    // 執行模擬紀錄到 Google Sheets
    await logOrderToSheet({ ...orderParams, ...customFields });

    const html = ecpay.createFormHTML(orderParams, customFields);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
