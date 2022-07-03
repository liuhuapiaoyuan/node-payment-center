/*
 * @Description: 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 15:32:18
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-03 15:33:32
 */

import { Refund } from "../bean/Refund";


export interface RefundRepository{


  /**
   * 按照交易号查询退费
   */
  findByTradeNo:(tradeNo:string)=>Promise<Refund>
  
}