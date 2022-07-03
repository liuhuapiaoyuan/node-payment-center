/*
 * @Description:  交易号的repository
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 16:08:36
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 00:41:41
 */

import { PaymentConfig } from "../bean/PaymentConfig";
import { Transaction } from "../bean/Transaction";


/**
 * 交易号
 * 1： 存储
 * 2： 状态update
 * 3： 查找
 */
export interface TransactionRepository {

  /**
   *  按照交易号
   * @param id 
   */
  findOne<Config extends PaymentConfig>(tradeNo:string): Promise<Transaction<Config>>;

  /**
   * 保存數據
   * @param data 
   */
  save<Config extends PaymentConfig>(data:Transaction<Config>):Promise<Transaction<Config>>;


  
}