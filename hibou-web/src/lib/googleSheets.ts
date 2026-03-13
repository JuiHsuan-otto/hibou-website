import { google } from 'googleapis';

/**
 * 喜福 (HiBOU) 訂單後台：Google Sheets 整合模組
 * 功能：將訂單資訊寫入指定的 Google Sheet
 */

// 這裡使用環境變數來存儲憑證與參數，確保資安
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = 'Orders'; // 請確保活頁簿中有名為 'Orders' 的分頁

// 初始化 Google Auth (使用 Service Account)
async function getGoogleAuth() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return auth;
}

export async function logOrderToSheet(orderData: any) {
    try {
        const auth = await getGoogleAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // 準備寫入的行數據
        const row = [
            new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }), // 寫入時間
            orderData.MerchantTradeNo, // 訂單編號
            orderData.ItemName,        // 商品名稱
            orderData.TotalAmount,     // 金額
            orderData.CustomField1 || '未提供', // 收件人姓名
            orderData.CustomField2 || '未提供', // 聯絡電話
            orderData.CustomField3 || '未提供', // 收件地址
            'PENDING',                 // 付款狀態
            'ECPay'                    // 支付平台
        ];

        // 寫入到最後一行
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row],
            },
        });

        console.log(`[Google Sheets] Order ${orderData.MerchantTradeNo} logged successfully.`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('[Google Sheets Error]', error);
        // 如果寫入失敗，不應阻斷前端結帳跳轉，但需記錄錯誤
        return { success: false, error: 'Failed to log order' };
    }
}
