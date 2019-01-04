const app = getApp();
var id = wx.getStorageSync('id')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getUserInfo();
  },
  //获取用户资料
  getUserInfo() {
    var that = this;
    wx.request({
      url: `${app.globalData.https}contractMaster/findContractMaster/${id}`,
      success(res) {
        that.setData({
          data: res.data
        })
        // 如果没有手动设置修改资料，则默认显示微信名和头像
        if (res.data.nickname == null || res.data.faceImg == null) {
          that.setData({
            nickname: userInfo.name,
            faceImg: userInfo.avatarImg
          })
        } else {
          // 否则 显示设置的资料
          that.setData({
            nickname: res.data.nickname,
            faceImg: res.data.faceImg
          })
        }
      }
    })
  },


  // 跳转到修改资料
  modifyingData(){
    wx.navigateTo({
      url: 'modifyingData/modifyingData',
    })
  },

  // 跳转到我的动态
  dynamics(){
    wx.navigateTo({
      url: 'dynamics/dynamics',
    })
  },

  // 跳转到我的订单
  myOrder(){
  wx.switchTab({
    url: '../bill/bill',
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})