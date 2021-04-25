import { GraphQLDefinitionsFactory } from '@nestjs/graphql'

import { generatorConfigs } from './settings'

const generator = new GraphQLDefinitionsFactory()

generator.generate({
  typePaths: ['./**/*.graphql'],
  ...generatorConfigs
})
