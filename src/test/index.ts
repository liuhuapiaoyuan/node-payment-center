import { TransactionRepository } from '../repository/TransactionRepository';
/*
 * @Description: 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-04 00:54:34
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 02:48:31
 */

import { Payment } from "../bean/Payment";
import { PaymentConfig, WechatConfig } from "../bean/PaymentConfig";
import { Transaction } from '../bean/Transaction';
import { PaymentService } from "../service/PaymentService";



/* 测试接口 */

// 1: 创建payment

// 2: 创建transaction

class TempTransactionRepository implements TransactionRepository {
  private temp: Record<string, Transaction<any>> = {}
  
  findOne<Config extends PaymentConfig>(tradeNo: string): Promise<Transaction<Config>> {
    return Promise.resolve(this.temp[tradeNo])
  }
  save<Config extends PaymentConfig>(data: Transaction<Config>): Promise<Transaction<Config>> {
    this.temp[data.tradeNo] = data
    return Promise.resolve(data)
  }

}


let tempTransactionRepository = new TempTransactionRepository()
let wechatConfig = new WechatConfig()
wechatConfig.appid = "wx9d4127a22440e519";
wechatConfig.mchid = "1618256247"
/* 秘钥 */
wechatConfig.secret = "1118d224e96a98bb966f6092fda840ed"
/* 平台序列号 */
wechatConfig.platformCertificateSerial = "2AEBFCA6683D1C9641BA2A41612A0C8999C09C7A"
/* 序列号 */
wechatConfig.serial = "2226191CC87F0902144718CDEE292C3011E2C34E"

let wepayment = new Payment(wechatConfig)
let service = new PaymentService(tempTransactionRepository)

async function test() {
  console.log("===========创建交易开始===========" )
  let tra = await service.create(wepayment , {
    openid: "ov7MY5aDPvuFKrFYJGTSvQw60OZE",
    amount:1,
    body:"測試標題",
    title:"測試聶榮"}).catch(e=>e)
  console.log(tra)
  console.log("===========创建交易结束===========")
  return tra
}
  

test()