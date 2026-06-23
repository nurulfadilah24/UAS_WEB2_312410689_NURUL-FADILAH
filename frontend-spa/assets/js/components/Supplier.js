// components/Supplier.js

const Supplier = {
    template: `
        <div class="supplier-container">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Manajemen Supplier</h1>
                <button @click="openModal" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <span>+</span> Tambah Supplier
                </button>
            </div>

            <div class="mb-6">
                <input 
                    v-model="searchQuery" 
                    @input="searchSuppliers" 
                    type="text" 
                    placeholder="Cari supplier..." 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Supplier</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kontak</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Alamat</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-if="filteredSuppliers.length === 0">
                            <td colspan="5" class="px-6 py-4 text-center text-gray-500">Belum ada supplier</td>
                        </tr>
                        <tr v-for="supplier in filteredSuppliers" :key="supplier.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">{{ supplier.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap font-medium">{{ supplier.nama_supplier }}</td>
                            <td class="px-6 py-4">{{ supplier.kontak || '-' }}</td>
                            <td class="px-6 py-4">{{ supplier.alamat || '-' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button @click="editSupplier(supplier)" class="text-yellow-600 hover:text-yellow-800 mr-3">
                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="deleteSupplier(supplier.id)" class="text-red-600 hover:text-red-800">
                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Supplier' : 'Tambah Supplier' }}</h2>
                    <form @submit.prevent="saveSupplier">
                        <input type="hidden" v-model="form.id" />
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Supplier</label>
                            <input 
                                v-model="form.nama_supplier" 
                                type="text" 
                                required 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan nama supplier"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Kontak</label>
                            <input 
                                v-model="form.kontak" 
                                type="text" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan nomor kontak"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                            <textarea 
                                v-model="form.alamat" 
                                rows="2"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan alamat"
                            ></textarea>
                        </div>
                        <div class="flex justify-end gap-2">
                            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                                Batal
                            </button>
                            <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            // Data disesuaikan 100% dengan properti database PHPMyAdmin Anda
            suppliers: [
                { 
                    id: 1, 
                    nama_supplier: 'CV. Kopdar', 
                    kontak: '08123456789', 
                    alamat: 'Jl. Mawar No. 12, Jakarta' 
                },
                { 
                    id: 2, 
                    nama_supplier: 'CV. ELKTR', 
                    kontak: '08987654321', 
                    alamat: 'Jl. Melati No. 5, Bandung' 
                },
                { 
                    id: 3, 
                    nama_supplier: 'PT. Maju Selalu', 
                    kontak: '0214567890', 
                    alamat: 'Jl. Sudirman No. 99, Surabaya' 
                }
            ],
            searchQuery: '',
            filteredSuppliers: [],
            showModal: false,
            isEditing: false,
            form: {
                id: null,
                nama_supplier: '',
                kontak: '',
                alamat: ''
            }
        };
    },
    mounted() {
        this.filteredSuppliers = [...this.suppliers];
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.form = { id: null, nama_supplier: '', kontak: '', alamat: '' };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.form = { id: null, nama_supplier: '', kontak: '', alamat: '' };
        },
        editSupplier(supplier) {
            this.isEditing = true;
            this.form = { ...supplier };
            this.showModal = true;
        },
        saveSupplier() {
            if (!this.form.nama_supplier.trim()) {
                alert('Nama supplier harus diisi!');
                return;
            }

            if (this.isEditing) {
                const index = this.suppliers.findIndex(s => s.id === this.form.id);
                if (index !== -1) {
                    this.suppliers[index] = { ...this.form };
                }
            } else {
                const newId = Math.max(0, ...this.suppliers.map(s => s.id)) + 1;
                this.suppliers.push({
                    id: newId,
                    nama_supplier: this.form.nama_supplier,
                    kontak: this.form.kontak || '',
                    alamat: this.form.alamat || ''
                });
            }

            this.closeModal();
            this.searchSuppliers();
        },
        deleteSupplier(id) {
            const supplier = this.suppliers.find(s => s.id === id);
            if (!supplier) return;

            if (confirm(`Apakah Anda yakin ingin menghapus supplier "${supplier.nama_supplier}"?`)) {
                this.suppliers = this.suppliers.filter(s => s.id !== id);
                this.searchSuppliers();
            }
        },
        searchSuppliers() {
            if (!this.searchQuery.trim()) {
                this.filteredSuppliers = [...this.suppliers];
                return;
            }

            const keyword = this.searchQuery.toLowerCase();
            this.filteredSuppliers = this.suppliers.filter(sup =>
                sup.nama_supplier.toLowerCase().includes(keyword) ||
                (sup.kontak && sup.kontak.includes(keyword)) ||
                (sup.alamat && sup.alamat.toLowerCase().includes(keyword))
            );
        }
    }
};

// REGISTER KOMPONEN
window.Supplier = Supplier;