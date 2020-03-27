export default {
  props: {
    baseConfig: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      baseModel: {}
    }
  },
  watch: {
    baseConfig(newVal) {
      this.init(newVal)
    }
  },
  mounted() {
    this.init(this.baseConfig)
  },
  methods: {
    init(config) {
      if (!config) {
        return
      }
      this.initModel(config)
    },
    initModel (config) {
      this.baseModel = {}
      config.forEach(item => {
        const name = item.field
        const defaultValue = typeof (item.default) === 'undefined' ? null : item.default
        this.$set(this.baseModel, name, defaultValue)
      })
    },
    drop(event) {
      // this.baseConfig.push(JSON.parse(event.dataTransfer.getData('newInput')))
    },
    dragOver(event) {
      event.preventDefault()
    },
    dragEnter(event) {
      event.preventDefault()
    }
  }
}
