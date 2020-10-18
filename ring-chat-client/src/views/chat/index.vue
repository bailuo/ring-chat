<template>
    <div class="page page-chatroom">
        <main class="chatroom__main">
            <section class="chatroom__sections messages-wrap">
                <message-flow
                    v-if="sortedMessages"
                    :sortedMessages="sortedMessages"
                    @withdrawChatMessage="withdrawMessage"
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
                <el-upload
                    class="ring-chat-imageUpload"
                    ref="ringChatImageUpload"
                    name="picture"
                    :on-change="handleImgUpload"
                    :autoUpload="false"
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
    import MessageFlow from '@/components/message-flow/index.vue';
    const chatModule = namespace('chat');
    const userModule = namespace('user');

    @Component({
        components: {
            'message-flow': MessageFlow,
        },
    })
    export default class Chat extends Vue {
        userInput = '';

        @userModule.Getter('username') username: string;
        @chatModule.Getter('messages') messages: Array<any>;
        @chatModule.Action('sendMessage') sendMessage: Function;
        @chatModule.Action('inviteContactToChat') inviteContactToChat: Function;
        @chatModule.Action('connectSocket') connectSocket: Function;
        @chatModule.Action('withdrawUserMessage') withdrawUserMessage: Function;

        get sortedMessages() {
            return this.messages || [];
        }
        async handleSendTextMessage() {
            this.sendMessage({ content: this.userInput, type: 'text' });
            this.userInput = '';
        }

        // 发送一条图片信息
        async handleImgUpload(imageFile: any) {
            console.log(imageFile);
            const isJpgOrPng =
                imageFile.raw.type === 'image/jpeg' ||
                imageFile.raw.type === 'image/png' ||
                imageFile.raw.type === 'image/jpg' ||
                imageFile.raw.type === 'image/gif';
            if (!isJpgOrPng) {
                return this.$notify.error({
                    title: '错误',
                    message: '请选择jpeg/jpg/png/gif格式的图片',
                });
            }
            const isLt1M = imageFile.size / 1024 / 1024 < 0.5;
            if (!isLt1M) {
                return this.$notify.error({
                    title: '错误',
                    message: '图片必须小于500K!',
                });
            }
            const image = new Image();
            const URL = window.URL || window.webkitURL;
            image.src = URL.createObjectURL(imageFile.raw);
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
            // const image = new Image();
            // const url = window.URL || window.webkitURL;
            // image.src = url.createObjectURL(imageFile);
            // image.onload = () => {
            //     const imageSize: ImageSize = this.getImageSize({
            //         width: image.width,
            //         height: image.height,
            //     });
            //     this.sendMessage({
            //         type: 'image',
            //         width: imageSize.width,
            //         height: imageSize.height,
            //         content: image.src,
            //     });
            // };
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
