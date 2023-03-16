# management
<<<<<<< HEAD

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
=======
vue全家桶+vuecli+elementui+mockjs实战，管理系统

# 文件结构
│  .gitignore
│  babel.config.js
│  jsconfig.json
│  package-lock.json
│  package.json
│  README.md
│  vue.config.js
│ 
├─public
|  │   tinymace     在页面中引入tinymace编辑器 github地址：https://github.com/tinymce/tinymce
│  │   favicon.ico
|  │   global.css    全局css
|  │   index.html
|  │
├─node_modules
│  │ 
│  │  
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │      logo.png
    │      
    ├─components
    │      header.vue  头组件 
    │      layout.vue   布局组件
    │      login.vue    登录组件
    │      menu.vue     菜单组件
    │      
    ├─mock
    │      getTableData.js   获取table.vue页的数据，模拟数据库
    │      getZoneData.js   这里的数据是从别的网站download的，因此此处只做提供和数据源的作用，在后面做了数据处理将其中的数据转换为此项目中需要的格式
    │      mock.js  模拟后端，用于处理各种axios的请求
    │      newZone.js   用于存放此项目需要的地区数据
    │      userBehavior.js  存放index页的数据，死数据
    │      userSource.js    存放index页需要的数据，死数据
    │      
    ├─router
    │      index.js
    │      
    ├─store
    │      index.js
    │      
    └─views
        │  edit.vue     edit组件
        │  form.vue     form组件
        │  table.vue    table组件
        │  
        └─index     index页的组件
                index.vue   index页的总组件
                userBehavior.vue    index页用户行为分组件
                userSource.vue      index页用户来源分组件

# 关于项目中的各个api
此处使用mockjs模拟后端数据库的操作  mockjs的github地址：https://github.com/nuysoft/Mock

## 安装
npm install mockjs
## api
checkUserInfo   检测用户信息，登录时使用
getUserSourceChart      获取index页的用户来源数据
getUserbehaviorChart    获取index页的用户行为数据
getZone     获取table页的下拉框地区数据
getTable    table页获取table内容
editTableData   table页编辑table数据的接口
deleteTableData     table页删除table数据的接口

# 将数据导出到excel
使用file-saver和xlsx
npm install -S file-saver
npm install -S xlsx         xlsx官网  https://www.npmjs.com/package/xlsx

# 注意
此处避免组件名和文件名相同，会频繁调用造成死循环Unhandled error during execution of scheduler flush. This is likely a Vue internals bug
                
