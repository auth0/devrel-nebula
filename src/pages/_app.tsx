import {Router} from 'next/router'
import nProgress from 'nprogress'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {SSRProvider} from '@react-aria/ssr'
import {ToastContainer} from 'react-toastify'

import '@fontsource/inter/400.css' // Normal
import '@fontsource/inter/600.css' // Semi-Bold
import 'react-toastify/dist/ReactToastify.min.css'

import {Head} from '@components/common'
import '@assets/css/main.css'

const Noop: React.FC = ({children}) => <>{children}</>

// Add tailwind-debug-screens in development
if (process.env.NODE_ENV === 'development' && typeof document !== 'undefined') {
  document.body.classList.add('debug-screens')
}

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function App({Component, pageProps}) {
  const Layout = (Component as any).Layout || Noop

  return (
    <AppProviders>
      <Head />

      <Layout>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Layout>
      <ToastContainer />
    </AppProviders>
  )
}

const queryClient = new QueryClient()

const AppProviders: React.FC = ({children}) => (
  <QueryClientProvider client={queryClient}>
    <SSRProvider>{children}</SSRProvider>
  </QueryClientProvider>
)

export default App
