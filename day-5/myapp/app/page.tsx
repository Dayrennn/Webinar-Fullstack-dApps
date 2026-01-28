"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
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
  const { chain, chains, switchNetwork } = useNetwork();

  const [inputValue, setInputValue] = useState("");

  const { data: value, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "getValue",
    chainId: avalancheFuji.id,
  });

  const { data: hash, writeContract } = useWriteContract();

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

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Avalanche Simple Storage dApp</h1>

      {!isConnected ? (
        <button
          onClick={() => connect({ connector: injected() })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4a90e2",
            color: "#fff",
            borderRadius: "0.3rem",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div style={{ marginBottom: "1rem" }}>
          <p>Connected to Avalanche Fuji</p>
          <p>Address: {address}</p>
          <p>Network: {chain?.name}</p>

          {chains.map((c) => (
            <button
              key={c.id}
              onClick={() => switchNetwork?.(c.id)}
              style={{
                marginRight: "0.5rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.2rem",
              }}
            >
              Switch to {c.name}
            </button>
          ))}

          <button
            onClick={() => disconnect()}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#e74c3c",
              color: "#fff",
              borderRadius: "0.3rem",
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      )}

      <div>
        <p>Current Stored Value:</p>
        <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          {value?.toString() ?? "0"}
        </div>

        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new value"
          style={{
            padding: "0.5rem",
            marginRight: "0.5rem",
            borderRadius: "0.3rem",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleSetValue}
          disabled={!isConnected || isPending}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: isPending ? "#f1c40f" : "#2ecc71",
            color: "#fff",
            borderRadius: "0.3rem",
          }}
        >
          {isPending ? "Transaction Pending..." : "Update Value"}
        </button>

        {hash && (
          <div style={{ marginTop: "1rem" }}>
            <a
              href={`https://testnet.snowtrace.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#4a90e2" }}
            >
              View Transaction on Snowtrace
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
