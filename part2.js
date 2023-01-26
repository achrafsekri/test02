const FindPetersDigit = (num) => {
  // this function will check if the number is monotone
  const checkMonotone = (number) => {
    //if number is a single digit, it is monotone
    if (number <= 9) {
      return true;
    }
    //everytime we iterate we remove a digit untill we reach the last digit
    let currentDigit = number % 10;
    while (number) {
      const next = Math.floor(number / 10);
      const nextDigit = next % 10;
      if (currentDigit >= nextDigit) {
        currentDigit = nextDigit;
        number = next;
      } else {
        return false;
      }
    }
    return true;
  };

  if (checkMonotone(num)) {
    return num;
  }

  //we split the number into digits
  const digits = num
    .toString()
    .split("")
    .map((x) => Number(x));
  //we iterate over the digits and try to find the biggest monotone number
  return digits.reduce((acc, num, index) => {
    if (num >= 1) {
      const current = parseInt(
        digits.slice(0, index).join("") +
          num -
          1 +
          new Array(digits.length - index - 1).fill("9").join(""),
        10
      );
      //if the number is monotone, we check if it is bigger than the previous one
      if (checkMonotone(current)) {
        return Math.max(acc, current);
      }
    }
    return acc;
  }, 0);
};
console.log(FindPetersDigit(33245));
