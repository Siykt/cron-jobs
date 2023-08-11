import type { JobDetail } from '../../../modules/Job/Core'
import store from '../../jobs/helpers/store'

export default defineEventHandler((event) => {
  if (!event.context.params?.id)
    throw new Error('缺少参数 id')

  if (!store.local.has(event.context.params.id))
    throw new Error('任务不存在')

  return store.local.get(event.context.params.id) as JobDetail
})
