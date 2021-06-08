# A yummy git revision library

## Usage

The library needs a working git repository to run. It uses the  [git describe](https://git-scm.com/docs/git-describe) command to generate the output.

```javascript
import { appVersion } from "@yummy/git-describe";

const version = appVersion();
// => v1.0.0-git.20210608.20-g0afed72
      ^          ^        ^  ^
      |          |        |  |
     git tag    date      | git hash
                         distance of commits to last tag
```
