Blockly.Blocks['gd_awaits'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck(null)
            .appendField('await');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //this.setOutput(true, null);
        this.setColour(90);
        this.setTooltip('');
        this.setTooltip('异步指令');
        // this.appendValueInput('VALUE')
        //     .setCheck('String')
        //     .appendField('await');
        // this.setOutput(true, 'Number');
        // this.setColour(160);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        // this.setTooltip('异步指令');
    }
};
Blockly.JavaScript['gd_awaits'] = function (block) {
    //return [code, Blockly.JavaScript.ORDER_NONE];
    return ' await ';
};
Blockly.Blocks['gd_var'] = {
    init: function () {
        this.appendValueInput('val')
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([['let', 'let'], ['var', 'var'], ['const', 'const']]), 'var_type')
            .appendField(new Blockly.FieldTextInput('data'), 'var');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(90);
        this.setTooltip('');
        this.setHelpUrl('http://www.godo.im/');
    }
};
Blockly.JavaScript['gd_var'] = function (block) {
    var var_type = block.getFieldValue('var_type');
    var text_var = block.getFieldValue('var');
    var value_val = Blockly.JavaScript.valueToCode(block, 'val', Blockly.JavaScript.ORDER_ATOMIC);
    var code = var_type + ' ' + text_var;
    if (value_val === '') {
        code += '\n';
    } else {
        code += ' = ' + value_val + ';\n';
    }
    //return [code, Blockly.JavaScript.ORDER_NONE];
    return code;
};
Blockly.Blocks['gd_try_catch'] = {
    init: function () {
        this.appendStatementInput('try')
            .setCheck(null)
            .appendField('try');
        this.appendStatementInput('catch')
            .setCheck(null)
            .appendField('catch')
            .appendField(new Blockly.FieldTextInput('e'), 'parameter');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
Blockly.JavaScript['gd_try_catch'] = function (block) {
    var statement_try = Blockly.JavaScript.statementToCode(block, 'try');
    var statement_catch = Blockly.JavaScript.statementToCode(block, 'catch');
    //var statement_finally = Blockly.JavaScript.statementToCode(block, 'finally');
    var text_parameter = block.getFieldValue('parameter');
    var code = 'try{\n' + statement_try + '\n} catch(' + text_parameter + '){\n' + statement_catch + '\n} \n';
    return code;
};


Blockly.Blocks['gd_function'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['let', 'let'], ['var', 'var'], ['const', 'const']]), 'var_type')
            .appendField(new Blockly.FieldTextInput('name'), 'name')
            .appendField('=(')
            .appendField(new Blockly.FieldTextInput('arg1, arg2, etc'), 'args')
            .appendField(')=>');
        this.appendStatementInput('chain')
            .setCheck(null);
        //this.setOutput(true, null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
Blockly.JavaScript['gd_function'] = function (block) {
    var text_name = block.getFieldValue('name');
    var var_type = block.getFieldValue('var_type');
    var function_type = block.getFieldValue('function_type');
    var text_args = block.getFieldValue('args');
    var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
    var chain = statements_chain;
    var code = var_type + ' ' + text_name + ' = (';
    code += text_args + ') => {\n' + chain + '}\n';
    return code;
};