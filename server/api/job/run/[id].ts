import { JobEvent, eventTarget } from '../../../jobs/helpers/event'
import store from '../../../jobs/helpers/store'

export default defineEventHandler((event) => {
  if (!event.context.params?.id)
    throw new Error('缺少参数 id')

  if (!store.local.has(event.context.params.id))
    throw new Error('任务不存在')

  eventTarget.dispatchEvent(new JobEvent('run', event.context.params.id))
  return { message: '任务已开始运行' }
})
