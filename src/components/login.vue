<template>
    <el-form :label-position="right" label-width="120px" class="login-form">
        <el-form-item label="用户名">
            <el-input v-model="userID" prefix-icon="User" placeholder="请输入用户名称" />
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="password" type="password" show-password prefix-icon="Lock" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" class="login_btn" @click="login">登录</el-button>
            <el-button type="primary">取消</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
    name: 'Login',

    data() {
        return {
            userID: '',
            password: ''
        };
    },

    mounted() {

    },

    methods: {
        login() {
            this.$http.get('/checkUserInfo', {
                params: {
                    userID: this.userID,
                    password: this.password
                }
            }).then(res => {
                if (res.data.status == 200) {
                    console.log(res)
                    this.$router.push('/');
                    this.$store.commit('setUserID', this.userID)
                    ElMessage({
                        type: "success",
                        showClose: true,
                        message: res.data.msg
                    })
                } else {
                    ElMessage({
                        type: "error",
                        showClose: true,
                        message: res.data.msg
                    })
                }
            })
        }
    },
};
</script>

<style scoped>
.login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;
}

.login_btn {
    margin-right: 40px;
}
</style>
