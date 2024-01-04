'use client';
import React, { useState, useEffect } from 'react';
import { StdFee } from "@cosmjs/amino";
import { useContractClient } from '@/hooks/useContractClient';
import { toast } from "react-toastify";

import {
  InstantiateMsg,
} from "@/contract-client/Cw721.types";

const defaultInstantiateMsg: InstantiateMsg = {
  minter: 'osmo1zprf2th5m03f4mpnweqkfqx2m0vhmh67k6qt4v',
  name: 'Cw721 NFT Example',
  symbol: 'NFT',
};

const Contracts: React.FC = () => {
  const { signingCosmWasmClient, instantiateContract, error, address, status } = useContractClient();
  const [codeId, setCodeId] = useState<number>(5999);
  const [instantiateMsg, setInstantiateMsg] = useState<InstantiateMsg>(defaultInstantiateMsg);
  const [label, setLabel] = useState('MyContract');
  const [isInstantiating, setIsInstantiating] = useState(false); // Add this state variable

  const handleCodeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeId(Number(event.target.value));
  };

  const handleMinterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstantiateMsg({ ...instantiateMsg, minter: event.target.value });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstantiateMsg({ ...instantiateMsg, name: event.target.value });
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstantiateMsg({ ...instantiateMsg, symbol: event.target.value });
  };

  const fee: StdFee = {
    amount: [{ denom: "uosmo", amount: "200000" }],
    gas: "200000",
  };

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleInstantiate = async () => {
    setIsInstantiating(true);
    const instantiatetoast = toast.loading('Instantiating contract...');
    const instantiateResult = await instantiateContract(codeId, instantiateMsg, label, fee);

    if (instantiateResult) {
      console.log('Contract instantiation result:', instantiateResult);
      const toastMessage = (
        <span>
        Instantiation completed. <a href={`https://celatone.osmosis.zone/osmo-test-5/txs/${instantiateResult.transactionHash}`} target='_blank'>See on Celatone</a>
        </span>
      );
      toast.update(instantiatetoast, {
        render: toastMessage,
        type: 'success',
        isLoading: false,
        autoClose: 6000,

      });
    setIsInstantiating(false); 

    } else {
      toast.update(instantiatetoast, {
        render: 'Contract instantiation failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    setIsInstantiating(false); 

    }
  };

  return (
    <div className="h-screen">
      <div className='card   p-8 m-4 rounded-xl'>
        <h2 className="text-2xl font-bold mb-4">Contract Instantiator</h2>
        <p className='py-8'>
            This is an example of intatiation of contract code id <span className='p-0.5 rounded bg-morado-300 dark:bg-morado-600'><a href="https://celatone.osmosis.zone/osmo-test-5/codes/5999">5999</a></span> which has been uploaded to Osmosis testnet <span className='p-0.5 rounded bg-morado-300 dark:bg-morado-600'><a href="https://github.com/osmosis-labs/testnets?tab=readme-ov-file#-osmo-test-5">osmo-test-5</a></span>. Make sure to read the README and follow each step to learn how to build, upload a contract with the json schema and then generate the client and types with <span className='p-0.5 rounded bg-morado-300 dark:bg-morado-600'><a href="https://github.com/CosmWasm/ts-codegen">ts-codegen</a></span>. 
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
        <div className='py-2 px-4 shadow-xs rounded-lg bg-morado-300 dark:bg-morado-800'>Status {status}</div>
          <div className='py-2 px-4 shadow-xs rounded-lg bg-morado-300 dark:bg-morado-800 overflow-auto'>Your Address: {address}</div>
        </div>

        <div className='grid'>
          <div  className="mt-4">
            <label htmlFor="codeId">Code ID:</label>
            <input
              type="number"
              id="codeId"
              value={codeId}
              onChange={handleCodeIdChange}
              className="w-full border border-morado-400 dark:border-morado-600 rounded-xl bg-morado-300 dark:bg-morado-950 p-3 text-morado-900 dark:text-morado-200"
            />
          </div>
          <div  className="mt-4">
            <label htmlFor="minter" className="mt-4">Minter:</label>
            <input
              type="text"
              id="minter"
              value={instantiateMsg.minter}
              onChange={handleMinterChange}
              className="w-full border border-morado-400 dark:border-morado-600 rounded-xl bg-morado-300 dark:bg-morado-950 p-3 text-morado-900 dark:text-morado-200"
            />
          </div>
          <div  className="mt-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={instantiateMsg.name}
              onChange={handleNameChange}
              className="w-full border border-morado-400 dark:border-morado-600 rounded-xl bg-morado-300 dark:bg-morado-950 p-3 text-morado-900 dark:text-morado-200"
            />
          </div>
          <div  className="mt-4">
            <label htmlFor="symbol">Symbol:</label>
            <input
              type="text"
              id="symbol"
              value={instantiateMsg.symbol}
              onChange={handleSymbolChange}
              className="w-full border border-morado-400 dark:border-morado-600 rounded-xl bg-morado-300 dark:bg-morado-950 p-3 text-morado-900 dark:text-morado-200"
            />
          </div>
          <div className='text-right'>
            <button
              onClick={handleInstantiate}
              disabled={status !== 'Connected' || !address || !signingCosmWasmClient || isInstantiating} 
              className={`${
                status !== 'Connected' || !address || !signingCosmWasmClient || isInstantiating
                  ? 'bg-morado-500 cursor-not-allowed'
                  : 'bg-morado-600 hover:bg-morado-500 hover:shadow-xl'
              } text-white py-2 px-4 mt-4 rounded-lg shadow-md`}
            >
            {isInstantiating ? 'Instantiating...' : (address ? 'Instantiate Contract' : 'Please connect wallet')}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Contracts;
