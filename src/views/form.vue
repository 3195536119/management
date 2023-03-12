<!--
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:12:54
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-12 18:17:41
-->
<template>
    <div class="todoForm">
        <el-form :model="form" label-width="120px" label-position="right" :rules="rules">
            <el-form-item label="代办事项" prop="activityName">
                <el-input v-model="form.activityName" />
            </el-form-item>
            <el-form-item label="事项类型" prop="activityType">
                <el-radio-group v-model="form.activityType">
                    <el-radio label="normal">常规</el-radio>
                    <el-radio label="emergency">紧急</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="提醒方式" prop="activityRemaind">
                <el-checkbox-group v-model="form.activityRemaind">
                    <el-checkbox label="短信" />
                    <el-checkbox label="电话" />
                    <el-checkbox label="邮件" />
                    <el-checkbox label="微信" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="提醒时间" prop="activityAlertTime">
                <el-time-picker v-model="form.activityAlertTime" placeholder="请选择时间" />
            </el-form-item>
            <el-form-item label="重复提醒">
                <el-switch v-model="form.repeatRemaind" />
            </el-form-item>
            <el-form-item label="重复时间" required>
                <el-col :span="11">
                    <el-form-item prop="startDate">
                        <el-date-picker v-model="form.startDate" type="date" label="请选择开始日期" placeholder="请选择开始日期"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="endDate">
                        <el-date-picker v-model="form.endDate" label="请选择结束日期" placeholder="请选择结束日期" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="重复周期" prop="repeatCircle">
                <el-select v-model="form.repeatCircle" placeholder="请选择周期">
                    <el-option v-for="item in circleOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="其他信息" prop="otherInfo">
                <el-input v-model="form.otherInfo" :rows="2" type="textarea" placeholder="请填写其他信息" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createItem">立即创建</el-button>
                <el-button @click="resetItem">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Form',

    data() {
        return {
            circleOptions: [{
                value: 'daily',
                label: '每日提醒',
            },
            {
                value: 'weekly',
                label: '每周提醒',
            },
            {
                value: 'monthly',
                label: '每月提醒',
            },
            {
                value: 'weekDay',
                label: '工作日提醒',
            }],
            form: {
                activityName: '',
                activityType: '',
                activityRemaind: [],
                activityAlertTime: '',
                repeatRemaind: false,
                startDate: '',
                endDate: '',
                repeatCircle: '',
                otherInfo: ''
            },
            rules: {
                activityName: {
                    required: true,
                    message: '请输入待办事项名称',
                    trigger: 'blur'
                },
                activityType: {
                    required: true,
                    message: '请选择事项类型',
                    trigger: 'change'
                },
                activityRemaind: {
                    required: true,
                    message: '请选择提醒方式',
                    trigger: 'change'
                },
                activityAlertTime: {
                    required: true,
                    message: '请选择提醒时间',
                    trigger: 'change'
                },
                startDate: {
                    type: 'date',
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change',
                },
                endDate: {
                    type: 'date',
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change',
                },
                repeatCircle: {
                    required: true,
                    message: '请选择重复周期',
                    trigger: 'change',
                },
                otherInfo: {
                    required: true,
                    message: '请输入其他信息',
                    trigger: 'blur'
                }
            }
        };
    },

    mounted() {

    },

    methods: {
        createItem() {
            console.log(this.form)
        },
        resetItem() {

        }
    },
};
</script>

<style scoped>
.todoForm {
    margin: 15px 0 0 15px;
}
</style>