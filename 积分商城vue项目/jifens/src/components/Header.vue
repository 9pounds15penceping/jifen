<template>
    <div class="nav">
        <div class="wrap nav-wrap">
            <div class="l">
            <h1>
                <img src="../assets/img/indexLogo.6f8ac4f0.png" alt="">
            </h1>
        </div>
        <div class="c">
            <ul>                                                 
                <li @click="$router.push('/')" :class="{active:$route.path=='/'}">首页</li>
                <li @click="$router.push('/goods')" :class="{active:$route.path=='/goods'}">全部商品</li>
                <li @click="$router.push('/user')" :class="{active:$route.path=='/user'}">个人中心</li>
                <li @click="$router.push('/order')" :class="{active:$route.path=='/order'}">我的订单</li>
                <li @click="$router.push('/free')" :class="{active:$route.path=='/free'}">专属福利</li>
            </ul>
        </div>
        <div class="r">
            <input type="text">
            <span class="search-btn"><img src="../assets/img/search.png" alt=""></span>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

 
        }
    }
}
</script>
 
<style lang = "less" scoped>
    .nav-wrap{
        height: 118px;
        /* background-color: #fcf; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        .c ul{
            width: 500px;
            display: flex;
            justify-content: space-between;
            li{
                cursor: pointer;
                &.active{
                    color:#0A328E;
                    font-weight: bold;
                }
            }
        }
        .r{
            display: flex;
            input{
                width: 214px;
                height: 40px;
                border: 1px solid #dedede;
                border-radius: 20px 0 0 20px;
                float: left;
                box-sizing: border-box;
                padding-left: 19px;
                outline-style: none;
            }
            .search-btn{
                width: 50px;
                height: 40px;
                background: #0A328E;
                border-radius: 0px 20px 20px 0px;
                text-align: center;
                line-height: 44px;
            }
        }
    }
</style>