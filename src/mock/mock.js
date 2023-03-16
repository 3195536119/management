/*
 * @Descripttion:mock.js，模拟后端交互，用于接收ajax请求
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-10 15:17:38
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-16 11:22:59
 */

const Mock = require('mockjs');
import { data } from './userSource.js';
import { behaviorData } from "./userBehavior.js";
import { newZone } from "./newZone";
// import { tableData } from "./getTableData.js";
let { tableData } = require('./getTableData')

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

/**
 * 此处模拟数据库查询，数据库中存放的都是一个值，之后用维表进行关联，此处模拟维表关联操作
 * @param {*} data 待处理的数据
 * @returns []返回处理后的数据
 */
function getTableDataWithChinese(data) {
    let tableDataReturn = []
    data.forEach(data => {
        let addressData = data.address
        let dataNew = { ...data }
        newZone.some(zone => {
            if (zone.value == addressData.slice(0, 3)) {
                let children = zone.children
                children.some(child => {
                    if (child.value == addressData) {
                        dataNew.address = zone.label + child.label
                        dataNew.addressCode = addressData
                    }
                })
            }
        })
        tableDataReturn.push(dataNew)
    })
    return tableDataReturn
}

/**
 * getTable接口，用于获取用户table页的数据
 */
Mock.mock(/getTable/, 'get', param => {
    let url = param.url;
    let paramsObj = getParams(url)
    let paramArr = Object.keys(paramsObj)
    if (paramArr.length == 0) {
        return getTableDataWithChinese(tableData)
    }
    let nameParam = paramsObj.name ? decodeURI(paramsObj.name) : paramsObj.name
    let yearParam = paramsObj.year
    let addressParam = paramsObj.address ? paramsObj.address : ''
    let dataNew = tableData.filter(data => {
        let nameCheck = (data.name.indexOf(nameParam) == -1) ? false : true
        let yearCheck = (data.date.indexOf(yearParam) == -1) ? false : true
        let addressCheck = (data.address.indexOf(addressParam) == -1) ? false : true
        return nameCheck && yearCheck && addressCheck
    })
    return getTableDataWithChinese(dataNew)
});

/**
 * table页数据的修改
 */
Mock.mock(/editTableData/, 'get', param => {
    console.log(param)
    let url = param.url;
    let paramsObj = getParams(url)
    console.log(paramsObj)
    let id = paramsObj.id
    let name = paramsObj.name
    let date = paramsObj.date
    let address = paramsObj.address
    console.log(id, name, date, address)
    tableData.some(data => {
        if (data.id == id) {
            data.name = decodeURI(name)
            data.date = date
            data.address = address
            console.log(data)
        }
    })
    console.log(tableData)
});

Mock.mock(/deleteTableData/, 'get', param => {
    console.log(param)
    let url = param.url;
    let paramsObj = getParams(url)
    console.log(paramsObj)
    let id = paramsObj.id

    let dataNew = tableData.filter(data => {
        return data.id != id
    })
    tableData = dataNew
    console.log(tableData)
    return getTableDataWithChinese(tableData)
});


