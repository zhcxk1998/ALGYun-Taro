import { observable } from 'mobx'
import Taro from '@tarojs/taro'

const userStore = observable({
  isLogin: false,
  userInfo: {},
  commodityList: [],
  current: 0,
  handleChange(current) {
    this.current = current
  },
  handleLogin(status) {
    this.isLogin = status
  },
  setUserInfo(userInfo) {
    this.userInfo = userInfo
  },
  fetchCommodity() {
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'https://algyun.cn:81/market/list/',
        data: {
          page: 1
        }
      })
      const { commodityList } = data;
      this.commodityList = commodityList
      resolve()
    })
  },
})
export default userStore