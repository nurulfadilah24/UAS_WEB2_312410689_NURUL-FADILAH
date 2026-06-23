<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        return $this->respond((new KategoriModel())->findAll());
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        if ((new KategoriModel())->insert($data))
            return $this->respondCreated(['status' => true, 'message' => 'Kategori ditambahkan']);
        return $this->fail('Gagal menyimpan kategori');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if ((new KategoriModel())->update($id, $data))
            return $this->respond(['status' => true, 'message' => 'Kategori diupdate']);
        return $this->fail('Gagal mengupdate kategori');
    }

    public function delete($id = null)
    {
        if ((new KategoriModel())->delete($id))
            return $this->respondDeleted(['status' => true]);
        return $this->failNotFound('Kategori tidak ditemukan');
    }
}
