// 对象转字符串，若value为null或undefine，直接过滤掉。
export function obj2string(params: Record<string, any>): string {
  const filterParams: Record<string, any> = {}
  const searchKeys = Object.keys(params).filter((key) => {
    // 这个条件是为了减少不必要的参数，一大堆查询参数看着难受。
    // 如果有特殊条件，比如就是要传空值，那么你就需要单独判断下。
    if (params[key] === null || params[key] === undefined) {
      return false
    }
    return true
  })
  searchKeys.forEach((key) => {
    filterParams[key] = params[key]
  })
  return JSON.stringify(filterParams)
}
