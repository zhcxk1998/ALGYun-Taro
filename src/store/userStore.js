import { observable } from 'mobx'

const userStore = observable({
  isLogin: false,
  userInfo: {},
  current: 0,
  handleChange(current) {
    this.current = current
  },
  handleLogin(status) {
    this.isLogin = status
  },
  setUserInfo(userInfo) {
    this.userInfo = userInfo
  }
})
export default userStore