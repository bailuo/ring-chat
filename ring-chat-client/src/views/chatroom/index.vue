<template>
    <div class="page page-chatroom">
        <main class="chatroom__main">
            <section class="chatroom__sections messages-wrap"></section>
            <section class="chatroom__sections toolbar">
                <el-button @click="handleInvite" size="small">拉人进群</el-button>
                <el-button size="small">打开图片</el-button>
            </section>
            <section class="chatroom__sections user-inputs">
                <el-input v-model="userInput" class="user-inputs__input"></el-input>
                <el-button class="user-inputs__btn" type="primary">发送</el-button>
            </section>
        </main>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';
    const chatModule = namespace('chat');
    @Component({})
    export default class Chat extends Vue {
        userInput = '';
        @chatModule.Action('sendMessage') sendMessage: Function;
        @chatModule.Action('inviteContact') inviteContact: Function;
        async handleSendMessage() {
            this.sendMessage({ content: this.userInput, type: 'text' });
        }
        // 发送一条图片信息
        async handleAddImage() {
            
            this.sendMessage({ content: this.userInput, type: 'image' });
        }
        // 邀请一个人进入聊天，显示系统信息
        async handleInvite() {
            this.inviteContact();
        }
    }
</script>
<style lang="less" src="./index.less">
</style>
