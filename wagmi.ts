import { configureChains, createClient } from "wagmi";
import { optimismGoerli } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

export const options = {
  options: { projectId: process.env.PROJECT_ID, shimDisconnect: true },
};

export const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
