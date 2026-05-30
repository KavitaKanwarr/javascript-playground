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
