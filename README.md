# readfiletree

Deserialise an file/directory tree into an object. Available in npm as *readfiletree*

[![NPM](https://nodei.co/npm/readfiletree.svg)](https://nodei.co/npm/readfiletree/)

Particularly useful for testing where you need to do a `deepStrictEqual()` on a simple tree of files. **See [mkfiletree](https://github.com/rvagg/mkfiletree) for file tree serialisation.**

### async readfiletree(directory)

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
  →  /tmp/testfiles11240-23530-r7rs3/afile.txt: 
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

*Copyright (c) 2012 [Rod Vagg](https://github.com/rvagg)

Made available under the MIT licence:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
