import { observable } from 'mobx'

const userStore = observable({
  isLogin: false,
  username: 'wadaaw',
  current: 0,
  handleChange(current) {
    this.current = current
  },
  handleLogin(status) {
    this.isLogin = status
  },
  setName(name) {
    this.username = name;
  }

})
export default userStore