import { configureChains, createClient } from "wagmi";
import { optimismGoerli } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

const options = {
  options: { projectId: process.env.PROJECT_ID },
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
