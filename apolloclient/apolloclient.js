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
    uri: "https://strapibtp_full.cfapps.us10-001.hana.ondemand.com/graphql",
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default apolloclient;
