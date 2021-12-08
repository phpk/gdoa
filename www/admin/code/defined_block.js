
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


Blockly.Blocks['gd_foreach'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('name'), 'name')
            .appendField('.forEach(')
            .appendField(new Blockly.FieldTextInput('item'), 'args')
            .appendField(')=>');
        this.appendStatementInput('chain')
            .setCheck(null);
        //this.setOutput(true, null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
    }
};
Blockly.JavaScript['gd_foreach'] = function (block) {
    var text_name = block.getFieldValue('name');
    var text_args = block.getFieldValue('args');
    var statements_chain = Blockly.JavaScript.statementToCode(block, 'chain');
    var chain = statements_chain;
    var code = text_name + '.forEach(';
    code += text_args + ') => {\n' + chain + '}\n';
    return code;
};