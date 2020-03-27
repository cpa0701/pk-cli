<template>
  <div class="markdown-content">
    <div id="editorSection" ref="editor"></div>
    <Button @click="commit">提交</Button>
  </div>
</template>
<script>
import Editor from 'tui-editor'
import 'tui-editor/dist/tui-editor.css' // editor's ui
import 'tui-editor/dist/tui-editor-contents.css' // editor's content
import 'codemirror/lib/codemirror.css' // codemirror
import 'highlight.js/styles/github.css' // code block highlight
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const instance = new Editor({
        el: document.querySelector('#editorSection'),
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '600px'
      })
      instance.getHtml()
    },
    commit() {
      console.log(this.$refs)
    }
  }
}
</script>
<style lang="scss" scoped>
  .markdown-content{
    width: 1200px;
    margin: 0 auto;
  }
</style>
