import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:1337/graphql',
  ignoreNoDocuments: true,
  generates: {
    './gql/': {
      documents: ['query/**/*.ts'],
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
