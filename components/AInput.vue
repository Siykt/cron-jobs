<script setup lang="ts">
interface Props {
  type?: string
  placeholder?: string
  modelValue?: any
}
withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '请输入',
})
const emit = defineEmits<{
  (event: 'update:modelValue', e: any): void
  (event: 'input', e: Event): void
  (event: 'change', e: Event): void
  (event: 'click', e: MouseEvent): void
  (event: 'keyup', e: KeyboardEvent): void
}>()
</script>

<template>
  <input
    :value="modelValue" class="a-input" :type="type" :placeholder="placeholder"
    @input="emit('input', $event), emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @change="emit('change', $event)"
    @click="emit('click', $event)"
    @keyup="emit('keyup', $event)"
  >
</template>

<style lang="less" scoped>
.a-input {
  background-color: transparent;
  width: 100%;
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid #ffffff60;
  color: #ffffff60;
  outline: none;
  transition: all 0.3s;
  font-size: 16px;
  &:focus {
    border-bottom: 1px solid #ffffff60;
  }
  &:-internal-autofill-selected{
    appearance: unset;
    background-color: transparent !important;
    color: #ffffff60 !important;
  }
}
</style>
