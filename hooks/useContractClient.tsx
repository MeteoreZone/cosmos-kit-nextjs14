import { useState, useEffect } from 'react';
import { useChain } from '@cosmos-kit/react';
import { Coin, StdFee } from "@cosmjs/amino";
import { SigningCosmWasmClient, InstantiateResult } from "@cosmjs/cosmwasm-stargate";
import {
  InstantiateMsg,
} from "@/contract-client/Cw721.types";

interface InstantiateOptions {
  // admin?: string;
  // amount?: readonly Coin[];
}

export function useContractClient() {
  const { getSigningCosmWasmClient, address, status } = useChain('osmosistestnet');
  const [signingCosmWasmClient, setSigningCosmWasmClient] = useState<SigningCosmWasmClient | null>(null);
  const [error, setError] = useState<string | undefined>();


  useEffect(() => {
     connectClient();
    if (status === 'Connected' && address ) {
        console.log("Connected to contract client");
       } else {
         console.log('Wallet is not connected or client is not initialized');
       }
  }, [address, status ]);


  const connectClient = async () => {
    try {
      if (status === 'Connected' && address) {
        const client = await getSigningCosmWasmClient();
        setSigningCosmWasmClient(client);
      } 
    } catch (err) {
      setError('Failed to connect to the CosmWasm client: ' + err);
    }
  };

  const instantiateContract = async (
    codeId: number,
    instantiateMsg: InstantiateMsg, // This should match the InstantiateMsg of the specific contract
    label: string,
    fee: StdFee,
    memo: string = "",
    options?: InstantiateOptions
  ): Promise<InstantiateResult | undefined> => {
    if (signingCosmWasmClient && address) {
      try {
        return await signingCosmWasmClient.instantiate(
          address,
          codeId,
          instantiateMsg,
          label,
          fee,
          {
            ...options,
            memo,
          }
        );
      } catch (err) {
        setError('' + err);
        console.error('Error instantiating contract:', err);
      }
    } else {
      setError('Client not initialized or not connected');
    }
  };

  return { signingCosmWasmClient, instantiateContract, connectClient, error, address, status };
}