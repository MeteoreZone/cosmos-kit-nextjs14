"use client";

import cls from "clsx";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { assets, chains } from "chain-registry";
import { Chain } from "@chain-registry/types";
import { Decimal } from "@cosmjs/math";
import { GasPrice } from "@cosmjs/stargate";
import {
  useTheme,
} from "@interchain-ui/react";

export const CosmosKitProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <ChainProvider
    chains={chains}
    assetLists={[...assets]}
      wallets={[...keplrWallets, ...leapWallets]}
      throwErrors={false}
      subscribeConnectEvents={true}
      defaultNameService={"stargaze"}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "Cosmos-Kit",
            description: "Next.js + Cosmos-Kit",
            url: "https://cosmoskit.com/",
            icons: [
              "https://raw.githubusercontent.com/cosmology-tech/cosmos-kit/main/packages/docs/public/favicon-96x96.png",
            ],
          },
        },
      }}
      signerOptions={{
        signingStargate: (chain: Chain) => {
          switch (chain.chain_name) {
            case "osmosis":
              return {
                gasPrice: new GasPrice(Decimal.zero(1), "uosmo"),
              };
            default:
              return void 0;
          }
        },
      }}
      logLevel={"DEBUG"}
      endpointOptions={{
        isLazy: true,
        endpoints: {
          cosmoshub: {
            rpc: [
              {
                url: "https://rpc.cosmos.directory/cosmoshub",
                headers: {},
              },
            ],
          },
        },
      }}
      disableIframe={false}
    >
    {children}
    </ChainProvider>
  );
};
