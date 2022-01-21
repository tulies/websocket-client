import Socket from './Socket'

class WebSocketClient {
  private socket: Socket
  constructor(url: string) {
    this.socket = new Socket(url)
  }
  // 消息监听
  public on(type: string, fn: (resp?: any) => any): void {
    this.socket.on(type, fn)
  }
  // 消息广播
  public emit(type: string, data: any, fn?: (resp?: any) => any): void {
    this.socket.emit(type, data, fn)
  }
  //   // 开启链接
  //   public open(type: string, fn: (resp?: any) => any): void {}

  // 关闭连接
  public close(): void {
    // 调用close
    this.socket.close()
  }

  // 重新连接
  public reconnect(): void {
    this.socket.reconnect()
  }
}

export default WebSocketClient
