/* 这里放一些公开的逻辑，比如删除 */
export default {
  methods: {
    /* 删除选中元素 */
    removeSelectList(idName) {
      if(this.$refs.baseTable.selectList.length === 0) {
        this.$Message.warning('请选择要删除的')
        return
      }
      this.$Message.warning({
        content: '确认删除?',
        duration: 0,
        closable: true,
        render: h => {
          return h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  const selectList = this.$refs.baseTable.selectList
                  const array = []
                  for (let i = 0; i < selectList.length; i++) {
                    let item = selectList[i]
                    array.push(item[idName])
                  }
                  const params = array.join(',')
                  this.fetchRemoveSelectList(params)
                  this.$Message.destroy()
                }
              }
            }, '确定'),
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$Message.destroy()
                }
              }
            }, '取消')
          ])
        }
      })
    }
  }
}
