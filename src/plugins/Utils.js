import { Message } from 'element-ui'

let Util = {}
Util.install = function (Vue, options) {
  Vue.formatDateTime = Vue.prototype.$formatDateTime = function (time, str) {
    let theDate = time ? new Date(time) : new Date()
    let _year = theDate.getFullYear()
    let _month = ('0' + (theDate.getMonth() + 1)).slice(-2)
    let _date = ('0' + theDate.getDate()).slice(-2)
    let _hour = ('0' + theDate.getHours()).slice(-2)
    let _minute = ('0' + theDate.getMinutes()).slice(-2)
    let _second = ('0' + theDate.getSeconds()).slice(-2)
    if (str) {
      return _year + str + _month + str + _date + ' ' + _hour + ':' + _minute + ':' + _second
    }
    return _year + '-' + _month + '-' + _date + ' ' + _hour + ':' + _minute + ':' + _second
  }

  Vue.formatYMD = Vue.prototype.$formatYMD = function (time, str) {
    let theDate = time ? new Date(time) : new Date()
    let _year = theDate.getFullYear()
    let _month = ('0' + (theDate.getMonth() + 1)).slice(-2)
    let _date = ('0' + theDate.getDate()).slice(-2)
    if (str) {
      return _year + str + _month + str + _date
    }
    return _year + '-' + _month + '-' + _date
  }

  Vue.promptMsg = Vue.prototype.$promptMsg = function (str = '很抱歉！此功能正在建设中，敬请期待！', imgSrc = 'static/gongnengtishi.png') {
    const h = this.$createElement
    // <div class="flex-row-center" style="height: 500px;">
    //   <img src="static/gongnengtishi.png" alt="">
    //   <span>很抱歉！此功能正在建设中，敬请期待！</span>
    // </div>
    Message({
      // duration: 0,
      showClose: true,
      dangerouslyUseHTMLString: true,
      message: h('div', { attrs: {
        'class': 'flex-row-center promp-msg'
      }
      }, [h('img', {
        attrs: {
          'src': imgSrc
        }
      }),
      h('span', null, str)])
    })
  }

  Vue.lsput = Vue.prototype.$lsput = function (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value) // eslint-disable-line no-undef
  }

  Vue.lsget = Vue.prototype.$lsget = function (key) {
    let val = localStorage.getItem(key) // eslint-disable-line no-undef
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }

  // 对字符串进行加密
  Vue.compileStr = Vue.prototype.$compileStr = function (code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return escape(c)
  }
  // 字符串进行解密
  Vue.uncompileStr = Vue.prototype.$uncompileStr = function (code) {
    code = unescape(code)
    let c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
  }
  // 通过地址栏的参数获取参数内容
  Vue.getUrlParames = Vue.prototype.$getUrlParames = function (param) {
    // var query = window.location.search
    var query = window.location.href
    var iLen = param.length
    var iStart = query.indexOf(param)
    if (iStart === -1) {
      return ''
    }
    iStart += iLen + 1
    var iEnd = query.indexOf('&', iStart)
    if (iEnd === -1) {
      return query.substring(iStart)
    }
    return query.substring(iStart, iEnd)
  }
  // 从地址栏获取加密的参数
  Vue.getUrlCompileParames = Vue.prototype.$getUrlCompileParames = function (param) {
    var query = Vue.uncompileStr(window.location.search.slice(1, window.location.search.length))
    var iLen = param.length
    var iStart = query.indexOf(param)
    if (iStart === -1) {
      return ''
    }
    iStart += iLen + 1
    var iEnd = query.indexOf('&', iStart)
    if (iEnd === -1) {
      return query.substring(iStart)
    }
    return query.substring(iStart, iEnd)
  }

  // (uuid长度， 进制，2，8， 10， 16)
  Vue.uuid = Vue.prototype.$uuid = function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []; var i
    radix = radix || chars.length

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      // rfc4122, version 4 form
      var r

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }

    return uuid.join('')
  }
  // 计算字符串的hash值
  // Vue.hashCode = Vue.prototype.$hashCode = function (str) {
  //   let I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('')
  //   let hash = 5381
  //   let len = input.length - 1

  //   if (typeof input == 'string') {
  //     for (let i = len; i > -1; i--)
  //       hash += (hash << 5) + input.charCodeAt(i)
  //     } else {
  //       for (let i = len; i > -1; i--) {
  //         hash += (hash << 5) + input[i]
  //       }
  //     }
  //   let value = hash & 0x7FFFFFFF

  //   let retValue = ''
  //   do {
  //     retValue += I64BIT_TABLE[value & 0x3F];
  //   } while(value >>= 6)
  //   return retValue
  // }

  // 过滤一段html字符串的标签字符，只留纯文本部分
  Vue.html2str = Vue.prototype.$html2str = function (html) {
    return html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
  }
  // 查看数组中是否有完全相同的信息
  Vue.duplicates = Vue.prototype.$duplicates = function (arr, rule) {
    let re = []
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        let result = true
        if (rule) {
          result = rule(arr[i], arr[j])
        } else {
          result = (arr[i] === arr[j])
        }
        if (result) {
          re.push(arr[i])
          break
        }
      }
    }
    return re
  }
  // 解决文本域换行的问题
  Vue.replaceEnter = Vue.prototype.$replaceEnter = function (str) {
    if (str) {
      return str.replace(/\n|\r\n/g, '<br/>')
    }
    return ''
  }

  let ext = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'pdf', 'txt']
  /**
   * 根据传入的文件名判断浏览器是否可以直接查看文件
   *
   * @param {filename} 文件名
   */
  Vue.isBrowserCan = Vue.prototype.$isBrowserCan = function (filename) {
    let fileExt = filename.toLowerCase().split('.').pop()
    if (ext.includes(fileExt)) {
      return true
    }
    return false
  }

  Vue.getBrowserEdition = Vue.prototype.$getBrowserEdition = function () {
    let broName = ''
    let strStart = 0
    let strStop = 0
    let temp = ''

    let userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

    // FireFox
    if (userAgent.indexOf('Firefox') !== -1) {
      /* broName = 'FireFox浏览器' */
      strStart = userAgent.indexOf('Firefox')
      temp = userAgent.substring(strStart)
      broName = temp.replace('/', '版本号')
      return broName
    }

    // Edge
    if (userAgent.indexOf('Edge') !== -1) {
      /* broName = 'Edge浏览器' */
      strStart = userAgent.indexOf('Edge')
      temp = userAgent.substring(strStart)
      broName = temp.replace('/', '版本号')
      return broName
    }

    // IE浏览器
    if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf('rv') !== -1) {
      /* broName = 'IE浏览器' */
      strStart = userAgent.indexOf('rv')
      strStop = userAgent.indexOf(')')
      temp = userAgent.substring(strStart, strStop)
      broName = temp.replace('rv', 'IE').replace(':', '版本号')
      return broName
    }

    // 360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') < 0 && userAgent.indexOf('Firefox') < 0) {
      if (navigator.javaEnabled()) {
        broName = '360安全浏览器-极速模式'
      } else {
        broName = '360极速浏览器-极速模式'
      }
      return broName
    }

    // 360兼容
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') !== -1 && userAgent.indexOf('MSIE') !== -1 && userAgent.indexOf('rv') < 0) {
      broName = '360兼容模式'
      return broName
    }

    // Chrome浏览器
    if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf('Edge') < 0) {
      /* broName = 'Chrome浏览器' */
      strStart = userAgent.indexOf('Chrome')
      strStop = userAgent.indexOf(' Safari')
      temp = userAgent.substring(strStart, strStop)
      broName = temp.replace('/', '版本号')
      return broName
    }
  }
}

export default Util
