<template>
    <div class="header">
        <div class="wrap header-wrap">
            <div class="l">
                欢迎来到叩丁严选
            </div>
            <div class="r">
                <ul>
                    <li class="avatar" @click="showToastFn">
                        <img src="../assets/img/userImg.f8bbec5e.png" width="26" alt="">
                        用户名：--
                    </li>
                    <li>
                        我的鸡腿：--
                    </li>
                    <li>获取鸡腿</li>
                    <li>叩丁狼官网</li>
                    <li class="login-btn" @click="toLogin">登录</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, createLogger } from 'vuex';
import { WeixinLoginAPI } from "@/request/api"

export default {
    data() {
        return {


        }
    },
    async created() {
        // 这个顶部组件创建的时候，如果拿得到code就来发起微信扫码登录请求
        let mycode = this.$route.query.code;
        console.log("这是我的", mycode);
        if (mycode) {
            let res = await WeixinLoginAPI({
                code: mycode
            })
            console.log(res);

            if (res.code == 0) {
                //提示用户登录成功
            } else if (res.code == 407) {
                //1提示用户没有绑定手机号
                this.asyncIsShowToast({
                    // toast的内容
                    msg: "请绑定手机号",
                    // toast的类型(success, danger, info)
                    type: "danger"
                });
                //2打开登录窗口（方便叫用户用手机号登录）
                this.changeIsShowLoginModal(true)
                //3手机号登录保存uuid道本地方便之后登录能够获取这个uuid
                localStorage.setItem("uuid", res.uuid)
            } else if (res.code == 400) {
                //提示用户登录失败请重新登录
                this.asyncIsShowToast({
                    // toast的内容
                    msg: "登录失败请重新登录",
                    // toast的类型(success, danger, info)
                    type: "danger"
                });
                //打开登录窗口
                this.changeIsShowLoginModal(true)
            }
        }
    },
    methods: {
        ...mapMutations({
            changeIsShowLoginModal: "showLoginModal/changeIsShowLoginModal",
        }),
        ...mapActions({
            asyncIsShowToast: "showToast/asyncIsShowToast"
        }),
        toLogin() {
            this.changeIsShowLoginModal(true)
        },
        showToastFn() {
            //显示提示框
            this.asyncIsShowToast({
                // 表示是否展示提示
                // isShow: true,
                // toast的内容
                msg: "请先登录",
                // toast的类型(success, danger, info)
                type: "danger"
            });
        }
    }
}
</script>
 
<style lang = "less" scoped>
.header {
    height: 40px;
    background: #242B39;

    .header-wrap {
        color: #FFFEFE;
        height: 40px;
        font-size: 14px;
        /*     background-color: #fcf; */
        display: flex;
        justify-content: space-between;
        align-items: center;

        .r ul {
            display: flex;
            align-items: center;

            li {
                margin-right: 20px;
                cursor: pointer;
            }

            .avatar {
                display: flex;
                align-items: center;

                img {
                    border-radius: 50%;
                    margin-right: 5px;
                }
            }

            .login-btn {
                width: 124px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background: #0A328E;
            }
        }
    }
}
</style>