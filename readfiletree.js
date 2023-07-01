/* Copyright (c) 2012 Rod Vagg <@rvagg> */
const fs = require('fs')
const path = require('path')
const after = require('after')

function readfiletree (dir, obj, callback) {
  if (typeof obj === 'function') {
    callback = obj
    obj = {}
  }

  fs.readdir(dir, afterReaddir)

  function afterReaddir (err, list) {
    if (err) {
      return callback(err)
    }

    const done = after(list.length, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null, obj)
    })
    list.forEach((f) => eachFile(f, done))
  }

  function eachFile (f, callback) {
    var p = path.join(dir, f)
    fs.stat(p, (err, stat) => {
      if (err) {
        return callback(err)
      }
      if (stat.isDirectory()) {
        obj[f] = {}
        return readfiletree(p, obj[f], callback)
      } else if (stat.isFile()) {
        fs.readFile(p, 'utf8', (err, data) => {
          if (err) {
            return callback(err)
          }
          obj[f] = data
          callback()
        })
      }
    })
  }
}

module.exports = function maybePromiseWrap (dir, callback) {
  if (typeof callback === 'function') {
    return readfiletree(dir, callback)
  }

  return new Promise((resolve, reject) => {
    callback = (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    }

    readfiletree(dir, callback)
  })
}
