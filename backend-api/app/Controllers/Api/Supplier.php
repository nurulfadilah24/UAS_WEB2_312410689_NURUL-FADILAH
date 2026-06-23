<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class Supplier extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        return $this->respond((new SupplierModel())->findAll());
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        if ((new SupplierModel())->insert($data))
            return $this->respondCreated(['status' => true, 'message' => 'Supplier ditambahkan']);
        return $this->fail('Gagal menyimpan supplier');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if ((new SupplierModel())->update($id, $data))
            return $this->respond(['status' => true, 'message' => 'Supplier diupdate']);
        return $this->fail('Gagal mengupdate supplier');
    }

    public function delete($id = null)
    {
        if ((new SupplierModel())->delete($id))
            return $this->respondDeleted(['status' => true]);
        return $this->failNotFound('Supplier tidak ditemukan');
    }
}
