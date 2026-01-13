async function main() {
  const [signer] = await ethers.getSigners();

  console.log("👤 Using account:", signer.address);

  // ⬇️ GANTI dengan address hasil deploy kamu
  const CONTRACT_ADDRESS = "0xB8AFA47584d1495E064f609D57da5939fd90C8D9";

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = SimpleStorage.attach(CONTRACT_ADDRESS);

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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
