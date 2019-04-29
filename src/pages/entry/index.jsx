import Taro, { Component } from '@tarojs/taro';

import Login from '../../component/Login/index';
import Register from '../../component/Register/index';

import './style.css'

class Entry extends Component {
  config = {
    navigationBarTitleText: '登录',
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  handleChange = (page) => {
    const pageTitle = ['登录', '注册'];
    this.setState({ page }, () => {
      Taro.setNavigationBarTitle({ title: pageTitle[page] })
    })
  }

  componentWillMount(){
    Taro.showLoading({title:'请稍等...'})
  }

  componentDidShow(){
    Taro.hideLoading()
  }

  render() {
    const { page } = this.state;

    return page === 0 ?
      <Login onChange={this.handleChange} /> : <Register onChange={this.handleChange} />
  }


}
export default Entry
