import axios from "axios"


const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8881/cms",
    timeout: 20000
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    // 每一次发送请求之前，先经过这个拦截器，然后再去发送请求

    // 本次请求的一些配置项

    let myToken = localStorage.getItem("x-auth-token")
    config.headers['x-auth-token'] = myToken
    console.log(config);
    return config
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    // 后端返回的时候先执行这里的代码，然后再去执行组件中那个then中的代码

    // 本次请求的一些配置项
    return res.data
},err=>{
    return Promise.reject(err)
})

export default instance