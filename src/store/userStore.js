import { observable } from 'mobx'

const userStore = observable({
  username: 'wadaaw',
  setName(name) {
    this.username = name;
  }
})
export default userStore