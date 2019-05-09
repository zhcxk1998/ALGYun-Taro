import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtTextarea, AtInput, AtList, AtListItem } from 'taro-ui'

import './style.css';

class ArticleEdit extends Component {

  config = {
    navigationBarTitleText: '编辑文章'
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      category: '',
      tags: [],
      status: false,
    }
  }

  titleChange(title) {
    this.setState({
      title
    })
  }

  contentChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  handleClick = () => {
    const { title, content } = this.state;
    console.log(title, content)
  }

  render() {
    const { content, title, status, category, tags } = this.state;
    return (
      <View className='article-container'>
        <AtInput
          name='title'
          title='标题'
          type='text'
          value={title}
          onChange={this.titleChange.bind(this)}
        />
        <AtTextarea
          value={content}
          onChange={this.contentChange.bind(this)}
          height={500}
          maxLength={2000}
          placeholder='请编辑您的文章内容...'
        />
        <AtList hasBorder={false}>
          <AtListItem
            title='分类'
            extraText={category}
            arrow='right'
            thumb='https://cdn.algbb.fun/algyun/icon/type.png'
            onClick={this.priceOpen}
          />
          <AtListItem
            title='标签'
            extraText={tags}
            arrow='right'
            thumb='https://cdn.algbb.fun/algyun/icon/tag.png'
            onClick={this.priceOpen}
          />
          <AtListItem
            isSwitch
            switchIsCheck={status}
            title='发布'
            thumb='https://cdn.algbb.fun/algyun/icon/status.png'
            onSwitchChange={this.statusChange}
          />
        </AtList>
        <Button className='confirm' onClick={this.handleClick}>发 布</Button>
      </View>
    )
  }
}

export default ArticleEdit;