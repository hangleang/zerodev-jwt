import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAllAccess } from "@takeshape/next-auth-all-access/react";
import { JWTWalletConnector } from "@zerodevapp/wagmi";
import { useSession } from "next-auth/react";

export function Connect() {
  const { isAuthenticated, clientToken } = useAllAccess({
    clientId: "zerodev:client",
    required: true,
  });

  const { isConnected } = useAccount();
  const { connect, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: session, status } = useSession();

  const connector = useMemo(() => {
    if (isAuthenticated && clientToken) {
      return new JWTWalletConnector({
        options: {
          projectId:
            process.env.PROJECT_ID || "8ff1126e-3958-4654-aea0-b9f024f64f9f",
          // shimDisconnect: true,
          jwt: clientToken.accessToken,
        },
      });
    }
  }, [isAuthenticated, clientToken]);

  return (
    <div>
      <div>
        {isConnected && (
          <>
            <h4>{session?.user?.name || "what "}, is your name?</h4>
            <h5>If not, why you still connected!</h5>
            <button onClick={() => disconnect()}>
              Disconnect from {connector?.name}
            </button>
          </>
        )}
        {!isConnected && (
          <button onClick={() => connect({ connector })} disabled={isLoading}>
            {isLoading ? "Loading..." : "Connect JWT Wallet"}
          </button>
        )}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
