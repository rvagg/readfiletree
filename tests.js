import assert from 'assert'
import * as mkfiletree from 'mkfiletree'
import { readfiletree } from './readfiletree.js'

function mkfixture () { // make a new copy each time, ensure no edits at any depth
  return {
    'foo.txt': 'FOO!',
    bar: {
      bang: {
        '1.dat': '1\n',
        '2.dat': '2\n\n',
        '3.dat': '3\n\n\n'
      },
      BAM: 'WOO HOO!!!\n'
    }
  }
}

async function test () {
  const dir = await mkfiletree.makeTemp('readfiletree_test', mkfixture())
  assert(dir)
  const obj = await readfiletree(dir)
  assert.deepStrictEqual(obj, mkfixture())
}

test().catch((err) => {
  console.error(err)
  process.exit(1)
})
