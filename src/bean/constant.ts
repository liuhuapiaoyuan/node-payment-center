/*
 * @Description: 支付方式
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 11:06:39
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 00:26:17
 */



export enum PaymentMethod {
  Wechat,
  Alipay
}



/**
 * 支付状态
 */
export enum TransactionStatus{
  /* 等待支付 */
  WaitPay,
  /* 已支付(也有可能部分退费) */
  SuccessPay,
  /* 支付失败 */
  FailPay,
  /* 已退费 */
  Refund,
}

/**
 * 交易状态等待
 */
export enum TransactionBizStatus{
  /* 等待确认中 */
  Wait,
  Success,
  Fail
}