import { test } from 'node:test'
import assert from 'node:assert'
import * as mkfiletree from 'mkfiletree'
import { readfiletree } from './readfiletree.js'

function mkfixture () {
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

test('readfiletree reads a file tree into an object', async () => {
  const dir = await mkfiletree.makeTemp('readfiletree_test', mkfixture())
  assert(dir)
  const obj = await readfiletree(dir)
  assert.deepStrictEqual(obj, mkfixture())
  await mkfiletree.cleanUp()
})
