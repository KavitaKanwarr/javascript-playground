function multiply(x, y) {
  console.log(x * y);
}

// -------------using bind -------------------
const multipleByTwo = multiply.bind(this, 2);
multipleByTwo(5);
multipleByTwo(10);

// -------------using closures -------------------
function multiply10(x) {
  return function (y) {
    console.log(x * y);
  };
}

const multipleByThree = multiply10(10);
multipleByThree(7);
multipleByThree(8);
