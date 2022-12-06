// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
import { AppProps } from "next/app"
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react" // highlight-line
import { ApolloProvider } from "@apollo/client";
import apolloclient from "../apolloclient/apolloclient";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // highlight-start
    
    <SessionProvider session={session}>
      <ApolloProvider client={apolloclient}>
      <Component {...pageProps} />
      </ApolloProvider> 
    </SessionProvider>
    // highlight-end
  )
}
