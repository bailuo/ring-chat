<template>
    <div class="page page-login">
        <el-form
            class="ring-chat-component ring-chat-form"
            ref="loginForm"
            label-width="100"
        >
            <el-form-item label="用户名" class="ring-chat-form__item">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="ring-chat-form__item">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                ></el-input>
            </el-form-item>
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
            this.login(this.loginForm).then(
                () => {
                    this.$router.push('/chat');
                },
                () => {
                  console.log('Login Failed');
                }
            );
        }
    }
</script>
<style lang="less">
    .ring-chat-form {
        width: 200px;
        margin: 50px auto;
    }
</style>
