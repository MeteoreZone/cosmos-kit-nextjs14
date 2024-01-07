'use client';
import Image from 'next/image';
import { Connect } from "@/components/wallet/Connect";

import {
  useTheme
} from "@interchain-ui/react";

export default function Home() {
const { theme, setTheme } = useTheme();

  return (
    <main className="flex  flex-col items-center justify-between p-4 sm:p-18">

      <div  className="flex  flex-col items-center justify-between p-8 sm:p-18">
      <div className="min-h-[300px] mt-4 mb-6 sm:mt-16 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-morado-100 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-morado-200 after:via-morado-100 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-morado-200 before:dark:opacity-10 after:dark:from-morado-600 after:dark:via-morado-700 after:dark:opacity-40 before:lg:h-[160px] z-[-1]">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={90} height={90}  className='relative dark:drop-shadow-[0_0_0.1rem_#000] '/>
        <h2 className='text-3xl lg:text-5xl ml-4 text-gray-900 dark:text-white relative dark:drop-shadow-[0_0_0.1rem_#000]'>Cosmos Kit + Next.js</h2>
      </div>
      </div>

      <div className="grid grid-space gap-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <a
          href="https://docs.cosmoskit.com/"
          className="group rounded-lg border border-transparent px-5 py-4  bg-opacity-30   bg-opacity-50 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
           Docs
            
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Official Cosmos Kit documentation for developers.
          </p>
        </a>
        <a
          href="https://cosmoskit.com/"
          className="group rounded-lg border border-transparent px-5 py-4 bg-opacity-30  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Cosmos Kit
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Official Cosmos Kit is wallet website.
          </p>
        </a>

        <a
          href="https://github.com/cosmology-tech/create-cosmos-app"
          className="group rounded-lg border border-transparent px-5 py-4 bg-opacity-30  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            CCA
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
           Create Cosmos App to quickly bootstrap Cosmos DApps
          </p>
        </a>

        <a
          href="https://github.com/CosmWasm/ts-codegen"
          className="group rounded-lg border border-transparent px-5 py-4 bg-opacity-30  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            TS Codegen
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Convert CosmWasm smart contracts into TypeScript
          </p>
        </a>
      </div>
      </div>

      
    </main>
  )
}

