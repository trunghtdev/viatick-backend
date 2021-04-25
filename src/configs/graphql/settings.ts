import { join } from 'path'

interface GeneratorDefs {
  path: string
  outputAs?: 'class' | 'interface'
  watch?: boolean
  debug?: boolean
}

export const generatorConfigs: GeneratorDefs = {
  path: join(process.cwd(), 'src/typeDefs/index.schema.ts'),
  outputAs: 'class'
}
