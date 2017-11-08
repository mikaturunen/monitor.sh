
export type MerchantId = string
export type LogWriter = (message: string, user: 'system' | string, meta?: any) => void

const output = (log: any) => {
  if (process.env['NODE_ENV'] !== 'production') {
    // in dev we make it slightly more readable
    log = JSON.stringify(log, null, 2)
  }

  console.log(log)
}

export const logger = (groupSpan: string) => {
  const debug: LogWriter = (message: string, user: string, meta?: any) => {
    const level = 'debug'
    const span = groupSpan
    const log = {
      timestamp: new Date().toISOString(),
      span,
      message,
      level,
      meta: meta ? meta : {}
    }

    output(log)
  }

  const warning: LogWriter = (message: string, user: string, meta?: any) => {
    const level = 'warning'
    const span = groupSpan
    const log = {
      timestamp: new Date().toISOString(),
      span,
      message,
      level,
      meta: meta ? meta : {}
    }

    output(log)
  }

  const error: LogWriter = (message: string, user: string, meta?: any) => {
    const level = 'error'
    const span = groupSpan
    const log = {
      timestamp: new Date().toISOString(),
      span,
      message,
      level,
      meta: meta ? meta : {}
    }

    output(log)
  }

  const info: LogWriter = (message: string, user: string, meta?: any) => {
    const level = 'info'
    const span = groupSpan
    const log = {
      timestamp: new Date().toISOString(),
      span,
      message,
      level,
      meta: meta ? meta : {}
    }

    output(log)
  }

  return {
    debug,
    warning,
    info,
    error
  }
}
