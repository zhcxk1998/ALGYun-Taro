import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Input, Image, Form } from '@tarojs/components';
import { AtMessage } from 'taro-ui';

import '../../pages/index/style.css'

class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  async handleSubmit(e) {
    const { email, password } = e.target.value;
    if (!email || !password) {
      Taro.atMessage({
        'message': '请输入完整信息！',
        'type': "warning",
      })
      return;
    }
    const {data} = await Taro.request({
      url: 'https://algyun.cn:81/users/',
      method: 'POST',
      data: {
        email,
        password,
        device: 'weapp'
      }
    })
    console.log(data)
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
        <Text className='form-change' onClick={onChange} >立即注册</Text>
      </View>
    )
  }
}

export default Login;
