"use client";
import { useState, useEffect,useMemo, ReactNode } from "react";
import { useChain, useWallet } from "@cosmos-kit/react";

// import { chainName } from "@/config/defaults"

const chainName = "osmosistestnet";

export interface ConnectProps {
  children?: ReactNode;
}

export const Connect = (props: ConnectProps) => {

  const { username, address, connect, disconnect, wallet, openView } = useChain(
    chainName
  );
  const { status: globalStatus, mainWallet } = useWallet(); // status here is the global wallet status for all activated chains (chain is activated when call useChain)

  
  useEffect(() => {
    const initConnection = async () => {
      await mainWallet?.connect();
    };

    initConnection();
  }, []);

  const connectionButton = useMemo(() => {
    const handleDisconnect = async () => {
      await disconnect();
    };

    if (globalStatus === "Connecting") {
      return (
        <button
          className="bg-morado-900 hover:bg-morado-600 text-sm text-white font-bold p-3 rounded-md mr-2 "
          onClick={() => connect()}
        >
          {`Connecting...`}
        </button>
      );
    }
    if (globalStatus === "Connected") {
      return (
        <>
          <button
            onClick={() => openView()}
            className="bg-morado-900 hover:bg-morado-600 text-sm text-white font-bold p-3 rounded-md "
          >
            {username}
          </button>

          <button
            className="bg-morado-900 hover:bg-morado-600 text-sm text-white font-bold p-3 rounded-md mr-2"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </>
      );
    }

    return (
      <button
        className="bg-morado-900 hover:bg-morado-600 text-sm text-white font-bold p-3 rounded-md mr-2 "
        onClick={() => connect()}
      >
        Connect
      </button>
    );
  }, [
    connect,
    disconnect,
    globalStatus,
    openView,
    username,
    wallet?.prettyName
  ]);

  return (
    <>
        {connectionButton}
         {props.children}
    </>
  );
};
