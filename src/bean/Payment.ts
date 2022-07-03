import { AliConfig, WechatConfig } from './PaymentConfig';
/*
 * @Description: 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 11:06:18
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 01:53:20
 */
import { AlipayPaymentAction } from "../service/impl/AlipayPaymentAction";
import { WechatPaymentAction } from "../service/impl/WechatPaymentAction";
import { PaymentMethod } from "./constant";
import { PaymentConfig } from "./PaymentConfig";



export class Payment<Config extends PaymentConfig>{
 
  

  /**
   * 配置项目
   */
  config:Config


  /* 支付方法名称 */
  name:string


  constructor(config:Config){
    this.config = config
  }
 


  /* 获得对应的配置 */

  getPaymentAction(){
    switch (this.config.getMethod()) {
      case PaymentMethod.Alipay:
        return new AlipayPaymentAction(this.config as unknown as AliConfig) 
      case PaymentMethod.Wechat:
        return new WechatPaymentAction(this.config as unknown as WechatConfig)
      default:
        break;
    }
    return undefined
  }


}