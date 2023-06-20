<script setup lang="ts">
interface Props {
  jobId: string
  name: string
  count?: number
  description?: string
  icon?: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'click', props: Props): void
}>()
</script>

<template>
  <div class="card backface-hidden absolute relative h-166px w-216px cursor-pointer select-none bg-#040720 p3" @click="emits('click', props)">
    <div class="mb-2 flex items-center">
      <img
        class="h30px bg-#040720"
        :src="icon"
        alt="job-icon"
      >
      <span class="ml-auto text-#ffffff80">{{ count }}</span>
    </div>
    <p class="m0 text-16px text-#ffffffaa">
      {{ name }}
    </p>
    <p class="line-clamp-3 mb0 mt-2 text-#ffffffaa">
      <i class="mdi:dots-horizontal-circle-outline" />
      {{ description }}
    </p>
    <svg v-if="count" class="absolute left-1/2 top-1/2 z--1 transform-translate--1/2" width="220" height="170">
      <rect width="216" height="166" class="rect" style="fill:transparent;" />
    </svg>
  </div>
</template>

<style lang="less" scoped>
@keyframes spin {
  0%{
    stroke-dashoffset: 0px;
  }
  50%{
    stroke-dashoffset: 220px;
  }
  100%{
    stroke-dashoffset: 440px;
  }
}
.card {
  width: 216px;
  height: 166px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }
  .rect {
    width: 220px;
    height: 170px;
    rx: 6px;
    ry: 6px;
    stroke: #ffffffaa;
    stroke-width: 1px;
    stroke-dasharray: 220px;
    stroke-dashoffset: 170px;
    animation: spin 0.8s linear infinite;
  }
}
</style>
