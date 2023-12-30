"use client";
import { useMemo, useState } from "react";
import cls from "clsx";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { makeWeb3AuthWallets } from "@cosmos-kit/web3auth";

import { assets, chains } from "chain-registry";
import { Chain } from "@chain-registry/types";
import { Decimal } from "@cosmjs/math";
import { GasPrice } from "@cosmjs/stargate";

//TODO figure out right place to import these types from
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { StdSignDoc } from '@cosmjs/amino';
type SignData =
  | {
      type: 'direct';
      value: SignDoc;
    }
  | {
      type: 'amino';
      value: StdSignDoc;
    };


export const CosmosKitProvider = ({ children }: { children: React.ReactNode }) => {

  const [web3AuthPrompt, setWeb3AuthPrompt] = useState<{
    signData: SignData
    resolve: (approved: boolean) => void
  } | undefined>();

const web3AuthWallets = useMemo(
  () => {
    const wallets = makeWeb3AuthWallets({
      loginMethods: [
        {
          provider: "google",
          name: "Google",
          logo: "/google.svg",
        },
      ],
      client: {
        clientId: "BDLLD_RgZnTlumaFNheXx1G6ZiZZz6XvCawD-T_t9Nnn1agz_V_gZT-hq9n1kht9hho32a7yu3pwL44pzJnSLE8", //change this to your client-id
        web3AuthNetwork: "testnet",
      },
      promptSign: async (_, signData) => {
        return new Promise((resolve) => {
          setWeb3AuthPrompt({
            signData,
            resolve: (approved) => {

              setWeb3AuthPrompt(undefined);
              resolve(approved);
            },
          });
        });
      },
    });
    return wallets;
  },
  []
);


  return (
    <ChainProvider
    chains={chains}
    assetLists={[...assets]}
      wallets={[...keplrWallets, ...web3AuthWallets, ...leapWallets]}
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
