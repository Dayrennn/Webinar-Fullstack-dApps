"use client";

import "./style.css";
import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";

const CONTRACT_ADDRESS = "0x815Eb8fB6606fae56a1c9c8d31A13fCce703787c"; // address contrct

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
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const [inputValue, setInputValue] = useState("");

  // READ CONTRACT
  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "getValue",
  });

  // WRITE CONTRACT
  const {
    data: hash,
    writeContract,
    isPending: isWriting,
    error: writeError,
  } = useWriteContract();

  // WAIT FOR TRANSACTION (Task 4: UX Feedback)
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Auto-refresh saat transaksi sukses
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setInputValue("");
    }
  }, [isConfirmed, refetch]);

  const handleSetValue = () => {
    if (!inputValue) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "setValue",
      args: [BigInt(inputValue)],
    });
  };

  return (
    <main className="main-container">
      <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-zinc-900 shadow-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Avalanche dApp Day 3
          </h1>
          <p className="text-gray-500 text-sm">Simple Storage Interaction</p>
        </div>

        {/* WALLET SECTION */}
        <section className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
          {!isConnected ? (
            <button
              onClick={() => connect({ connector: injected() })}
              disabled={isConnecting}
              className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              {isConnecting ? "Opening Core Wallet..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase text-zinc-500 font-bold">
                  Connected Wallet
                </p>
                <p className="font-mono text-xs text-orange-400">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
              <button
                onClick={() => disconnect()}
                className="text-xs text-red-500 hover:underline"
              >
                Disconnect
              </button>
            </div>
          )}
        </section>

        {/* DISPLAY VALUE SECTION */}
        <section className="text-center py-4">
          <p className="text-sm text-zinc-400">Current Stored Value</p>
          <div className="text-5xl font-black my-2">
            {isReading ? (
              <span className="animate-pulse text-zinc-700">...</span>
            ) : (
              value?.toString() || "0"
            )}
          </div>
          <button
            onClick={() => refetch()}
            className="text-xs text-zinc-500 hover:text-white transition"
          >
            ↻ Tap to refresh
          </button>
        </section>

        {/* ACTION SECTION */}
        <section className="space-y-3">
          <input
            type="number"
            placeholder="Enter new number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-orange-500 transition"
          />
          <button
            onClick={handleSetValue}
            disabled={isWriting || isConfirming || !isConnected}
            className="w-full bg-orange-600 disabled:bg-zinc-700 text-white font-bold py-3 rounded-lg hover:bg-orange-500 transition"
          >
            {isWriting
              ? "Sign in Wallet..."
              : isConfirming
              ? "Confirming on Chain..."
              : "Update Value"}
          </button>

          {/* FEEDBACK UX (Task 4 & 5) */}
          {hash && (
            <p className="text-[10px] text-center text-zinc-500 break-all">
              Tx Hash:{" "}
              <a
                href={`https://testnet.snowtrace.io/tx/${hash}`}
                target="_blank"
                className="underline"
              >
                {hash}
              </a>
            </p>
          )}
          {writeError && (
            <p className="text-xs text-red-500 text-center">
              Error:{" "}
              {writeError.message.includes("User rejected")
                ? "Transaction Rejected"
                : "Failed to write"}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
