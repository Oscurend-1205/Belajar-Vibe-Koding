# 📋 Project Planning: Elysia REST API

> **Tech Stack:** Bun + ElysiaJS + Drizzle ORM + MySQL  
> **Tanggal:** 15 April 2026  
> **Status:** 🟡 In Progress

---

## 🎯 Tujuan

Membuat REST API backend menggunakan **ElysiaJS** (framework Bun) dengan **Drizzle ORM** untuk koneksi ke database **MySQL**. API ini akan menjadi pondasi backend yang bisa dipakai untuk berbagai frontend (web, mobile, dll).

---

## 📁 Struktur Folder

```
elysia-app/
├── src/
│   ├── index.ts          # Entry point, setup Elysia server
│   ├── db/
│   │   ├── schema.ts     # Definisi tabel (Drizzle schema)
│   │   ├── index.ts      # Koneksi database
│   │   └── migrate.ts    # Script untuk jalankan migrasi
│   ├── routes/
│   │   ├── users.ts      # Route CRUD users
│   │   └── health.ts     # Route health check
│   └── middleware/
│       └── errorHandler.ts  # Global error handling
├── drizzle/              # Folder migrasi (auto-generated)
├── drizzle.config.ts     # Config Drizzle Kit
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🔧 Tahapan Pengerjaan

### Phase 1: Setup Project ✅

- [x] Inisialisasi project dengan `bun init`
- [x] Install dependencies:
  - `elysia`, `@elysiajs/cors`, `@elysiajs/swagger`
  - `drizzle-orm`, `mysql2`
  - `drizzle-kit` (dev dependency)

### Phase 2: Konfigurasi Database

- [ ] Buat file `.env` berisi konfigurasi koneksi MySQL:
  ```
  DATABASE_HOST=localhost
  DATABASE_PORT=3306
  DATABASE_USER=root
  DATABASE_PASSWORD=
  DATABASE_NAME=elysia_app
  ```
- [ ] Buat file `src/db/index.ts` → setup koneksi MySQL pakai `mysql2` + Drizzle
- [ ] Buat file `drizzle.config.ts` → konfigurasi Drizzle Kit untuk generate migrasi

### Phase 3: Definisi Schema & Migrasi

- [ ] Buat schema tabel `users` di `src/db/schema.ts` dengan kolom:
  - `id` (auto increment)
  - `name` (varchar)
  - `email` (varchar, unique)
  - `password` (varchar)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
- [ ] Generate migrasi dengan `bunx drizzle-kit generate`
- [ ] Jalankan migrasi dengan `bunx drizzle-kit push`

### Phase 4: Setup Server & Middleware

- [ ] Buat entry point `src/index.ts`:
  - Inisialisasi Elysia
  - Tambahkan plugin CORS & Swagger
  - Pasang error handler global
  - Listen di port dari `.env` (default 3000)
- [ ] Buat middleware `errorHandler.ts` untuk menangkap error dan return response JSON yang konsisten

### Phase 5: Buat Routes CRUD

- [ ] Buat `src/routes/health.ts`:
  - `GET /health` → return status server + koneksi DB
- [ ] Buat `src/routes/users.ts` (CRUD lengkap):
  - `GET /users` → ambil semua user
  - `GET /users/:id` → ambil user by ID
  - `POST /users` → buat user baru (dengan validasi input)
  - `PUT /users/:id` → update user
  - `DELETE /users/:id` → hapus user

### Phase 6: Validasi & Response Format

- [ ] Gunakan fitur validasi bawaan Elysia (`t.Object`, `t.String`, dll) untuk validasi body request
- [ ] Standarkan format response JSON:
  ```json
  {
    "success": true,
    "message": "...",
    "data": { ... }
  }
  ```

### Phase 7: Testing & Dokumentasi

- [ ] Pastikan Swagger UI bisa diakses di `/swagger`
- [ ] Test semua endpoint pakai Swagger atau Postman
- [ ] Tambahkan script di `package.json`:
  ```json
  {
    "scripts": {
      "dev": "bun run --watch src/index.ts",
      "db:generate": "bunx drizzle-kit generate",
      "db:push": "bunx drizzle-kit push",
      "db:studio": "bunx drizzle-kit studio"
    }
  }
  ```

---

## 📌 Catatan Penting

1. **Jangan lupa buat database** `elysia_app` di MySQL sebelum menjalankan migrasi
2. **File `.env` jangan di-commit** ke Git → sudah ada di `.gitignore`
3. **Gunakan `bun run --watch`** untuk auto-reload saat development
4. **Swagger UI** otomatis tersedia untuk dokumentasi & testing API
5. Untuk menambah tabel baru, cukup:
   - Tambah schema di `src/db/schema.ts`
   - Jalankan `bun run db:generate` lalu `bun run db:push`

---

## 🚀 Cara Menjalankan

```bash
# 1. Pastikan MySQL sudah jalan & database sudah dibuat
# 2. Copy .env.example ke .env dan isi konfigurasi
# 3. Push schema ke database
bun run db:push

# 4. Jalankan server
bun run dev

# 5. Buka Swagger UI di browser
# http://localhost:3000/swagger
```
