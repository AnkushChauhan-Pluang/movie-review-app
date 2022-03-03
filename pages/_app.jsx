import Layout from '@components/common/Layout';
import { UIProvider } from '@components/ui/uiContext';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider } from 'contexts/AuthContext';
import createEmotionCache from 'src/createEmotionCache';
import theme from 'src/theme';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <UIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UIProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
