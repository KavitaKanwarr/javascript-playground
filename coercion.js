console.log("'5' == 5 -", "5" == 5); // true  (String converted to Number)
console.log("'5' === 5 -", "5" === 5); // false (Different types: String vs. Number)

console.log("1 == true -", 1 == true); // true  (Boolean true converted to Number 1)
console.log("1 === true -", 1 === true); // false (Different types: Number vs. Boolean)

console.log('0 == ""', 0 == ""); // true  (Both convert to the number 0)
console.log('0 === ""', 0 === ""); // false (Number vs. String)

console.log("[] == false", [] == false); // true
if ([]) true;
else false;

console.log("0 == []", 0 == []); // true  (Empty array converts to empty string, then to 0)
console.log("0 === []", 0 === []); // false (Number vs. Object/Array)

console.log("'' == []", "" == []); // true  (Empty array converts to empty string "")
console.log("'' === []", "" === []); // false (String vs. Object/Array)

console.log("null == undefined", null == undefined); // true  (Built-in language exception)
console.log("null === undefined", null === undefined); // false (Different types: Object-like vs. Undefined)

console.log("null == 0", null == 0); // false (null does NOT convert to 0 for == checks)
console.log("undefined == 0", undefined == 0); // false (undefined does NOT convert to 0)

console.log("[1, 2] == [1, 2]", [1, 2] == [1, 2]); // false (Different spots in memory)
console.log("[1, 2] === [1, 2]", [1, 2] === [1, 2]); // false (Still different spots in memory)

const a = [1, 2];
const b = a;
console.log("a == b", a == b); // true  (Pointing to the exact same memory slot)
console.log("a === b", a === b); // true  (Pointing to the exact same memory slot)

console.log("NaN == NaN", NaN == NaN); // false
console.log("NaN === NaN", NaN === NaN); // false
