<template>
    <div class="page page-chatroom">
        <main class="chatroom__main">
            <section class="chatroom__sections messages-wrap">
                <ul class="chat-messages" v-if="messages">
                    <li v-for="message in messages" :key="message.messageId">
                        <p v-if="message.isSysMessage">{{message.content}}</p>
                        <!-- <user-message v-else/> -->
                    </li>
                </ul>
            </section>
            <section class="chatroom__sections toolbar">
                <ring-chat-toolbar
                    @inviteContact="handleInviteContact"
                    @uploadImage="handleAddImage"
                />
            </section>
            <section class="chatroom__sections user-inputs">
                <el-input
                    v-model="userInput"
                    class="user-inputs__input"
                ></el-input>
                <el-button
                    class="user-inputs__btn"
                    type="primary"
                    @click="handleSendTextMessage"
                    >发送</el-button
                >
            </section>
        </main>
    </div>
</template>
<script lang="ts">
    import { namespace } from 'vuex-class';
    import { Component, Vue } from 'vue-property-decorator';
    import Toolbar from '@/components/toolbar/index.vue';
    import UserMessage from '@/components/user-message/index.vue';
    const chatModule = namespace('chat');
    const userModule = namespace('user');

    @Component({
        components: {
            'ring-chat-toolbar': Toolbar,
            'user-message':UserMessage,
        },
    })
    export default class Chat extends Vue {
        userInput = '';

        @userModule.Getter('username') username: string;
        @chatModule.Getter('messages') messages: Array<any>;
        @chatModule.Action('sendMessage') sendMessage: Function;
        @chatModule.Action('inviteContactToChat') inviteContactToChat: Function;
        @chatModule.Action('connectSocket') connectSocket: Function;
        async handleSendTextMessage() {
            this.sendMessage({ content: this.userInput, type: 'text' });
        }
        // 发送一条图片信息
        async handleAddImage() {
            this.sendMessage({ content: this.userInput, type: 'image' });
        }
        // 邀请一个人进入聊天，显示系统信息
        async handleInviteContact() {
            this.inviteContactToChat();
        }

        created() {
            if(!this.username) {
                this.$router.replace('/login')
            }
        }
        mounted() {
            this.connectSocket();
        }
    }
</script>
<style lang="less" src="./index.less"></style>
