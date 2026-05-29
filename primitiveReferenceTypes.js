// ------------------------------ Primitive types: String, Number, BigInt, Boolean, Undefined, Null, and Symbol.
let a = "10"; // immutable - we cannot change it in original location but just can re-assign (not const) it as below
a = "hello"; // now 'a' will point to value "hello" and 10 will be orphaned and garbage collected

let student1 = "Faith";
let student2 = student1;
console.log(student1 === student2); // true compares by value
student2 = "Joy"; // if student2 was const this line would have given error or re-assignment in const variables
console.log(student1, student2);

// ------------------------------ Reference types: include Objects, Arrays, Functions, Maps, and Sets.
const original = {
  name: "Kelly",
  age: 2,
  subjects: ["French", "English", "German"],
  marks: {
    french: 50,
    english: 45,
    german: 46,
  },
  calculateAverage: () => {
    return marks.reduce((acc, curr) => (acc += curr), 0) / 3;
  },
  disabilities: undefined,
  dob: new Date(),
};

// ------------ Shallow Copy ---------------
const originalClone = original;
console.log(original === originalClone); // true compared by memory pointer

const shallowClone = { ...original }; // shallow
console.log(original === shallowClone); // false compared by memory pointer
shallowClone.name = "Leo"; // Only changes clone
shallowClone.subjects.shift(); // Updates BOTH because 'subjects' is a shared reference
console.log(original, shallowClone);

// ------------ Deep Copy ---------------
const deepCloneStringify = JSON.parse(JSON.stringify(original)); // Deep clone using JSON.parse(JSON.stringify()) is cheap but dangerous BECAUSE it deletes functions, undefined, symbols and corrupts Date objects into plain strings
console.log("deepCloneStringify - ", deepCloneStringify); // calculateAverage and disabilities will not be present in this, dob is converted into plain string

const deepClone = structuredClone(original); // Deep clone - gives error as original has a function
console.log(original === deepClone); // false compared by memory pointer
deepClone.name = "Poppy";
deepClone.subjects.push("Japanese");
deepClone.marks = {
  ...deepClone.marks,
  japanese: 56,
};
console.log(original, deepClone);
