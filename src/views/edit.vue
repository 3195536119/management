<template>
    <div class="editContent">
        <Editor id="tinymce" v-model="value" :init="init"></Editor>

    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/models/dom';
import 'tinymce/icons/default';
export default {
    name: 'Edit',

    data() {
        return {
            init: {
                skin_url: '/tinymce/skins/ui/oxide',
                content_css: '/tinymce/skins/content/default/content.css',
                height: '100%',
                width: '100%'
            },
            value: ''
        };
    },

    components: {
        Editor
    },

    mounted() {
        tinymce.init({})
    },

    methods: {
        handleImgUpload(blobInfo, success, failure) {
            this.baseUrl = process.env.VUE_APP_BASE_URL
            const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
            const data = { img: [imgBase64] }
            uploadImgage(data).then(res => {
                // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
                success(`${this.baseUrl}/${res.data[0]}`)
            }).catch(() => { failure('error') })
        }
    },
};
</script>

<style scoped>
.editContent {
    margin: 15px;
    width: 100%;
    height: 100%;
}
</style>