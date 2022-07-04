import { AliConfig } from './../../bean/PaymentConfig';
/*
 * @Description:实现支付宝支付 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 15:59:55
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 14:24:49
 */
import AlipaySdk from 'alipay-sdk';
import * as path from 'path';
import { PaymentAction, PaymentActionParams } from '../PaymentService';

const privateKey = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCEKWghc24AQSzX7o+7AOLOZp1Z66Usp4VtxHLMSbPMxjRGoICbpd/4DHW1S83EpoV+yRj5SAt9Fz7sS8Cl++U8JQ9mpCMhTpYIq7vvk/0Ui0bPd7/gIEtkdTyZiBH36tFpqpPxugdwyoe7aLZl0OElZmYU/VVpaC/WeGIFhKxg/r9CvZYclQrlvB5uooXGRC8OfkcbShOmOEa5SO3MmLBNuUDxa7vh/GIA2jm/dg77De9q1QZOOoR3SUhJMzq/mC21CVe4duWT3NZvPtNHQaeKVBhRjhfDNmHkNJGDx1nJdC+ouP9j2A5Z1HHqIjefr6TVdBQWHmQKoFk6Op4gKVPDAgMBAAECggEAObokY8gZmj7dqYvoeBRQ/TrRLD/DrBeYLnQKeLUQtjc1Ckx9IH95rs0ydPghbu4VjWWlZO1VJ1SKBYipI1c9r+G4MmsrdRbwbeUld+Y6O0kCqwhxZSJ2C/ExgRZwUsvcoL0DViidq2SrmO6KDTsJvN5XZH+rWRlLG/EFT8e9y7eZBAEVa7mC9xQJWt0Y5FoVECGafLP6XAgEF7pClIqJpthX4K2eCYIKNAagcXavz+zz3dEgyIkvydFPQ+zOHyDydeSjT3KpBITb/2xOfmu7hgsNXWYsEXLGUEcXWPzmV1eQwFrnF48k+fFvLsbeWYjOTNPO6dL7lkWjmAk7p0fVUQKBgQDGuplS4FrAb8Mzyrs+cdeOKB+jxpkZFd9qNsDgyvWj53SceVRv/pB6pAG26PHP/VM7pWfIq/5S44HOPDZPWwgR2epqRn2+CBcISOta4bCeoqNxeOLtUPYeL1Hb04ySxitn3924C9C+q5emXFBje7UFOaqqesLBrfgRnnmtNOM67wKBgQCqP8G8FSgc2L8x8Wqm/PjE8ByLV9pbamPXl/SddpCEWPF3g0rD9rzN0jSHjxsw7Wkb4LYsgInZ37+Y6SBQrlCHQL0CempnR9NShTCX+gRYZEcTsg6mz1bbPm7ZPqb+IoOI2FS16PSUeksX/wTGfXOWPVk8IGA34Fb9YpVI11qEbQKBgGaFAu3nQcn+nhQM5PW84ve6KUBjBr4TM5NmtbAB5CDvGZBTY0T3bW9nRl8m4wBqblLZ7KVwXR5DscZD97yOeKZE5hJ3VQ0AvWkPvSLARU5BFtJGC8NjveQqgy9FfkKFqwTGT2pP5htHCE/RVcNMoUEV075o4CnsZoooWBsLqqHPAoGBAIDx2yU+DOyUSXNlOvcRIMXgam4rcwnL8aTnxXDBzUFAMFrpiOYVafilnf2SKPEMz5A6yR+5ly76ZZ5F66DP9dQK91z6JL7myqp0kFJ7HXFpOeAz+x7iaRGTHtfRuR9AOsmZt8czkpMmcNvS3eYMPFBtVLnSd626b4hoc1MBMOCdAoGAEdyLj2gmtFS6vxa78ZCgJC6rm1xj3H1TDOBix5HoAqum97PyAYuNpQxy4HaNG9pQ0oubOoe1tysZnAfPnRtnAWjYhtzQak42gRwStJdp7yoXS6eachzgE0noHEJkFL/APjm43N4dUQ7RKQAc5xsGNUQKdyWEPKUdLVIAfGFvEMQ="


export class AlipayPaymentAction implements PaymentAction {
  private config: AliConfig
  private alipaySdk: AlipaySdk
  constructor(config: AliConfig) {
    this.config = config
    this.alipaySdk = new AlipaySdk({
      gateway: "https://openapi.alipaydev.com/gateway.do",
      appId: config.appId + "",
      privateKey,
      encryptKey: "n7CFUoIdMi6AIKmQGKrSTg==",
      keyType: "PKCS8",
      signType: "RSA2",
      alipayRootCertPath: path.resolve('./src/test/files/alipayRootCert.crt'),
      alipayPublicCertPath: path.resolve('./src/test/files/alipayCertPublicKey_RSA2.crt'),
      appCertPath: path.resolve('./src/test/files/appCertPublicKey_2016080600180853.crt'),
    });
  }

  //"https://openapi.alipay.com/gateway.do","app_id","your private_key","json","GBK","alipay_public_key","RSA2");
  async asyncPay(params: PaymentActionParams) {
    // 需要AES加解密的接口
    let result = await this.alipaySdk.exec('alipay.trade.wap.pay', {
      return_url: this.config.return_url,
      bizContent: {
        out_trade_no: params.tradeNo,
        total_amount: params.amount / 100,
        subject: params.body,
        product_code:"QUICK_WAP_WAY",
        quit_url:params.quit_url,
        // 支付渠道 enable_pay_channels:"balance,pcredit,moneyFund",
        // 花呗分期付
        /* "extend_params":{"hb_fq_num":"3","hb_fq_seller_percent":"100"} */
      },
      // 自动AES加解密
      needEncrypt: true
    }).catch(e => {
      if (e?.serverResult?.status == 302) {
        return {
          status: 302,
          location: e?.serverResult?.headers?.location
        }
      }
    });
    return result!
  }
  syncPay: (params: PaymentActionParams) => Promise<string>;

}