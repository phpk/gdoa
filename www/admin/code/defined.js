

Blockly.Blocks['gd_post'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("this.post(")
            .appendField(new Blockly.FieldTextInput(''), 'var')
            .appendField(")");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_post'] = function (block) {
    var text_var = block.getFieldValue('var');
    if (text_var !== '') {
        return ["this.post('" + text_var+"')", 0];
    } else {
        return ["this.post()", 0];
    } 
};
Blockly.Blocks['gd_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("this.get(")
            .appendField(new Blockly.FieldTextInput(''), 'var')
            .appendField(")");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_get'] = function (block) {
    var text_var = block.getFieldValue('var');
    if (text_var !== '') {
        return ["this.get('" + text_var + "')", 0];
    } else {
        return ["this.get()", 0];
    }
};
Blockly.Blocks['gd_success'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("return this.success(")
            .appendField(new Blockly.FieldTextInput(''), 'var')
            .appendField(")");
        //this.setOutput(true, 'String');
        this.setPreviousStatement(true, null);
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_success'] = function (block) {
    var text_var = block.getFieldValue('var');
    if (text_var !== '') {
        return "return this.success(" + text_var + ");\n";
    } else {
        return "return this.success();\n";
    }
};
Blockly.Blocks['gd_fail'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("return this.fail(")
            .appendField(new Blockly.FieldTextInput(''), 'var')
            .appendField(")");
        //this.setOutput(true, 'String');
        this.setPreviousStatement(true, null);
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_fail'] = function (block) {
    var text_var = block.getFieldValue('var');
    if (text_var !== '') {
        return "return this.fail(" + text_var + ");\n";
    } else {
        return "return this.fail();\n";
    }
};
Blockly.Blocks['gd_file'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("this.file(")
            .appendField(new Blockly.FieldTextInput(''), 'var')
            .appendField(")");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_file'] = function (block) {
    var text_var = block.getFieldValue('var');
    if (text_var !== '') {
        return ["this.file('" + text_var + "')", 0];
    } else {
        return ["this.file()", 0];
    }
};
