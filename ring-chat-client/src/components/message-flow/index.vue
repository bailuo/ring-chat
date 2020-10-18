<template>
    <ul class="ring-chat-component chat-messages-flow">
        <li v-for="message in sortedMessages" :key="message.messageId" class="chat-messages_item">
            <p v-if="message.isSysMessage && message.content" class="chat-messages_item--system">{{ message.content }}</p>
            <user-chat-message
                v-else
                :messageId="message.messageId"
                :isFromClientUser="message.isFromClientUser"
                :senderNickname="message.senderNickname"
                :messageType="message.type"
                :content="message.content"
                :timestamp="message.timestamp"
                @withdrawMessage="withdrawMessage"
                class="chat-messages_item--user"
            />
        </li>
    </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import UserChatMessage from '@/components/user-message/index.vue';
import { UserMessage } from '@/store/modules/chat/types';
@Component({
    components: {
        'user-chat-message': UserChatMessage,
    },
})
export default class Chat extends Vue {
    @Prop({ default: [] })
    sortedMessages: Array<UserMessage>;

    // 撤回信息
    async withdrawMessage(messageId: string) {
        this.$emit('withdrawChatMessage', messageId);
    }
}
</script>
<style lang="less" src="./index.less"></style>
