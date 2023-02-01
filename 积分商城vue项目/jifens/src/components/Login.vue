<template>
    <div class="modal">
        <div class="mask" @click="close"></div>
        <div class="login-box">
            <span class="close" @click="close">X</span>
            <ul class="title">
                <li @click="isSHowLoginForm = true" :class="{ active: isSHowLoginForm }">手机号码登录</li>
                <li style="margin:0 10px">|</li>
                <li @click="weixinClick" :class="{ active: !isSHowLoginForm }">微信扫码登录</li>
            </ul>
            <div class="body">
                <div class="form" v-show="isSHowLoginForm">
                    <div class="mb20 row">
                        <input v-model="phoneNum" type="text" class="ipt" placeholder="请输入手机号">
                    </div>
                    <div class="mb20 row">
                        <slide-verify :l="42" :r="20" :w="360" :h="140" @success="onSuccess" @fail="onFail"
                            @refresh="onRefresh" :style="{ width: '100%' }" class="slide-box" ref="slideBlock"
                            :slider-text="msg"></slide-verify>
                    </div>
                    <div class="mb20 row">
                        <input type="text" class="ipt" placeholder="请输入短信验证码" v-model="SMScode">
                        <div class="btn checkcode-btn">
                            <span v-show="!isShowCount" @click="getSMScode">获取验证码</span>
                            <span v-show="isShowCount">{{ count }} s</span>
                        </div>
                    </div>
                    <div class="mb20 btn" @click="phoneLogin">
                        登录
                    </div>
                </div>
                <div id="weixin" class="qrcode" v-show="!isSHowLoginForm">
                    二维码
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations,mapActions } from 'vuex';
import { SendSMSAPI, phoneLoginAPI } from "@/request/api"

export default {
    data() {
        return {
            //控制登录隐藏和显示
            isSHowLoginForm: true,
            //手机号码
            phoneNum: "",
            //倒计时
            count: 60,
            //滑动提醒
            msg: "向右滑动",
            //是否显示数字
            isShowCount: false,
            //手机号码判断
            phoneNums: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            SMScode: ""
        }
    },
    methods: {
        ...mapActions({
            asyncIsShowToast:"showToast/asyncIsShowToast"
        }),
        ...mapMutations({
            changeIsShowLoginModal: "showLoginModal/changeIsShowLoginModal"
        }),
        close() {
            this.changeIsShowLoginModal(false)
        },
        weixinClick(){
            this.isSHowLoginForm = false;
            //展示二维码
            let _this = this;
            new WxLogin({
                id: "weixin",
                appid: "wx67cfaf9e3ad31a0d",  // 这个appid要填死
                scope: "snsapi_login",
                // 扫码成功后重定向的接口
                redirect_uri: "https://sc.wolfcode.cn/cms/wechatUsers/shop/PC",
                // state填写编码后的url
                state: encodeURIComponent(window.btoa("http://127.0.0.1:8080" + _this.$route.path)),
                // 调用样式文件
                href: "data:text/css;base64,Lyogd3hsb2dpbi5jc3MgKi8NCi5pbXBvd2VyQm94IC50aXRsZSwgLmltcG93ZXJCb3ggLmluZm97DQogIGRpc3BsYXk6IG5vbmU7DQp9DQoNCi5pbXBvd2VyQm94IC5xcmNvZGV7DQogIG1hcmdpbi10b3A6IDIwcHg7DQp9",
            });
        },
        toVerify() {
            if (!this.phoneNums.test(this.phoneNum)) {
                this.asyncIsShowToast({
                    // 表示是否展示提示
                    isShow: true,
                    // toast的内容
                    msg: "手机格式不正确",
                    // toast的类型(success, danger, info)
                    type: "danger"
                });
                return//验证手机号格式
            }
            if (this.msg == "再试一次" || this.msg == "向右滑动") {
                this.asyncIsShowToast({
                    // 表示是否展示提示
                    isShow: true,
                    // toast的内容
                    msg: "请滑动到正确位置",
                    // toast的类型(success, danger, info)
                    type: "info"
                });
                return//验证滑动是否正确
            }
            return true
        },
        async phoneLogin() {//使用手机号和短信验证码登录
            //判断手机号格式和滑块
            if (!this.toVerify()) return;
            //验证短信验证码（前端只能验证非空）
            if (!this.SMScode.trim()) {
                alert("请输入验证码")
                return
            }
            //登录请求
            let res = await phoneLoginAPI({
                verifyCode: this.SMScode,
                phone: this.phoneNum
            });
            console.log(res);
            if (res.code == 0) {//登录之后的业务逻辑
                //1.提示登录成功
                this.asyncIsShowToast({
                    // 表示是否展示提示
                    isShow: true,
                    // toast的内容
                    msg: "登录成功",
                    // toast的类型(success, danger, info)
                    type: "success"
                });
                //2.保存token，本地储存
                localStorage.setItem("x-auth-token", res['x-auth-token'])
                //3.关闭登录窗口
                this.changeIsShowLoginModal(false)
                //4.其他处理业务
            }
        },
        countDown() {
            //倒计时函数
            //用定时器 setInterval
            let timer = null
            timer = setInterval(() => {
                this.count--;
                //每次减完判断this.count是不是为0
                if (this.count == 0) {
                    //清楚定时器
                    clearInterval(timer);
                    //变回原来的数字
                    this.isShowCount = false;
                    //变回this.count最大值
                    this.count = 60
                }
            }, 1000)
        },
        async getSMScode() {
            //判断手机号格式和滑块
            if (!this.toVerify()) return;

            let res = await SendSMSAPI({
                phone: this.phoneNum
            });// "验证通过发送验证码"
            console.log(res);
            this.isShowCount = true;
            this.countDown()
        },
        onSuccess(times) {
            let ms = (times / 1000).toFixed(1);
            this.msg = "login success,耗时" + ms + "s";
        },
        onFail() {
            this.onRefresh
        },
        onRefresh() {
            this.msg = "再试一次";
        }
        // yc() {
        //     if (this.phoneNums == null) {

        //     }
        // }
    }

}
</script>
 
<style lang = "less" scoped>
.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    /*  bottom: 0;
        right: 0; */
    .mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }

    .login-box {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 555px;
        height: 423px;
        background: url("../assets/img/login-box-bg.png");

        .close {
            position: absolute;
            right: 52px;
            top: 10px;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            /* font-family: "宋体"; */
        }

        .title {
            display: flex;
            justify-content: center;
            width: 100%;
            padding-top: 50px;
            font-size: 20px;
            color: #999;

            li {
                cursor: pointer;
            }

            .active {
                color: #333;
            }
        }

        .body {
            width: 355px;
            margin: 20px auto 0;
            height: 200px;

            .form {
                .row {
                    flex: 1;
                    display: flex;

                }

                .ipt {
                    box-shadow: 0;
                    flex: 1;
                    height: 48px;
                    border: 1px solid #e4e7eb;
                }

                .checkcode-btn {
                    width: 100px;
                    margin-left: 10px;
                }

                .btn {
                    background: #0a328e;
                    color: #fff;
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                }
            }
        }
    }
}


/deep/.slide-box {
    width: 100%;
    position: relative;
    box-sizing: border-box;

    canvas {
        position: absolute;
        left: 0;
        top: -120px;
        display: none;
        width: 100%;
        box-sizing: border-box;
    }

    .slide-verify-block {
        width: 85px;
        height: 136px;
    }

    .slide-verify-refresh-icon {
        top: -120px;
        display: none;
    }

    &:hover {
        canvas {
            display: block;
        }

        .slide-verify-refresh-icon {
            display: block;
        }
    }
}

/deep/.slide-verify-slider {
    margin-top: 0 !important;
}

#weixin{
    display: flex;
    justify-content: center;
    margin-top: -20px;
}
</style>