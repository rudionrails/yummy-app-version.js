const childProcess = require("child_process");
const { when } = require("jest-when");

const { appVersion } = require("./index");

jest.mock("child_process", () => ({
  execSync: jest.fn(),
}));

const day = "14";
const month = "01";
const year = "1982";
const date = `${year}${month}${day}`;
const now = new Date(`${year}-${month}-${day}`);

beforeAll(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(now);
});

afterAll(() => {
  jest.useRealTimers();
});

test("to be a function", () => {
  expect(typeof appVersion).toEqual("function");
});

test("to return the default version when git command fails", () => {
  when(childProcess.execSync)
    .calledWith("git describe --tags --long")
    .mockImplementation(() => {
      throw new Error("oopsy");
    });

  expect(appVersion()).toEqual(`0.0.0-${date}`);
});

test("to return the correct version when `distance = true` is passed", () => {
  when(childProcess.execSync)
    .calledWith("git describe --tags --long")
    .mockReturnValue("1.2.3-7-g6cef876");

  expect(appVersion({ distance: true })).toEqual(`1.2.3-${date}.7`);
});

test("to return the correct version when `hash = true` is passed", () => {
  when(childProcess.execSync)
    .calledWith("git describe --tags --long")
    .mockReturnValue("1.2.3-7-g6cef876");

  expect(appVersion({ hash: true })).toEqual(`1.2.3-${date}.g6cef876`);
});
