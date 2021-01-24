const path = require('path')
const awsServerlessExpress = require('aws-serverless-express')
const { Nuxt } = require('nuxt-start')
const fastify = require('fastify')
const fastifyStatic = require('fastify-static')
const fastifyExpress = require('fastify-express')
const config = require('./nuxt.config.js')

// https://logaretm.com/blog/2019-08-29-cost-effective-serverless-nuxt-js/
/**
 * Creates a fastify server with Nuxt middleware attached.
 **/
exports.createApp = async function start() {
  // Define a list of mime types that we will serve.
  // Let's serve everything using a wild card
  const binaryTypes = ['*/*']

  // Pass in our custom server function, which uses the aws-serverless-proxy
  // to convert our default handler to a serverless compatible one.
  const server = fastify({
    serverFactory(handler) {
      return awsServerlessExpress.createServer(handler, null, binaryTypes)
    },
  })
  await server.register(fastifyExpress)

  //TODO: Don't serve this from API Gateway, move it to an S3 bucket.
  //TODO: Reduce the contents of the code bundle.
  // Serve the `.nuxt/dist` folder using the `/_nuxt` prefix.
  await server.register(fastifyStatic, {
    root: path.join(__dirname, '.nuxt', 'dist'),
    prefix: '/_nuxt/',
  })

  // In the Nuxt programmatic API
  // We need to explicitly set the dev to false.
  const nuxt = new Nuxt(Object.assign(config, { dev: false }))

  // wait for nuxt to be ready.
  await nuxt.ready()
  server.use(nuxt.render)

  // wait for fastify to be ready.
  await server.ready()

  return server
}
