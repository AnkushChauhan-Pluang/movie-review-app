import Layout from '@components/common/Layout';
import { AuthContextProvider } from 'contexts/AuthContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
};

export default MyApp;
