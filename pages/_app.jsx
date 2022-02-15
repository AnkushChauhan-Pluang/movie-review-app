import { AuthContextProvider } from 'contexts/AuthContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default MyApp;
