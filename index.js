#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var copyRecursiveSync = function (src, dest) {
  var exists = fs.existsSync(src)

  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()

  if (isDirectory) {
    fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

function main() {
  const args = process.argv.slice(2)
  copyRecursiveSync(path.join(__dirname, 'templates'), args[0] || './optimumqa-cypress-boilerplate/')
}

if (require.main === module) {
  main()
}
