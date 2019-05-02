import Taro from '@tarojs/taro';

module.exports = function (isLogin, url) {
  if (isLogin) {
    Taro.navigateTo({ url })
  }
  else {
    Taro.showToast({
      title: '您还没有登录哟~',
      icon: 'none',
      duration: 2000,
      image: require('../assets/img/icon/warning.png')
    })
  }
}