const { execSync } = require("child_process");

function gitRevision() {
  let revision;

  try {
    revision = execSync("git describe --tags --long")
      .toString()
      .match(/^(?<tag>.+)-(?<distance>\d+)-(?<hash>\w{8}).*/).groups;
  } catch {
    revision = { tag: "0.0.0", distance: "0", hash: "" };
  }

  return revision;
}

function appVersion(options = {}) {
  const revision = gitRevision();
  const { year, month, day } = new Date()
    .toISOString()
    .match(/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})T.+$/).groups;

  let version = `${revision.tag}-${year}${month}${day}`;
  if (options.distance) version = `${version}.${revision.distance}`;
  if (options.hash) version = `${version}.${revision.hash}`;

  return version;
}

module.exports = { appVersion };
