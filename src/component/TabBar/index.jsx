import Taro, { Component } from '@tarojs/taro';
import { View, Button ,Image} from '@tarojs/components';
import './style.css';

class TabBar extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    const {onOpen,current,onClick} = this.props;
    const arr = ['首页','互助','+','消息','我'];
    return (
      <View className='tabbar'>
        {arr.map((item,index)=>{
          return index===2?
            <View className='tabbar-item' key={index}>
              <Button className='tabbar-button' onClick={onOpen}>
                {/* <Image src={require('./add.png')} style={{width:'8vh',height:'8vh'}}/> */}
              </Button>
            </View>
            :
            <View className={`tabbar-item ${index===current?'tabbar-selected':''}`} key={index} onClick={()=>{onClick(index)}}>
              {item}
            </View>
        })}
      </View>
    )
  }
}

export default TabBar 
