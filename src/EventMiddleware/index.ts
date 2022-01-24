/*
 * @Author: 王嘉炀
 * @Date: 2020-03-29 21:35:54
 */

import EventHandler from './EventHandler'
export type TypeHandler = (data?: any, responseCallback?: (resdata?: any) => void) => void

class EventMiddleware {
  private eventHandler
  constructor() {
    this.eventHandler = new EventHandler()
  }
  public on(type: string, handler: TypeHandler, options?: any): void {
    // console.log('addEventListener', type, handler)
    this.eventHandler.addEventListener(type, handler, options)
  }

  public off(type: string, handler: TypeHandler, options?: any): void {
    // console.log('addEventListener', type, handler)
    this.eventHandler.removeEventListener(type, handler, options)
  }
  public emit(type: string, data?: any): void {
    // console.log(type,data);
    this.eventHandler.emit(type, data)
    // return this;
  }
  public has(type: string, handler?: TypeHandler, options?: any): boolean {
    return this.eventHandler.has(type, handler, options)
  }
}
export default EventMiddleware
