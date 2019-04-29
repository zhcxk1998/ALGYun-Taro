import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Swiper, SwiperItem } from '@tarojs/components';
import { AtSearchBar } from "taro-ui";

import './style.css';

import mockCommodity from '../../utils/mockCommodity';

class Home extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  handleChange = (searchValue) => {
    this.setState({
      searchValue
    })
  }

  render() {
    const { searchValue } = this.state;
    return (
      <View className='home'>
        <View className='search-bar'>
          <AtSearchBar
            value={searchValue}
            onChange={this.handleChange}
          />
        </View>
        <Swiper
          className='swiper'
          indicatorColor='#d7d7d7'
          indicatorActiveColor='#999'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image src='https://cdn.algbb.fun/algyun/slider/1.png' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='https://cdn.algbb.fun/algyun/slider/2.png' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='https://cdn.algbb.fun/algyun/slider/3.png' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='https://cdn.algbb.fun/algyun/slider/4.png' className='swiper-item' />
          </SwiperItem>
        </Swiper>
        <View className='title'>
          <Text>热卖商品</Text>
          <Text>更多</Text>
        </View>
        <View className='shop'>
          {mockCommodity.map((item, index) => (
            <View key={index} className={`shop-item ${index % 2 == 0 ? 'right-border' : ''}`}>
              <Image className='img' src={item} />
              <View className='description'>
                城野先生控油收缩毛孔收敛水补水保湿男女士VC化妆水城野先生控油收缩毛孔收敛水补水保湿男女士VC化妆水
              </View>
              <View className='price'>
                <Text>¥200</Text>
                <Text>···</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}

export default Home 
