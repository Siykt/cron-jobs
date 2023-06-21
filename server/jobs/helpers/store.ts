import type { Job } from '../../../models/Job/Core'

type JobId = Job['id']

export class JobLocalStorage {
  private jobs: Map<JobId, any>
  private jobConfigMap: Map<JobId, any>

  constructor() {
    this.jobs = new Map()
    this.jobConfigMap = new Map()
  }

  get(id: JobId) {
    return this.jobs.get(id)
  }

  set(id: JobId, value: any) {
    this.jobs.set(id, value)
    return this
  }

  has(id: JobId) {
    return this.jobs.has(id)
  }

  delete(id: JobId) {
    this.jobs.delete(id)
    return this
  }

  getConfig(id: JobId) {
    return this.jobConfigMap.get(id)
  }

  setConfig(id: JobId, value: any) {
    this.jobConfigMap.set(id, value)
    return this
  }

  hasConfig(id: JobId) {
    return this.jobConfigMap.has(id)
  }

  deleteConfig(id: JobId) {
    this.jobConfigMap.delete(id)
    return this
  }
}

export default {
  // TODO 需要持久化支持
  // redis: new JobRedisStorage(),
  local: new JobLocalStorage(),
}
