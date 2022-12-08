import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const apolloclient = new ApolloClient({
  link: createUploadLink({
    uri: "http://43.205.196.247:1337/graphql",
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default apolloclient;
