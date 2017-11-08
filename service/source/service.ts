import 'reflect-metadata'

import * as server from 'server'
import * as path from 'path'
import { createConnection } from 'typeorm'
import { Monitor } from './models/monitor'

const { get, post } = server.router

createConnection({
  type: 'sqlite',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [
    path.join(__dirname, '/models/*.js')
  ]
})

server({ port: 3333 }, [
  get('/', context => 'monitor.sh online!')
])
