// import { WebSocketServer } from 'ws'
const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 8181 })

wss.on('connection', function connection(ws) {
  ws.on('message', function message(receivedData) {
    console.log('received: %s', receivedData)
    const { data, callbackId } = JSON.parse(receivedData)
    // 回复消息
    ws.send(
      JSON.stringify({
        type: 'replay',
        data,
        callbackId
      })
    )
    // 全局广播
    ws.send(
      JSON.stringify({
        type: 'changeStatus',
        data
      })
    )
  })
  const data = JSON.stringify({
    type: 'open',
    msg: '连接成功'
  })
  ws.send(data)
})
