var util = require('../../utils/util.js');
var id = wx.getStorageSync('id')
const app = getApp();

//获取应用实例
Page({
  data: {
  },

  onLoad: function() {
    let isShow;
    let name = wx.getStorageSync('info').name;
    var date = util.formatTime(new Date);
    name==undefined?isShow=true:isShow=false;
    console.log(isShow)
    this.setData({
      isShow: isShow,
      date:date
    });
    this.getMoney();
  },


  // 获取某一天的收入情况
  getMoney(){
    var that = this;
    wx.request({
      url: `${app.globalData.https}contractMaster/getContractMaster`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        id: id,
        time: this.data.date
      },
      success(res) {
        that.setData({
          data: res.data
        })
      }
    })

  },

  // 授权登录
  authorized(e) {
    var that = this;
    const avatarImg = e.detail.userInfo.avatarUrl;
    const name = e.detail.userInfo.nickName
    wx.setStorageSync("info", {
      avatarImg: avatarImg,
      name: name,
    })

    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      isShow: false
    });
  },



  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    });
    this.getMoney();
  },

})