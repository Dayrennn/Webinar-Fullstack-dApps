# Day 2 – Learning Notes: Deploy SimpleStorage di Avalanche Fuji Testnet

# Tujuan Belajar

Hari ini fokus memahami:

- Bagaimana smart contract di-compile dan deploy menggunakan Hardhat
- Bagaimana cara verifikasi contract di Snowtrace
- Cara mendapatkan contract address dan ABI JSON
- Cara memantau event contract di explorer

---

# Refleksi Pengerjaan

1. Compile Contract

- Contract: `SimpleStorage.sol`
- Compiler: `0.8.28`, optimizer ON, runs 1000
- Hasil: berhasil compile tanpa error
- Catatan: versi compiler harus sama dengan pragma di contract, kalau tidak HH606 error

2. Deploy ke Avalanche Fuji

- Script deploy: `deploy.js`
- Network: Fuji Testnet
- Account: PRIVATE_KEY dari .env
- Hasil: contract berhasil di-deploy
- Contract address tersimpan: `0xfE5532fD22b55bA61cD4e30f84B2c09a5379026A`
- Insight: deploy ke testnet bisa dicek balance AVAX testnet dulu untuk menghindari gagal

3. Verify Contract di Snowtrace

- Tujuan: supaya tab Write Contract muncul
- Status: belum sukses karena SNOWTRACE_API_KEY belum diisi
- Catatan: verifikasi wajib agar bisa interaksi fungsi `setValue()` / `setMessage()` via explorer

4. ABI JSON

- Lokasi: `artifacts/contracts/SimpleStorage.sol/SimpleStorage.json`
- Bagian `"abi"` dicatat untuk Day 3
- Insight: ABI penting untuk menghubungkan frontend dengan smart contract

5. Event di Explorer

- Event yang ada: `OwnerSet`, `ValueUpdated`, `MessageUpdated`
- Bisa dilihat setelah memanggil fungsi contract
- Insight: Event memudahkan tracking perubahan state di blockchain tanpa harus query semua data

---

Checklist Belajar – Task 3

| Item                            | Status | Catatan                               |
| ------------------------------- | ------ | ------------------------------------- |
| Contract berhasil compile       | ✅     | `0.8.20` + optimizer 1000             |
| Contract berhasil deploy        | ✅     | Address dicatat                       |
| Address tersimpan di blockchain | ✅     | Bisa dicek di Snowtrace               |
| ABI tersedia                    | ✅     | Di `artifacts/.../SimpleStorage.json` |
| Event terlihat di explorer      | ⬜     | Pending verifikasi                    |

---
