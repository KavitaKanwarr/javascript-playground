"use strict";

console.log(this); // window

function globalFunc() {
  console.log(this); // window in non-strict mode (because of this substitution which means if the value of this is null or undefined then window will be assigned as value of this) while undefined in strict mode
}

globalFunc(); // window in non-strict mode and undefined in strict mode
window.globalFunc(); // window

// ----------------------------Nethods as normal function------------------------------

const thisObj = {
  age: 19,
  canVote: function (varName) {
    console.log(
      "obj1 - " + varName + " ",
      this,
      this?.age && this?.age >= 18 ? "can vote" : "cannot vote"
    );
  },
};

// thisObj.canVote() does not mean "call the function stored inside thisObj". This means call the function with thisObj as its this value
thisObj.canVote("direct call"); // this points to thisObj
const fun = thisObj.canVote; // this reference will be gone and window in non-strict mode and undefined in strict mode
fun("fun");
// in order to preserve this keyword like above call we need to bind this keyword as below
const funn = thisObj.canVote.bind(thisObj); // this reference will be preserved
funn("funn");

// ----------------------------Nethods as Arrow function------------------------------

const thisObject2 = {
  age: 19,
  canVote: (varName) => {
    console.log(
      "thisObject2 - " + varName + " ",
      this,
      this?.age && this?.age >= 18 ? "can vote" : "cannot vote"
    );
  },
};

//  this points to window in all cases because arrow function's this keyword points to its lexical env both in strict and non-strict mode
thisObject2.canVote("direct call");
const fun2 = thisObject2.canVote;
fun2("fun");
const funn2 = thisObject2.canVote.bind(thisObject2);
funn2("funn");

// ----------------------------Methods as mixed functions------------------------------

const thisObj3 = {
  language: "English",
  normalFunc: function () {
    return function () {
      console.log("thisObj3 (normalFunc) - ", this);
    };
  },
  arrowFunc: () => {
    return () => {
      console.log("thisObj3 (arrowFunc) - ", this);
    };
  },
  normalFuncWrap: function () {
    return () => {
      console.log("thisObj3 (normalFuncWrap) - ", this);
    };
  },
  arrowFuncWrap: () => {
    return function () {
      console.log("thisObj3 (arrowFuncWrap) - ", this);
    };
  },
};

thisObj3.normalFunc()();
thisObj3.arrowFunc()();
thisObj3.normalFuncWrap()();
thisObj3.arrowFuncWrap()();

// same output as above
const normalFuncObj = thisObj3.normalFunc();
normalFuncObj();
const arrowFuncObj = thisObj3.arrowFunc();
arrowFuncObj();
const normalFuncWrapObj = thisObj3.normalFuncWrap();
normalFuncWrapObj();
const arrowFuncWrapObj = thisObj3.arrowFuncWrap();
arrowFuncWrapObj();

const normalFuncObjUsingBind = thisObj3.normalFunc().bind(thisObj3);
normalFuncObj();
const arrowFuncObjUsingBind = thisObj3.arrowFunc().bind(thisObj3);
arrowFuncObj();
const normalFuncWrapObjUsingBind = thisObj3.normalFuncWrap().bind(thisObj3);
normalFuncWrapObj();
const arrowFuncWrapObjUsingBind = thisObj3.arrowFuncWrap().bind(thisObj3);
arrowFuncWrapObj();

// ----------------------------Call, Apply & Bind methods------------------------------

const tempObj = {
  firstName: "Jack",
  lastName: "Hill",
};
const tempObj2 = {
  firstName: "Milly",
  lastName: "Fry",
};

function printFullName(age, profession) {
  console.log(
    age +
      " years old " +
      this.firstName +
      " " +
      this.lastName +
      " is a " +
      profession
  );
}

printFullName.call(tempObj, 12, "student");
printFullName.call(tempObj2, 45, "Teacher");

printFullName.apply(tempObj, [12, "student"]); // same as call just send arguments as an array
printFullName.apply(tempObj2, [45, "Teacher"]);

// binds function and returns that func, need to be called later
const printFullNameViaBind1 = printFullName.bind(tempObj, 12, "student");
printFullNameViaBind1();
const printFullNameViaBind2 = printFullName.bind(tempObj2, 45);
printFullNameViaBind2("Teacher");

// ----------------------------Pollyfill------------------------------

// create own bind method and should behave same as original bind method

Function.prototype.customBind = function (...args) {
  // spreading args because we want to support parameters when called like printFullNameViaCustomBind, in that case first one is the main object and remaining behaves as parameters to the function
  const obj = this; // points to the function on which customBind is attached, in our case it is printFullNameInCustomBind
  const parameters = args.slice(1); // get remaining paramteres if called like printFullNameViaCustomBind
  return function (...params) {
    // to fetch paramteres when passed like printFullNameViaCustomBind2
    // obj.call(args); // when there's a single parameter in function but here we are passing multiple - age and profession
    obj.apply(args[0], [...parameters, ...params]);
  };
};
function printFullNameInCustomBind(age, profession) {
  console.log(
    age +
      " years old " +
      this.firstName +
      " " +
      this.lastName +
      " is a " +
      profession
  );
}
const boundObject = {
  firstName: "Leo",
  lastName: "frappe",
};

const printFullNameViaCustomBind =
  printFullNameInCustomBind.customBind(boundObject);
printFullNameViaCustomBind(12, "student");
const printFullNameViaCustomBind2 = printFullNameInCustomBind.customBind(
  boundObject,
  23,
  "Engineer"
);
printFullNameViaCustomBind2();
