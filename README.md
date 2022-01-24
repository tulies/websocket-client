## 介绍

简化 WEB 端 webSocket 调用。

## 使用方法

### Client 端调用

> 注意： open 和 close 为连接和关闭专用，请不要被占用

```javascript
import WebSocketClient from 'websocket-client'

const wsc = new WebSocketClient('url地址')

/**  监听websocket的消息回调 **/

// websocket连接后回调
wsc.on('open', () => {
  // ...
})

// websocket关闭后回调
wsc.on('close', () => {
  // ...
})

// websocket自定义事件注册监听
wsc.on('自定义类型', (resp?: any) => {
  // ...
})

/**  websocket消息发送 **/
wsc.emit(type: string, data: any, fn?: (resp?: any) => any): void {
  // ...
}

/**
wsc.close()
wsc.reconnect()
```

### Server 端数据规范

```
{
  type:'replay',
  data:'',
  // 如果是类型是replay，则肯定会有callbackId，否则回调则会无法执行。
  callbackId:'sss'
}
```

## 参考资料

前端工程化：你所需要知道的最新的 babel 兼容性实现方案 https://blog.csdn.net/lunahaijiao/article/details/119156972

WebSocket 教程：https://www.ruanyifeng.com/blog/2017/05/websocket.html
