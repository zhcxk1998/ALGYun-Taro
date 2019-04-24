import Taro, { Component } from '@tarojs/taro';
import { View, Text ,Image} from '@tarojs/components';
import {inject} from '@tarojs/mobx';
import { AtModal, AtModalContent} from "taro-ui";

import TabBar from '../../component/TabBar/index';

@inject('userStore')
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      isOpened:false,
    }
  }

  handleChange = (current) => {
    console.log(current)    
    this.setState({
      current
    })
  }

  handleOpen = ()=>{
    console.log('open')
    this.setState({
      isOpened:true
    })
  }

  handleClose=()=>{
    this.setState({
      isOpened:false
    })
  }

  render() {
    const { current ,isOpened} = this.state;
    const {userStore} = this.props;
    const style = {
      background:'red',
      marginBottom:'10vh'
    }
    return (
      <View>
        <AtModal isOpened={isOpened} onClose={this.handleClose}>
        <AtModalContent>
          <Image src='https://cdn.algbb.fun/emoji/30.png' style={{width:'100px',height:'100px'}} />
        </AtModalContent>
      </AtModal>
        {/* <View style={style} >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(item => (
            <View>{item}</View>
          ))}
        </View> */}
        <View>emmm</View>
        <View>{userStore.username}</View>
        <TabBar current={current} onClick={this.handleChange} onOpen={this.handleOpen} />
      </View>
    )
  }
}

export default Index 
