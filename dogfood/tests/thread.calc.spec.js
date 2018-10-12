import { spawn } from "threads";

const thread = spawn(function(input, done) {
  const expect = require("expect");
  const { sum } = require(input.__dirname + "/../src/calc");
  const { test } = require(input.__dirname + "/../../index");

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
    ).then(done);
});

thread.send({ __dirname }).on("message", () => setTimeout(() => thread.kill()));