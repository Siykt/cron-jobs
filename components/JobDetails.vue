<script setup lang="ts">
import { memoize } from 'lodash'
import type { JobDetail } from '~/models/Job/Core'

interface Props {
  job: JobDetail
}

const props = defineProps<Props>()

const toUpperStart = memoize((str: string) => str.replace(/^[a-z]/, s => s.toUpperCase()))
const show = ref(false)
const loading = ref(false)
const msg = ref('')
const showMsg = ref(false)
const form = ref(Object.fromEntries(Object.keys(props.job.config).map(key => [key, undefined])))
async function runJob() {
  if (loading.value)
    return

  loading.value = true
  const { data } = await useFetch(`/api/job/run/${props.job.id}`, {
    method: 'POST',
    body: form.value,
  }).finally(() => loading.value = false)
  showMsg.value = true
  msg.value = data.value?.message ?? '未知错误'
  show.value = false
  setTimeout(() => showMsg.value = false, 2000)
}
</script>

<template>
  <div class="min-h-1px w-full flex flex-col gap-2 p4 text-#ffffff60">
    <p class="m0 flex items-center">
      任务名称：{{ job.name }}
    </p>
    <p class="m0 flex items-center">
      任务描述：{{ job.description }}
    </p>
    <p class="m0 flex items-center">
      任务配置：
    </p>
    <p v-for="(key, value) in job.config" :key="key" class="m0 flex items-center">
      [Param]: {{ value }} {{ toUpperStart(key) }}
    </p>
    <p class="m0 mt4 flex items-center justify-center md:justify-start">
      ---------- 任务指令 ----------
    </p>
    <div class="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
      <AButton @click="show = true">
        <i class="mdi:rocket-launch-outline" />
        执行任务
      </AButton>
      <!-- <AButton>
        <i class="mdi:plus" />
        添加新的任务
      </AButton>
      <AButton>
        <i class="mdi:delete" />
        删除某项任务
      </AButton>
      <AButton>
        <i class="mdi:restart" />
        重启所有任务
      </AButton>
      <AButton>
        <i class="mdi:stop" />
        停止所有任务
      </AButton> -->
    </div>
    <AModal v-model:active="show">
      <div class="min-w-260px flex flex-col gap-2 p4 text-#ffffff60">
        <p class="m0 flex items-center justify-center">
          ---------- 任务配置 ----------
        </p>
        <p v-for="(key, param) in job.config" :key="key" class="m0 flex flex-col">
          <span>[Param]: {{ param }}</span>
          <input v-model="form[param]" class="param-input" type="text" placeholder="请输入" @keyup.enter="runJob">
        </p>
        <div class="mt-2 flex flex-wrap justify-start justify-center gap-2">
          <AButton @click="runJob">
            <i v-if="loading" class="rotate-animate mdi:loading" />
            <i v-else class="mdi:rocket-launch-outline" />
          </AButton>
        </div>
      </div>
    </AModal>
    <AModal v-model:active="showMsg" :mask-closable="false">
      {{ msg }}
    </AModal>
  </div>
</template>

<style lang="less" scoped>
.param-input {
  background-color: transparent;
  margin-top: 0.5rem;
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
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
.rotate-animate {
  animation: rotate 1s linear infinite;
}
</style>
