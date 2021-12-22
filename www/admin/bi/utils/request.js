// // 配置axios
const request = axios.create({
  // 开发环境： https://apidev.sycdev.com
  // 测试环境： https://api.sycdev.com         登录界面 https://slm.sycdev.com/#/login
  /* 1.1 */
  // 开发环境： https://apidev-alpha.sycdev.com
  // 测试环境： https://api-alpha.sycdev.com         登录界面 https://slm.sycdev.com/#/login
  // 正式环境： https://slmapi.shengyc.com    登录界面 https://slm.shengyc.com/#/login
  // 预发布:：https://apipre.sycdev.com
  baseURL: 'https://api.sycdev.com', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 900000 // request timeout
})

let url = 'https://slm.sycdev.com/#/login'

// // request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    //   config.headers.common['Authorization'] = 'Bearer ' + getToken()
    // }
    // startLoad()
    if (localStorage.getItem('token')) {
      config.headers['X-Token'] = localStorage.getItem('token')
      // config.headers.common['Authorization'] = localStorage.getItem('token')
      config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
      config.headers.common['TENANT-ID'] = localStorage.getItem('tenantId')
      config.headers.common['VERSION'] = 'V1'
      return config
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // response code=200
    // const res = response.data
    return response
  },
  response => {
    // response code!=200

    if (response.response === undefined) {
      // Message({
      //   message: '网络异常',
      //   type: 'error',
      //   duration: 3 * 1000
      // })
      appTips.errorMsg('网络异常');

      return Promise.reject('error')
    }

    if (response.response.status === 401 || response.response.status === 403) {
      if (response.response.status === 401) {
        // Message({
        //   message: '对不起，您未登陆 或 页面已过期，请重新登陆！',
        //   type: 'error',
        //   duration: 3 * 1000
        // })
        window.location.href(url)

        appTips.errorMsg('对不起，您未登陆 或 页面已过期，请重新登陆！');

        return Promise.reject('error')
      }

      if (response.response.status === 403) {
        // Message({
        //   message: '对不起，您没有该权限，请联系管理员！',
        //   type: 'error',
        //   duration: 3 * 1000
        // })
        appTips.errorMsg('对不起，您没有该权限，请联系管理员！');

        return Promise.reject('error')
      }
    } else {
      if (response.response.status !== 200) {
        // Message({
        //   message: '对不起，程序错误，请联系管理员',
        //   type: 'error',
        //   duration: 3 * 1000
        // })
        appTips.errorMsg('对不起，程序错误，请联系管理员');
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    appTips.errorMsg(error.message);
    return Promise.reject(error)
  }
)