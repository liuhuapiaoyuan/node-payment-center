/*
 * @Description:实现支付宝支付 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 15:59:55
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 02:47:59
 */
import { PaymentConfig } from '../../bean/PaymentConfig';
import { PaymentAction, PaymentActionParams } from '../PaymentService';





export class AlipayPaymentAction implements PaymentAction{
  private config:PaymentConfig
  constructor(config:PaymentConfig){
    this.config = config
  }

  
  async asyncPay(params:PaymentActionParams){
    return {} as any
  }
  syncPay: (params:PaymentActionParams) => Promise<string>;
  
}