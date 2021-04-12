import md5 from './md5.min.js'

const appid = "2wx0ac74bd6b10dff25"
const key = "15215af14ab5a7546c882da11cd0e5a3"
const url = "https://fanyi-api.baidu.com/api/trans/vip/translate"

function translate(
  q, 
  { from = 'auto', to = 'en' } = { from: 'auto', to: 'en' },
)
{
  return new Promise((resolve, reject)=> {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url, 
      data: {
        q, from, to, appid, salt, sign
      },
      success(response) {
        let data = response.data
        if (data && data.trans_result) {
          resolve(data)
        } else {
          reject({
            status: 'error',
            message: '翻译失败'
          })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: '3000'
          })
        }
      },
      fail(response) {
        reject({
          status: 'error',
          message: '翻译失败'
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: '3000'
        })
      }
    })
  })
}

module.exports = {
  translate: translate
}