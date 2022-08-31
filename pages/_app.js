import '../styles/globals.css'
import { AuthContexProvider } from '../context/AuthContext'
import Layout from '../components/Layout/layout'

function MyApp({ Component, pageProps }) {
 
  return (
    <AuthContexProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </AuthContexProvider>
  )
}

export default MyApp
