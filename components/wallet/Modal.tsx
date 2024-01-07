"use client";
import * as React from "react";
import { Wallet } from "@cosmos-kit/core";
import {
  Box,
  Text,
  Button,
  ConnectModal,
  ConnectModalQRCode,
  ConnectModalHead,
  ConnectModalWalletList,
  ConnectModalWalletListProps,
} from "@interchain-ui/react";

export interface ModalExampleProps {
  wallets?: ConnectModalWalletListProps["wallets"];
}

export function getWalletProp(wallet: Wallet) {
  const { prettyName, mode, name, logo, mobileDisabled } = wallet;
  return {
    name,
    prettyName,
    logo: typeof logo === "object" ? logo.major : logo ?? "",
    mobileDisabled:
      typeof mobileDisabled === "boolean" ? mobileDisabled : mobileDisabled(),
    isMobile: mode === "wallet-connect",
  };
}

export const ModalExample = (props: ModalExampleProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [hasBack, setHasBack] = React.useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const onBack = () => setHasBack(false);
  const onNext = () => setHasBack(true);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button onClick={() => setIsOpen(true)}>Open modal example</Button>

      <ConnectModal
        isOpen={isOpen}
        onClose={onClose}
        header={
          <ConnectModalHead
            title="Select your wallet"
            hasCloseButton
            hasBackButton={hasBack}
            onBack={onBack}
            onClose={onClose}
          />
        }
      >
        {hasBack ? (
          <ConnectModalQRCode
            status="Done"
            link="wc:43529f434fbce35ebc8df08786f70e78f652b7ad45ba1834e5914d8b0dd1e96d@2?relay-protocol=irn&symKey=056b788f4ba347fa65ed0cad68baae3bca1bb5c22d3efc225c7af9e08ad9ddd2"
            description="Open Keplr Mobile App to Scan"
            //   errorTitle={errorTitle}
            //   errorDesc={errorDesc}
            onRefresh={() => {
              console.log("refresh");
            }}
            qrCodeSize={230}
          />
        ) : (
          <ConnectModalWalletList
            wallets={props.wallets ?? []}
            onWalletItemClick={onNext}
          />
        )}
      </ConnectModal>
    </Box>
  );
};