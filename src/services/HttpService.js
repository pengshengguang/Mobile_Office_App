import axios from 'axios'

let port = 3000
let host = '://localhost:' + port
let baseURL = 'http' + host
let axiosConfig = {
  baseURL
  // timeout: 2000
}

let instanceTmp = axios.create(axiosConfig)

export default {
  getAxios: instanceTmp,
  getCancelToken: axios.CancelToken
}
