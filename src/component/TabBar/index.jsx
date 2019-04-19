import Taro, { Component } from '@tarojs/taro';
import {AtTabBar} from 'taro-ui';

class TabBar extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    const {current,onClick} = this.props;
    return (
      <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconType: 'home'},
          { title: '二手交易', iconType: 'shopping-bag' },
          { title: '个人中心', iconType: 'folder'}
          ]}
        onClick={onClick}
        current={current}
      />
    )
  }
}

export default TabBar 
