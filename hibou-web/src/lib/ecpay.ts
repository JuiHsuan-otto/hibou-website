import crypto from 'crypto';

export interface ECPayOrder {
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  TotalAmount: number;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  ChoosePayment: string;
  ClientBackURL?: string;
}

export class ECPayHelper {
  private MerchantID: string;
  private HashKey: string;
  private HashIV: string;
  private ServiceURL: string;

  constructor(isStage: boolean = true) {
    this.MerchantID = isStage ? '2000132' : process.env.ECPAY_MERCHANT_ID!;
    this.HashKey = isStage ? '5294y06JbISpM5x9' : process.env.ECPAY_HASH_KEY!;
    this.HashIV = isStage ? 'v77hoKGq4kWxNNkn' : process.env.ECPAY_HASH_IV!;
    this.ServiceURL = isStage 
      ? 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'
      : 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5';
  }

  getMerchantID(): string {
    return this.MerchantID;
  }

  generateCheckMacValue(params: any): string {
    const keys = Object.keys(params).sort();
    let query = `HashKey=${this.HashKey}&`;
    query += keys.filter(key => key !== 'CheckMacValue').map(key => `${key}=${params[key]}`).join('&');
    query += `&HashIV=${this.HashIV}`;

    // URL Encode & Replace specific characters as per ECPay spec
    let encoded = encodeURIComponent(query);
    
    // ECPay specific encoding replacements
    encoded = encoded.replace(/%20/g, '+')
                     .replace(/%2d/g, '-')
                     .replace(/%5f/g, '_')
                     .replace(/%2e/g, '.')
                     .replace(/%21/g, '!')
                     .replace(/%2a/g, '*')
                     .replace(/%28/g, '(')
                     .replace(/%29/g, ')');
    
    // MD5 for V5 (SHA256)
    const hash = crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase();
    return hash;
  }

  createFormHTML(params: any, extraFields: any = {}): string {
    const baseParams = { ...params };
    baseParams.CheckMacValue = this.generateCheckMacValue(baseParams);

    // 合併不參與計算的欄位
    const finalParams = { ...baseParams, ...extraFields };

    let html = `<html><body><form id="ecpay_form" method="POST" action="${this.ServiceURL}">`;
    for (const key in finalParams) {
      html += `<input type="hidden" name="${key}" value="${finalParams[key]}">`;
    }
    html += `</form><script>document.getElementById("ecpay_form").submit();</script></body></html>`;
    return html;
  }
}
