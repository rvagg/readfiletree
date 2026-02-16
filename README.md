# readfiletree

[![NPM](https://nodei.co/npm/readfiletree.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/readfiletree/)

Deserialize a file/directory tree into an object. Particularly useful for testing where you need to do a `deepStrictEqual()` on a simple tree of files. **See [mkfiletree](https://github.com/rvagg/node-mkfiletree) for file tree serialization.**

## Requirements

Node.js >= 20

## API

### await readfiletree(directory)

Read the directory and the files it contains, recursively, and return an object representing the directory structure with nodes containing the utf8 string contents of each file.

Using both *mkfiletree* and *readfiletree* we can do the following:

```js
import * as mkfiletree from 'mkfiletree'
import { readfiletree } from 'readfiletree'

const dir = await mkfiletree.makeTemp('testfiles',
  {
    'adir': {
      'one.txt': '1\n2\n3\n',
      'two.txt': 'a\nb\nc\n',
      'deeper': {
        'depths.txt': 'whoa...'
      }
    },
    'afile.txt': 'file contents'
  })

const obj = await readfiletree(dir)
console.log(obj)
```

The directory structure created above looks like the following:

```
$ find /tmp/testfiles11240-23530-r7rs3 -type f -exec sh -c "echo '\n{}: ' && cat '{}'" \;
  /tmp/testfiles11240-23530-r7rs3/afile.txt:
    file contents
    /tmp/testfiles11240-23530-r7rs3/adir/deeper/depths.txt:
    whoa...
    /tmp/testfiles11240-23530-r7rs3/adir/two.txt:
    a
    b
    c

    /tmp/testfiles11240-23530-r7rs3/adir/one.txt:
    1
    2
    3

```

And the output of the program should be the same as the input to *mkfiletree*:

```js
{
  'adir': {
    'one.txt': '1\n2\n3\n',
    'two.txt': 'a\nb\nc\n',
    'deeper': {
      'depths.txt': 'whoa...'
    }
  },
  'afile.txt': 'file contents'
}
```

## License

**readfiletree** is Copyright (c) 2012 Rod Vagg [@rvagg](https://github.com/rvagg) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
