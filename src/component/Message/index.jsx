import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtList, AtListItem,AtGrid } from 'taro-ui';
import './style.css';

import mockMessage from '../../utils/mockMessage';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: Math.floor(Math.random() * 10 + 1)
    }
  }

  render() {
    const { random } = this.state;
    return (
      <View>
        <AtGrid hasBorder={false} data={
          [
            {
              image: 'https://cdn.algbb.fun/star.png',
              value: '收藏'
            },
            {
              image: 'https://cdn.algbb.fun/focus.png',
              value: '关注'
            },
            {
              image: 'https://cdn.algbb.fun/comment.png',
              value: '评论'
            }
          ]
        }
        />
        <Text className='message-title'>联系人</Text>
        {mockMessage.slice(random, random + 15).map((item, index) => (
          <View className='message-item' key={index}>
            <Image className='message-avater' src={item.avater} />
            <View className='message-wrap'>
              <View className='message-head'>
                <Text>{item.name}</Text>
                <Text>{item.time}</Text>
              </View>
              <View className='message-content'>
                你们已经是好友了！赶紧聊一聊吧！
            </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default Message;