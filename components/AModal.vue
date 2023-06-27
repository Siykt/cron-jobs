<script setup lang="ts">
interface Props {
  active: boolean
  maskClosable?: boolean
}

withDefaults(defineProps<Props>(), { maskClosable: true })
const emits = defineEmits(['update:active'])
</script>

<template>
  <div class="dialog" :class="{ active }" @click="maskClosable && emits('update:active', !active)">
    <div class="dialog-content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  &.active {
    opacity: 1;
    pointer-events: auto;
    .dialog-content {
      transform: scale(1);
    }
  }
  .dialog-content {
    background: rgba(31, 41, 55, 1);
    border-radius: 5px;
    padding: 10px 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    transform: scale(0.5);
  }
}
</style>
