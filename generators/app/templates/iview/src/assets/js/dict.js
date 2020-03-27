import { get } from '../../request/http'
import store from '../../store'

export default function getDict () {
  const url = '/user-api/sysDict/findAll'
  const params = {
    t: Math.random()
  }
  get(url, params).then(res => {
    store.commit('common/SET_SYS_DIC', res.data)
    // this.$store.commit('common/SET_SYS_DIC', res.data)
  }).catch(err => {
    console.error(err)
  })
}
