<template>
    <div id="app">
        <header>
            <a href="http://qunee.com" style="display: inline-block;">
                <div class="q-logo" title="qunee.com"></div>
            </a><label style="color: #777; font-size: 1.1em;">Light High Efficiency Graph Component</label>
            <ul>
                <li><a href="http://qunee.com">Home</a></li>
                <li><a href="http://blog.qunee.com">Blog</a></li>
                <li><a href="http://doc.qunee.com">Doc</a></li>
                <li><a href="http://demo.qunee.com">Demo</a></li>
                <li class="new"><a href="http://map.qunee.com/">Map</a></li>
                <li class="active"><a href="http://demo.qunee.com/editor/">Editor</a></li>
                <li><a href="http://demo.qunee.com/svg2canvas/">SVG2Canvas</a></li>
            </ul>
        </header>
        <GraphEditor id="editor" ref="editor"/>
        <footer id="footer" role="contentinfo">
            <a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备17006876号</a>
            Copyright © 2014 - 2021 上海酷利软件有限公司 Shanghai Kuli Software Co.,Ltd. All right reserved. Email: <span style="color: #2898E0;">support#qunee
            .com</span>. 仓库: <a href="https://github.com/qunee/graph.editor_vue"><b>graph.editor_vue</b></a>
        </footer>
    </div>
</template>

<script>
import GraphEditor from "@/common/vue/GraphEditor";
export default {
    components: {
        GraphEditor
    },
    mounted() {
        let editor = this.$refs.editor;
        initDemo(editor, 'data/topo2.json');
    }
}

import './app.css';
import './common/css/global.css';
import {initDemo} from "./js/main.js";

</script>