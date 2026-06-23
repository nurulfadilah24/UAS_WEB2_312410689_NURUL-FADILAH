# E-Inventory System - Sistem Manajemen E-Inventory Barang 

# Nama: NuruL Fadilah 
# Nim: 312410689
# Kelas: I241C 
 
Proyek ini dibuat sebagai Tugas Ujian Akhir Semster (UAS) mata kuliah Pemrograman Web 2

---

## Deskripsi Proyek 
E-Inventory (Electronic Inventory) adalah sistem informasi berbasis digital yang digunakan untuk mengelola dan mengawasi persediaan barang secara terkomputerisasi. Sistem ini memungkinkan pengguna untuk mencatat, menyimpan, memperbarui, dan memantau data barang, kategori, supplier, serta stok barang secara lebih cepat, akurat, dan efisien dibandingkan metode manual. Dengan adanya E-Inventory, proses pengelolaan inventaris menjadi lebih terorganisir, meminimalkan kesalahan pencatatan, serta memudahkan penyusunan laporan dan pengambilan keputusan terkait persediaan barang. 

---

## Fitur Aplikasi 

### Authentication
- [x] Login/Logout dengan JWT Token
- [x] Proteksi route (Navigation Guards)
- [x] Auto token injection (Axios Interceptors)
- [x] Auto logout saat token expired (401 Response)

### Manajemen Produk
- [x] CRUD Produk (Tambah, Edit, Hapus)
- [x] Upload gambar produk (bonus)
- [x] Pencarian dan filter produk
- [x] Manajemen stok (Barang Masuk/Keluar)

### Manajemen Kategori
- [x] CRUD Kategori
- [x] Lihat jumlah produk per kategori

### Manajemen Supplier
- [x] CRUD Supplier
- [x] Data kontak supplier

### Dashboard
- [x] Statistik total produk
- [x] Statistik total kategori
- [x] Peringatan stok rendah (< 10)
- [x] Total nilai inventaris
- [x] Daftar produk terbaru

---

## Struktur Database

### Tabel

| No | Tabel | Keterangan |
|----|-------|------------|
| 1 | `users` | Data pengguna (autentikasi) |
| 2 | `suppliers` | Data pemasok barang |
| 3 | `categories` | Data kategori barang |
| 4 | `items` | Data barang (tabel utama) |
| 5 | `incoming_items` | Histori barang masuk |
| 6 | `outgoing_items` | Histori barang keluar |

---

## Setup Database 
- Buat Database 
Buka phpMyAdmin http://localhost/phpmyadmin, lalu jalankan: CREATE DATABASE uas_inventory;

- Import Database 
Import file database/uas_inventory.sql ke phpMyAdmin, atau jalankan di tab SQL: USE uas_inventory;

- Setup Backend (CodeIgniter 4)
cd backend-api
composer install
cp env .env

- Edit File .env
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost:8080/'

database.default.hostname = localhost
database.default.database = uas_inventory
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi

JWT_SECRET = 'your_secret_key_here'

- Generate Key
php spark key:generate

- Jalankan Server
php spark serve --port=8080
Server akan berjalan di: http://localhost:8080

--- 

## Login 
Username: admin 
Password admin123

--- 

## Screenshots 

### Halaman Login 


### Dashboard 


### Manajemen Produk 



### Modal Tambah/Edit Produk 



### Manajemen Kategori 



### Database Schema (phpMyAdmin)


---

- Link Youtube: 
- Link Github: 
- Akses Login: 
- Akses Dashboard