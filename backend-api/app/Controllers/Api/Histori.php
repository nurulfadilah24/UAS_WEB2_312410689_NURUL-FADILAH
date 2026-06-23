<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\HistoriModel;

class Histori extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        return $this->respond((new HistoriModel())->orderBy('id', 'DESC')->findAll());
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        if (!isset($data['tanggal'])) {
            $data['tanggal'] = date('Y-m-d H:i:s');
        }
        if ((new HistoriModel())->insert($data))
            return $this->respondCreated(['status' => true, 'message' => 'Histori ditambahkan']);
        return $this->fail('Gagal menyimpan histori');
    }

    public function delete($id = null)
    {
        if ((new HistoriModel())->delete($id))
            return $this->respondDeleted(['status' => true]);
        return $this->failNotFound('Histori tidak ditemukan');
    }
}
