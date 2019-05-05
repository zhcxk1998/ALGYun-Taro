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

    userStore.fetchMyCommodity().then(() => {
      Taro.hideLoading()
    })
  }

  deleteItem = async (index) => {
    const { userStore } = this.props;
    const { myCommodityList } = userStore;
    const { id } = myCommodityList[index]
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
    const { myCommodityList } = userStore;
    const id = myCommodityList[index].id;
    Taro.navigateTo({
      url: `/pages/edit/index?id=${id}`
    })
  }

  render() {
    const { userStore } = this.props;
    const { myCommodityList } = userStore;
    return (
      <View className='shop'>
        {myCommodityList && myCommodityList.map((item, index) => (
          <View key={index} className='container'>
            <View className='shop-item'>
              <View className='img' style={{ backgroundImage: `url(${item.commodity_img || 'https://cdn.suisuijiang.com/ImageMessage/5b4ee8321b53ec11c8505de5_1557065543477.jpeg?width=240&height=240'})` }} />
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
              <View className='setting-item' onClick={() => { this.deleteItem(index) }}>删除</View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default Sell;