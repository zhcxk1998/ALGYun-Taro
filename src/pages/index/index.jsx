import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { inject } from '@tarojs/mobx';
import { AtModal, AtModalContent, AtGrid, AtList, AtListItem } from "taro-ui";

import DashBoard from '../../component/DashBoard/index';
import TabBar from '../../component/TabBar/index';
import './style.css';


@inject('userStore')
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      isOpened: false,
    }
  }

  handleChange = (current) => {
    console.log(current)
    this.setState({
      current
    })
  }

  handleOpen = () => {
    console.log('open')
    this.setState({
      isOpened: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    })
  }

  render() {
    const { current, isOpened } = this.state;
    const { userStore } = this.props;
    return (
      <View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
          <AtModalContent>
            <Image src='https://cdn.algbb.fun/emoji/30.png' style={{ width: '100px', height: '100px' }} />
          </AtModalContent>
        </AtModal>
        <View style={{ marginBottom: '10vh' }}>
          <View hidden={current !== 4}>
            <DashBoard hidden={current!==4} />
          </View>
        </View>
        <TabBar current={current} onClick={this.handleChange} onOpen={this.handleOpen} />
      </View>
    )
  }
}

export default Index 
