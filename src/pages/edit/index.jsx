import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'
import { AtTextarea, AtImagePicker, AtList, AtListItem, AtTag } from 'taro-ui'

import './style.css';

@inject('userStore')
@observer
class Edit extends Component {

  config = {
    navigationBarTitleText: '编辑商品'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      files: [],
      source_files: [],
      price: 0,
      tag: '',
    }
  }

  async componentWillMount() {
    Taro.showLoading({ title: '加载中...' })
    const commodity = await this.fetchItemInfo();
    const { detail, commodity_img, price, classification: { name } } = commodity;
    this.setState({
      value: detail,
      files: commodity_img,
      source_files: commodity_img,
      price,
      tag: name
    }, () => {
      Taro.hideLoading()
    })
  }

  fetchItemInfo() {
    return new Promise(async (resolve, reject) => {
      const { userStore } = this.props;
      const { editItemId } = userStore;
      const { header } = await Taro.request({
        url: 'https://algyun.cn:81/users/',
        method: 'POST',
        data: {
          email: '1@1.com',
          password: '123',
          device: 'weapp'
        }
      })
      Taro.setStorageSync('cookie', header['Set-Cookie'])
      const { data: { commodity } } = await Taro.request({
        method: 'GET',
        url: `https://algyun.cn:81/market/${editItemId}/`,
        header: {
          'Cookie': Taro.getStorageSync('cookie')
        }
      })
      resolve(commodity)
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  onChange(files, type, index) {
    if (files.length > 5) {
      files = files.slice(0, 5)
      Taro.showToast({
        title: '最多只支持5张照片哟~',
        icon: 'none',
        duration: 2000,
      })
    }
    this.setState({
      files
    })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }

  handleClick = () => {
    const { files, source_files } = this.state;
    const deleteItems = [];
    const addItems = [];

    Taro.showLoading({ title: '保存中...' })

    source_files.forEach(sourceItem => {
      if (!files.some(item => {
        return item.url === sourceItem.url
      })) {
        deleteItems.push(sourceItem['image_id'])
      }
    })

    files.forEach(item => {
      if (!source_files.some(sourceItem => {
        return sourceItem.url === item.url
      })) {
        addItems.push(item['url'])
      }
    })

    Promise.all([this.deleteItem(deleteItems), this.addItem(addItems)]).then(() => {
      Taro.navigateBack({ delta: 1 })
      Taro.showToast({
        title: '保存完毕~',
        icon: 'success',
        duration: 2000,
      })
    })
  }

  addItem(addItems) {
    const { userStore } = this.props;
    const { editItemId } = userStore;
    return new Promise(async (resolve, reject) => {
      if (addItems.length === 0) {
        resolve()
      }
      const uploadQueue = [];
      addItems.forEach(url => {
        uploadQueue.push(new Promise((finish, err) => {
          Taro.uploadFile({
            url: `https://algyun.cn:81/market/${editItemId}/image/`,
            filePath: url,
            header: {
              "cookie": Taro.getStorageSync('cookie'),
              "Content-Type": "multipart/form-data"
            },
            name: "img",
            success: (res) => {
              // console.log(res)
              finish()
            }
          })
        }))
      })
      Promise.all(uploadQueue).then(() => {
        resolve()
      })
    })
  }

  deleteItem(deleteItems) {
    const { userStore } = this.props;
    const { editItemId } = userStore;
    return new Promise((resolve, reject) => {
      if (deleteItems.length === 0) {
        resolve()
      }
      const deleteQueue = [];
      deleteItems.forEach(id => {
        deleteQueue.push(new Promise((finish, err) => {
          Taro.request({
            method: 'DELETE',
            url: `https://algyun.cn:81/market/${editItemId}/image/${id}/`,
            header: {
              Cookie: Taro.getStorageSync('cookie')
            },
            success: (res) => {
              finish()
            }
          })
        }))
      })
      Promise.all(deleteQueue).then(() => {
        resolve()
      })
    })
  }

  render() {
    const { price, tag } = this.state;
    return (
      <View className='edit'>
        <AtTextarea
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          maxLength={200}
          height={250}
          placeholder='请输入商品的描述...'
        />
        <AtImagePicker
          length={3}
          showAddBtn={this.state.files.length < 5}
          files={this.state.files}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        />
        <AtList hasBorder={false}>
          <AtListItem
            title='价钱'
            extraText={`¥ ${price} `}
            arrow='right'
            thumb='https://cdn.suisuijiang.com/ImageMessage/5b4ee8321b53ec11c8505de5_1556896839357.png?width=512&height=512'
          />
          <AtListItem
            title='分类'
            thumb='https://cdn.suisuijiang.com/ImageMessage/5b4ee8321b53ec11c8505de5_1556896844049.png?width=512&height=512'
            hasBorder={false}
          />
          <AtTag className='tag' active circle>{tag}</AtTag>
        </AtList>
        <Button className='confirm' onClick={this.handleClick}>保 存</Button>
      </View>
    )
  }
}

export default Edit;