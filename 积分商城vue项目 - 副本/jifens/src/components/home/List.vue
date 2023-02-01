<template>
  <ul class="list">
    <!-- :key 后面跟着的值是唯一的   使用string/number-->
    <!-- 点击li,跳转到商品详情页  并且要携带商品的id -->
    <li v-for="item in arr" :key="item.id" @click="goToDetail(item.id)">
      <section>
        <img :src="imgBaseUrl + item.coverImg" alt="" width="285" height="330" />
        <div class="bottom-box">
          <h3>{{ item.name }}</h3>
          <p>{{ item.coin }} 积分</p>
          <div class="btn">立即兑换</div>
        </div>
        <img class="flag" src="../../assets/img/section_new.png" alt="" />
        <img class="flag" src="../../assets/img/section_hot.png" alt="" />
      </section>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToDetail(id) {
      // 路由跳转  把商品id也传过去
      // 路由跳转：this.$router.push(路径)
      // 路径拼接： /detail/id   ---  detail?id=值
      this.$router.push(`/detail?id=${id}`)
    }
  },
  // 接收父组件传过来的数据
  props: ["arr"]
};
</script>
 
<style lang = "less" scoped>
.list {
  /* width: 1220px; */
  /* overflow: hidden; */
  display: flex;
  /* 自动换行 */
  flex-wrap: wrap;

  li {
    &:nth-of-type(4n) {
      margin-right: 0px;
    }

    width: 285px;
    float: left;
    margin-bottom: 20px;
    margin-right: 20px;
    position: relative;

    section {
      width: 285px;
      height: 492px;
      position: relative;
      transition: all 0.5s linear;
    }

    .bottom-box {
      width: 285px;
      height: 162px;
      background-color: #fff;
      text-align: center;

      h3 {
        font-size: 18px;
        font-family: SourceHanSansSC;
        font-weight: 300;
        color: #333333;
        height: 56px;
        line-height: 56px;
        /* background-color: #ffc; */
      }

      p {
        font-size: 18px;
        font-family: SourceHanSansSC;
        font-weight: bold;
        color: #fd604d;
      }

      .btn {
        width: 100px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #0a328e;
        margin: 20px auto 0;
        font-size: 18px;
        font-family: SourceHanSansSC;
        font-weight: 300;
        color: #0a328e;
      }
    }

    .flag {
      position: absolute;
      left: 0;
      top: 0;
    }

    &:hover {
      cursor: pointer;

      section {
        margin-top: -15px;
        box-shadow: 0 0 10px #ccc;

        .btn {
          background-color: #0a328e;
          color: #fff;
        }
      }
    }
  }
}
</style>