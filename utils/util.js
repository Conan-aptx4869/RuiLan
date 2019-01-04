const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function requestP(options = {}) {
  const {
    url,
    data,
    header,
    method,
    dataType,
    responseType,
    success,
    fail,
    complete
  } = options;

  return new Promise((res, rej) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success(r) {
        const isSuccess = isHttpSuccess(r.statusCode);

        if (isSuccess) {  // 成功的请求状态
          res(r.data);
        } else {
          rej({
            msg: `网络错误:${r.statusCode}`,
            detail: r
          });
        }
      },
      fail(err) {
        rej(err);
      },
      complete
    });
  });

}


module.exports = {
  formatTime: formatTime,
  requestP: requestP
}
