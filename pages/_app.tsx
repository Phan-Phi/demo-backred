import { CacheProvider, EmotionCache } from "@emotion/react";

import type { AppProps } from "next/app";

import { createEmotionCache } from "@/libs";
import { ErrorBoundaryWrapper, Head, IntlWrapper, Progress } from "@/hocs";

import "@/styles/global.css";
import {
  Cart,
  SWR,
  Setting,
  SnackBar,
  ThemeProvider,
  ThemeModeProvider,
} from "@/contexts";
import Layout from "@/compositions/Layout/Layout";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: { initData: []; fallback: [] };
}

const clientSideEmotionCache = createEmotionCache();

export default function App(props: MyAppProps) {
  const { emotionCache = clientSideEmotionCache, pageProps, Component } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeModeProvider>
        <ThemeProvider>
          <IntlWrapper>
            <Head />
            <Progress />
            <SnackBar>
              <ErrorBoundaryWrapper>
                <SWR fallback={pageProps.fallback}>
                  <Cart>
                    <Setting>
                      <Layout>
                        <Component {...pageProps} />
                      </Layout>
                    </Setting>
                  </Cart>
                </SWR>
              </ErrorBoundaryWrapper>
            </SnackBar>
          </IntlWrapper>
        </ThemeProvider>
      </ThemeModeProvider>
    </CacheProvider>
  );
}
