// 管理整个项目的所有接口
import reauest from  "./request"
import qs from "qs"

// 首页精品推荐的请求
export const JingpinAPI = () => reauest.get("/products/recommend");

// 首页热门兑换的数据
export const HotAPI = () => reauest.get("/products/hot");

// 发送短信验证码
export const SendSMSAPI = (params) => reauest.post("/sendSMS",qs.stringify(params));

//手机验证码登录
export const phoneLoginAPI = (params) => reauest.post("/phoneRegin",qs.stringify(params));

//微信扫码登录请求
export const WeixinLoginAPI  = (params) => reauest.post("/wechatUsers/PCLogin",qs.stringify(params));

//获取商品详情的请求
export const GoodsDetailAPI = (id) => reauest.get(`/products/${id}`);

//获取用户信息
// export const GoodsDetailAPI = (id) => reauest.get();