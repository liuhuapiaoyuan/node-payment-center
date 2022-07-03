/*
 * @Description: 支付配置
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 11:07:46
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 01:46:21
 */

import { PaymentMethod } from "./constant"

export interface PaymentConfig {
    /**
     * 支付方法
     */
    getMethod(): PaymentMethod
}

/**
 * 微信支付参数
 */
export class WechatConfig implements PaymentConfig {
/*  商户号，支持「普通商户/特约商户」或「服务商商户」 */
    mchid?: string
    appid?: string
    /* 「商户API证书」的「证书序列号」 */
    serial?: string
    /*  「微信支付平台证书」的「证书序列号」，下载器下载后有提示`serial`序列号字段 */
    platformCertificateSerial:string 
    /* APIv2密钥(32字节) */
    secret:string 
    /* platform的二進制内容 */
    private method: PaymentMethod

    getMethod(): PaymentMethod {
        return this.method
    }

    constructor(){
        this.method = PaymentMethod.Wechat
    }
}

/**
 * 支付宝支付配置
 */
export class AliConfig implements PaymentConfig {
    mchId?: string
    appId?: string
    private method: PaymentMethod
    
    constructor(){
        this.method = PaymentMethod.Alipay
    }

    getMethod(): PaymentMethod {
        return this.method
    }
}