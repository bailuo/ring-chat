<template>
    <div class="ring-chat-compopnent toolbar">
        <el-button @click="handleInvite" size="small" class="ring-chat-toolbar__btn">拉人进群</el-button>
        <el-upload class="upload-demo" ref="upload" :before-upload="beforeImageUpload" :auto-upload="false" action="/" :show-file-list="false" >
            <el-button size="small"  class="ring-chat-toolbar__btn">图片</el-button>
        </el-upload>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


 @Component({})
export default class Toolbar extends Vue {

    async handleInvite() {
        this.$emit('inviteContact');
    }
    async beforeImageUpload() {
        console.log('addImahe');
        this.$emit('uploadImage');
    }
}
</script>
<style lang="less" src="./index.less">
</style>
