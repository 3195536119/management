<!--
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:12:32
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 12:34:27
-->
<template>
    <div class="router_content">
        <el-card class="box-card">
            今日系统安全指数
            <el-rate v-model="value" disabled show-text :texts="texts" />
        </el-card>
        <div class="charts">
            <UserSource width="50%"/>
        </div>
    </div>
</template>

<script>
import UserSource from './userSource.vue'
export default {
    name: 'Index',

    data() {
        return {
            value:4,
            texts:['非常不满意','不满意','一般','满意','很满意']
        };
    },
    
    components:{
        UserSource
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style  scoped>
.router_content{
    width: 100%;
}

.el-card {
    --el-card-padding: 5px;
}

.charts{
    display: flex;
    justify-content: space-between;
}
</style>