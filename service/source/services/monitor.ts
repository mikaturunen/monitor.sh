
import { Connection } from 'typeorm'
import { Monitors } from '../models/monitor'
import { logger } from './log'

export interface RequestBody {
  name: string
  location: string
}

const numberValidator = target => typeof target === 'number'
const stringValidator = target => typeof target === 'string'
const isValid = (target: any, validators: any[]) => {
  return validators.every(
    (validateTarget: any) => validateTarget.validators.every((validator: Function) => validator(target[validateTarget.property]))
  )
}

export const MonitorHandle = async (requestMonitor: RequestBody, connection: Connection) => {
  const monitorHandleLog = logger('monitorHandle')
  // First attempt to calculate the hmac before anything, otherwise just throw it out.
  monitorHandleLog.info('Attempting to calculate HMAC for request.', 'system', requestMonitor)
  monitorHandleLog.info('HMAC is valid for request.', 'system', requestMonitor)

  // Actually validate the properties we are interested in
  monitorHandleLog.info('Attempting to validate properties in MonitorHandle for request. Need properties: [ name, location, frequency ].', 'system', requestMonitor)
  const isValidated = isValid(requestMonitor, [
    { property: 'name', validators: [ stringValidator ] },
    { property: 'location', validators: [ stringValidator ] },
    { property: 'frequency', validators: [ numberValidator ] }
  ])

  if (!isValidated) {
    monitorHandleLog.error('Request did not contain required properties: [ name, location, frequency ]', 'system', requestMonitor)
    return 'NOPE'
  }

  monitorHandleLog.info('Valid properties found in request', 'system', requestMonitor)

  monitorHandleLog.info('Generating the datbase model object for request', 'system')
  let monitor = new Monitors()
  monitor.name = requestMonitor.name
  monitor.location = requestMonitor.location

  monitorHandleLog.info('Getting database repository', 'system')
  let monitorRepository = connection.getRepository(Monitors)

  try {
    monitorHandleLog.info('Saving requested Monitor into database.', 'system')
    await monitorRepository.save(monitor)
    monitorHandleLog.info('Saved Monitor.', 'system', monitor)
  } catch (error) {
    monitorHandleLog.error('Could not save Monitor to database.', 'system')
    monitorHandleLog.error(`Following error occurred ${error}`, 'system', error)
    return 'NOPE'
  }

  return monitor
}
