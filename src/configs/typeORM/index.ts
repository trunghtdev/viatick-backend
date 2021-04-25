import { _appConfigs } from '@constants'

const {
  NODE_ENV = _appConfigs.DEVELOPMENT,
  MONGO_URL = _appConfigs.DEFAULT_MONGO_URL
} = process.env

const mongoConfigs = {
  sUrl: MONGO_URL.split(/[:@/]/g),
  host: '',
  port: '',
  database: '',
  username: '',
  password: ''
}

switch (mongoConfigs.sUrl.length) {
  case 5: {
    Object.assign(mongoConfigs, {
      host: mongoConfigs.sUrl[2],
      port: mongoConfigs.sUrl[3],
      database: mongoConfigs.sUrl[4],
      username: mongoConfigs.sUrl[0],
      password: mongoConfigs.sUrl[1]
    })
    break
  }

  case 3: {
    Object.assign(mongoConfigs, {
      host: mongoConfigs.sUrl[0],
      port: mongoConfigs.sUrl[1],
      database: mongoConfigs.sUrl[2]
    })
    break
  }
}

const configs = {
  ormConfig: {
    type: 'mongodb',
    host: mongoConfigs.host,
    port: mongoConfigs.port,
    database: mongoConfigs.database,
    username: mongoConfigs.username,
    password: mongoConfigs.password,
    useNewUrlParser: true,
    synchronize: true,
    keepConnectionAlive: true,
    useUnifiedTopology: true,
    ...(NODE_ENV !== _appConfigs.PRODUCTION && { keepConnectionAlive: true }),
    entities: [
      ...(NODE_ENV === _appConfigs.PRODUCTION
        ? ['dist/**/**.entity{.ts,.js}']
        : process.env.HOT
        ? ([
            ...require
              .context('../..', true, /\.entity\.ts$/)
              .keys()
              .map(
                id =>
                  Object.values(
                    require.context('../..', true, /\.entity\.ts$/)(id)
                  )[0]
              )
          ] as Array<string>)
        : ['src/**/**.entity{.ts,.js}'])
    ]
  }
}

export default configs
