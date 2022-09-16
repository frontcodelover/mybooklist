import "../styles/globals.css";
import { AuthContexProvider } from "../context/AuthContext";
import Layout from "../components/Layout/layout";
import { store } from "../context/Store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthContexProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContexProvider>
    </Provider>
  );
}

export default MyApp;
