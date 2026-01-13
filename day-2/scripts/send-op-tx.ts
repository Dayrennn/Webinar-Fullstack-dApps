import { ethers } from "hardhat";
import { Contract } from "ethers";

// Ganti dengan address contract hasil deploy
const CONTRACT_ADDRESS: string = "0xB8AFA47584d1495E064f609D57da5939fd90C8D9";

async function main(): Promise<void> {
  const [signer] = await ethers.getSigners();
  console.log("🧑‍🚀 Using account:", signer.address);

  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage: Contract = SimpleStorageFactory.attach(CONTRACT_ADDRESS);

  // Kirim transaksi setValue
  console.log("✍️ Sending transaction setValue(42)...");
  const tx = await simpleStorage.setValue(42); // ethers v6: tx adalah TransactionResponse
  await tx.wait(1); // tunggu 1 konfirmasi

  console.log("✅ Value updated!");
  console.log("🔗 Tx hash:", tx.hash);

  // Ambil value dari contract
  const value = await simpleStorage.getValue();
  console.log("📦 Stored value:", value.toString());
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
