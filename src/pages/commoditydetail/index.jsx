import Taro, { Component } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';

import './style.css';

class CommodityDetail extends Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor(props) {
    super(props);
    this.state = {
      commodity: {}
    }
  }

  async componentWillMount() {
    const commodity = await this.fetchCommodity()
    this.setState({
      commodity
    })
  }

  fetchCommodity() {
    return new Promise(async (resolve, reject) => {
      const { params } = this.$router;
      const { id } = params;
      const { data: { commodity } } = await Taro.request({
        method: 'GET',
        url: `https://algyun.cn:81/market/${id}/`,
        header: {
          'Cookie': Taro.getStorageSync('cookie')
        }
      })
      resolve(commodity)
    })
  }

  render() {
    const { commodity } = this.state;
    return (
      <View className='commodity-detail'>
        <View className='header'>
          <Image src='https://cdn.algbb.fun/avater/fat.jpg' style='width:8vh;height:8vh;' />
          <View className='header-info'>
            <View className='seller'>{commodity.seller.user}</View>
            <View className='time'>{commodity.last_mod_time}</View>
          </View>
        </View>
        <View className='info'>{commodity.detail}</View>
        {commodity.commodity_img.map((item, index) => (
          <Image src={item.url} key={index} mode='widthFix' style='width:92vw' />
        ))}
        <View className='commodity-bar'>
          <View>¥{commodity.price}</View>
          <View className='button'>购 买</View>
        </View>
      </View>
    )
  }
}

export default CommodityDetail;