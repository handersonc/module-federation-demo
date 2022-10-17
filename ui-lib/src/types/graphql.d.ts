declare module '*.graphql' {
  import { any } from 'graphql'
  const Schema: any

  export = Schema
}