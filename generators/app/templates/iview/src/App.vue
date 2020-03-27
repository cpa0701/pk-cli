<template>
  <div id="app" :class="className">
    <loading />
    <router-view />
  </div>
</template>
<script>
import Loading from '@/components/common/loading'
import { mapState } from 'vuex'
export default {
  components: { Loading },
  computed: {
    ...mapState('user', [
      'skin'
    ]),
    className() {
      const body = document.getElementsByTagName('body')[0]
      if ('className' in document.documentElement) {
        body.className = ''
        body.className = this.skin ? `${this.skin}-skin` : 'green-skin'
      }
      return (this.skin || 'green') + '-skin'
    }
  },
  mounted() {
    this.getDict()
  },
  methods: {
    /**
     * 获取字典
     */
    getDict() {
      const url = '/user-api/sysDict/findAll'
      const params = {
        t: Math.random()
      }
      this.$get(url, params).then(res => {
        this.$store.commit('common/SET_SYS_DIC', res.data)
      })
    }
  }
}
</script>
