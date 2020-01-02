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

 
const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

function test(s) {
  console.log("%s is valid? %s", s, re.test(s));
}

// valid
test(" 1 ");
test("1 + 2");
test(" 1 * 2 * 3 ");
test("-1 * 2 - -3");
test("-1 * 2 - -3e4");
test("-1 * 2 - -3.5E6");

// invalid
test("1 +");
test("1 + foo");

test(op1);
test(op2);
test("2*(3)");