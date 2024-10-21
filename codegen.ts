import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.STAPI_URL}/graphql`,
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
