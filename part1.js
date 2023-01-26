function calculateTerm(term) {
    let values = [];
    let operators = [];
  
    for (let i = 0; i < term.length; i++) {
      let char = term[i];
  
      // If the character is a digit, We push it to the values array
      if (!isNaN(char)) {
        let num = char;
        while (!isNaN(term[i + 1])) {
          num += term[i + 1];
          i++;
        }
        values.push(num);
      }
  
      // If the character is an operator, We push it to the operators array
      else if (char === '+' || char === '-' || char === '*' || char === '/' || char === '(') {
        operators.push(char);
      }
  
      // If the character is a closed parenthesis, We calculate the term within the parentheses
      else if (char === ')') {
        let operator = operators.pop();
        while (operator !== '(') {
          let value2 = values.pop();
          let value1 = values.pop();
          values.push(performOperation(value1, value2, operator));
          operator = operators.pop();
        }
      }
    }
  
    // performe the remaining operations
    while (operators.length > 0) {
      let operator = operators.pop();
      let value2 = values.pop();
      let value1 = values.pop();
      values.push(performOperation(value1, value2, operator));
    }
  
    // Return the final value
    return values[0];
  }
  
  // this is the function where I perform the operations
  function performOperation(value1, value2, operator) {
    switch (operator) {
      case '+':
        return parseInt(value1) + parseInt(value2);
      case '-':
        return parseInt(value1) - parseInt(value2);
      case '*':
        return parseInt(value1) * parseInt(value2);
      case '/':
        return parseInt(value1) / parseInt(value2);
    }
  }
  
  console.log(calculateTerm("(3+3)*2/2"));
  console.log(calculateTerm("(14/3)*2"));
  console.log(calculateTerm("2*2/2"));
  console.log(calculateTerm("(3+3*2)/2"));


  