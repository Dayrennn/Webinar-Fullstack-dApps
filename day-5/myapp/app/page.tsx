"use client";

import { useState, useEffect } from "react";
// Di bagian import page.tsx, ganti menjadi:
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useReadContract, // Ganti dari useContractRead
  useWriteContract, // Ganti dari useContractWrite
  useWaitForTransactionReceipt, // Ganti dari useWaitForTransaction
} from "wagmi";
import { injected } from "wagmi/connectors"; // Ganti dari InjectedConnector
import { avalancheFuji } from "wagmi/chains";

const CONTRACT_ADDRESS = "0x815Eb8fB6606fae56a1c9c8d31A13fCce703787c";
const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: "getValue",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_value", type: "uint256" }],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function Page() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [inputValue, setInputValue] = useState("");

  // Wagmi v2: useReadContract
  const { data: value, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "getValue",
    chainId: avalancheFuji.id,
  });

  // Wagmi v2: useWriteContract
  const { data: hash, writeContract } = useWriteContract();

  // Wagmi v2: useWaitForTransactionReceipt
  const { isLoading: isPending, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setInputValue("");
    }
  }, [isSuccess, refetch]);

  const handleSetValue = () => {
    if (!inputValue) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "setValue",
      args: [BigInt(inputValue)],
    });
  };

  // Ganti bagian return di page.tsx dengan yang ini:
  return (
    <main>
      <h1>Avalanche Simple Storage dApp</h1>
      {!isConnected ? (
        <button
          className="connect-button"
          onClick={() => connect({ connector: injected() })}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="connection-status">
          <p>Connected to Avalanche Fuji</p>
          <p className="connected-address">{address}</p>
          <button className="disconnect-button" onClick={() => disconnect()}>
            Disconnect Wallet
          </button>
        </div>
      )}

      <div>
        <p>Current Stored Value:</p>
        <div className="storage-value">{value?.toString() ?? "0"}</div>

        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new value"
        />

        <button
          onClick={handleSetValue}
          disabled={!isConnected || isPending}
          className={isPending ? "pending" : ""}
        >
          {isPending ? "Transaction Pending..." : "Update Value"}
        </button>

        {hash && (
          <a
            className="tx-link"
            href={`https://testnet.snowtrace.io/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            View Transaction on Snowtrace
          </a>
        )}
      </div>
    </main>
  );
}
