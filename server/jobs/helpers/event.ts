import { load } from 'cheerio'
import type { JobRunnerDefineConfig } from '../../../modules/Job/Core'
import store from './store'
import { formatTime } from './formatTime'

export class JobEvent<T = any> extends Event {
  detail: T
  constructor(type: string, detail?: T) {
    super(type)
    this.detail = detail as T
  }
}

export type JobEventListener<T = any> = (event: JobEvent<T>) => void

class JobEventTarget extends EventTarget {
  private listeners = new Map<string, Set<JobEventListener>>()

  on<T = any>(event: string, listener: JobEventListener<T>) {
    if (!this.listeners.has(event))
      this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(listener)
    this.addEventListener(event, listener as EventListenerOrEventListenerObject)
  }

  off(event: string) {
    if (!this.listeners.has(event))
      return
    const eventListeners = this.listeners.get(event) as Set<JobEventListener>
    eventListeners.forEach((eventListener) => {
      this.removeEventListener(event, eventListener as EventListenerOrEventListenerObject)
    })
    this.listeners.delete(event)
  }

  dispatch<T = any>(event: string, detail?: T) {
    return super.dispatchEvent(new JobEvent(event, detail))
  }
}

// 通过事件来通知Job runner
export const eventTarget = new JobEventTarget()

eventTarget.on<JobRunnerDefineConfig>('define', (event) => {
  const config = event.detail
  // 考虑off
  eventTarget.on<{ id: string; data: any }>(config.id, async (event) => {
    const { id, data } = event.detail
    console.log(`[run] 任务 ${config.id} 开始运行, ${config}`)
    try {
      await config.runner({
        http: $fetch,
        getConfig: () => Promise.resolve({ config: store.local.getConfig(config.id), data }),
        log: (message: string) => {
          const time = formatTime(new Date())
          console.log(`[${config.name}] [${time}]`, message)
        },
        error: (error: Error) => {
          const time = formatTime(new Date())
          console.error(`[${config.name}] [${time}]`, error)
          eventTarget.dispatch(`jobError:${id}`, { id: config.id, code: 500, data: error.message })
        },
        end: <Res>(result: Res) => {
          // 保存运行时上下文
          const time = formatTime(new Date())
          console.log(`[${config.name}] [${time}]`, result)
          eventTarget.dispatch(`jobSuccess:${id}`, { id: config.id, code: 0, data: result })
        },
        html: load,
      })
    }
    catch (error) {
      console.error(`[run] 任务 ${config.id} 运行失败`)
      console.error(error)
      eventTarget.dispatch(`jobError:${id}`, { id: config.id, code: 500, data: error })
    }
  })
})

eventTarget.on<{ id: string; jobId: string; data: any }>('run', (event) => {
  const { jobId, ...data } = event.detail
  if (!store.local.has(jobId))
    return
  eventTarget.dispatch(jobId, data)
})
