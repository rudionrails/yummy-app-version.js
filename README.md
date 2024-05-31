# A yummy app version library

An opinionated utility to generate a version of the current library / application.

## Installation

```shell
# npm i -D @yummy/app-version
```

## Usage

The library needs a working git repository to run. It uses the [git describe](https://git-scm.com/docs/git-describe) command to generate the output.

By default, `appVersion` uses the last found git tag and appends the branch, date, distance to the last git tag and git hash:

```javascript
import { appVersion } from "@yummy/app-version";

appVersion();
// => 1.2.3+main.20240608+7.g6cef876
      ^       ^     ^     ^   ^
      |       |     |     |   |
     git tag  |    date   |  git hash
            git branch   distance to last git commit
```

All parts can be disabled individually:
- `branch = false`  to omit the git branch
- `date = false` to omit the current date
- `distance = false` to omit the distance to the last git tag
- `hash = false` to omit the current git hash

```javascript
import { appVersion } from "@yummy/app-version";

appVersion({ branch: false });
// => 1.2.3+20240608+7.g6cef876

appVersion({ date: false });
// => 1.2.3+main+7.g6cef876

appVersion({ distance: false });
// => 1.2.3+main.20240608+g6cef876

appVersion({ hash: false });
// => 1.2.3+main.20240608+7

// => 1.2.3+main.20240608+7.g6cef876
```

Additionally, you can pass a `prefix`:

```javascript
import { appVersion } from "@yummy/app-version";

appVersion({ prefix: "my-custom-prefix" });
// => my-custom-prefix+1.2.3+20240608+7.g6cef876
```

## Example with [esbuild](https://esbuild.github.io/)

This is useful for when you want to transpile your code into a specific directory.


```javascript
import * as esbuild from "esbuild";
import { appVersion } from "@yummy/app-version";

// assume that @ is the project root
import app from "@/package.json" assert { type: "json" };

const version = appVersion({ prefix: app.name });

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: `dist/${version}`;
  bundle: true,
});
```

## Development

To release the package, follow those steps

```shell
# generate changelog and provide git version tag
# @see https://github.com/absolute-version/commit-and-tag-version for details
npm run release
```
