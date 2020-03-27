<template>
  <div v-if="isShowLoading" class="pk-loading">
    <icon-svg :icon-class="iconClass" :width="100" :height="100"></icon-svg>
    <p>{{ loadingText }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loading',
  computed: {
    ...mapState('common', [
      'isShowLoading',
      'loadingText',
      'iconClass'
    ])
  }
}
</script>

<style scoped lang="scss">
  .pk-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 8;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 200px;
    padding: 5px 0 30px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px;
    border-radius: 50%;
    text-align: center;
    align-items: center;
    animation: breath 2s infinite;

    p {
      font-size: 24px;
      font-weight: bold;
    }

    @keyframes breath {
      0% {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 4px 4px $pk-bacNormal;
        opacity: 1;
        transform: scale(1);
      }
      50% {
        background: rgba(255, 255, 255, 0);
        box-shadow: 0 0 10px 10px $pk-bacNormal;
        opacity: 0.6;
        transform: scale(1.2);
      }
      100% {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 4px 4px $pk-bacNormal;
        opacity: 1;
        transform: scale(1);
      }
    }
  }
</style>
