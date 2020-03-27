<template>
  <input
    class="common-input"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :vail-type="vailType"
    :value="value"
    @keyup="onKeyup"
    @input="updateValue($event.target.value)"
  >
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: ''
    },
    vailType: {
      type: String,
      default: 'vail'
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onKeyup() {
      this.$emit('keyup')
    },
    updateValue(value) {
      this.value = value
    }
  }
}
</script>
