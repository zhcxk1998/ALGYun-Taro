import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { AtGrid, AtList, AtListItem } from "taro-ui";
import { inject, observer } from '@tarojs/mobx';

import './style.css';

import privateLink from '../../utils/privateLink';


@inject('userStore')
@observer
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
    Taro.showLoading({ title: '退出中...' })
    Taro.request({
      url: 'https://algyun.cn:81/users/',
      method: 'DELETE',
      header: {
        cookie: Taro.getStorageSync('cookie')
      }
    }).then(() => {
      Taro.removeStorageSync('cookie')
    })
    setTimeout(() => {
      userStore.handleLogin(false)
      Taro.navigateBack({ delta: 1 })
      Taro.hideLoading()
    }, 1000)
  }

  gridClick = (item, index) => {
    const { userStore } = this.props;
    const { isLogin } = userStore;
    const linkList = ['sell'].map((link) => {
      return `/pages/${link}/index`
    });
    privateLink(isLogin, linkList[index])
  }

  render() {
    const { userStore } = this.props;
    const { isLogin, userInfo: { nickname, signature, head, email_active, es_check } } = userStore;
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
                <Image src={head || 'http://cdn.algbb.fun/emoji/32.png'} className='avater' />
                <Text className='userName'>{nickname}</Text>
                <Text className='info'>{signature}</Text>
              </View>
          }
          <View className='grid'>
            <AtGrid onClick={this.gridClick} mode='rect' hasBorder data={
              [
                {
                  image: 'https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/good.png',
                  value: '我的出售'
                },
                {
                  image: 'https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/manage.png',
                  value: '我的文章'
                },
                {
                  image: 'https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/setting.png',
                  value: '兼职情况'
                }
              ]
            }
            />
          </View>
          <View className='list'>
            <AtList>
              {
                !email_active ?
                  <AtListItem
                    title='验证邮箱'
                    thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/email.png'
                  /> : ''
              }
              {
                !es_check ?
                  <AtListItem
                    title='学生认证'
                    thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/%E5%AD%A6%E7%94%9F.png'
                  /> : ''
              }
              <AtListItem
                title='购买记录'
                thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/record.png'
              />
              <AtListItem
                title='个人设置'
                thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/user.png'
              />
              <AtListItem
                title='朋友赠礼'
                extraText='点了也没用'
                thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/prize.png'
              />
              <AtListItem
                title='关于我们'
                thumb='https://algyun-taro-oss.oss-cn-shenzhen.aliyuncs.com/assets/img/icon/about.png'
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
