import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transactionId');
  const orderId = searchParams.get('orderId');

  console.log('--- [LINE Pay Confirm Received] ---');
  console.log({ transactionId, orderId });

  // 正式環境需調用 LINE Pay Confirm API
  // 這裡直接跳轉至感謝頁
  return NextResponse.redirect(new URL('/thank-you', request.url));
}
