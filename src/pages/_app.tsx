import '~/styles/reset.css'

import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

import type { AppProps } from 'next/app'

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.4,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
