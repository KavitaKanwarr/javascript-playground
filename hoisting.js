// --------------------------------------- var, let, const ---------------------------------------------

// ------ the declaration is hoisted not the initialization so initialized with undefined at memory allocation phase
console.log("varTest - ", varTest);

// ------ the declaration is hoisted but remains uninitialized. Before their initialization these variables will be in temporal dead zone meaning they will throw a reference error
// console.log("letTest - ", letTest);
// console.log("constTest - ", constTest);

var varTest = "varTest"; // function scope
let letTest = "letTest"; // block scope
// const withoutAssignment; // not allowed and will give missing initialiser error
const constTest = "constTest"; // block scope

console.log("varTest - ", varTest);
console.log("letTest - ", letTest);
console.log("constTest - ", constTest);

// ---------------------------------------- Functions --------------------------------------------

normalFunction();

// Function declarations
function normalFunction() {
  console.log("Normal Function");
}

// function expressions

functionVar(); // the variable is hoisted as undefined, leading to a TypeError because undefined is not a function.

var functionVar = () => {
  console.log("Function statement using var");
};

functionLet(); // it throws a ReferenceError due to the Temporal Dead Zone (TDZ).

let functionLet = () => {
  console.log("Function statement using let");
};

functionConst(); // it throws a ReferenceError due to the Temporal Dead Zone (TDZ).javascript

const functionConst = () => {
  console.log("Function statement using const");
};
