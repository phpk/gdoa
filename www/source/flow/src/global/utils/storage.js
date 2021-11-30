/**
 * Created by OXOYO on 2020/6/29
 *
 * 本地存储
 */

const getKey = function (key, prefix, separator = '-') {
  return [prefix, key].join(separator)
}
export default {
  get (keys, prefix, separator) {
    if (!keys) {
      return
    }
    const handler = function (key) {
      const value = sessionStorage.getItem(key)
      if (!value) {
        return
      }
      const { type, data } = JSON.parse(value)
      let ret
      switch (type) {
        case 'string':
        case 'number':
        case 'boolean':
          ret = data
          break
        case 'object':
          ret = JSON.parse(data)
          break
        default:
          ret = data
      }
      return ret
    }
    if (Array.isArray(keys)) {
      const ret = {}
      keys.forEach(key => {
        key = getKey(key, prefix, separator)
        ret[key] = handler(key)
      })
      return ret
    } else if (typeof keys === 'object') {
      const ret = {}
      Object.entries(keys).forEach(item => {
        let aliasKey = item[0]
        const key = item[1]
        aliasKey = getKey(aliasKey, prefix, separator)
        ret[aliasKey] = handler(key)
      })
      return ret
    } else {
      return handler(getKey(keys, prefix, separator))
    }
  },
  set (key, data, prefix, separator) {
    if (!key) {
      return
    }
    key = getKey(key, prefix, separator)
    const type = typeof data
    let value
    switch (type) {
      case 'string':
      case 'number':
      case 'boolean':
        value = {
          type,
          data
        }
        break
      case 'object':
        value = {
          type,
          data: JSON.stringify(data)
        }
        break
      default:
        value = {
          type,
          data: data.hasOwnProperty('toString') && typeof data.toString === 'function' ? data.toString() : data + ''
        }
    }
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove (key, prefix, separator) {
    key = getKey(key, prefix, separator)
    sessionStorage.removeItem(key)
  },
  clear (prefix) {
    if (prefix) {
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } else {
      sessionStorage.clear()
    }
  }
}
