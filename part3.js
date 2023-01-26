function calculateTerm(term, x) {
  // This function extracts the term from the equation and replaces the x with the value of the given x
  function extractTerm(equation) {
    let term = equation.split("=")[1];
    if (term.includes("x")) {
      term = term.replace(/x/g, x);
    }

    return term.trim();
  }

  // This function calculates the term

  if (term.includes("y") && x !== undefined) {
    let extractedterm = extractTerm(term);
    //using the extracted term, we calculate the value of y without passing the x since it is already replaced
    let value = calculateTerm(extractedterm);
    return value;
  } else {
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
      else if (
        char === "+" ||
        char === "-" ||
        char === "*" ||
        char === "/" ||
        char === "("
      ) {
        operators.push(char);
      }

      // If the character is a closed parenthesis, We calculate the term within the parentheses
      else if (char === ")") {
        let operator = operators.pop();
        while (operator !== "(") {
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
}

// this is the function where I perform the operations
function performOperation(value1, value2, operator) {
  switch (operator) {
    case "+":
      return parseInt(value1) + parseInt(value2);
    case "-":
      return parseInt(value1) - parseInt(value2);
    case "*":
      return parseInt(value1) * parseInt(value2);
    case "/":
      return parseInt(value1) / parseInt(value2);
  }
}

// defining the points for the chart

let points = [];
for (let i = 0; i < 10; i++) {
  points.push([i, calculateTerm("y = (3+x*2)/2", i)]);
}
//display the chart using the JSC library
JSC.chart("chartDiv", {
  debug: true,
  type: "line",
  title_label_text: "Line Series Types",
  legend_position: "inside bottom right",
  series: [
    {
      name: "Purchases",
      points: points,
    },
  ],
});
