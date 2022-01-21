class Socket {
  private url: string
  private ws: WebSocket
  constructor(url: string) {
    this.url = url
    this.ws = new WebSocket(this.url)
    // 初始化监听
    this.initEventHandle()
  }

  // 消息监听
  public on(type: string, fn: (resp?: any) => any): void {}

  // 消息广播
  public emit(type: string, data: any, fn?: (resp?: any) => any): void {
    // this.ws.send({
    //   type: '',
    //   data: '',
    //   fn: () => {}
    // })
  }

  //   // 开启链接
  //   public open(type: string, fn: (resp?: any) => any): void {}

  // 关闭连接
  public close(): void {
    // 调用close
    this.ws.close()
  }

  // 重新连接
  public reconnect(): void {
    // 如果websock状态为 CONNECTING 或 OPEN
    if (this.ws.readyState === this.ws.CONNECTING || this.ws.readyState === this.ws.OPEN) {
      console.log('正在连接中不要捉急')
      return
    }
    // 否则就重新new一下
    this.ws = new WebSocket(this.url)
    this.initEventHandle()
  }

  private initEventHandle(): void {
    this.ws.addEventListener('open', this.onopen)
    this.ws.addEventListener('message', this.onmessage)
    this.ws.addEventListener('close', this.onclose)
    this.ws.addEventListener('error', this.onerror)
  }
  private onopen(event: Event): void {
    console.log('连接成功的回调', event)
  }
  private onmessage(event: MessageEvent): void {
    console.log('广播消息监听到的数据', event)
  }
  private onclose(event: CloseEvent): void {
    console.log('关闭的回调', event)
    // TODO 关闭的时候需要关闭一些事件回调
  }
  private onerror(event: Event): void {
    console.log('error', event)
    // TODO 连接错误的时候，再进行一次重新连接,需要做
    // this.reconnect()
  }
}

export default Socket
