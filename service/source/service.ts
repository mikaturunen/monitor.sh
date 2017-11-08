import * as server from 'server'

const { get, post } = server.router

server({ port: 3333 }, [
  get('/', context => 'monitor.sh online!')
])
