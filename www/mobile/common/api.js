const { http } = uni.$u
// 获取菜单
export const fetchMenu = (params, config = {}) => 
http.post('menu/list', params, config)
