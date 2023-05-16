import { configureChains, createClient } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'

import { publicProvider } from 'wagmi/providers/public'

const options = { options: { projectId: 'd00dbcef-2f10-479e-8c10-28a9fd95717d' } } 

export const { chains, provider, webSocketProvider } = configureChains(
    [polygonMumbai],
    [
        publicProvider(),
    ],
)

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})