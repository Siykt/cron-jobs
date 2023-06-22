import type { JobRunnerContext, JobRunnerDefineConfig } from '../../../models/Job/Core'
import store from './store'
import { formatTime } from './formatTime'

// 通过事件来通知Job runner
export const eventTarget = new EventTarget()

export class JobEvent extends Event {
  detail: any

  constructor(type: string, detail?: any) {
    super(type)
    this.detail = detail
  }
}

eventTarget.addEventListener('define', (event) => {
  const config = (event as JobEvent).detail as JobRunnerDefineConfig
  const context = { http: $fetch } as JobRunnerContext
  const proxiesContext = new Proxy(context, {
    get: (_target, propKey) => {
      if (propKey === 'req')
        return store.local.getConfig(config.id) ?? {}

      if (propKey === 'res') {
        const res = {
          log: (message: string) => {
            const time = formatTime(new Date())
            console.log(`[${config.name}] [${time}]`, message)
          },
          error: (error: Error) => {
            const time = formatTime(new Date())
            console.log(`[${config.name}] [${time}]`, error)
          },
          end: <Res>(result: Res) => {
          // 保存运行时上下文
            const lastTimer = formatTime(new Date())
            res.log(lastTimer)
            res.log(`[JobRunner] ${config.id} ${result} ${lastTimer}`)
          },
        }
        return res
      }
      return context[propKey as keyof JobRunnerContext]
    },
    set: () => { throw new Error('[defineRunner] 不允许修改上下文') },
  })
  // 考虑off
  eventTarget.addEventListener(config.id, () => {
    console.log(`[run] 任务 ${config.id} 开始运行, ${config}`)
    config.runner(proxiesContext)
  })
})

eventTarget.addEventListener('run', (event) => {
  const jobId = (event as JobEvent).detail
  if (!store.local.has(jobId))
    return
  console.log(`[run] 任务 ${jobId} 开始运行`)
  eventTarget.dispatchEvent(new JobEvent(jobId))
})
