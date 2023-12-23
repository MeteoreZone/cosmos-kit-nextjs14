'use client';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import "@interchain-ui/react/styles";
import { CosmosKitProvider } from '@/app/CosmosKitProvider';
import {
  useTheme
} from "@interchain-ui/react";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

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
    <body className={` ${inter.className}  text-black dark:text-white  bg-gradient-to-b from-gray-100 to-gray-200 dark:from-[#4B3765] dark:to-[#231C2D]`}>
      <CosmosKitProvider>
        <div className="flex justify-end items-center p-4 absolute top-4 right-4 ">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-700  dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        {children}
      </CosmosKitProvider>
    </body>
  </html>
  )
}
