const app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMyInfo(1);
  },
  // 加载更多
  loadingMore() {
    this.data.count++;
    this.setData({
      count: this.data.count
    });
    this.getMyInfo(this.data.count)
  },
  //我的动态详情
  dynamicDetail(e) {
    let obj = JSON.stringify(e.currentTarget.dataset);
    wx.navigateTo({
      url: 'dynamicsDetail/dynamicsDetail?obj=' + encodeURIComponent(obj)
    })
  },

  // 获取我的动态消息
  getMyInfo(pageIndex) {
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success() {
        wx.request({
          url: `${app.globalData.https}contracmasterMsg/findContracmasterMsgList`,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            masterId: wx.getStorageSync('id'),
            pageIndex: pageIndex,
            pageSize: 5
          },
          success(res) {
            wx.hideLoading();
            var data = res.data;
            data.rows.forEach(function(item, index, arr) {
              var date = new Date();
              date.setTime(item.createTime);
              data.rows[index].time = util.formatTime(date)
            })

            that.setData({
              data: data
            })

          }
        })
      }
    })
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