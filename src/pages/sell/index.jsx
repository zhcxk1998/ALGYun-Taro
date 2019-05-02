import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components';
import { AtGrid, AtList, AtListItem } from "taro-ui";
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
      this.setState({
        commodityList: commodityList.filter((item) => item.seller.user === nickname)
      })
      resolve()
    })
  }

  render() {
    const { commodityList } = this.state;
    return (
      <View className='shop'>
        {commodityList && commodityList.map((item, index) => (
          <View key={index} className={`shop-item ${index % 2 == 0 ? 'right-border' : ''}`}>
            <View className='img' style={{ backgroundImage: `url(${item.commodity_img})` }} />
            <View className='description'>
              {item.name}
            </View>
            <View className='price'>
              <Text>¥{item.price}</Text>
              <Text>{item.seller.user}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default Sell;