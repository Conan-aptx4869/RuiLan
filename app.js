//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${this.globalData.https}contractMaster/wxlogin`,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },  
          method:'POST',
          data:{
            code:res.code
          },
          success(res){
            if (res.data.result='success'){
              wx.setStorageSync('id', res.data.message);
            
            }else{
              wx.showModal({
                title: '提示',
                content: '登录出错！',
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
             
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  //  mykefang.com
    https:'http://192.168.10.10:8080/',
    src:'http://192.168.10.10:8080'
  }
})