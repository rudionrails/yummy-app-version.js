"use strict";

const { execSync } = require("child_process");

function gitBranch() {
  let branch;

  try {
    branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch (_) {
    branch = "main";
  }

  return branch;
}

function gitRevision() {
  let revision;

  try {
    revision = execSync("git describe --tags --long")
      .toString()
      .match(/^(?<tag>.+)-(?<distance>\d+)-(?<hash>\w{8}).*/).groups;
  } catch (_) {
    revision = { tag: "0.0.0", distance: "0", hash: "00000000" };
  }

  return revision;
}

/**
 * Generate the app version
 *
 * @param {object} options Configuration options
 * @param {string} options.prefix - Adds a prefix to the version
 * @param {boolean} options.banch - Adds the current git branch
 * @param {boolean} options.distance - Adds the distance to the last git tag
 * @param {boolean} options.hash - Adds the current git commit hash
 *
 * @returns {string} The generated app version
 */
function appVersion(options = {}) {
  const opts = Object.assign(
    {
      prefix: "",
      branch: true,
      date: true,
      distance: true,
      hash: true,
    },
    options,
  );

  const date = new Date().toISOString().substring(0, 10).replaceAll("-", ""); // YYYMMDD
  const revision = gitRevision(); // { tag, distance, hash }
  const branch = gitBranch(); // main

  let version = revision.tag;

  if (opts.prefix !== "" && !version.startsWith(`${opts.prefix}+`)) {
    version = `${opts.prefix}+${version}`;
  }

  if (opts.branch || opts.date) {
    const branchOrDate = [];

    if (opts.branch) branchOrDate.push(branch);
    if (opts.date) branchOrDate.push(date);

    version = `${version}+${branchOrDate.join(".")}`;
  }

  if (opts.distance || opts.hash) {
    const distanceOrHash = [];

    if (opts.distance) distanceOrHash.push(revision.distance);
    if (opts.hash) distanceOrHash.push(revision.hash);

    version = `${version}+${distanceOrHash.join(".")}`;
  }

  return version;
}

module.exports = { appVersion };
