const assert = require('assert')
const mkfiletree = require('mkfiletree')
const readfiletree = require('./readfiletree')
function mkfixture () { // make a new copy each time, ensure no edits at any depth
  return {
    'foo.txt': 'FOO!',
    'bar': {
      'bang': {
        '1.dat': '1\n',
        '2.dat': '2\n\n',
        '3.dat': '3\n\n\n'
      },
      'BAM': 'WOO HOO!!!\n'
    }
  }
}

async function test (asPromises) {
  const dir = await mkfiletree.makeTemp('readfiletree_test', mkfixture())
  assert(dir)

  if (!asPromises) {
    readfiletree(dir, (err, obj) => {
      assert(!err)
      verify(obj)
    })
  } else {
    readfiletree(dir)
      .then(verify)
  }

  function verify (obj) {
    assert.deepStrictEqual(obj, mkfixture())
  }
}

test(false).then(() => {
  return test(true)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
