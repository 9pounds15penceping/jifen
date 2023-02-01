export default{
    namespaced:true,
    state: {
        // 表示是否展示提示
        isShowToast:false, 
        // toast的内容
        toastMsg: "默认内容",
        // toast的类型(success, danger, info)
        toastType: "success"
    },
    mutations: {
        changeIsShowToast(state,payload){
            console.log(payload);
            state.isShowToast = payload.isShow;
            if(payload.isShow){
                state.toastMsg = payload.msg;
                state.toastType = payload.type;
            }
            
        }
    },
    actions: {
        asyncIsShowToast(context,payload){
            context.commit("changeIsShowToast",{
                isShow:true,
                msg:payload.msg,
                type:payload.type
            })
            setTimeout(()=>{
                context.commit("changeIsShowToast",{
                    isShow:false
                })
            },1000)
        }
    },
}