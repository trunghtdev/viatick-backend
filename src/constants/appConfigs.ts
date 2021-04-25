// Backend
const DEFAULT_PORT: number = 10018 // edit
const DEFAULT_SECRET_KEY = 'digihcs'

// Mongodb
const DEFAULT_MONGO_URL: string = 'gwfpt.digihcs.com:10019/smart_home' // edit

// Graphql
const GRAPHQL_DEPTH_LIMIT: number = 3
const GRAPHQL_PATH: string = '/graphqlenv' // edit
const SCHEMA_PATH: string = '/schema' // edit

// Mode
const DEVELOPMENT: string = 'development'
const PRODUCTION: string = 'production'

// connection var
const TOKEN: string = 'access-token'

// BCrypt
const SALT_ROUNDS: number = 12

// LRU cache
const CACHE_AMOUNT = 1000

// XSRF-TOKEN
const CSRF = 'csrf-token'

// mqtt
const BROKER = 'mqtt://14.161.41.134:61230'
const BROKER_USERNAME = 'root'
const BROKER_PASSWORD = 'trung123'

export const _appConfigs = {
  BROKER,
  BROKER_USERNAME,
  BROKER_PASSWORD,
  DEFAULT_PORT,
  DEFAULT_MONGO_URL,
  DEFAULT_SECRET_KEY,
  GRAPHQL_DEPTH_LIMIT,
  GRAPHQL_PATH,
  SCHEMA_PATH,
  DEVELOPMENT,
  PRODUCTION,
  TOKEN,
  SALT_ROUNDS,
  CACHE_AMOUNT,
  CSRF
}
