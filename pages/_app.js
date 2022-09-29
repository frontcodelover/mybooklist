import "../styles/globals.css";
import React from "react";
import { AuthContexProvider } from "../context/AuthContext";
import Layout from "../components/Layout/layout";
import { store } from "../context/Store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'


function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>

    <React.StrictMode>
    <Provider store={store}>
      <AuthContexProvider>

        <Layout>
       
          <Component {...pageProps} />
 
        </Layout>

      </AuthContexProvider>
    </Provider>
    </React.StrictMode>
    </QueryClientProvider>
  );
}

export default MyApp;
