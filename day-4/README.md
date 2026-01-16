# Day 4 – Backend API NestJS (Avalanche)

📘 **Avalanche Indonesia Short Course – Day 4**

Backend Layer untuk Full Stack dApp menggunakan **NestJS** dan **viem** untuk membaca data blockchain Avalanche Fuji.  
Backend berfungsi sebagai **UX enabler**: aggregator data blockchain, API untuk frontend, dan layer performa, tanpa menggantikan smart contract.

---

## 🎯 Tujuan Pembelajaran

- Memahami peran backend dalam arsitektur dApp
- Memahami mental model backend Web3
- Menggunakan NestJS sebagai backend framework
- Menggunakan viem di backend (read-only)
- Menghubungkan backend dengan smart contract
- Mendesain API Web2-like di atas data blockchain
- Mengelola event, caching, dan indexing sederhana
- Membedakan on-chain vs off-chain responsibility

---

## 🧩 Studi Kasus

**Avalanche Simple Full Stack dApp – Backend Layer**

Backend berfungsi sebagai:

- Aggregator data blockchain
- API untuk frontend
- Layer performa & UX

> **Catatan:** Smart contract tetap menjadi source of truth.

---

## ⚙️ Struktur Folder

```bash
day-4/
└── backend/
│ ├── blockchain.module.ts
│ ├── blockchain.service.ts
│ ├── blockchain.controller.ts
│ └── simple-storage.abi.ts
├── src/
| └── backend/
| | ├── blockchain.module.ts
│ | ├── blockchain.service.ts
│ | ├── blockchain.controller.ts
│ | └── simple-storage.abi.ts
| └── app.controller.ts
| ├── app.module.ts
| ├── app.service.ts
| └── main.ts
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ └── blockchain/
│
├── package.json
├── Blockchain API.postman_collection.json
├── tsconfig.json
└── nest-cli.json

```
