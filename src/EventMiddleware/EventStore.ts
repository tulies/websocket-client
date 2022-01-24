import { TypeHandler } from '.'

// Event对象冲突
interface EventItem {
  type: string
  handler?: TypeHandler
  options?: any
}
interface EventPool {
  [key: string]: EventItem[]
}

class EventStore {
  private eventPool: EventPool = {}
  put(data: EventItem): void {
    if (data === undefined) {
      return
    }
    if (!this.eventPool[data.type]) {
      this.eventPool[data.type] = []
    }
    this.eventPool[data.type].push(data)
    // console.log('this.eventPool', this.eventPool)
    // console.log('catch:',this.dataPool.events);
  }
  get(key: string): EventItem[] {
    return key === undefined ? [] : this.eventPool[key]
  }
  remove(data: EventItem): void {
    if (data === undefined) {
      return
    }
    if (!this.eventPool[data.type]) {
      return
    }
    // 如果options存在指定了id，则删除特定的id事件。
    if (data.handler) {
      const typeEvents: EventItem[] = []
      this.eventPool[data.type].forEach(function (value) {
        if (value.handler && value.handler === data.handler) {
          return true
        }
        typeEvents.push(value)
      })
      this.eventPool[data.type] = typeEvents
      // console.log('删除后', this.eventPool)
    } else {
      // 删除全部事件
      delete this.eventPool[data.type]
    }
  }
  has(data: EventItem): boolean {
    if (data === undefined) {
      return false
    }
    //  事件池子里存在则就返回true
    // TODO 暂时没有做具体的事件判断
    if (this.eventPool[data.type] && this.eventPool[data.type].length > 0) {
      return true
    }
    return false
  }
}

export default EventStore
