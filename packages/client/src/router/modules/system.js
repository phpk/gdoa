/**
 * system module
 */
export default {
  'views/system/permission/menu': () => import('@/views/system/permission/menu'),
  'views/system/permission/user': () => import('@/views/system/permission/user'),
  'views/system/permission/role': () => import('@/views/system/permission/role'),
  'views/system/monitor/online': () => import('@/views/system/monitor/online'),
  'views/system/monitor/login-log': () => import('@/views/system/monitor/login-log'),
  'views/system/monitor/serve': () => import('@/views/system/monitor/serve'),
  'views/system/schedule/task': () => import('@/views/system/schedule/task'),
  'views/system/schedule/log': () => import('@/views/system/schedule/log'),
  'views/system/param-config/config-list': () => import('@/views/system/param-config/config-list')
}
