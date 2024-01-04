import { configureChains, createConfig } from "wagmi";
import { optimismGoerli, optimismSepolia } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismSepolia, optimismGoerli],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const projectIds = process.env.NEXT_PUBLIC_PROJECT_ID.split(", ");
