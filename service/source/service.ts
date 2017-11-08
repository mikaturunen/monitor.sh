import 'reflect-metadata'

import * as server from 'server'
import * as path from 'path'
import { createConnection } from 'typeorm'
import { Monitors } from './models/monitor'

import { MonitorHandle } from './services/monitor'

const { get, post } = server.router
const port = 3333
const security = {
  csrf: false
}

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'postgres',
  schema: 'monitor',
  entities: [
    Monitors
  ],
  synchronize: false,
  logging: false
})
.then(async connection => {

  server({ port, security }, [
    get('/', context => 'monitor.sh online!'),
    post('/monitor/add', async context => MonitorHandle(context.data, connection))
  ])

  console.log(`monitor.sh connected in port: ${port}.`)
})
.catch(error => console.log('Cannot create connection to database: ', error))
