const { execSync } = require("child_process");

const gitRevision = () =>
  execSync("git describe --long")
    .toString()
    .match(/^(?<tag>.+)-(?<distance>\d+)-(?<hash>\w{8}).*/).groups;

function appVersion() {
  if ("APP_VERSION" in process.env) {
    return process.env.APP_VERSION;
  }

  const { year, month, day } = new Date()
    .toISOString()
    .match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T.+$/).groups;
  const { tag, distance, hash } = gitRevision();

  return distance === "0"
    ? tag
    : `${tag}-git.${year}${month}${day}.${distance}-${hash}`;
}

module.exports = { appVersion };
