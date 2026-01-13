import { ethers } from "hardhat";
import { Contract } from "ethers";

async function main(): Promise<void> {
  // Ambil signer
  const [signer] = await ethers.getSigners();
  console.log("👤 Using account:", signer.address);

  // ⬇️ GANTI dengan address hasil deploy kamu
  const CONTRACT_ADDRESS: string = "0xB8AFA47584d1495E064f609D57da5939fd90C8D9";

  // Ambil ContractFactory dan attach ke contract yang sudah ada
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage: Contract = SimpleStorageFactory.attach(CONTRACT_ADDRESS);

  console.log("📦 Contract attached at:", CONTRACT_ADDRESS);

  // =========================
  // SET VALUE
  // =========================
  console.log("✏️ Setting value to 42...");
  const tx = await simpleStorage.setValue(42);
  await tx.wait();
  console.log("✅ Value updated!");

  // =========================
  // GET VALUE
  // =========================
  const value = await simpleStorage.getValue();
  console.log("📖 Current stored value:", value.toString());
}

// Jalankan main dan tangani error
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
