const connectBtn = document.getElementById("connectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      // Minta akses wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      addressEl.innerText = account;
      statusEl.innerText = "Connected";

      // Dapatkan chainId
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId === "0xa869") {
        // Avalanche Fuji
        networkEl.innerText = "Avalanche Fuji Testnet";
      } else {
        networkEl.innerText = `Wrong Network (ChainId: ${chainId})`;
      }

      // Dapatkan balance AVAX
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const balance = parseFloat(parseInt(balanceWei, 16) / 1e18).toFixed(4);
      balanceEl.innerText = balance;
    } catch (err) {
      console.error(err);
      statusEl.innerText = "User rejected request";
    }
  } else {
    statusEl.innerText = "Core Wallet not detected";
    alert("Please install Core Wallet extension!");
  }
});
