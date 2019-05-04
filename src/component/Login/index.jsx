import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Input, Image, Form } from '@tarojs/components';
import { AtMessage } from 'taro-ui';
import { observer, inject } from '@tarojs/mobx'

@inject('userStore')
@observer
class Login extends Component {
  static options = {
    addGlobalClass: true
  }

  config = {
    navigationBarTitleText: '登录'
  }

  showMessage(msg, type = 'warning') {
    Taro.atMessage({
      'message': msg,
      'type': type,
    })
  }

  async handleSubmit(e) {
    const { userStore } = this.props;
    const { email, password } = e.target.value;
    if (!email || !password) {
      this.showMessage('请输入完整信息！');
      return;
    }
    Taro.showLoading({ title: '登录中...' })
    const { data, statusCode, header } = await Taro.request({
      url: 'https://algyun.cn:81/users/',
      method: 'POST',
      data: {
        email,
        password,
        device: 'weapp'
      }
    })
    Taro.hideLoading();
    switch (statusCode) {
      case 200:
        this.showMessage('登陆成功', 'success');
        Taro.setStorageSync('cookie', header['Set-Cookie'])
        const { data: { myself } } = await Taro.request({
          method: 'GET',
          url: 'https://algyun.cn:81/users/dashboard/me/',
          header: {
            'Cookie': Taro.getStorageSync('cookie')
          }
        })
        userStore.setUserInfo(myself)
        userStore.handleLogin(true)
        userStore.handleChange(4)
        Taro.navigateBack({
          delta: 1
        })

        break;
      case 401:
      case 403:
        this.showMessage(data['err'], 'error');
        break;
      case 500:
        this.showMessage('网络异常', 'error');
        break;
      default:
        this.showMessage('未知错误', 'error');
    }
    // const res = await Taro.request({
    //   url: 'https://algyun.cn:81/users/dashboard/me/',
    //   method: 'GET'
    // })
    // console.log(res)
  }

  render() {
    const { onChange } = this.props;
    return (
      <View className='form-container'>
        <AtMessage />
        <Image src={require('../../assets/img/login.svg')} />
        <Form className='form-wrap' onSubmit={this.handleSubmit}>
          <Input name='email' className='form-input' type='text' placeholder='邮箱' />
          <Input name='password' className='form-input' type='password' placeholder='密码' />
          <Button className='form-button' formType='submit'>登录</Button>
        </Form>
        <Text className='form-change' onClick={() => { onChange(1) }} >立即注册</Text>
      </View>
    )
  }
}

export default Login;
