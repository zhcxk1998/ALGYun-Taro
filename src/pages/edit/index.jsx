import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'
import { AtTextarea, AtImagePicker, AtList, AtListItem, AtTag, AtModal, AtModalContent, AtInput } from 'taro-ui'

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
      detail: '',
      files: [],
      source_files: [],
      price: 0,
      classification: '选择分类',
      status: false,
      priceOpened: false,
      classificationOpened: false,
      classificationList: []
    }
  }

  async componentWillMount() {
    const { params } = this.$router;
    const { id } = params;
    const { data: { classificationList } } = await Taro.request({
      method: 'GET',
      url: 'https://algyun.cn:81/market/classification/list/',
      header: {
        cookie: Taro.getStorageSync('cookie')
      }
    })
    this.setState({
      classificationList
    })
    if (!id) return;
    Taro.showLoading({ title: '加载中...' })


    const commodity = await this.fetchItemInfo();
    const { detail, commodity_img, price, status, classification: { name } } = commodity;
    this.setState({
      detail,
      files: commodity_img,
      source_files: commodity_img,
      price,
      status: status === 'p' ? true : false,
      classification: name
    }, () => {
      Taro.hideLoading()
    })
  }

  fetchItemInfo() {
    return new Promise(async (resolve, reject) => {
      const { params } = this.$router;
      const { id } = params;
      const { data: { commodity } } = await Taro.request({
        method: 'GET',
        url: `https://algyun.cn:81/market/${id}/`,
        header: {
          'Cookie': Taro.getStorageSync('cookie')
        }
      })
      resolve(commodity)
    })
  }

  detailChange(event) {
    this.setState({
      detail: event.target.value
    })
  }

  priceChange(price) {
    this.setState({
      price
    })
  }

  statusChange() {
    this.setState(preState => ({
      status: !preState.status
    }))
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

    Promise.all([this.deleteItem(deleteItems), this.addItem(addItems)]).then(async () => {
      await this.changeInfo()
      Taro.navigateBack({ delta: 1 })
      Taro.hideLoading()
      Taro.showToast({
        title: '保存完毕~',
        icon: 'success',
        duration: 2000,
      })
    })
  }

  changeInfo() {
    const { detail, price, status, classification } = this.state;
    const { userStore } = this.props;
    const { params } = this.$router;
    const { id } = params;
    return new Promise(async (resolve, reject) => {
      await Taro.request({
        method: 'PUT',
        url: `https://algyun.cn:81/market/${id}/`,
        data: {
          detail,
          price,
          status: status ? 'p' : 's',
          classification
        },
        header: {
          cookie: Taro.getStorageSync('cookie')
        }
      })
      await userStore.fetchCommodity()
      resolve()
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

  priceOpen() {
    this.setState({
      priceOpened: true
    })
  }

  priceClose() {
    this.setState({
      priceOpened: false
    })
  }

  classificationOpen() {
    this.setState({
      classificationOpened: true
    })
  }

  classificationClose() {
    this.setState({
      classificationOpened: false
    })
  }

  classificationClick = (index) => {
    const { classificationList } = this.state;
    this.setState({
      classification: classificationList[index].name,
      classificationOpened: false
    })
  }

  render() {
    const { price, classification, detail, files, priceOpened, status, classificationList, classificationOpened } = this.state;
    return (
      <View className='edit'>
        <AtModal isOpened={classificationOpened} onClose={this.classificationClose}>
          <AtModalContent>
            {classificationList.map((item, index) => <AtTag className='classification' onClick={() => { this.classificationClick(index) }} key={index} active circle>{item.name}</AtTag>)}
          </AtModalContent>
        </AtModal>
        <AtModal isOpened={priceOpened} onClose={this.priceClose}>
          <AtModalContent>
            <AtInput title='价钱' value={price} onChange={this.priceChange.bind(this)} />
          </AtModalContent>
        </AtModal>
        <AtTextarea
          value={detail}
          onChange={this.detailChange.bind(this)}
          maxLength={200}
          height={250}
          placeholder='请输入商品的描述...'
        />
        <AtImagePicker
          length={3}
          showAddBtn={files.length < 5}
          files={files}
          onChange={this.onChange.bind(this)}
          onFail={this.onFail.bind(this)}
          onImageClick={this.onImageClick.bind(this)}
        />
        <AtList hasBorder={false}>
          <AtListItem
            title='价钱'
            extraText={`¥ ${price} `}
            arrow='right'
            thumb='https://cdn.algbb.fun/algyun/icon/price.png'
            onClick={this.priceOpen}
          />
          <AtListItem
            title='分类'
            thumb='https://cdn.algbb.fun/algyun/icon/tag.png'
          />
          <AtTag className='tag' active circle onClick={this.classificationOpen}>{classification}</AtTag>
          <AtListItem
            isSwitch
            switchIsCheck={status}
            title='发布'
            thumb='https://cdn.algbb.fun/algyun/icon/status.png'
            onSwitchChange={this.statusChange}
          />
        </AtList>
        <Button className='confirm' onClick={this.handleClick}>保 存</Button>
      </View>
    )
  }
}

export default Edit;