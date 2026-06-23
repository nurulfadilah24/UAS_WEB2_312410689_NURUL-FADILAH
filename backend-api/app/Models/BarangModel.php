<?php
namespace App\Models;
use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table = 'barang';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nama_barang', 'id_kategori', 'stok', 'harga'];

    // Fungsi khusus untuk menggabungkan tabel barang dan kategori
    public function getBarangLengkap()
    {
        return $this->select('barang.*, kategori.nama_kategori')
                    ->join('kategori', 'kategori.id = barang.id_kategori')
                    ->orderBy('barang.id', 'DESC')
                    ->findAll();
    }
}