import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'
import Layout from '../../components/layout'

function Page() {
  const { isConnected } = useAccount()

  return (
    <Layout>
      <h1>wagmi + Next.js</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </Layout>
  )
}

export default Page