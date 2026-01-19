# Webinar Fullstack dApps - Day 5 (Frontend)

Selamat datang di **Day-5** dari Webinar Fullstack dApps.  
Di hari terakhir ini, fokusnya adalah **frontend** untuk **Avalanche Fuji Testnet dApp** yang terhubung dengan kontrak sederhana (`SimpleStorage`) menggunakan **Next.js** dan **Wagmi**.

---

## 📝 Deskripsi Project

- **Stack**:
  - Next.js 13 (App Router / TypeScript)
  - Tailwind CSS
  - Wagmi v2 + InjectedConnector / Gemini Wallet
  - Ethers.js
- **Fitur**:
  - Connect Wallet (MetaMask / Core Wallet / Gemini Wallet)
  - Read / Write ke kontrak `SimpleStorage`
  - Auto-refresh saat transaksi sukses
  - Tampilkan Tx Hash dengan link ke Snowtrace Testnet
  - Validasi koneksi wallet dan pending transaksi

---

## ⚡ Konfigurasi Avalanche Fuji Testnet

- **Network Name**: Avalanche Fuji Testnet
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Chain ID**: 43113
- **Currency Symbol**: AVAX
- **Block Explorer URL**: https://testnet.snowtrace.io/

---

## 🚀 Instalasi dan Jalankan

1. Clone repository:

```bash
git clone https://github.com/username/webinar-fullstack-dapps-day5.git
cd webinar-fullstack-dapps-day5/myapp
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

3. Buka di browser

```bash
http://localhost:3000
```

## Cara Menggunakan dApp

1. Klik Connect Wallet (MetaMask / Core Wallet / Gemini Wallet)
2. Masukkan angka pada input field
3. Klik Update Value untuk menulis kontrak
4. Lihat nilai terbaru dan Tx Hash muncul di halaman

```bash
day-5/
│
├─ backend/                 # Backend NestJS / Blockchain API
│   ├─ dist/                # Hasil build
│   ├─ node_modules/
│   ├─ src/
│   │   ├─ blokchain/       # Modul blockchain
│   │   │   ├─ blokchain.controller.ts
│   │   │   ├─ blokchain.module.ts
│   │   │   ├─ blokchain.service.ts
│   │   │   └─ simple_storage.abi.ts
│   │   ├─ app.controller.spec.ts
│   │   ├─ app.controller.ts
│   │   ├─ app.module.ts
│   │   ├─ app.service.ts
│   │   └─ main.ts           # Entry point backend
│   ├─ test/
│   ├─ .env
│   ├─ .gitignore
│   ├─ package.json
│   ├─ tsconfig.build.json
│   ├─ tsconfig.json
│   ├─ README.md
│   └─ ...config & lint files
│
└─ myapp/                   # Frontend Next.js
    ├─ .next/
    ├─ app/
    │   ├─ favicon.ico
    │   ├─ globals.css
    │   ├─ layout.tsx
    │   ├─ page.tsx
    │   └─ providers.tsx
    ├─ node_modules/
    ├─ public/
    ├─ .env.local
    ├─ .gitignore
    ├─ next.config.js
    ├─ package.json
    ├─ tsconfig.json
    └─ README.md


```
