export interface Job {
  id: string
  name: string
  description?: string
}

export interface JobRunnerContext<Config = any> {
  req: Config
  http: typeof $fetch
  res: {
    log: (message: string) => void
    error: (error: Error) => void
    end: <Res>(result: Res) => void
  }
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
