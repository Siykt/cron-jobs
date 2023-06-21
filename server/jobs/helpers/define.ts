import type { JobRunnerDefineConfig } from '../../../models/Job/Core'
import { JobEvent, eventTarget } from './event'
import store from './store'

export async function defineRunner<Config = any>(config: JobRunnerDefineConfig<Config>) {
  if (store.local.has(config.id))
    throw new Error(`[defineRunner] 任务 ${config.id} 已存在`)

  store.local.set(config.id, config.config)
  console.log(`[defineRunner] 任务 ${config.id} 已定义`)
  eventTarget.dispatchEvent(new JobEvent('define', config))
}
