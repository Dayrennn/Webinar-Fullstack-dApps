import { ethers } from "hardhat";

async function main(): Promise<void> {
  // Ambil signer (akun deployer)
  const [deployer] = await ethers.getSigners();

  console.log("🚀 Deploying with account:", deployer.address);

  // Ambil contract factory
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // Deploy contract
  const simpleStorage = await SimpleStorage.deploy();

  // Tunggu hingga deployment selesai
  await simpleStorage.waitForDeployment();

  // Tampilkan alamat contract
  console.log(
    "📦 SimpleStorage deployed to:",
    await simpleStorage.getAddress()
  );
}

// Jalankan main dan tangani error
main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
