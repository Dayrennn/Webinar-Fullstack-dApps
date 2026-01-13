import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/+esm";

const CONTRACT_ADDRESS = "0x1234....";
const ABI = ["function count() view returns (uint256)", "function increment()"];

let signer;
let contract;

document.getElementById("connect").onclick = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  document.getElementById("address").innerText = await signer.getAddress();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  updateCount();
};

document.getElementById("increment").onclick = async () => {
  const tx = await contract.increment();
  await tx.wait();
  updateCount();
};

async function updateCount() {
  const count = await contract.count();
  document.getElementById("count").innerText = count.toString();
}
