/* 分页部分 */
let data = []
// 渲染分页组件
function renderPagination (index, ref) { // 第一个参数当前组件下标（即：Controls.ControlList）， 第二个参数为渲染根元素
  let pagination = document.getElementById(ref)
  let page = `<div class="visual-pagination">
    <span>共 ${pageData.totalCount} 条</span>
    <select class="visual-pagination-select" onchange="perPage(event, ${index})" >
      <option value="10" ${pageData.pageSize === 10 ? 'selected': '' }>10条/页</option>
      <option value="30" ${pageData.pageSize === 30 ? 'selected': '' }>30条/页</option>
      <option value="50" ${pageData.pageSize === 50 ? 'selected': '' }>50条/页</option>
      <option value="80" ${pageData.pageSize === 80 ? 'selected': '' }>80条/页</option>
    </select>
    <button type="button" onclick="nextPage(event, ${index})" id="pager-left-btn" class="visual-pagination-button" ${pageData.pageIndex <= 1 ? 'disabled' : ''}><i class="iconfont iconzuojiantou"></i></button>
    <ul class="visual-pager" id="visual-pager" onclick="changePage(event, ${index})" >
    </ul>
    <button type="button" onclick="prevPage(event, ${index})" id="pager-right-btn"  class="visual-pagination-button"  ${pageData.pageIndex === pageData.totalPage || pageData.pageIndex <= 0 ? 'disabled' : ''}><i class="iconfont iconyoujiantou_huaban"></i></button>
    <span>前往</span>
    <input type="text" class="pager-input" id="pager-input" autocomplete="off" onblur="jumpPage(event, ${index})" value="${pageData.pageIndex}" >
    <span>页</span>
  </div>`
  pagination.innerHTML = page
}
// 渲染分页页码
function renderLis () {
  let lis = ``
  let cur = pageData.pageIndex - 1
  let pager = document.getElementById('visual-pager')
  let items = Math.ceil(pageData.totalCount / pageData.pageSize )
  for (var i = 0; i <= items - 1; i++) {
    if (i === cur) {
      lis += `<li class="activePage" >${i + 1}</li>`
    } else if (cur <= 3) { //pageIndex 小于等于4 处于页首时，
      if (i <= 5) {
        lis += `<li >${i + 1}</li>`
      } else if (i === 6) {
        lis += `<li >...</li>`
      } else if ( i > 6 && i < pageData.totalPage - 1) {
        lis += ``
      } else if (i === pageData.totalPage - 1) {
        lis += `<li >${i + 1}</li>`
      } else {
        lis += `<li >${i + 1}</li>`
      }
    } else if (cur >=4 && cur <= pageData.totalPage - 5) {   // pageIndex 处于页面中间
      if (i === 0) {
        lis += `<li >${i + 1}</li>`
      } else if (i <= cur && i >= cur - 2) {
        lis += `<li >${i + 1}</li>`
      } else if (i >= cur && i <= cur + 2) {
        lis += `<li >${i + 1}</li>`
      } else if (i === pageData.totalPage - 1) {
        lis += `<li >${i + 1}</li>`
      } else if (i <= cur && i === cur - 3) {
        lis += `<li >...</li>`
      } else if (i >= cur && i === cur + 3) {
        lis += `<li >...</li>`
      } else {
        lis += ``
      }
    } else {  //pageIndex 处于页尾时
      if (i === 0) {
        lis += `<li >${i + 1}</li>`
      } else if (i === 1) {
        lis += `<li >...</li>`
      } else if (i > 1 && i < pageData.totalPage - 6) {
        lis += ``
      } else {
        lis += `<li >${i + 1}</li>`
      }
    }
    //   lis += `<li >${i + 1}</li>`
    // }
  }
  pager.innerHTML = lis
}
// 设置左右按钮禁用
function setDisable () {
  let left = document.getElementById('pager-left-btn')
  let right = document.getElementById('pager-right-btn')
  if (pageData.pageIndex <= 1) {
    left.setAttribute('disabled', true)
  } else {
    left.removeAttribute('disabled')
  }
  if (pageData.pageIndex === pageData.totalPage || pageData.pageIndex <= 0) {
    right.setAttribute('disabled', true)
  } else {
    right.removeAttribute('disabled')
  }
}
// 下一页
function nextPage (e, index) {
  let pagerInput = document.getElementById('pager-input')
  pageData.pageIndex--
  changePage(e, index, 'prev')
  pagerInput.value = pageData.pageIndex
  addActice ()
}
// 上一页
function prevPage (e, index) {
  let pagerInput = document.getElementById('pager-input')
  pageData.pageIndex++
  changePage(e, index, 'prev')
  pagerInput.value = pageData.pageIndex
  addActice ()
}
// 页面跳转
function jumpPage (e, index) {
  let value = null
  if (e.target.value <= pageData.totalPage) {
    value = Number(e.target.value) 
  } else {
    e.target.value = pageData.totalPage
    value = Number(pageData.totalPage)
  }
  if (e.target.value <= 0) {
    e.target.value = 1
    value = 1
  }
  
  pageData.pageIndex = value
  changePage(e, index, 'prev')
  addActice ()
}
// 设置当前页高亮
function addActice () {
  let pager = document.getElementById('visual-pager')
  let items = [...pager.children]
  items.forEach((d,i) => {
    if (Number(d.innerText) === Number(pageData.pageIndex)) {
      items[i].classList.add('activePage')
    } else {
      items[i].classList.remove('activePage')
    }
  })
}
// 翻页 表格显示条数
function homePage () {
  if(pageData.pageIndex == 1){
    data = tableData.slice(0, pageData.pageSize)
  }else{
    data = tableData.slice((pageData.pageIndex - 1)* pageData.pageSize,pageData.pageSize * pageData.pageIndex)
  }
  return data
}
// 选择每页显示多少条数据
async function perPage (e, index) {
  let tbody = document.getElementById('popup-tbody')
  let pagerInput = document.getElementById('pager-input')
  let html = ``
  pageData.pageIndex = 1
  pageData.pageSize = Number(e.target.value)
  pagerInput.value =  pageData.pageIndex
  pageData.totalPage = Math.ceil(pageData.totalCount / pageData.pageSize )
  await getTableData(index)
  setDisable ()
}
// 页码点击
async function changePage (e, index, type) {
  let tbody = document.getElementById('popup-tbody')
  let pagerInput = document.getElementById('pager-input')
  let html = ``
  if (!type) {
    if (e.target.innerText == '...') {
      pageData.pageIndex = Number(e.target.previousElementSibling.innerText) + 1
    } else {
      pageData.pageIndex = Number(e.target.innerText)
    }
  }
  await getTableData(index)
  pagerInput.value =  pageData.pageIndex
  renderLis()
  setDisable ()
}