import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { AtGrid, AtList, AtListItem } from "taro-ui";
import { inject } from '@tarojs/mobx';

import './style.css';

@inject('userStore')
class DashBoard extends Component {
  config = {
    navigationBarTitleText: '个人中心',
  }

  constructor(props) {
    super(props)
    this.state = {
      // isLogin: false
    }
  }

  handleClick = () => {
    Taro.navigateTo({
      url: '/pages/entry/index'
    })
  }

  back = () => {
    const { userStore } = this.props;
    userStore.handleLogin(false)
    Taro.reLaunch({
      url: '/pages/index/index'
    }).then(() => {
      userStore.handleChange(4)
    })
  }

  render() {
    const { isLogin } = this.props.userStore;
    return (
      <View>
        <View className='dashBoard'>
          {
            !isLogin ?
              <View className='infomation'>
                <Button className='login-button' onClick={this.handleClick}>立即登录</Button>
              </View>
              :
              <View className='infomation'>
                <Image src='http://cdn.algbb.fun/emoji/32.png' className='avater' />
                <Text className='userName'>BB</Text>
                <Text className='info'>我是一名好学生，我的爱好是打游戏，不爱学习</Text>
              </View>
          }
          <View className='grid'>
            <AtGrid onClick={this.gridClick} mode='rect' hasBorder data={
              [
                {
                  image: require('../../assets/img/icon/record.png'),
                  value: '购买记录'
                },
                {
                  image: require('../../assets/img/icon/manage.png'),
                  value: '我的文章'
                },
                {
                  image: require('../../assets/img/icon/setting.png'),
                  value: '兼职情况'
                }
              ]
            }
            />
          </View>
          <View className='list'>
            <AtList>
              <AtListItem
                title='我的钱包'
                thumb={require('../../assets/img/icon/wallet.png')}
              />
              <AtListItem
                title='个人设置'
                thumb={require('../../assets/img/icon/user.png')}
              />
              <AtListItem
                title='朋友赠礼'
                extraText='点了也没用'
                thumb={require('../../assets/img/icon/prize.png')}
              />
              <AtListItem
                title='关于我们'
                thumb={require('../../assets/img/icon/about.png')}
              />
            </AtList>
          </View>
          <Button className='quit' onClick={this.back} hidden={!isLogin}>退出登录</Button>
        </View>
      </View>
    )
  }
}

export default DashBoard 
