// // Notes:
// // 1. await doesn't block the main thread , it only pauses/suspends the async function. Meaning, every other piece of code will run regardless
// // 2. await always returns promise whether explicitly return as new Promise or just normal text (wrap in promise internally like await 100 -> Promise.resolve(100))

// // ------------------------Simple Example--------------------
// async function test() {
//   console.log("1");

//   await Promise.resolve();

//   console.log("2");
// }

// test();

// console.log("3");
// console.log("33");

// // ------------------------Sequential execution--------------------

// function fetchUser() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("User"), 1000);
//   });
// }

// function fetchPosts() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("Posts"), 1000);
//   });
// }

// async function test2() {
//   const user = await fetchUser();
//   console.log("🚀 ~ test2 ~ user:", user);
//   const posts = await fetchPosts(); // won't execute till above one is resolved
//   console.log("🚀 ~ test2 ~ posts:", posts);

//   console.log(user, posts); // won't execute till above both are resolved
// }

// test2();

// // ------------------------Parallel execution--------------------
// async function test3() {
//   const userPromise = fetchUser();
//   const postsPromise = fetchPosts();

//   const user = await userPromise;
//   const posts = await postsPromise;

//   console.log(user, posts); // will execute at same time because both promises are registered prior and then await later
// }

// test3();

// // ------------------------API call example--------------------

// const callApi = (url, duration) => {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve(fetch(url));
//     }, duration);
//     // setTimeout(() => reject("Failed here"), duration);
//   });
// };

// const getEmojis = async () => {
//   try {
//     const data = await callApi("https://api.github.com/emojis", 1000); // the execution will  be suspended here for 1000ms and the below lines will note be executed till this promise is settled
//     const jsonData = await data.json(); // this will also return a promise so keeping await
//     console.log("First data - ", jsonData);

//     const data2 = await callApi("https://api.github.com/events", 1000);
//     const jsonData2 = await data2.json();
//     console.log("Second data - ", jsonData2);
//   } catch (e) {
//     console.error("errr ", e);
//   }
// };

// getEmojis();

// // ------------------------forEach + async trap--------------------

// [1, 2, 3].forEach(async (n) => {
//   await Promise.resolve(); // forEach doesn't wait - so it won't stop here instead will print done first
//   console.log(n);
// });

// console.log("Done");

// // correct way to do above is use for loop

// // ------------------------setTimeout vs await--------------------
// // Promise callback = microtask
// // setTimeout callback = macrotask

// async function test4() {
//   console.log("1");

//   setTimeout(() => {
//     console.log("2");
//   }, 1000);

//   await Promise.resolve();

//   console.log("3");
// }

// test4();

// ------------------------Classic Event Loop--------------------
console.log("A");

setTimeout(() => {
  console.log("B");
});

Promise.resolve().then(() => {
  console.log("C");
});

(async () => {
  console.log("D");

  await Promise.resolve();

  console.log("E");
})();

console.log("F");

// Sync:
// A
// D
// F

// Microtasks:
// C
// E

// Macrotasks:
// B
