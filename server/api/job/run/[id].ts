import { nanoid } from 'nanoid'
import { eventTarget } from '../../../jobs/helpers/event'
import store from '../../../jobs/helpers/store'

export default defineEventHandler(async (event) => {
  const jobId = event.context.params?.id
  if (!jobId)
    throw new Error('缺少参数 id')

  if (!store.local.has(jobId))
    throw new Error('任务不存在')

  const id = nanoid()
  eventTarget.dispatch('run', { id, jobId, data: await readBody(event) })
  try {
    const data = await new Promise<any>((resolve, reject) => {
      eventTarget.on(`jobSuccess:${id}`, resolve)
      eventTarget.on(`jobError:${id}`, reject)
    })
    return { message: '任务已完成', data: data.detail }
  }
  catch (error: any) {
    return { message: '任务执行失败', error: error.detail }
  }
})
