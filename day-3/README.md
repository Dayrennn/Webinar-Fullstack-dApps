# Avalanche Indonesia Short Course – Day 3

Overview
Hari ketiga fokus pada **Frontend dApp dengan Next.js**.  
Frontend berfungsi sebagai **UI & UX layer** untuk berinteraksi dengan smart contract yang sudah dideploy sebelumnya.

> Smart contract tetap menjadi **single source of truth**. Frontend tidak menyimpan logic bisnis atau state penting.

---

Tujuan Hari Ini

- Paham peran frontend di arsitektur dApp
- Mengerti mental model Web3 frontend (user → wallet → blockchain → frontend)
- Bisa menghubungkan wallet (Reown) ke Next.js
- Memahami alternatif wallet framework (Thirdweb)
- Load ABI & contract address
- Melakukan read & write ke smart contract
- Handle status transaksi: loading, success, error

---

Studi Kasus
**Avalanche Simple Full Stack dApp – Frontend Layer**

Frontend berperan sebagai:

- UI interaksi user
- Penghubung wallet ↔ smart contract
- State management UX transaksi

---

---

Catatan Praktik / Homework

- Connect wallet & tampilkan wallet address + network status
- Load ABI & contract address, panggil read function → tampilkan value
- Panggil write function → input value, handle loading/error
- Optional: improve UX, handle failure, refresh value setelah transaction sukses
- Kesulitan pada wagmi yang ga pernah mau adil, code menyuruh menggunakan wagmi sedangkan wagmi selalu error

---

## 🔑 Output Hari Ini

- Frontend Next.js terhubung ke wallet
- Smart contract bisa di-read & write
- Peserta memahami:
  - Web3 frontend berbeda Web2 frontend
  - Wallet & transaction flow
  - UX transaksi blockchain
  - Contract = source of truth

---
