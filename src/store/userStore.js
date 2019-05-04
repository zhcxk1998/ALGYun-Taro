import { observable } from 'mobx'

const userStore = observable({
  isLogin: false,
  userInfo: {},
  editItemId: 0,
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
  setEditItem(id) {
    this.editItemId = id
  }
})
export default userStore