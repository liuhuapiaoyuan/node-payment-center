/*
 * @Description: 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 15:59:36
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-25 17:10:05
 */
import { readFileSync } from 'fs';
import Wechatpay, { Formatter, Rsa } from 'wechatpay-axios-plugin';
import { WechatConfig } from "../../bean/PaymentConfig";
import { PaymentAction, PaymentActionParams } from "../PaymentService";


// 从本地文件中加载「商户API私钥」
const merchantPrivateKeyFilePath = 'H:\\项目文档\\宿舍系统\\node-payment-center\\src\\test\\files\\apiclient_key.pem';
const merchantPrivateKeyInstance = readFileSync(merchantPrivateKeyFilePath);

// 从本地文件中加载「微信支付平台证书」，用来验证微信支付请求响应体的签名
const platformCertificateFilePath = 'H:\\项目文档\\深鲜的海\\微信支付证书\\wechatpay_2AEBFCA6683D1C9641BA2A41612A0C8999C09C7A.pem';
const platformCertificateInstance = readFileSync(platformCertificateFilePath);


// 从本地文件中加载「微信支付平台证书」，用来验证微信支付请求响应体的签名
const P12FilePath = 'H:\\项目文档\\宿舍系统\\node-payment-center\\src\\test\\files\\apiclient_cert.p12';
const P12Instance = readFileSync(P12FilePath);

export class WechatPaymentAction implements PaymentAction {

  private config: WechatConfig


  constructor(config: WechatConfig) {
    this.config = config
  }


  async asyncPay(params: PaymentActionParams) {
    const { tradeNo, title, body, amount,openid } = params
    let privateKey = merchantPrivateKeyInstance
    const wxpay = new Wechatpay({
      mchid: this.config.mchid + "",
      serial: this.config.serial + "",
      secret: this.config.secret + "",
      privateKey,
      certs: { [this.config.platformCertificateSerial]: platformCertificateInstance, },
      merchant: {
        cert: platformCertificateInstance,
        key:privateKey,
        passphase: this.config.mchid + "",
        pfx: P12Instance
      }
    });
    return wxpay.v3.pay.transactions.jsapi.post({
      mchid: this.config.mchid,
      out_trade_no: tradeNo,
      appid: this.config.appid,
      description: title,
      notify_url: 'https://weixin.qq.com/',
      amount: {
        total: amount,
        currency: 'CNY'
      },
      payer: {
        openid
      }
    })
      .then(result => {
        let data = result.data
        const params = {
          appId: '' + this.config.appid,
          timeStamp: `${Formatter.timestamp()}`,
          nonceStr: Formatter.nonce(),
          package: 'prepay_id=' + data.prepay_id,
          signType: 'RSA',
        } 
        const paySign = Rsa.sign(Formatter.joinedByLineFeed(
          params.appId, params.timeStamp, params.nonceStr, params.package
        ), privateKey)
        return { ...params, paySign }
      })
      .catch((e) => {
        throw e
      })
  }
  syncPay: (params: PaymentActionParams) => Promise<string>;

}