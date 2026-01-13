async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("🚀 Deploying with account:", deployer.address);

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.waitForDeployment();

  console.log(
    "📦 SimpleStorage deployed to:",
    await simpleStorage.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
