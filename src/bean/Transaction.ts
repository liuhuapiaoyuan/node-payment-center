/*
 * @Description:  交易
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 11:22:44
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-03 17:00:34
 */
import { TransactionBizStatus, TransactionStatus } from './constant';
import { PaymentConfig } from './PaymentConfig';



export class Transaction<Config extends PaymentConfig>{

  /**
   * 支付配置 每一笔都要缓存，方便退费
   */
  config: Config

  /* 创建时间 */
  createTime: Date

  /* 支付完成时间 */
  paymentTime?: Date

  /* 完成时间 */
  completedTime?: Date

  /* 交易状态 */
  status: TransactionStatus



  /* 业务状态，支付后业务状态会timeout */
  bizStatus: TransactionBizStatus

  /**
   * 订单号
   *  */
  tradeNo: string


  /**
   * 交易金额（分）
   */
  amount: number

  /* 
   * 交易ID
   */
  thirdTradeNo?: number


  /**
   *  已退费金额
   */
  refundAmount: number


  /** 打包的参数 */
  packParams: any
 

}