<template>
  <div class="title">
    <div class="l">
      <img :src="imgSrc" alt="" />
      <h2>{{ title1 }}</h2>
    </div>
    <div class="r" v-show="title1 != '积分攻略'">
      更多
      <span><img src="../../assets/img/arrow.png" alt="" /></span>
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传过来的值
  props: ["title1", "imgSrc"],
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 20px;

  .l {
    display: flex;
    align-items: center;
    font-size: 30px;
    font-family: SourceHanSansSC;
    font-weight: bold;
    color: #242b39;

    h2 {
      margin-left: 10px;
    }
  }

  .r {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      margin-left: 6px;
    }
  }
}
</style>