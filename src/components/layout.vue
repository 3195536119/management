<!--
 * @Descripttion: 
 * @version: 
 * @Author: shaye
 * @Date: 2023-03-08 19:08:20
 * @LastEditors: shaye
 * @LastEditTime: 2023-03-11 11:39:35
-->
<template>
    <div>
        <Header />
    </div>
    <div class="content">
        <div class="menu">
            <Menu/>
        </div>
        <!-- <div>
            
        </div> -->
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "./header.vue";
import Menu from './menu.vue'
export default {
    name: 'Layout',

    data() {
        return {

        };
    },
    components: {
        Header,
        Menu
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style  scoped>
    .content{
        display: flex;
    }

    .menu{
        width: 150px;
    }
</style>