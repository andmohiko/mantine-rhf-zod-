type Props = {
  label: string
  level?: 1 | 2 | 3
}

export const TitleText = ({ label, level = 1 }: Props): React.ReactElement => {
  if (level === 3) {
    return (
      <h3
        style={{
          color: '#333',
          fontSize: 20,
          fontWeight: 'bold',
          lineHeight: 2,
          fontFamily: '"Hiragino Sans", "M PLUS 1", sans-serif',
        }}
      >
        {label}
      </h3>
    )
  }
  if (level === 2) {
    return (
      <h2
        style={{
          color: '#333',
          fontSize: 28,
          fontWeight: 'bold',
          lineHeight: 2,
          fontFamily: '"Hiragino Sans", "M PLUS 1", sans-serif',
        }}
      >
        {label}
      </h2>
    )
  }
  return (
    <h1
      style={{
        color: '#333',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 2,
        fontFamily: '"Hiragino Sans", "M PLUS 1", sans-serif',
      }}
    >
      {label}
    </h1>
  )
}
