/*
 * @Descripttion:mock.js，模拟后端交互，用于接收ajax请求
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-10 15:17:38
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 13:25:35
 */

const Mock = require('mockjs');
import {data} from './userSource.js';

/**
 * @name getParams
 * @description 用于将get方式的url转换为一个对象并返回
 * @param {*} url get请求的url
 * @returns jsonObj
 */
function getParams(url) {
    let paramObj = {};
    let arr = url.slice(url.indexOf('?') + 1).split('&');
    arr.forEach(item => {
        let keyValueArr = item.split('=');
        paramObj[keyValueArr[0]] = keyValueArr[1]
    })
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

Mock.mock(/getUserSourceChart/, 'get', param => {
    console.log('getUserSourceChart',param)
    return data
})
