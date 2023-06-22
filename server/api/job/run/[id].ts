import { JobEvent, eventTarget } from '../../../jobs/helpers/event'
import store from '../../../jobs/helpers/store'

export default defineEventHandler(async (event) => {
  const jobId = event.context.params?.id
  if (!jobId)
    throw new Error('缺少参数 id')

  if (!store.local.has(jobId))
    throw new Error('任务不存在')

  eventTarget.dispatchEvent(new JobEvent('run', jobId))
  const result = await new Promise<any>((resolve, reject) => {
    const handle = (event: Event) => {
      const res = (event as JobEvent).detail
      if (res.id !== jobId)
        return

      if (res.code !== 0)
        reject(res.data)
      else
        resolve(res.data)
      eventTarget.removeEventListener('jobEnd', handle)
    }
    eventTarget.addEventListener('jobEnd', handle)
  })
  return { message: '任务已完成', data: result }
})
