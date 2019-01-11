## FileUpload.vue

> 列表查询插件将常用的属性与函数封装到一个类中，类中封装有请求函数，所有涉及到请求的函数都将返回一个promise

### 使用用例

> 使用PagedList时先将模块导入，在使用new关键字创建对象，第一次查询使用对象的search函数，可以传入一些动态条件，例如在搜索时需要用户输入关键字，而用户每次输入的关键字都有可能不一样，插件并没有对这些动态变化的变量做自动获取处理，需要在有条件变动时，调用search函数将变动后的条件传入，对象将会缓存传入的条件，当调用其他函数时将不用传递条件，程序会从缓存中取出上一次的条件，例如addLoad(加载更多),pageLoad(加载某一页，不传页码就自动加载下一页)等，都不用传递任何条件，这些函数都涉及到查询，所有的涉及到查询的函数都将返回一个promise，可以在函数后使用then,catch等函数来处理请求完成或错误后的处理工作，[promise的使用说明可以查看promise教程](http://es6.ruanyifeng.com/#docs/promise)

```js
  <template>
    <div>
      ...
       <el-button type="success" plain round  @click="model.addLoad()" v-show="model.hasMore">查看更多</el-button>
    </div>

  </template>

  import PagedList from '../../libs/PagedList.js'

  export default {
    data () {
      return {
        model: new PagedList(url, 6)
      }
    },
    methods: {
      newSearch () {
        // condition可以传亦可以不穿，根据具体需求而定
        this.model.search(condition)
      },
    }

  }
```

### 参数说明

1. 创建时传参
  - url: 查询地址
  - pageSize: 分页大小，默认为20
  - params: 查询所需要参数，主要针对固定参数，例如userId
  - formData: 是否需要对请求参数格式化，默认为true
2. 可调用函数列表
  - search: 查询函数，正常查询，绝大多数用在分页的首次查询，可以传入额外的查询条件，并将传入的查询条件缓存，方便其他查询函数调用
  - addLoad: 加载更多，主要针对分页累积加载设计，点击加载跟多时调用，不用传递任何参数，会将请求的到的数据累加到rows中
  - pageLoad: 查询某一页，主要针对一次只显示一页的查询情况，每次都会将rows中的数据替换为新请求到的数据，可以传如页码参数，当不传入时，默认下一页，插件自动会计算当前页的下一页的页码数
  - refresh: 刷新，主要针对一些特殊情况，本质只是重新调用了一下search，不同的是，search会将当前页设置为1，并将condtion设置为传入的值，不传就设置为空{}，单refresh不用传递任何参数，并且不会改变任何数据，只是重新发送一次请求。refresh不能使用在分批累积查询的情况，那样会造成数据重复。
3. 对象含有属性
  - url: 数据请求地址，此参数为创建对象时传入
  - pageSize: 每页请求的数据量，此参数为创建对象时传入或使用默认值
  - formData: 是否对请求参数格式化，此参数为创建对象时传入或使用默认值
  - loading: 是否正在加载，当查询时，需要显示加载动效时非常有用，当在请求中时，loading为true，当请求完成（不论失败或成功），loading为false
  - pageIndex: 当前加载第几页，本参数主要为请求插件使用
  - count: 数据的总条数，当配合分页查询组件时非常有用，分页组件需要传入总数据量和每页大小计算总页数
  - totalPage: 总页数
  - rows: 每次请求返回的数据，页面渲染数据全部存储在rows里，需要注意，分页查询分两种情况，一种每次只展示一页数据，根据加载页码不同加载数据不同，第二种为分批累加，数据累加，例如加载页在第三页时，rows存放为前三页数据综合并不是只用第三页数据
  - hasMore: 是否还有数据,当使用分批累加时，控制“加载更多”按钮的显示与隐藏，
  - condition: 请求的参数，需要使用时指定，分页相关参数无需指定，例如offset,limit,由插件组织