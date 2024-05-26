# A yummy app version library

An opinionated utility to generate a version of the current library / application.

## Installation

```shell
# npm i -D @yummt/app-version
```

## Usage

The library needs a working git repository to run. It uses the  [git describe](https://git-scm.com/docs/git-describe) command to generate the output.

```javascript
import { appVersion } from "@yummy/app-version";

/*
 * By default, appVersion uses the last found git tag and
 * appends the current date to it.
 */
const version = appVersion();
// => v1.0.0.20210608
      ^        ^
      |        |
     git tag  date

/*
 * You can pass `distance = true` as parameter to include
 * the distance (numeric) to the last found git tag.
 */
const version = appVersion({ distance: true });
// => v1.0.0.20210608.20
      ^        ^      ^
      |        |      |
     git tag  date    |
                     distance of commits to last tag

/*
 * You can pass `hash = true` as parameter to include
 * the current git hash (short).
 */
const version = appVersion({ hash: true });
// => v1.0.0.20210608.g0afed72
      ^        ^          ^
      |        |          |
     git tag  date       git hash

/*
 * Altogether, it can also be used.
 */
const version = appVersion({ distance: true, hash: true });
// => v1.0.0.20210608.20.g0afed72
      ^        ^      ^   ^
      |        |      |   |
     git tag  date    |  git hash
                     distance of commits to last tag
```

## Development

To release the package, follow those steps

```shell
# generate changelog and provide git version tag
# @see https://github.com/absolute-version/commit-and-tag-version for details
npm run release

# publish to npm
npm publish --access public
```
