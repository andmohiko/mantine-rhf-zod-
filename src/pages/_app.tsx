import '~/styles/reset.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
    >
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
