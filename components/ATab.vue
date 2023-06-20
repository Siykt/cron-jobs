<script setup lang="ts">
interface Props {
  tabs: string[]
}

defineProps<Props>()
const emits = defineEmits<{
  (event: 'click', index: number): void
}>()
const active = ref(0)
const hovered = ref<number>()
</script>

<template>
  <div :style="{ width: `${tabs.length * 80}px` }">
    <div class="relative w-full flex" @mouseleave="hovered = undefined">
      <div
        v-for="(tab, i) in tabs"
        :key="tab"
        class="h-50px w-80px flex cursor-pointer items-center justify-center text-12px font-semibold text-#ffffff60 transition-all duration-300"
        :class="{ 'text-#ffffff80': i === active || i === hovered }"
        @click="emits('click', active = i)"
        @mouseenter="hovered = i"
      >
        {{ tab }}
      </div>
      <div
        class="pointer-events-none absolute left-10px top-10px h-30px w-60px rounded bg-#ffffff20 transition-all duration-300"
        :style="{ transform: `translateX(${(hovered ?? active) * 80}px)` }"
      />
    </div>
    <div class="h-1px w-full bg-#ffffff80">
      <div
        class="h-1px w-80px bg-#6c6cc9 transition-all duration-300"
        :style="{ transform: `translateX(${active * 80}px)` }"
      />
    </div>
  </div>
</template>
