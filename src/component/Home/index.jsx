import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button, Swiper, SwiperItem } from '@tarojs/components';
import { AtSearchBar } from "taro-ui";

import './style.css';

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
        <AtSearchBar
          value={searchValue}
          onChange={this.handleChange}
        />
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545102278657' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545102282622' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545102287236' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545102274247' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545102295283' className='swiper-item' />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://cdn.algbb.fun/ImageMessages/BB_1545208892117' className='swiper-item' />
          </SwiperItem>
        </Swiper>
        <View className='title'>
          <Text>热卖商品</Text>
          <Text>更多</Text>
        </View>
        <View className='shop'>
          {[200, 200,200,200,200,200].map((item,index) => (
            <View key={index} className='shop-item' style={{ height: item+'px' }}></View>

          ))}
        </View>

      </View>
    )
  }
}

export default Home 
