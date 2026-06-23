<?php
namespace App\Models;
use CodeIgniter\Model;

class HistoriModel extends Model
{
    protected $table = 'histori';
    protected $primaryKey = 'id';
    protected $allowedFields = ['tanggal', 'jenis', 'nama_barang', 'jumlah', 'keterangan'];
    protected $useTimestamps = false;
}
