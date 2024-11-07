// graphql.d.ts file
declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    import {gql} from "graphql-tag"
  
    const value: {
      [key: string]: DocumentNode;
    };
    export = gql`value`;
  }