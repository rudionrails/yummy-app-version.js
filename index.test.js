const test = require("ava");

const { appVersion } = require("./index");

test("to be a function", (t) => {
  t.is("function", typeof appVersion);
});
