exports.calculate = function(expression) {
  calculator = evaluator(expression);
  return calculator();
}

/**
 * 
 * @param {*} expression 
 * @returns the numerical value of the exectued expression
 */
var evaluator = function(expression) {
  const expressionStack = expression.split(" ");
  const numStack = [];

  const isOperator=(variable) => {
      return (variable === "*" || variable === "/" || variable === "+" || variable === "-");
  }

  const calculator = (operator, val1, val2) =>{
      if (operator === "*") {
          return(val1 * val2);
      } else if (operator === "/") {
          if (val2 === 0) {
              throw new Error("Tried to divide by 0");
          }
          return(val1 / val2);
      } else if (operator === "+") {
          return(val1 + val2);
      }
      return(val1 - val2);
  }

  return function(){
    while(expressionStack.length!==0) {
        let val = expressionStack.pop();
        if (!isOperator(val))
            numStack.push(parseInt(val));
        else {
            let val1 = numStack.pop();
            if (numStack.length === 0) {
              throw new Error("Not Enough Numbers");
            }
            let val2 = numStack.pop();
            numStack.push(calculator(val, val1, val2));
        }
    }

    return numStack.pop();
    }
}