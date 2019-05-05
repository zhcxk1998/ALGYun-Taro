import { observable } from 'mobx'
import Taro from '@tarojs/taro'

const userStore = observable({
  isLogin: false,
  userInfo: {},
  commodityList: [],
  myCommodityList: [],
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
      const { data: { commodityList } } = await Taro.request({
        url: 'https://algyun.cn:81/market/list/',
        data: {
          page: 1
        }
      })
      this.commodityList = commodityList
      resolve()
    })
  },
  fetchMyCommodity() {
    return new Promise(async (resolve, reject) => {
      const { data: { commodity } } = await Taro.request({
        method: 'GET',
        url: 'https://algyun.cn:81/users/dashboard/',
        header: {
          cookie: Taro.getStorageSync('cookie')
        }
      })
      this.myCommodityList = commodity
      resolve()
    })
  }
})

export default userStore