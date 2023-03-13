/*
 * @Descripttion:mock.js，模拟后端交互，用于接收ajax请求
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-10 15:17:38
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-13 20:44:34
 */

const Mock = require('mockjs');
import { data } from './userSource.js';
import { behaviorData } from "./userBehavior.js";
import { newZone } from "./newZone";
import { tableData } from "./getTableData.js";

/**
 * @name getParams
 * @description 用于将get方式的url转换为一个对象并返回
 * @param {*} url get请求的url
 * @returns jsonObj
 */
function getParams(url) {
    let paramObj = {};
    if (url.indexOf('?') != -1) {
        let arr = url.slice(url.indexOf('?') + 1).split('&');
        arr.forEach(item => {
            let keyValueArr = item.split('=');
            paramObj[keyValueArr[0]] = keyValueArr[1]
        })
    }
    return paramObj
}



/**
 * url:checkUserInfo
 */
Mock.mock(/checkUserInfo/, 'get', (param) => {
    console.log('checkUserInfo', param)
    let url = param.url;
    let paramObj = getParams(url);
    if (paramObj.userID == 'admin' && paramObj.password == '123456') {
        return {
            status: 200,
            msg: '登录成功',
        }
    } else {
        if (paramObj != 'admin') {
            return {
                status: 500,
                msg: '登录失败，用户名错误',
            }
        } else {
            return {
                status: 500,
                msg: '登录失败，密码错误',
            }
        }
    }
})

/**
 * 获取用户来源数据
 */
Mock.mock(/getUserSourceChart/, 'get', param => {
    console.log('getUserSourceChart', param)
    return data
})

/**
 * 获取用户行为数据
 */
Mock.mock(/getUserbehaviorChart/, 'get', param => {
    console.log('getUserSourceChart', param)
    return behaviorData
})

/**
 * 获取下拉框的地域数据
 */
Mock.mock(/getZone/, 'get', param => {
    return newZone
})

/**
 * 模拟生成的表格数据，但是由于需要做删改查的操作，仅用于第一次生成数据。
 */
// Mock.mock('/api/getTable', {
//     "datas|40-60": [
//       {
//         "id":Mock.Random.guid(),
//         "date": '@date("yyyy-MM-dd")',
//         "name": "@cname",
//         "address": "@county(true)"
//       }
//     ]
//   });

Mock.mock(/getTable/, 'get', param => {
    console.log(param)
    let url = param.url;
    let paramsObj = getParams(url)
    let paramArr = Object.keys(paramsObj)
    if (paramArr.length == 0) {
        return tableData
    }
    let name = paramsObj.name
    let year = paramsObj.year
    let address = paramsObj.address
    console.log(name, year, address)
    // return tableData.filter(value=>{

    // })
    return tableData
});

Mock.mock(/editTableData/, 'get', param => {
    console.log(param)
    let url = param.url;
    let paramsObj = getParams(url)
    let id = paramsObj.id
    let name = paramsObj.name
    let date = paramsObj.date
    let address = paramsObj.address
    console.log(id, name, date, address)
    tableData.some(data => {
        if (data.id == id) {
            data.name = name
                data.date = date
            data.address = address
            console.log(data)
        }

    })
    console.log(tableData)
});


