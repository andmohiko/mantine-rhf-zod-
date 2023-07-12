import { FontSizes } from './types'

type Props = {
  children: string
  color?: 'black' | 'gray'
  weight?: 'normal' | 'bold'
  size?: FontSizes
}

export const BaseText = ({
  children,
  color = 'black',
  weight = 'normal',
  size = 'md',
}: Props): React.ReactElement => {
  const getSize = (size: FontSizes): number => {
    if (size === 'xl') {
      return 20
    }
    if (size === 'lg') {
      return 16
    }
    if (size === 'xs') {
      return 10
    }
    return 14
  }
  return (
    <p
      style={{
        color,
        fontSize: getSize(size),
        lineHeight: 1.2,
        letterSpacing: 0.07,
        fontWeight: weight === 'normal' ? 400 : 700,
      }}
    >
      {children}
    </p>
  )
}
