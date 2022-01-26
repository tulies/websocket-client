const wsc = new WebSocketClient('ws://127.0.0.1:8181')
wsc.on('open', () => {
  console.info('页面端-websocket', '建立连接')
})
wsc.ready(() => {
  wsc.emit(
    'hahah',
    {
      id: '123456',
      name: '风清扬'
    },
    (data) => {
      console.log('这是回调回来的数据', data)
    }
  )
})

// sendmsg
document.getElementById('sendmsg').addEventListener('click', () => {
  wsc.emit(
    'hahah',
    {
      id: '123456',
      name: '风清扬'
    },
    (data) => {
      console.log('这是回调回来的数据', data)
    }
  )
})
const changeStatus = () => {
  console.info('changeStatus--回调')
}
// addevent
document.getElementById('addevent').addEventListener('click', () => {
  wsc.on('changeStatus', changeStatus)
})

// removeevent
document.getElementById('removeevent').addEventListener('click', () => {
  wsc.off('changeStatus', changeStatus)
})
