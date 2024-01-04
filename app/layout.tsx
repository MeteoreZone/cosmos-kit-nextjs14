'use client';
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ['latin'] })
import "@interchain-ui/react/styles";
import { CosmosKitProvider } from '@/app/CosmosKitProvider';
import {
  useTheme
} from "@interchain-ui/react";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { Connect } from "@/components/wallet/Connect";
import Link from 'next/link';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const { theme, setTheme } = useTheme();

/* Load saved Theme from interchain-ui*/
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
/* This togles tailwin's dark mode and interchain-ui dark mode's state =)*/
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  

  return (
    <html lang="en">
    <body className={` ${inter.className}  text-black dark:text-white bg-gradient-to-b from-morado-200 to-morado-400 dark:from-morado-800 dark:to-morado-950`}>

      <CosmosKitProvider>
      <div className='container mx-auto'>
          <nav className=" p-4">
          <div className="container  flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className='ml-6 mr-6'>
                Home
              </Link>
              <Link href="/contracts" className='p-2 rounded'> Contracts</Link> 

            </div>
            <ul className="flex space-x-2">
            <Connect />
            <button
                onClick={toggleTheme}
                className="ml-4 px-4 rounded-md text-morado-100  bg-morado-900 hover:bg-morado-700 dark:text-morado-200  dark:hover:bg-morado-600"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </ul>
          </div>
        </nav>
     
      
        {children}
        </div>
      </CosmosKitProvider>
      <ToastContainer
      pauseOnFocusLoss={true}
        bodyClassName={() => "text-sm font-white font-med block p-3 "}
        position="top-right"
        autoClose={3000}
        className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 xxl:w-1/4 "
        toastClassName="bg-morado-300 dark:bg-morado-950 dark:bg-opacity-80 dark:text-white backdrop-blur-sm m-4"

      />
    </body>
  </html>
  )
}
