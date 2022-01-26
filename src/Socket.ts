import EventMiddleware from '@tulies/event-middleware'
import { obj2string } from './utils'

class Socket {
  private url: string
  private ws: WebSocket
  private em: EventMiddleware
  private uniqueId = 0
  private wsCallbacks: Record<string, any> = {}
  private readyCallbacks: VoidFunction[] = []
  constructor(url: string) {
    this.url = url
    this.em = new EventMiddleware()
    this.ws = new WebSocket(this.url)
    // 初始化监听
    this.initEventHandle()
  }

  public ready(callback: VoidFunction): void {
    //TODO 如果已经是正常OPEN状态了，则直接执行方法
    if (this.ws.readyState === this.ws.OPEN) {
      callback()
      return
    }

    //TODO 如果已经是 CONNECTING 状态，则需要把事件处理放到缓存池中
    if (this.ws.readyState === this.ws.CONNECTING) {
      this.readyCallbacks.push(callback)
      return
    }
    console.error('当前websocket没有建立连接')
  }
  // 消息监听
  public on(type: string, fn: (resp?: any) => any): void {
    // 在事件池中注入监听
    this.em.on(type, fn)
  }

  // 移除消息监听
  public off(type: string, fn: (resp?: any) => any): void {
    // 在事件池中注入监听
    this.em.off(type, fn)
  }

  // 像server端发送消息
  public emit(type: string, data?: any, fn?: (resp?: any) => any): void {
    let callbackId = ''
    if (fn) {
      callbackId = 'cb_' + this.uniqueId++ + '_' + new Date().getTime()
      this.wsCallbacks[callbackId] = fn
    }
    this.ws.send(
      obj2string({
        type,
        data,
        callbackId: callbackId ? callbackId : null
      })
    )
  }

  // 关闭连接
  public close(): void {
    // 调用close
    this.ws.close()
  }

  // 重新连接
  public reconnect(): void {
    // 如果websock状态为 CONNECTING 或 OPEN
    if (this.ws.readyState === this.ws.CONNECTING || this.ws.readyState === this.ws.OPEN) {
      // console.debug('正在连接中不要捉急')
      return
    }
    // 否则就重新new一下
    this.ws = new WebSocket(this.url)
    this.initEventHandle()
  }

  // event: Event
  public onopen(event: Event): void {
    // console.debug('连接成功的回调')
    // open之后，直接先把事件缓存池里的方法执行一遍
    this.em.emit('ws-open', event)
    this.readyCallbacks.forEach((job: any) => {
      job()
    })
    this.readyCallbacks = []
  }

  public onmessage(event: MessageEvent): void {
    // console.debug('广播消息监听到的数据', event, event.data)
    // 这个是最原始的信息回调。
    this.em.emit('ws-message', event)
    // TODO 数据转换JSON,如果出错直接不处理。
    try {
      const { type, data, callbackId } = JSON.parse(event.data)
      // type 不存在的话直接return
      if (!type) {
        return
      }
      if (type === 'replay' && callbackId && this.wsCallbacks[callbackId]) {
        this.wsCallbacks[callbackId](data)
        // 调用完就删除
        delete this.wsCallbacks[callbackId]
        return
      }
      this.em.emit(type, data)
    } catch (e) {}
  }
  public onclose(event: CloseEvent): void {
    // console.debug('关闭的回调', event)
    this.em.emit('ws-close', event)
  }
  public onerror(event: Event): void {
    // console.debug('error', event)
    // this.reconnect()
    this.em.emit('ws-error', event)
  }
  private initEventHandle(): void {
    this.ws.addEventListener('open', this.onopen.bind(this))
    this.ws.addEventListener('message', this.onmessage.bind(this))
    this.ws.addEventListener('close', this.onclose.bind(this))
    this.ws.addEventListener('error', this.onerror.bind(this))
    // this.em.on('replay', (data) => {
    //   // 统一做调用。
    // })
  }
}

export default Socket
