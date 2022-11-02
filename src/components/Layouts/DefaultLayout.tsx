import { ReactElement, ReactNode } from 'react'

import { PageHead } from '@/components/Head'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => (
  <div>
    <PageHead />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  </div>
)
