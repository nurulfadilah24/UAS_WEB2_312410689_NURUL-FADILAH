<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class Barang extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        return $this->respond((new BarangModel())->getBarangLengkap());
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        if ((new BarangModel())->insert($data)) return $this->respondCreated(['status' => true, 'message' => 'Barang ditambahkan']);
        return $this->fail('Gagal menyimpan barang');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if ((new BarangModel())->update($id, $data)) return $this->respond(['status' => true, 'message' => 'Barang diedit']);
        return $this->fail('Gagal mengedit barang');
    }

    public function delete($id = null)
    {
        if ((new BarangModel())->delete($id)) return $this->respondDeleted(['status' => true]);
        return $this->failNotFound('Barang tidak ditemukan');
    }
}