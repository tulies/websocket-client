## 介绍

An HTML5 Web Sockets client, to simplify the websocket call on the web side。

一个 HTML5 的 Websocket 调用封装库，为了简化 WEB 端 webSocket 调用。

## 安装

## ES Module Import

```shell
yarn add @tulies/websocket-client
```

```javascript
import WebSocketClient from '@tulies/websocket-client'
const wsc = new WebSocketClient('websocket url地址')
```

## 引入文件

```html
<script src="/dist/websocket-client.umd.js"></script>
<script>
  var wsc = new WebSocketClient('websocket url地址')
</script>
```

## 基础使用

### Client 端调用

```javascript
import WebSocketClient from '@tulies/websocket-client'

const wsc = new WebSocketClient('websocket url地址')

/**  监听websocket的消息回调 **/
// ws-open,ws-close,ws-error,ws-message 为原生的回调封装，请不要自定义占用
// websocket连接后回调
wsc.on('ws-open', (event: Event) => {
  // ...
})
// websocket关闭后回调
wsc.on('ws-close', (event: CloseEvent) => {
  // ...
})
// websocket错误回调
wsc.on('ws-error', (event: Event) => {
  // ...
})
// 最原始的websocket的message
wsc.on('ws-message', (event: MessageEvent) => {
  // ... 建议非特殊需要不用监听这个处理，最合适的是使用双方约定的自定义类型
})


const listener = (data?: any) => {
  // ...
}
// websocket自定义事件注册监听
wsc.on('自定义类型', listener )

/** 移除监听 **/
wsc.off('自定义类型', listener)



/**  websocket消息发送 **/
wsc.emit(type: string, data: any, fn?: (resp?: any) => any): void {
  // ...
}

// 如果在不确定websocket是否连接成功前就想调用emit，请在wsc.ready内调用。
wsc.ready(()=>{
  wsc.emit('自定义类型',{},()=>{...})
})

// 断开连接
wsc.close()
// 重新连接
wsc.reconnect()
```

### Server 端数据规范

json 字符串的数据结构如下：

```javascript
// 回复前端发送的消息
{
  // type固定为 `replay`
  type:'replay',
  data:{...},
  // 如果是类型是replay，则肯定会有callbackId，否则回调则会无法执行。
  callbackId:'sss'
}

// 全局广播消息
{
  type:'自定义约定的类型',
  data:{...}
}
```

## Dist / Build

### Development Build

```shell
$ yarn dev
```

### Production Build

```shell
$ yarn build
```
