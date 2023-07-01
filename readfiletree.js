/* Copyright (c) 2012 Rod Vagg <@rvagg> */
import fs from 'fs/promises'
import path from 'path'

export async function readfiletree (dir, obj) {
  if (obj == null) {
    obj = {}
  }
  const list = await fs.readdir(dir)
  await Promise.all(list.map(async (f) => {
    const p = path.join(dir, f)
    const stat = await fs.stat(p)
    if (stat.isDirectory()) {
      obj[f] = {}
      await readfiletree(p, obj[f])
    } else if (stat.isFile()) {
      obj[f] = await fs.readFile(p, 'utf8')
    }
  }))
  return obj
}
