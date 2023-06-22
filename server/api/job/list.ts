import jobs from '../../jobs'

export default defineEventHandler(async () => {
  return jobs.map(job => ({ ...job, runner: undefined }))
})
