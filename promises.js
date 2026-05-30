const promiseObj = createOrder({ item: "Shirt" });
// console.log(promiseObj);

function createOrder(cart) {
  return new Promise(function (resolve, reject) {
    if (!validateCart(cart)) {
      const error = new Error("Cart item doesn't exist");
      reject(error);
    } else {
      const order = {
        id: 12345,
        message: "Successfully ordered",
      };
      setTimeout(() => resolve(order), 2000);
    }
  });
}

function validateCart(cartItem) {
  if (!cartItem.item) return false;
  return true;
}

// promiseObj
//   .then((data) => {
//     console.log(data);
//     console.log(promiseObj);
//   })
//   .catch((err) => console.log(err.message));

// -------------- Multiple Promises -------------------

const promiseObj2 = createOrder({ item: "" });

promiseObj2
  .then((data) => {
    console.log("first promise here - ", data);
    return data;
  })
  .catch((err) => console.error(err.message)) // catch here if we want to proceed with the next chained promise even if first promise failed
  .then((data) => {
    console.log("first promise success here - ", data);
    return proceedToPayment();
  })
  .then((data) => {
    console.log("second promise here - ", data);
  })
  .catch((err) => console.error(err.message));

function proceedToPayment() {
  return new Promise(function (resolve, reject) {
    if (!validatePay()) {
      const err = new Error("Payment failed, try again!");
      reject(err);
    } else {
      setTimeout(() => {
        resolve("Payment successfull");
      }, 1000);
    }
  });
}

function validatePay() {
  return true;
}

// -------------- Promises Methods -------------------
// 1. Promise.all
// 2. Promise.allSettled
// 1. Promise.race
// 1. Promise.any

const p1 = new Promise(function (resolve, reject) {
  //   setTimeout(() => resolve("P1 success"), 1000);
  setTimeout(() => reject("P1 fail"), 1000);
});
const p2 = new Promise(function (resolve, reject) {
  //   setTimeout(() => resolve("P2 success"), 2000);
  setTimeout(() => reject("P2 success"), 2000);
});
const p3 = new Promise(function (resolve, reject) {
  //   setTimeout(() => resolve("P3 success"), 3000);
  setTimeout(() => reject("P3 success"), 3000);
});

Promise.all([p1, p2, p3])
  .then((res) => console.log("all - ", res))
  .catch((err) => console.error("all - ", err));
// if all succeeded gives error of all success data but if any fails gives error instantly but all APIs will be completed regardless

Promise.allSettled([p1, p2, p3])
  .then((res) => console.log("allSettled - ", res))
  .catch((err) => console.error("allSettled - ", err));
// if will always return the result of all failed/succeeded APIs as an array of object at mex timely settled promise (in above case it will be after 3seconds)
// If failed promise - object contains { status: "rejected", "reason": "P1 fail"}
// If succeeded promise - object contains { status: "fulfilled", "value": "P2 success"}

Promise.race([p1, p2, p3])
  .then((res) => console.log("race - ", res))
  .catch((err) => console.error("race - ", err));
// gives result of first settled error no matter if it is failed or succeeded

Promise.any([p1, p2, p3])
  .then((res) => console.log("any - ", res))
  .catch((err) => console.error("any - ", err.errors));
// success seeking API, gives result from first succeeded API. If all failed, gives a special AggregatedError with array of errors (can be accessible via err.errors)
