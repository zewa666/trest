import expect from "expect";

const { sum, asyncSum } = require("../src/calc");
const { test, scenario } = require("../../index");

scenario("the sum function", () => {
  test(sum, "it should add two numbers")
    .arrange({
      n1: 1,
      n2: 2
    })
    .act((sut, ctx) => {
      const { n1, n2 } = ctx;

      return sut(n1, n2);
    })
    .assert(
      (result) => { expect(result).toEqual(3); }
    );

  test(sum, "it should add multiple numbers")
    .arrange({
      numbers: [1, 2, 3, 4, 5]
    })
    .act((sut, ctx) => {
      const { numbers } = ctx;

      return sut(...numbers);
    })
    .assert(
      (result) => expect(result).toBe(15)
    );

  test(asyncSum, "it should add two async values")
    .arrange({
      valueFromServerA: Promise.resolve(4),
      valueFromServerB: new Promise((resolve) => {
        setTimeout(() => resolve(38), 1);
      })
    })
    .act((sut, ctx) => {
      const { valueFromServerA, valueFromServerB } = ctx;
      return sut(valueFromServerA, valueFromServerB);
    })
    .assert(
      async (result) => expect(await result).toBe(42)
    );
});