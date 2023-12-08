// import Axios from 'axios'
// import { Utility } from '../Helper'

// const axiosInstance = Axios.create()

// const loc_global: any = global
// axiosInstance.interceptors.request.use(
//   (config: any) => {

//     if (loc_global.userData && loc_global.userData.result.token) {
//       config.headers.Authorization = `Bearer ${loc_global.userData.result.token}`

//        }
//        console.log("loc_global.userData",loc_global.userData)
//     return config
//   },
//   (error: any) => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   (config: any) => {
//     return config
//   },
//   (error: any) => {
//     return Promise.reject(error)
//   },
// )

// const getFormData = (object: any) => {
//   const formData = new FormData()
//   Object.keys(object).forEach((key) => formData.append(key, object[key]))
//   return formData
// }
// const ApiServices = async (
//   method = 'post',
//   body: any,
//   url = '',
//   headers = { "content-type": "application/json" },
//   formData = false,
// ) => {
//   const config: any = {
//     method: method.toLowerCase(),
//     timeout: 1000 * 60 * 2,
//   }
//   if (url) {
//     config.url = url
//   }
//   if (body && (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete')) {
//     config.params = body
//   } else if (body && method.toLowerCase() === 'post' && !formData) {
//     config.data = body
//   } else if (body && method.toLowerCase() === 'post' && formData) {
//     config.data = getFormData(body)
//   } else {
//     config.data = body
//   }
//   if (headers) {
//     config.headers = headers
//   }

//   return new Promise((resolve) => {
//     axiosInstance(config)
//       .then((res: any) => resolve({ statusCode: res.status, data: res.data }))
//       .catch((error: any) => {
//         if (error.response) {
//           if (error.response.status === 502 || error.response.status === 404) {
//             Utility.showDangerToast('Something went wrong, Please try again later.')
//           }
//           if (error.response.status === 422) {
//             error.response.data.errors.map((item: any) => {
//               let v1 = item.msg

//               Utility.showDangerToast(v1)
//             }
//             )
//           }
//           if (error.response.data?.message) {
//           }
//           resolve({
//             statusCode: error.response.status,
//             data: error.response.data,
//           })
//           return
//         }
//         if (error.code === 'ECONNABORTED') {
//           Utility.showDangerToast('Request timeout. Please check your internet connection')
//           resolve({ statusCode: 400 })
//           return
//         }
//         Utility.showDangerToast('Something went wrong, Please try again later.')
//         resolve({ statusCode: 400 })
//       })
//   })
// }

// export default ApiServices


















import Axios from 'axios'
import { Utility } from '../Helper'

const axiosInstance = Axios.create()

// const local_global: any = global
const loc_global: any = global;


axiosInstance.interceptors.request.use(
  (config: any) => {
    if (loc_global?.userData && loc_global.userData) {
      config.headers.Authorization = `Bearer ${loc_global?.userData}`

    }
    console.log("loc_global......", loc_global?.userData)
    return config
  },
  (error: any) => {
    console.log('request error =>', error.response || error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (config: any) => {
    console.log('response =>', config)
    return config
  },
  (error: any) => {
    console.log('response error =>', error.response || error)
    return Promise.reject(error)
  }
)

const getFormData = (object: any) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}
const ApiServices = async (
  method = 'post',
  body: any,
  url = '',
  formData = false,
  headers = null
) => {
  const config: any = {
    method: method.toLowerCase(),
    timeout: 1000 * 60 * 2,
  }
  if (url) {
    config.url = url
  }
  if (body && (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete')) {
    config.params = body
  } else if (body && method.toLowerCase() === 'post' && !formData) {
    config.data = body
  } else if (body && method.toLowerCase() === 'post' && formData) {
    config.data = getFormData(body)
  } else {
    config.data = body
  }
  if (headers) {
    config.headers = headers
  }

  return new Promise((resolve) => {
    axiosInstance(config)
      .then((res: any) => resolve({ statusCode: res.status, data: res.data }))
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === 502 || error.response.status === 404) {
            Utility.showDangerToast('Something went wrong, Please try again later.')
          }
          if (error.response.data?.message) {

          }
          resolve({
            statusCode: error.response.status,
            data: error.response.data
          })
          return
        }
        if (error.code === 'ECONNABORTED') {
          Utility.showDangerToast('Request timeout. Please check your internet connection')
          resolve({ statusCode: 400 })
          return
        }
        Utility.showDangerToast('Something went wrong, Please try again later.')
        resolve({ statusCode: 400 })
      })
  })
}

export default ApiServices
