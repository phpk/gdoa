Blockly.Blocks['gd_select'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(".select()");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询');
    }
};
Blockly.JavaScript['gd_select'] = function () {
    return [".select()\n", 0];
};
Blockly.Blocks['gd_find'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(".find()");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_find'] = function () {
    return [".find()\n", 0];
};
Blockly.Blocks['gd_add'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(".add(")
            .appendField(new Blockly.FieldTextInput('data'), 'var')
            .appendField(")");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('添加数据');
    }
};
Blockly.JavaScript['gd_add'] = function (block) {
    var text_var = block.getFieldValue('var');
    return [".add(" + text_var + ")\n", 0];
};
Blockly.Blocks['gd_addmany'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(".addMany(")
            .appendField(new Blockly.FieldTextInput('data'), 'var')
            .appendField(new Blockly.FieldDropdown([['null', 'null'], ['ignore', 'ignore'], ['replace', 'replace']]), 'add_type')
            .appendField(")");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('添加数据');
    }
};
Blockly.JavaScript['gd_addmany'] = function (block) {
    var text_var = block.getFieldValue('var');
    var add_type = block.getFieldValue('add_type');
    console.log(add_type)
    if (add_type == 'ignore' || add_type == 'replace') {
        return [".addMany(" + text_var + ", {" + add_type + ":true})\n", 0];
    } else {

        return [".addMany(" + text_var + ")\n", 0];
    }

};

Blockly.Blocks['gd_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(".delete()");
        this.setOutput(true, 'String');
        this.setColour(90);
        this.setTooltip('查询单个数据');
    }
};
Blockly.JavaScript['gd_delete'] = function () {
    return [".delete()\n", 0];
};
Blockly.Blocks['gd_where'] = {
    init: function () {
        this.appendValueInput('val')
            .setCheck('String')
            .appendField(".where(")
            .appendField(new Blockly.FieldTextInput('sqlObject'), 'var')
            .appendField(")");
        //this.appendDummyInput()
        //    .appendField(")");
        //this.setInputsInline(true);
        //this.appendField(")");
        //this.setMutator(new Blockly.Mutator(['variables_get']));
        this.setOutput(true, 'String');
        //this.setNextStatement(true, null);
        //this.setOutput(true, );
        this.setColour(90);
        this.setTooltip('模型查询');
        //this.setOutput(true);
    }
};
Blockly.JavaScript['gd_where'] = function (block) {
    var text_var = block.getFieldValue('var');
    var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
    if (value_val === '') {
        return [".where(" + text_var + ")", 0];
    } else {
        return [".where(" + text_var + ")" + value_val, 0];
    }
};
Blockly.Blocks['gd_model'] = {
    init: function () {
        this.appendValueInput('val')
            .setCheck('String')
            .appendField("this.model(")
            .appendField(new Blockly.FieldTextInput('modelName'), 'var')
            .appendField(")");
        this.setOutput(true, 'String');
        //this.setNextStatement(true, null);
        //this.setOutput(true, );
        this.setColour(90);
        this.setTooltip('模型');
        //this.setOutput(true);
    }
};
Blockly.JavaScript['gd_model'] = function (block) {
    var text_var = block.getFieldValue('var');
    var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
    if (value_val === '') {
        return ["this.model('" + text_var + "')", 0];
    } else {
        return ["this.model('" + text_var + "')" + value_val, 0];
    }

};
