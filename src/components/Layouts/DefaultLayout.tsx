import { ReactElement, ReactNode } from 'react'

import { Box } from '@mantine/core'

import { PageHead } from '@/components/Head'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => (
  <div>
    <PageHead />
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      {children}
    </Box>
  </div>
)
