import dayJs from 'dayjs'

export default function() {
  return [
    {
      title: '用户编号',
      key: 'uid',
      minWidth: 30,
      align: 'center'
    },
    {
      title: '用户名',
      key: 'nickName',
      minWidth: 50
    },
    {
      title: '手机号码',
      key: 'mobile',
      minWidth: 80
    },
    {
      title: '微信ID',
      key: 'wxOpenId',
      minWidth: 50
    },
    {
      title: '真实姓名',
      key: 'name',
      minWidth: 50
    },
    {
      title: '注册时间',
      key: 'createTime',
      sortable: 'custom',
      minWidth: 120,
      render: (h, params) => {
        return h('span', params.row.createTime ? dayJs(params.row.createTime).format('YYYY年MM月DD日 HH:mm:ss') : '')
      }
    },
    {
      title: '最后登录',
      key: 'lastLoginTime',
      sortable: 'custom',
      minWidth: 120,
      render: (h, params) => {
        return h('span', params.row.lastLoginTime ? dayJs(params.row.lastLoginTime).format('YYYY年MM月DD日 HH:mm:ss') : '')
      }
    },
    {
      title: '管理员',
      key: 'isBoss',
      minWidth: 50,
      sortable: 'custom',
      render: (h, params) => {
        return h('span', params.row.isBoss ? '是' : '否')
      }
    },
    {
      title: '状态',
      key: 'status',
      minWidth: 50,
      sortable: 'custom',
      render: (h, params) => {
        return h('span', params.row.status === 0 ? '有效' : '无效')
      }
    },
    {
      title: '操作',
      minWidth: 50,
      key: 'action',
      align: 'center',
      className: 'check-btn',
      render: (h, params) => {
        return h('div', [
          h('div', [
            h('a', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              class: {
                'disable-button': this.$store.state.user.userInfo.uid === params.row.uid
              },
              on: {
                click: () => {
                  this.changeStatus(params.row)
                }
              }
            }, params.row.status === 0 ? '禁用' : '启用'),
            h('a', {
              props: {
                type: 'success',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$refs.updateDrawer.userDrawerShow(params.row)
                }
              }
            }, '编辑')
          ])
        ])
      }
    }
  ]
}
