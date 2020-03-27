<template>
  <svg class="pk-icon" aria-hidden="true" :style="{width: width + 'px', height: height + 'px'}" @click="onClick">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: '10'
    },
    height: {
      type: [String, Number],
      default: '10'
    }
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`
    }
  },
  methods: {
    onClick() {
      this.$emit('Click')
    }
  }
}
</script>
