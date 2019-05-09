import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtModal, AtModalContent, AtGrid } from "taro-ui";

import Home from '../../component/Home/index';
import Article from '../../component/Article/index';
import Message from '../../component/Message/index';
import DashBoard from '../../component/DashBoard/index';
import TabBar from '../../component/TabBar/index';

import privateLink from '../../utils/privateLink';

@inject('userStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,

  }

  constructor(props) {
    super(props)
    this.state = {
      isOpened: false,
    }
  }

  onPullDownRefresh() {
    const { userStore } = this.props;
    Taro.showNavigationBarLoading()
    Taro.showLoading({ title: '刷新中...' })
    userStore.fetchCommodity().then(() => {
      Taro.hideLoading()
      Taro.hideNavigationBarLoading()
      Taro.stopPullDownRefresh()
    })
  }

  async componentWillMount() {
    const { userStore } = this.props;
    Taro.showLoading({ title: '加载中...' })
    await userStore.fetchCommodity()
    await userStore.fetchArticleList()
    if (Taro.getStorageSync('cookie')) {
      const { data: { myself } } = await Taro.request({
        method: 'GET',
        url: 'https://algyun.cn:81/users/dashboard/me/',
        header: {
          'Cookie': Taro.getStorageSync('cookie')
        }
      })
      userStore.setUserInfo(myself)
      userStore.handleLogin(true);
    }

  }

  componentDidShow() {
    Taro.hideLoading()
  }

  handleChange = (current) => {
    const { userStore } = this.props;
    const title = ['首页', '互助', '', '消息', '我'];
    Taro.setNavigationBarTitle({ title: title[current] })
    userStore.handleChange(current)
  }

  handleOpen = () => {
    this.setState({
      isOpened: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    })
  }

  gridClick = (item, index) => {
    const { userStore } = this.props;
    const { isLogin } = userStore;
    this.setState({
      isOpened: false
    })
    if (index === 0) {
      privateLink(isLogin, '/pages/commodityedit/index')
    }
    if (index === 1) {
      privateLink(isLogin, '/pages/articleedit/index')
    }
  }

  render() {
    const { isOpened, } = this.state;
    const { userStore } = this.props;
    const { current } = userStore;
    return (
      <View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
          <AtModalContent>
            <AtGrid onClick={this.gridClick} hasBorder columnNum={2} data={
              [
                {
                  image: 'https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/item.png',
                  value: '上架商品'
                },
                {
                  image: 'https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/help.png',
                  value: '发布求助'
                }
              ]
            }
            />
          </AtModalContent>
        </AtModal>
        <View style={{ marginBottom: '10vh' }}>
          <View hidden={current !== 0}>
            <Home />
          </View>
          <View hidden={current !== 1}>
            <Article />
          </View>
          <View hidden={current !== 3}>
            <Message />
          </View>
          <View hidden={current !== 4}>
            <DashBoard />
          </View>
        </View>
        <TabBar current={current} onClick={this.handleChange} onOpen={this.handleOpen} />
      </View>
    )
  }
}

export default Index 
