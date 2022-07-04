<!--
 * @Description: 
 * @version: 0.01
 * @Company: DCIT-SH
 * @Author: guohl
 * @Date: 2022-07-03 10:55:01
 * @LastEditors: guohl
 * @LastEditTime: 2022-07-04 20:19:34
-->
支付中心
支持微信支付，支付宝支付

-  支持微信支付、支付宝支付
-  支付 payment repositoroy  
-  交易 trasaction repository findById save 
-  退费 refund repository findById save




-  中间件，注册好的中间件，可以支持对输入流的处理


TODO 
- [x] Action需要支持自定义参数，因为每个支付的方式需要的参数不一样，比如微信支付 需要openid  支付宝不清楚是否还有别的参数
- [ ] 支持对异步回调的处理 aliCallback,wechatCallback，对服务端回调流程信息的处理，转化成transaction的处理
- [ ] 支持不同平台对退货的处理
- [ ] 提供一个整体的facade，统一配置外部的repository，callback等处理
- [ ] 可以考虑从调用方去思考问题 