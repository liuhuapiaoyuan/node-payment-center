import { TransactionBizStatus, TransactionStatus } from '../bean/constant';
import { PaymentConfig } from '../bean/PaymentConfig';
import { Payment } from './../bean/Payment';
import { Transaction } from './../bean/Transaction';
import { DefaultTradeNoRepository, TradeNoRepository } from './../repository/TradeNoRepository';
import { TransactionRepository } from './../repository/TransactionRepository';
/*
 * @Description: 支付的服务
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 15:34:06
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 12:43:17
 */

export type PaymentActionParams = {
  tradeNo:string, amount: number, title: string, body: string,
  [key: string]:any
}

export interface PaymentAction {




  // 创建一个支付项目，并且返回参数


  /**
   * 创建异步支付时需要的参数
   */
  asyncPay: (params:PaymentActionParams) => Promise<Record<string, any>>


  /**
   * 同步支付，一般返回的是请求的URL
   */
  syncPay: (params:PaymentActionParams) => Promise<string>

}

/**
 * 支付相关
 */
export class PaymentService {

  private transactionRepository: TransactionRepository

  private tradeNoRepository:TradeNoRepository  = new DefaultTradeNoRepository()
  
  constructor(transactionRepository: TransactionRepository,tradeNoRepository?:TradeNoRepository) {
    this.transactionRepository = transactionRepository
    if(!!tradeNoRepository){
      this.tradeNoRepository = tradeNoRepository
    }
  }

 

  /**
   * 创建交易号以及创建提交的参数
   * @param payment 
   * @returns 
   */
  async create<Config extends PaymentConfig>
    (payment: Payment<Config>, params:Omit<PaymentActionParams,"tradeNo">): 
        Promise<Transaction<Config>> {
    // 按照類型創建
    const paymetnaction = payment.getPaymentAction()
    const tradeNo = await this.tradeNoRepository.genSn()
    // 1：获得对应的参数配置
    let packParams = await paymetnaction?.asyncPay({...params ,tradeNo} as any);
    // 2: 生成交易号
    let transaction: Transaction<Config> = {
      config: payment.config,
      createTime: new Date(),
      paymentTime: undefined,
      completedTime: undefined,
      status: TransactionStatus.WaitPay,
      bizStatus: TransactionBizStatus.Wait,
      /* 本地交易号 */
      tradeNo,
      amount:params.amount,
      refundAmount: 0,
      packParams,
      
    }
    // 2  保存对应的参数
    return this.transactionRepository.save(transaction)
  }




  paymentSuccess() {

  }
  paymentFail() {

  }

  /**
   * 取消订单
   */
  cancel() {

  }

  /**
   * 业务成功
   */
  bizSuccess() {

  }

  /**
   * 业务失败
   */
  bizFail() {

  }


}