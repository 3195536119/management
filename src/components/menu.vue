<!--
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:12:09
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 12:35:16
-->
<template>
    <el-menu  :router="true">
        <el-menu-item index="index">
            <el-icon><PieChart /></el-icon>
            <span>index</span>
        </el-menu-item>
        <el-menu-item index="table">
            <el-icon><Grid /></el-icon>
            <span>table</span>
        </el-menu-item>
        <el-menu-item index="form">
            <el-icon><Histogram /></el-icon>
            <span>form</span>
        </el-menu-item>
        <el-menu-item index="editor">
            <el-icon><Edit /></el-icon>
            <span>editor</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: 'Menu',

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped></style>