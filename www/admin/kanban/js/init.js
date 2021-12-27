layui.use(['layer', 'dropdown'], function () {
    let $ = layui.$,
        layer = layui.layer,
        dropdown = layui.dropdown,
        id = _req('id'),
        kanbanId = 0,
        kanbanClsId = 0,
        kanban,
        dropEl,
        taskData = [];
    let dropDownOptions = {
        elem: '.kb-header-i',
        trigger: 'hover',
        data: [{
            title: '添加',
            id: 1
        },
        {
            title: '编辑',
            id: 2
        },
        {
            title: '删除',
            id: 3
        },],
        ready: function (elemPanel, elem) {
            //console.log(elem)
            dropEl = elem;
        },
        click: (data, othis) => {
            //console.log(data);
            let boardId = $(dropEl).attr('data-id');
            if (data.id == 1) {
                addEl(boardId)
            }
        }
    };
    if (!id) {
        kanban = new jKanban({
            element: "#myKanban",
            gutter: "10px",
            widthBoard: "300px",
            itemHandleOptions: {
                enabled: true,
            },
            boards: []
        });
        dropdown.render(dropDownOptions)
    } else {
        $.get('/admin/kanban/js/data.json', res => {
            if (res.code == 0) {
                kanban = new jKanban({
                    element: "#myKanban",
                    gutter: "10px",
                    widthBoard: "300px",
                    itemHandleOptions: {
                        enabled: true,
                    },
                    boards: res.data.list
                });
                taskData = res.data.list;
                initParams();
                dropdown.render(dropDownOptions)
            }
        })
    }
    let initParams = () => {
        if (taskData.length > 0) {

        }
    }
    let addEl = (boardId) => {
        layer.prompt({
            formType: 0,
            value: '',
            title: '请输入任务名字',
            area: ['300px', '35px']
        }, function (value, index, elem) {
            if (value && value != '') {
                kanban.addElement(boardId, {
                    title: value
                });
                layer.close(index);
            }

        });
    }


    $('#addKanban').on('click', e => {
        layer.prompt({
            formType: 0,
            value: '',
            title: '请输入看板名字',
            area: ['300px', '35px']
        }, function (value, index, elem) {
            if (value && value != '') {
                kanbanId++;
                kanbanClsId++;
                if (kanbanClsId > 8) {
                    kanbanClsId = 1;
                }
                kanban.addBoards([
                    {
                        id: 'taskboard_' + kanbanId,
                        title: value,
                        class: 'kb' + kanbanClsId,
                        item: []
                    }
                ]);
                dropdown.render(dropDownOptions)
                layer.close(index);
            }

        });

    })


})