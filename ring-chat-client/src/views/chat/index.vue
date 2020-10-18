<template>
    <div class="page page-chatroom">
        <main class="chatroom__main">
            <section class="chatroom__sections messages-wrap">
                <message-flow v-if="sortedMessages" :sortedMessages="sortedMessages" @withdrawChatMessage="withdrawMessage"/>
                <!-- <ul class="chat-messages" v-if="sortedMessages">
                    <li
                        v-for="message in sortedMessages"
                        :key="message.messageId"
                        class="chat-messages_item"
                    >
                        <p v-if="message.isSysMessage && message.content">{{ message.content }}</p>
                        <user-message
                            v-else
                            :isFromClientUser="message.isFromClientUser"
                            :senderNickname="message.senderNickname"
                            :messageType="message.type"
                            :content="message.content"
                            :timestamp="message.timestamp"
                        />
                    </li>
                </ul> -->
            </section>
            <section class="chatroom__sections user-inputs">
                <el-input v-model="userInput" class="user-inputs__input"></el-input>
                <el-button class="user-inputs__btn" type="primary" @click="handleSendTextMessage" >发送</el-button>
                <el-upload
                    class="ring-chat-imageUpload"
                    ref="upload"
                    :before-upload="handleImgUpload"
                    :auto-upload="false"
                    action="/"
                    :show-file-list="false"
                >
                    <el-button class="user-inputs__btn">图片</el-button>
                </el-upload>
            </section>
        </main>
    </div>
</template>
<script lang="ts">
import { namespace } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
// import UserMessage from '@/components/user-message/index.vue';
import  MessageFlow from '@/components/message-flow/index.vue';
import { ImageSize } from '@/types/index';
const chatModule = namespace('chat');
const userModule = namespace('user');

@Component({
    components: {
        'message-flow': MessageFlow,
    },
})
export default class Chat extends Vue {
    userInput = '';

    @userModule.Getter('username')
    username: string;
    @chatModule.Getter('messages')
    messages: Array<any>;
    @chatModule.Action('sendMessage')
    sendMessage: Function;
    @chatModule.Action('inviteContactToChat')
    inviteContactToChat: Function;
    @chatModule.Action('connectSocket')
    connectSocket: Function;
    @chatModule.Action('withdrawUserMessage')
    withdrawUserMessage: Function;
    get sortedMessages() {
        return this.messages || [];
    }
    async handleSendTextMessage() {
        this.sendMessage({ content: this.userInput, type: 'text' });
        this.userInput = '';
    }

    // 发送一条图片信息
    async handleImgUpload(imageFile: File) {
        const isJpgOrPng =
            imageFile.type === 'image/jpeg' ||
            imageFile.type === 'image/png' ||
            imageFile.type === 'image/jpg' ||
            imageFile.type === 'image/gif';
        if (!isJpgOrPng) {
            return this.$message.error('请选择jpeg/jpg/png/gif格式的图片!');
        }
        const isLt1M = imageFile.size / 1024 / 1024 < 0.5;
        if (!isLt1M) {
            return this.$message.error('图片必须小于500K!');
        }
        const image = new Image();
        const url = window.URL || window.webkitURL;
        image.src = url.createObjectURL(imageFile);
        image.onload = () => {
            const imageSize: ImageSize = this.getImageSize({
                width: image.width,
                height: image.height,
            });
            this.sendMessage({
                type: 'image',
                width: imageSize.width,
                height: imageSize.height,
                content: image.src,
            });
        };
    }
    // 撤回信息
    async withdrawMessage(messageId: string) {
        this.withdrawUserMessage(messageId);
    }

    getImageSize(data: ImageSize) {
        let { width, height } = data;
        if (width > 335 || height > 335) {
            if (width > height) {
                height = 335 * (height / width);
                width = 335;
            } else {
                width = 335 * (width / height);
                height = 335;
            }
        }
        return {
            width,
            height,
        };
    }
    // 邀请一个人进入聊天，显示系统信息
    async handleInviteContact() {
        this.inviteContactToChat();
    }

    created() {
        if (!this.username) {
            this.$router.replace('/login');
        }
    }
    mounted() {
        this.connectSocket();
    }
}
</script>
<style lang="less" src="./index.less"></style>
