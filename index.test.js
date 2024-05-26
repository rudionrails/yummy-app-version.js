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

beforeEach(() => {
  when(childProcess.execSync)
    .calledWith("git describe --tags --long")
    .mockReturnValue("1.2.3-7-g6cef876");

  when(childProcess.execSync)
    .calledWith("git rev-parse --abbrev-ref HEAD")
    .mockReturnValue("main");
});

test("to be a function", () => {
  expect(typeof appVersion).toEqual("function");
});

test("to return the correct version", () => {
  expect(appVersion()).toEqual(`1.2.3+main.${date}+7.g6cef876`);
});

test("to return the default version when git command fails", () => {
  when(childProcess.execSync)
    .calledWith("git describe --tags --long")
    .mockImplementation(() => {
      throw new Error("oopsy");
    });

  when(childProcess.execSync)
    .calledWith("git rev-parse --abbrev-ref HEAD")
    .mockImplementation(() => {
      throw new Error("oopsy");
    });

  expect(appVersion()).toEqual(`0.0.0+main.${date}+0.00000000`);
});

describe("when options.prefix is passed", () => {
  test("to return the correct version", () => {
    when(childProcess.execSync)
      .calledWith("git describe --tags --long")
      .mockReturnValue("1.2.3-7-g6cef876");

    expect(appVersion({ prefix: "my-application" })).toEqual(
      `my-application+1.2.3+main.${date}+7.g6cef876`,
    );
  });

  test("to return the correct version if tag already has prefix", () => {
    when(childProcess.execSync)
      .calledWith("git describe --tags --long")
      .mockReturnValue("my-application+1.2.3-7-g6cef876");

    expect(appVersion({ prefix: "my-application" })).toEqual(
      `my-application+1.2.3+main.${date}+7.g6cef876`,
    );
  });
});

test("to return the correct version when options.branch = false", () => {
  expect(appVersion({ branch: false })).toEqual(`1.2.3+${date}+7.g6cef876`);
});

test("to return the correct version when options.date = false", () => {
  expect(appVersion({ date: false })).toEqual(`1.2.3+main+7.g6cef876`);
});

test("to return the correct version when options.distance = false", () => {
  expect(appVersion({ distance: false })).toEqual(
    `1.2.3+main.${date}+g6cef876`,
  );
});

test("to return the correct version when options.hash = false", () => {
  expect(appVersion({ hash: false })).toEqual(`1.2.3+main.${date}+7`);
});
