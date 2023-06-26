import type { load } from 'cheerio'

export interface Job {
  id: string
  name: string
  description?: string
  icon?: string
}

export interface JobRunnerContext<Config = any> {
  getConfig: () => Promise<{ config: Config; data: any }>
  http: typeof $fetch
  log: (message: string) => void
  error: (error: Error) => void
  end: <Res>(result: Res) => void
  html: typeof load
}

export type JobRunner<Config = any> = (context: JobRunnerContext<Config>) => unknown

export interface JobRunnerDefineConfig<Config = any> extends Job {
  defaultCron: string
  config: Config
  runner: JobRunner<Config>
}

export type DefineJobRunnerCallback<Config = any> = (context: JobRunnerContext<Config>) => JobRunnerDefineConfig<Config>

// export interface JobRunner {
//   (http: typeof $fetch): Promise<JobRunnerDefineConfig>
// }
