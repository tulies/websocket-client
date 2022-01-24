// import { WebSocketServer } from 'ws'
const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8181 })

wss.on('connection', function connection(ws) {
  ws.on('message', function message(receivedData) {
    console.log('received: %s', receivedData)
    const { data, callbackId } = JSON.parse(receivedData)
    ws.send(
      JSON.stringify({
        type: 'replay',
        data,
        callbackId
      })
    )

    ws.send(
      JSON.stringify({
        type: 'changeStatus',
        data
      })
    )
  })
  // ws.send('something')

  const data = JSON.stringify({
    type: 'open',
    msg: '连接成功'
  })
  ws.send(data)
})
