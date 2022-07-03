/*
 * @Description: 序号生成
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-04 00:42:40
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 00:49:05
 */




export interface TradeNoRepository{

  /**
   * 序号生成
   */
  genSn():Promise<string>
}



let counter = 0
export class DefaultTradeNoRepository implements TradeNoRepository{

  /**
   * 生成序号
   * @returns 
   */
  genSn(): Promise<string> {
    const sn = counter += 1
    return Promise.resolve(`T_${Date.now()}_${sn}`)
  }

}