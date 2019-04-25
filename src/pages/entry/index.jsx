import Taro, { Component } from '@tarojs/taro';

import Login from '../../component/Login/index';
import Register from '../../component/Register/index';
import Index from '../index/index';

import './style.css'

class Entry extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  handleChange = (page) => {
    const pageTitle = ['登录', '注册', '首页'];
    this.setState({ page }, () => {
      Taro.setNavigationBarTitle({ title: pageTitle[page] })
    })
  }

  render() {
    const { page } = this.state;

    return (
      <Index />
    )
  }


}
export default Entry
