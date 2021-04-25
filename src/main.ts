import * as env from 'dotenv'
env.config()
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'
import {
  NestFastifyApplication,
  FastifyAdapter
} from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'body-parser'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
// import secureSession from 'fastify-secure-session';

import { ApplicationModule } from './app.module'
import chalk from 'chalk'

import { _appConfigs } from '@constants'
import { Transport } from '@nestjs/common/enums/transport.enum'

const { DEVELOPMENT } = _appConfigs

// NOTE: HMR
declare const module: any

async function bootstrap() {
  const {
    PORT = _appConfigs.DEFAULT_PORT,
    NODE_ENV = DEVELOPMENT
  } = process.env

  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule
    // new FastifyAdapter({
    //   https: {
    //     key: fs.readFileSync(path.join(__dirname, 'sm.digihcs.com.key')),
    //     cert: fs.readFileSync(path.join(__dirname, 'fullchain.cer'))
    //   }
    // })
  )

  // app.register(secureSession, {
  //   secret: 'averylogphrasebiggerthanthirtytwochars',
  //   salt: 'mq9hDxBVDbspDR6n',
  // })

  app.use(cookieParser())
  app.use(helmet())
  app.use(
    csurf({
      value: req => req.csrfToken(),
      cookie: true
    })
  )
  if (NODE_ENV === DEVELOPMENT) {
    app.use(
      _appConfigs.SCHEMA_PATH,
      voyagerMiddleware({ endpointUrl: _appConfigs.GRAPHQL_PATH })
    )
  }
  const publicPath = require('path').join(__dirname, '../uploads')
  app.useStaticAssets(publicPath)
  app.enableCors({ origin: '*' })
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100 // limit each IP to 100 requests per windowMs
  //   })
  // )
  app.use(json({ limit: '10mb' }))
  app.use(urlencoded({ limit: '10mb', extended: true }))
  await app.listen(Number(PORT), '0.0.0.0')
  // NOTE: HMR
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  console.log(
    `------- Server ready at port: ${chalk.greenBright(`${PORT}`)} -------`
  )
}

bootstrap()
