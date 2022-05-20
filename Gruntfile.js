module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-exec')

  const CONFIG = {
    cwd: './cypress',
    productPrefix: '',
  }

  let productName = CONFIG.productPrefix
  let team = ''

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      add: {
        cwd: CONFIG.cwd,
        cmd(_product, _team) {
          console.time('addProduct')

          productName += _product
          team = _team

          const intro = () =>
            `echo "Adding product: ${productName}\n` + //
            `Product prefix: ${CONFIG.productPrefix}\n` +
            `Adding team: ${team}\n" &&`

          const integration = () =>
            `mkdir -p integration/${team ? team + '/' : ''}${productName} &&` + //
            `echo "" > integration/${team ? team + '/' : ''}${productName}/default.spec.ts &&`

          const configs = () =>
            `mkdir -p configs/${team ? team + '/' : ''}${productName} &&` + //
            `echo "{}" > configs/${team ? team + '/' : ''}${productName}/default.json &&`

          const fixtures = () =>
            `mkdir -p fixtures/${team ? team + '/' : ''}${productName} &&` + //
            `echo "{}" > fixtures/${team ? team + '/' : ''}${productName}/routes.json &&`

          const outro = () =>
            `echo 'Here is a command to get started (add to package.json) -> "${
              team ? team + '-' : ''
            }${productName}-staging": "cypress open --env ${
              team ? 'team=' + team + ',' : ''
            }product=${productName},env=staging"'`

          return (
            intro() + //
            integration() +
            configs() +
            fixtures() +
            outro()
          )
        },
        callback() {
          console.log(`New file: integration/${team ? team + '/' : ''}${productName}`)
          console.log(`New file: integration/${team ? team + '/' : ''}${productName}/default.spec.ts`)

          console.log(`New file: configs/${team ? team + '/' : ''}${productName}`)
          console.log(`New file: configs/${team ? team + '/' : ''}${productName}/default.json\n`)

          console.log(`New file: fixtures/${team ? team + '/' : ''}${productName}`)
          console.log(`New file: fixtures/${team ? team + '/' : ''}${productName}/default.json\n`)

          console.timeEnd('addProduct')
        },
      },
      generateLocalConfig: {
        cwd: CONFIG.cwd,
        cmd() {
          return `echo "{}" > configs/cypress.local.json`
        },
      },
    },
  })
}
