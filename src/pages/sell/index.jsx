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
    this.state = {
      commodityList: []
    }
  }

  async componentWillMount() {
    Taro.showLoading({ title: '加载中...' })
    this.fetchCommodity().then(() => {
      Taro.hideLoading()
    })
  }

  fetchCommodity() {
    const { userStore } = this.props;
    const { userInfo: { nickname } } = userStore;
    return new Promise(async (resolve, reject) => {
      const { data } = await Taro.request({
        url: 'https://algyun.cn:81/market/list/',
        data: {
          page: 1
        }
      })
      const { commodityList } = data;
      console.log(commodityList)
      this.setState({
        commodityList
      })
      resolve()
    })
  }

  deleteItem = async (index) => {
    const { commodityList } = this.state;
    const { id } = commodityList[index]
    const res = await Taro.request({
      method: 'DELETE',
      url: `https://algyun.cn:81/market/${id}/`,
      header: {
        cookie: Taro.getStorageSync('cookie')
      }
    })
    console.log(res)
  }

  editItem = (index) => {
    const { commodityList } = this.state;
    const { userStore } = this.props;
    userStore.setEditItem(commodityList[index].id)
    Taro.navigateTo({
      url: '/pages/edit/index'
    })
  }

  render() {
    const { commodityList } = this.state;
    return (
      <View className='shop'>
        {commodityList && commodityList.map((item, index) => (
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