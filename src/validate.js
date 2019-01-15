import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Validator.localize('zh', zh)

const config = {
  fieldsBagName: 'syllables'
}
Vue.use(VeeValidate, config)

// 自定义信息
const dictionary = {
  zh: {
    messages: {
      required: (name) => `${name}不能为空`,
      phone: (name) => '电话号码必须是11位手机号码',
      length: (name) => `${name}位数不正确`,
      zipCode: (name) => `${name}必须是6位数字`,
      qq: (name) => `${name}号码不正确`,
      fax: (name) => `${name}号码不正确`,
      password: (name) => `密码必须由6-16位字母、数字、下划线一种或多种组成`,
      idCard: (name) => `身份证号不正确`,
      repassword: (name) => '两次密码不一致',
      city: (name) => '省市区请选择完整完整'
    }
  }
}
Validator.localize(dictionary)
// 手机号码验证
Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(value)
  }
})
// 邮编验证
Validator.extend('zipCode', {
  messages: {
    zh_CN: field => field + '必须是6位数字'
  },
  validate: value => {
    return value.length == 6 && /^\d{6}$/.test(value)
  }
})
// qq号码验证
Validator.extend('qq', {
  messages: {
    zh_CN: field => field + '号码不正确'
  },
  validate: value => {
    return /^[1-9]\d{4,11}$/.test(value)
  }
})
// 传真号，固定电话验证
Validator.extend('fax', {
  messages: {
    zh_CN: field => field + '号码不正确'
  },
  validate: value => {
    return /^(\d{3,4}-?)?\d{7,8}$/.test(value)
  }
})
// 密码验证
Validator.extend('password', {
  messages: {
    zh_CN: field => '密码格式不正确格式不正确，密码由6-16位字母、数字、下划线组成'
  },
  validate: value => {
    // 验证规则：6-18位字母、数字、下划线组成
    return /^[a-zA-Z0-9_]{6,16}$/.test(value)
  }
})
// 重复密码校验
Validator.extend('repassword', {
  messages: {
    zh_CN: field => '两次密码不一致'
  },
  validate: (value, reps) => {
    return value === reps[0]
  }
})
// 浮点数
Validator.extend('number', {
  messages: {
    zh_CN: field => '格式只能是数字类型'
  },
  validate: value => {
    // 整数，小数
    return /^(-?\d+)(\.\d+)?$/.test(value)
  }
})

// 身份证号码验证
Validator.extend('idCard', {
  messages: {
    zh_CN: field => '身份证号码不正确'
  },
  validate: value => {
    // 验证规则：身份证18位
    // 地区： [1-9]\d{5}
    // 年的前两位： (18|19|([23]\d))            1800-2399
    // 年的后两位： \d{2}
    // 月份： ((0[1-9])|(10|11|12))
    // 天数： (([0-2][1-9])|10|20|30|31)          闰年不能禁止29+
    // 三位顺序码： \d{3}
    // 校验码： [0-9Xx]
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
  }
})
// 正整数验证
Validator.extend('posiInt', {
  messages: {
    zh_CN: field => `${field}必须为正整数`
  },
  validate: value => {
    return /^[0-9]*[1-9][0-9]*$/.test(value)
  }
})

Validator.extend('city', {
  messages: {
    zh_CN: field => `${field}选择完整`
  },
  validate: value => {
    let arr = value.split(' ')
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length === 0) {
        return false
      }
    }
    return true
  }
})

// //正整数
// /^[0-9]*[1-9][0-9]*$/;
// //负整数
// /^-[0-9]*[1-9][0-9]*$/;
// //正浮点数
// /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
// //负浮点数
// /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
// //浮点数
// /^(-?\d+)(\.\d+)?$/;
// //email地址
// /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
// //url地址
// /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
// 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$
// //年/月/日（年-月-日、年.月.日）
// /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
// //匹配中文字符
// /[\u4e00-\u9fa5]/;
// //匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
// /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
// //匹配空白行的正则表达式
// /\n\s*\r/;
// //匹配中国邮政编码
// /[1-9]\d{5}(?!\d)/;
// //匹配身份证
// /\d{15}|\d{18}/;
// //匹配国内电话号码
// /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
// //匹配IP地址
// /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
// //匹配首尾空白字符的正则表达式
// /^\s*|\s*$/;
// //匹配HTML标记的正则表达式
// < (\S*?)[^>]*>.*?|< .*? />;
// //sql 语句
// ^(select|drop|delete|create|update|insert).*$
// //提取信息中的网络链接
// (h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
// //提取信息中的邮件地址
// \w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
// //提取信息中的图片链接
// (s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
// //提取信息中的 IP 地址
// (\d+)\.(\d+)\.(\d+)\.(\d+)
// //取信息中的中国手机号码
// (86)*0*13\d{9}
// //提取信息中的中国邮政编码
// [1-9]{1}(\d+){5}
// //提取信息中的浮点数（即小数）
// (-?\d*)\.?\d+
// //提取信息中的任何数字
// (-?\d*)(\.\d+)?
// //电话区号
// ^0\d{2,3}$
// //腾讯 QQ 号
// ^[1-9]*[1-9][0-9]*$
// //帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
// ^[a-zA-Z][a-zA-Z0-9_]{4,15}$
// //中文、英文、数字及下划线
// ^[\u4e00-\u9fa5_a-zA-Z0-9]+$
