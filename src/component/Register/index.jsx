import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Input, Image, Form } from '@tarojs/components';
import { AtMessage } from 'taro-ui';

import '../../pages/index/style.css'

class Login extends Component {
  config = {
    navigationBarTitleText: '注册'
  }

  showMessage(msg, type = 'warning') {
    Taro.atMessage({
      'message': msg,
      'type': type,
    })
  }

  async handleSubmit(e) {
    const { email, password, nickname } = e.target.value;
    if (!email || !password || !nickname) {
      this.showMessage('请输入完整信息！');
      return;
    }
    const { data, statusCode } = await Taro.request({
      url: 'https://algyun.cn:81/users/register/',
      method: 'POST',
      data: {
        email,
        password,
        nickname,
        school: 'BNUZ'
      }
    })
    switch (statusCode) {
      case 401:
        this.showMessage(data['err'],'error')
        break;
      case 500:
        this.showMessage('网络异常', 'error');
        break;
      default:
        this.showMessage('注册成功', 'success');
    }
  }

  render() {
    const { onChange } = this.props;
    return (
      <View className='form-container'>
        <AtMessage />
        <Image src={require('../../assets/img/register.svg')} />
        <Form className='form-wrap' onSubmit={this.handleSubmit}>
          <Input name='email' className='form-input' type='text' placeholder='邮箱' />
          <Input name='password' className='form-input' type='password' placeholder='密码' />
          <Input name='nickname' className='form-input' type='text' placeholder='昵称' />
          <Button className='form-button' formType='submit'>注册</Button>
        </Form>
        <Text className='form-change' onClick={onChange} >立即登录</Text>
      </View>
    )
  }
}

export default Login;
