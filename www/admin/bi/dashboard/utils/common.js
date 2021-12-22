// 防抖
function debounce (fn, delay) {
  var time = delay || 1000
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, time)
  }
}

// 节流
function throttle (fn, interval) {
  var last
  var timer
  var time = interval || 2000
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < time) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, time)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}