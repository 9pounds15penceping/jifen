export default{
    namespaced:true,
    state:{
        //用来控制登陆模态窗口的隐藏显示
        isShowLoginModal:true
    },
    mutations:{
        changeIsShowLoginModal(state,payload){
            state.isShowLoginModal = payload
        }
    }
}