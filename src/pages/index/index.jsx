import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';

import Login from '../../component/Login/index';
import Register from '../../component/Register/index';


class Index extends Component {
  config = {
    navigationBarTitleText: '登录',
  }

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  handleChange = () => {
    this.setState(preState => ({ isLogin: !preState.isLogin }), () => {
      Taro.setNavigationBarTitle({ title: this.state.isLogin ? '注册' : '登录' })
    })
  }

  render() {
    const { isLogin } = this.state;
    return (
      !isLogin ? <Login onChange={this.handleChange} /> : <Register onChange={this.handleChange} />
    )
  }
}

export default Index 
