<script setup lang="ts">
defineEmits<{
  (event: 'click', payload: MouseEvent): void
}>()
</script>

<template>
  <button
    class="btn cursor-pointer select-none border-0 rounded bg-#ffffff20 p2 text-#ffffff80 transition-all duration-300 transition-ease hover:bg-#ffffff40 hover:text-#fff"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
