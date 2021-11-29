const rootData = {
    "root": {
        "data": {
            "text": "根节点"
        },
        "children": []
    }
}

export default {
     ...rootData,
    "theme": {
        //"template": "minions",
        "template" : "classic",
        "config": {
            // 自定义配置...
        }
    },
    // "layout": "logicalStructure",
    "layout": "mindMap",
    // "layout": "catalogOrganization"
    // "layout": "organizationStructure"
}