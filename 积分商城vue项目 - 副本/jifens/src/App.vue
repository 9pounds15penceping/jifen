<template>
  <div id="app">
    <Tabbar></Tabbar>
    <Header></Header>
    <!-- 窗口 -->
    <router-view></router-view>
    <Footer></Footer>
    <Login v-show="isShowLoginModal"></Login>
    <transition name="fade">
      <Toast v-show="isShowToast"></Toast>
    </Transition>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar.vue"
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Login from "@/components/Login.vue"
import Toast from "@/components/Toast.vue"
import { mapState } from "vuex"

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      isShowLoginModal: state => state.showLoginModal.isShowLoginModal,
      isShowToast: state => state.showToast.isShowToast
    })
  },
  components: {
    Tabbar, Header, Footer, Login, Toast
  }
}
</script>

<style lang="less">

.fade-enter,.fade-leave-to{
  opacity: 0;
}

.fade-enter-active,.fade-leave-active{
  transition: opacity .3s linear;
}


.fade-enter-tO,.fade-leave{
  opacity: 1;
}

</style>
