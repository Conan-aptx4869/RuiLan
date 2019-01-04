var util = require('../../../utils/util.js');
var userInfo = wx.getStorageSync('info');
var id = wx.getStorageSync('id')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var date = util.formatTime(new Date);
    this.setData({
      date: date,
      avatarImg: userInfo.avatarImg,
      name: userInfo.name
    });
    this.getUserInfo();
  },

  //获取用户资料
  getUserInfo() {
    var that=this;
    wx.request({
      url: `${app.globalData.https}contractMaster/findContractMaster/${id}`,
      success(res){ 
       that.setData({
         data:res.data
       })
        // 如果没有手动设置修改资料，则默认显示微信名和头像
        if (res.data.nickname == null || res.data.faceImg==null) {
          that.setData({
            nickname: userInfo.name,
            faceImg:userInfo.avatarImg
          })
        } else {
          // 否则 显示设置的资料
          that.setData({
            nickname:res.data.nickname,
            faceImg:res.data.faceImg
          })
        }
      }
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 更换头像
  changeImg() {
    var that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        wx.uploadFile({
          url: `${app.globalData.https}file/up`,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
          var src=JSON.parse(res.data).data.src;
            that.setData({
              faceImg: "http://pjo4e6qjr.bkt.clouddn.com" + src
            })
          }
        })
      }
    })
  },
  // 表单提交
  formSubmit(e) {
    var that=this;
    let name = e.detail.value.name;
    let telphone = e.detail.value.telphone;
    let idNum = e.detail.value.idNum;
    let regIdNum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let regTel = /^1(3|4|5|7|8|9)\d{9}$/;
    if (regIdNum.test(idNum) == false) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的身份证号码！'
      })
    } else if (regTel.test(telphone) == false) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码！'
      })
    } else if (name == '') {
      wx.showModal({
        title: '提示',
        content: '请输入昵称'
      })
    } else {

      wx.showLoading({
        title: '加载中',
        success() {
          wx.request({
            url: `${app.globalData.https}contractMaster/contractMasterUpdateSave`,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              id: id,
              phone: telphone,
              nickname: name,
              identity: idNum,
              faceImg: that.data.faceImg
            },
            success(res) {
              wx.hideLoading()
              console.log(res)
              if(res.data.result=='success'){
                wx.showToast({
                  title: res.data.message,
                  icon:'success'
                })
              }
            }
          })
        }
      })
    }




  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})