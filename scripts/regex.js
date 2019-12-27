var op1= "(2*34)+96/2*6-98";
var op2 = "4*(2*aggw*^^)*as.,,;";

//Regular expression to use
var regEx = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/g;

//Following will be true
/*
alert(regEx.test(op1));
//Following will be false
alert(regEx.test(op2));
alert(regEx.test('2*(3)'));
*/