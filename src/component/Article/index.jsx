import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { inject, observer } from '@tarojs/mobx';

import './style.css';

@inject('userStore')
@observer
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { userStore } = this.props;
    const { articleList } = userStore;
    return (
      <View className='article'>
        {articleList.map((item, index) => (
          <View className='article-item' key={index}>
            <View className='article-title'>{item.title}</View>
            <View className='article-content'>
              {item.content}
            </View>
            <View className='article-info'>
              <View>
                <AtIcon value='eye' size='20' color='#1890ff'></AtIcon>
                <Text>{item.views}</Text>
              </View>
              <View style={{ marginLeft: '12px' }}>
                <AtIcon value='heart' size='20' color='#fa4b2a'></AtIcon>
                {item.stars}
              </View>
              <View className='article-author'>
                <Image className='article-avater' src='https://cdn.algbb.fun/emoji/32.png' />
                {item.author.user}
              </View>
            </View>
          </View>
        ))}

      </View>
    )
  }
}

export default Article;