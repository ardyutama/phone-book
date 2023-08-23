"use client"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

export default function ApolloWrapper({children}: {children: React.ReactNode}) {
    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}