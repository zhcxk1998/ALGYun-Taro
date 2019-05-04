import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components';
import { AtGrid, AtList, AtListItem, AtButton } from "taro-ui";
import { observer, inject } from '@tarojs/mobx';

import './style.css'

@inject('userStore')
@observer
class Sell extends Component {

  config = {
    navigationBarTitleText: '我的出售'
  }

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const { userStore } = this.props;
    Taro.showLoading({ title: '加载中...' })
    userStore.fetchCommodity().then(() => {
      Taro.hideLoading()
    })
  }

  deleteItem = async (index) => {
    const { userStore } = this.props;
    const { commodityList } = userStore;
    const { id } = commodityList[index]
    await Taro.request({
      method: 'DELETE',
      url: `https://algyun.cn:81/market/${id}/`,
      header: {
        cookie: Taro.getStorageSync('cookie')
      }
    })
  }

  editItem = (index) => {
    const { userStore } = this.props;
    const { commodityList } = userStore;
    userStore.setEditItem(commodityList[index].id)
    Taro.navigateTo({
      url: '/pages/edit/index'
    })
  }

  render() {
    const { userStore } = this.props;
    const { commodityList, userInfo } = userStore;
    return (
      <View className='shop'>
        {commodityList && commodityList.filter(item => item.seller.user === userInfo.nickname).map((item, index) => (
          <View key={index} className='container'>
            <View className='shop-item'>
              <View className='img' style={{ backgroundImage: `url(${item.commodity_img})` }} />
              <View className='wrap'>
                <View className='description'>
                  {item.detail}
                </View>
                <View className='price'>
                  ¥{item.price}
                </View>
                <View className='view'>
                  {item.views} 人看过
              </View>
              </View>
            </View>
            <View className='setting'>
              <View className='setting-item' onClick={() => { this.editItem(index) }}>编辑</View>
              <View className='setting-item' onClick={() => { this.deleteItem(index) }}>下架</View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default Sell;