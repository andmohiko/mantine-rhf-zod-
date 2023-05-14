import { Text } from '@mantine/core'
import Link from 'next/link'

import type { NextPage } from 'next'

import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Link href="/signup" passHref>
        <Text size="xl">サインアップはこちら</Text>
      </Link>
    </DefaultLayout>
  )
}

export default Home
