# README

## Project Structure

```text
.
├── dist
├── src                             # @src/*
    ├── configs                     # @config app
        ├── graphql                 # config graphql
            ├── ...
        ├── typeORM                 # config typeORM
            ├── index.ts
    ├── constants                   # constants
        ├── appConfigs.ts           # constants vars
        ├── messages.ts             # messages
        ├── index.ts
    ├── controllers                 # @controllers
        ├── upload.controller.ts    # upload controller
        ├── index.ts
    ├── dbseed                      # dbseed
        ├── cluster.ts              # cluster define
        ├── index.ts
        ├── permissions.ts          # permissons define
        ├── rolePermission.ts       # rolePermission define
        ├── typeArea.ts             # typeArea define
        ├── typeDevice.ts           # typeDevice define
    ├── decorators                    # @decorators
        ├── currentUser.decorator.ts
        ├── index.ts
        ├── public.decorator.ts
    ├── entities                    # @entities
        ├── ...
        ├── index.ts
    ├── guards                     # @guards
        ├── gql-auth.guard.ts
        ├── index.ts
        ├── local-auth.guard.ts
    ├── modules                     # @modules
        ├── ...
        ├── index.ts
    ├── resolvers                   # @resolvers
        ├── ...
        ├── index.ts
    ├── services                    # @services
        ├── ...
        ├── index.ts
    ├── strategies                    # @strategies
        ├── index.ts
        ├── jwt.strategy.ts
        ├── local.strategy.ts
    ├── typeDefs                    # @typeDefs
        ├── ...
        ├── index.schema.ts
    ├── types                       # @types
        ├── ...
        ├── index.ts
    ├── utils                       # @utils
        ├── ...
        ├── index.ts
    ├── app.module.ts
    ├── graphql.schema.ts
    ├── main.ts
├── .env                            # config env's app
├── .env.template                   # format config
├── .gitignore                      # git ignore config
├── .gitlab-ci.yml                  # script run cicd
├── .prettierrc                     # style lint code config
├── nodemon-debug.json              
├── nodemon.json
├── package.json
├── paths.json
├── tsconfig-paths-bootstrap.js
├── tsconfig.json
├── tslint.json
├── webpack.config.js
```

## Scripts

- Pre-commit checking included.

### Development

- Generate Graphql-schema definitions

```bash
yarn generate:schema
```

- Normal start

```bash
yarn start
```

- With [Nodemon](https://github.com/remy/nodemon)

```bash
yarn start:dev
```

- With [WebpackHMR](https://webpack.js.org/concepts/hot-module-replacement/): Please open 2 terminals to use this feature

```bash
yarn webpack
```

```bash
yarn start:hot
```

- Format code

```bash
yarn lint
```

## Production

- Build

```bash
yarn build
```

- Run

```bash
yarn start:prod
```
# smartHome_backend

