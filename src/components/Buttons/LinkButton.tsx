import { Button } from '@mantine/core'
import Link from 'next/link'

import { isExternalLink } from '~/components/Base/LinkItem'
import { ButtonImportance, getButtonVariant } from '~/components/Buttons/types'

type Props = {
  children: React.ReactNode
  href: string
  target?: '_self' | '_blank'
  importance?: ButtonImportance
  disabled?: boolean
}

export const LinkButton = ({
  children,
  href,
  target = '_self',
  importance = 'primary',
  disabled = false,
}: Props): React.ReactElement =>
  isExternalLink(href) ? (
    <Button
      component="a"
      href={href}
      target={target}
      variant={getButtonVariant(importance)}
      disabled={disabled}
    >
      {children}
    </Button>
  ) : (
    <Link href={href} target={target}>
      <Button
        component="div"
        variant={getButtonVariant(importance)}
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  )
