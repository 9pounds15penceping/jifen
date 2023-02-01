<template>
  <div class="toast">
    <!-- <i class="iconfont icon-toast-shibai_huaban"></i>
      <span>提示内容</span> -->
    <i
      :class="toastType == 'success' ? 'iconfont icon-toast_chenggong' : (toastType == 'danger' ? 'iconfont icon-toast-shibai_huaban' : 'iconfont icon-toast-jinggao')"></i>
    <span>{{ toastMsg }}</span>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  data () {
      return {
        
      }
  },
  computed:{
      ...mapState({
          toastMsg:state=>state.showToast.toastMsg,
          toastType:state=>state.showToast.toastType,
      })
  }
}
</script>
 
<style lang = "less" scoped>
.toast{
  position: fixed;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  left: 50%;
  top: 15px;
  transform: translateX(-50%);
  border-radius: 6px;

  .iconfont{
    margin-right: 10px;
  }

  .icon-toast-shibai_huaban{
    color: red;
  }

  .icon-toast_chenggong{
    color: green;
  }

  .icon-toast-jinggao{
    color: orange;
  }
}
</style>