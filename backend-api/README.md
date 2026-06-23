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
<img width="1365" height="720" alt="image" src="https://github.com/user-attachments/assets/83f3377c-9ccf-427f-8286-d355e9535796" />


### Dashboard 
<img width="1365" height="680" alt="image" src="https://github.com/user-attachments/assets/5644d16c-3348-4811-ad4b-dbb3cc9b150c" />


### Manajemen kategori 
<img width="1365" height="685" alt="image" src="https://github.com/user-attachments/assets/6c4f2f3c-b877-40cb-a510-7f70706c2d4f" />


### Manajemen Supplier
<img width="1358" height="672" alt="image" src="https://github.com/user-attachments/assets/1b4f8b7b-eea9-4d93-8216-251f4cccf880" />


### Histori Aktivitas
<img width="1365" height="724" alt="image" src="https://github.com/user-attachments/assets/834850a4-52f6-4a07-b428-8632a5f513fc" />

<img width="1346" height="676" alt="image" src="https://github.com/user-attachments/assets/0c4b6f38-e671-471d-b6a5-c64b72897ac5" />


### About
<img width="1350" height="682" alt="image" src="https://github.com/user-attachments/assets/1d0591c7-6f87-4bda-aabb-563fea42c451" />


## Logout
<img width="189" height="144" alt="image" src="https://github.com/user-attachments/assets/5eda2028-caf1-49f9-8075-c6c8dc99913e" />



### Modal Tambah/Edit Produk/Hapus 
<img width="340" height="493" alt="image" src="https://github.com/user-attachments/assets/301c295d-cc77-4cd0-9ea5-a1b628f967dc" />

<img width="342" height="500" alt="image" src="https://github.com/user-attachments/assets/98e1d33d-48ae-4b52-8550-9fec73ff3f37" />

<img width="449" height="170" alt="image" src="https://github.com/user-attachments/assets/49928d21-32a9-489f-812f-972581625a5e" />
 


### Database Schema (phpMyAdmin)
<img width="1176" height="404" alt="image" src="https://github.com/user-attachments/assets/77d390a8-03f6-4088-a10b-e86ac87a75a2" />

<img width="1179" height="507" alt="image" src="https://github.com/user-attachments/assets/5dd05f16-a642-4f95-b907-837ca18487dc" />

<img width="1179" height="474" alt="image" src="https://github.com/user-attachments/assets/ea1f2616-9f42-47ae-b5b8-1caf94e9ce42" />

<img width="1182" height="474" alt="image" src="https://github.com/user-attachments/assets/8e88c834-8042-45f7-b4f3-d25dd8238ab4" />

<img width="1176" height="639" alt="image" src="https://github.com/user-attachments/assets/fd1fd655-40db-4fa8-81ae-00022277040a" />




---

- Link Youtube: https://youtu.be/vQQJQONivBc?si=XuOp4MQwdLA7pVeo 
- Link Github: 
- Akses Login:http://localhost/UAS_WEB_2_NURUL/frontend-spa/#/login  
