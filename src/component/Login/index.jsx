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
    const {onChange,userStore} = this.props;
    userStore.setName('bbbb')
    onChange(2)
    // const { email, password } = e.target.value;
    // if (!email || !password) {
    //   this.showMessage('请输入完整信息！');
    //   return;
    // }
    // Taro.showLoading({title:'请稍等...'})
    // const { data, statusCode } = await Taro.request({
    //   url: 'https://algyun.cn:81/users/',
    //   method: 'POST',
    //   data: {
    //     email,
    //     password,
    //     device: 'weapp'
    //   }
    // })
    // Taro.hideLoading();
    // switch (statusCode) {
    //   case 200:
    //     this.showMessage('登陆成功', 'success');
    //     Taro.navigateTo({
    //       url: '/pages/index/index'
    //     })
    //     break;
    //   case 401:
    //   case 403:
    //     this.showMessage(data['err'], 'error');
    //     break;
    //   case 500:
    //     this.showMessage('网络异常', 'error');
    //     break;
    //   default:
    //     this.showMessage('未知错误', 'error');
    // }
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
