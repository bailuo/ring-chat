<template>
    <div class="ring-chat-compopnent user-message" :class="{isFromCurrentClient: isFromClientUser}">
        <div class="ring-chat-user-message__avatar-wrap" v-if="!isFromClientUser">
            <div class="ring-chat-user-message__avatar">{{senderNickname[0]}}</div>
        </div>
        <div class="ring-chat-user-message__main">
            <div class="ring-chat-user-message__content">
                <img :src="content" v-if="messageType === 'image'"/>
                <p v-else>{{content}}</p>
            </div>
            <div class="ring-chat-user-message__extra-info" v-if="timestamp || isFromClientUser">
                <span class="ring-chat-user-message__extra-info__timestamp" v-if="timestamp">{{timestamp}}</span>
                <a class="ring-chat-user-message__extra-info__cancel" v-if="isFromClientUser" @click="cancelMessage"></a>
            </div>
        </div>
        <div class="ring-chat-user-message__avatar-wrap" v-if="isFromClientUser">
            <div class="ring-chat-user-message__avatar">{{senderNickname[0]}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue ,Prop} from 'vue-property-decorator';

@Component({
})
export default class UserMessage extends Vue {
     // 信息的ID， 用户撤回时定位
    @Prop() messageId: string;
    // 信息类型
    @Prop({ default: 'text' }) messageType: string; // text , image
     // 实际内容
    @Prop({ default: '' }) content: string;
    // 是否由当前用户发出，决定了是否能撤回
    @Prop({ default: false }) isFromClientUser?: boolean;
    // 发送者姓名首字母，用户做头像
    @Prop({default : '未'}) senderNickname: string;
    // 信息时间戳
    @Prop({default: ''}) timestamp: string;
   
    async cancelMessage() {
        this.$emit('cancelMessage', this.messageId);
    }
}
</script>
<style lang="less" src="./index.less">
</style>