<template>
    <div class="page page-login">
        <el-form
            class="ring-chat-component ring-chat-form"
            ref="loginForm"
            label-width="100"
        >
        <div class="ring-chat-form__items">
            <el-form-item label="用户名" class="ring-chat-form__item">
                <el-input v-model="loginForm.username" placeholder="请输入您的用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="ring-chat-form__item">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="请输入您的密码"
                ></el-input>
            </el-form-item>
        </div>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';

    const userModule = namespace('user');

    // TODO handle props here if got some extra time
    @Component({})
    export default class Login extends Vue {
        @userModule.Action('login') login: Function;

        loginForm = {
            username: '',
            password: '',
        };

        async handleLogin() {
            const loginResult = await this.login(this.loginForm);
            if (loginResult) {
                this.$router.push('/chat');
                return true;
            }
            return false;
        }
    }
</script>
<style lang="less" src="./index.less">
</style>
