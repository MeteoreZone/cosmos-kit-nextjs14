"use client";
import { useState, useEffect, useMemo, ReactNode } from "react";
import { useChain, useWallet } from "@cosmos-kit/react";
const chainName = "osmosistestnet";

export interface ConnectProps {
  children?: ReactNode;
}

export const Connect = (props: ConnectProps) => {
  const { username, address, connect, disconnect, wallet, openView } =
    useChain(chainName);
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
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md "
          onClick={() => connect()}
        >
          {`Connecting...`}
        </button>
      );
    }
    if (globalStatus === "Connected") {
      return (
        <div>
          <button
            onClick={() => openView()}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md mr-2"
          >
            {username}
          </button>

          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      );
    }

    return (
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md "
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
    wallet?.prettyName,
  ]);

  return (
    <div>
      {connectionButton}
      {props.children}
    </div>
  );
};
