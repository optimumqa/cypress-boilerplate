module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-exec')

  const CONFIG = {
    cwd: './cypress',
    productPrefix: '',
    channels: ['web', 'mobile'],
  }

  let productName = CONFIG.productPrefix

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      addProduct: {
        cwd: CONFIG.cwd,
        cmd(product) {
          console.time('addProduct')

          productName += product

          const intro = () =>
            `echo "Adding product: ${productName}\n` + //
            `Product prefix: ${CONFIG.productPrefix}\n` +
            `Channels: ${JSON.stringify(CONFIG.channels)}\n" &&`

          const integration = () => {
            let finalString = ''
            CONFIG.channels.forEach((channel) => {
              finalString +=
                `mkdir -p integration/${productName}/${channel} &&` + //
                `echo "" > integration/${productName}/${channel}/default.spec.ts &&`
            })

            return finalString
          }

          const configs = () =>
            `mkdir -p configs/${productName} &&` + //
            `echo "{}" > configs/${productName}/default.json &&`

          const outro = () =>
            `echo "Here is a command for you to get started (add to package.json) -> ` +
            `'${productName}-staging: cypress open --env product=${productName},env=staging'" &&` +
            `echo "Dont forget to add [${productName}] urls in fixtures/routes.json\n"`

          return (
            intro() + //
            integration() +
            configs() +
            outro()
          )
        },
        callback() {
          CONFIG.channels.forEach((channel) => {
            console.log(`Created -> integration/${productName}/${channel}`)
            console.log(`Created -> integration/${productName}/${channel}/default.spec.ts`)
          })

          console.log(`Created -> configs/${productName}`)
          console.log(`Created -> configs/${productName}/default.json\n`)

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
