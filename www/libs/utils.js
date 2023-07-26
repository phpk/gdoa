const _msg = (msg) => {
    let m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "font-size: .9rem;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;text-align: center;z-index:20211223";
    document.body.appendChild(m);
    setTimeout(() => {
        let d = 0.5;
        m.style.opacity = '0';
        setTimeout( () => { document.body.removeChild(m) }, d * 1000);
    }, 2000);
}
const _ajax = (url, method = "GET", params, callback) => {
    // 创建XMLHttpRequest对象  
    let createRequest = function () {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");// IE6以上版本  
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");// IE6以下版本  
            } catch (e) {
                try {
                    xmlhttp = new XMLHttpRequest();
                    // if (xmlhttp.overrideMimeType) {
                    //     xmlhttp.overrideMimeType("text/xml");
                    // }
                } catch (e) {
                    _msg("您的浏览器不支持Ajax");
                }
            }
        }
        return xmlhttp;
    };
        // 格式化请求参数  
    let formateParameters = function () {
        let paramsArray = [];
        //console.log(params)
        for (let pro in params) {
            var paramValue = params[pro];
            paramsArray.push(pro + "=" + paramValue);
        }
        return paramsArray.join("&");
    };

    // 发送Ajax请求  
    
    // 创建XMLHttpRequest对象  
    let xmlhttp = createRequest();

        // 设置回调函数  
    xmlhttp.onreadystatechange = function () {
        let returnValue = '';
        try {
            //console.log(xmlhttp)
            if (xmlhttp.readyState == 4) {
                //console.log(xmlhttp)
                let jsonText = xmlhttp.responseText || xmlhttp.response;
                //console.log(jsonText)
                if (jsonText && xmlhttp.status == 200) {
                    //returnValue = eval("(" + jsonText + ")");
                    returnValue = JSON.parse(jsonText);
                }
                callback(returnValue);
                
            } 
        } catch (e) {
            console.log(e.message)
        }
        
    };

    // 格式化参数  
    let formateParams = formateParameters();
    //console.log(formateParams)
    // 请求的方式  
    url = apiUrl + url;

    if ("GET" === method.toUpperCase() && params != '') {
        url += "?" + formateParams;
    }

    // 建立连接  
    xmlhttp.open(method, url, true);
    //xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.setRequestHeader(TOKEN_NAME, getToken());
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    if ("GET" === method.toUpperCase()) {
        xmlhttp.send(null);
    }
    
    else if ("POST" === method.toUpperCase()) {
        // 如果是POST提交，设置请求头信息  
        
        xmlhttp.send(formateParams);
    }
    
    
}
const __post = (url, params, callback) => {
    _ajax(url, "POST", params, callback)
}
const __get = (url, callback) => {
    _ajax(url, "GET", '', callback)
}