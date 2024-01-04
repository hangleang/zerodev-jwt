import { configureChains, createConfig } from "wagmi";
import { optimismSepolia } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismSepolia],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
