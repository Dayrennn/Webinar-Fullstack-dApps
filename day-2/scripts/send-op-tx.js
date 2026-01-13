const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xB8AFA47584d1495E064f609D57da5939fd90C8D9";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("🧑‍🚀 Using account:", signer.address);

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = SimpleStorage.attach(CONTRACT_ADDRESS);

  console.log("✍️ Sending transaction setValue(42)...");
  const tx = await simpleStorage.setValue(42);
  await tx.wait();

  console.log("✅ Value updated!");
  console.log("🔗 Tx hash:", tx.hash);

  const value = await simpleStorage.getValue();
  console.log("📦 Stored value:", value.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
