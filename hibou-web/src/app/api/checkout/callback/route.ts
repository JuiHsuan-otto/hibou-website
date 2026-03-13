import { NextResponse } from 'next/server';
import { ECPayHelper } from '@/lib/ecpay';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log('--- [ECPay Callback Received] ---');
    console.log(data);

    const ecpay = new ECPayHelper(true);
    const receivedCheckMacValue = data.CheckMacValue;
    
    // 驗證檢查碼
    const calculatedCheckMacValue = ecpay.generateCheckMacValue(data);

    if (receivedCheckMacValue === calculatedCheckMacValue) {
      if (data.RtnCode === '1') {
        // 付款成功邏輯 (更新資料庫/發送通知)
        console.log(`Order ${data.MerchantTradeNo} Payment Success!`);
        return new NextResponse('1|OK', { status: 200 });
      } else {
        console.log(`Order ${data.MerchantTradeNo} Payment Failed: ${data.RtnMsg}`);
        return new NextResponse('1|OK', { status: 200 }); // 綠界要求失敗也要回 1|OK
      }
    } else {
      console.error('CheckMacValue Verification Failed');
      return new NextResponse('0|Verification Failed', { status: 400 });
    }
  } catch (error) {
    console.error('Callback process error:', error);
    return new NextResponse('0|Error', { status: 500 });
  }
}
