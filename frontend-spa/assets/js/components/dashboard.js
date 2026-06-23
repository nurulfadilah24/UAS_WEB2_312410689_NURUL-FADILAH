// assets/js/components/Dashboard.js
const Dashboard = {
    template: `
        <div class="dashboard-container">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Data Barang</h1>
                <button @click="openModal" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <span>+</span> Tambah Barang
                </button>
            </div>

            <div class="mb-6">
                <input 
                    v-model="searchQuery" 
                    @input="searchItems" 
                    type="text" 
                    placeholder="Cari barang berdasarkan nama atau kategori..." 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-sm text-gray-500">Total Barang</p>
                    <p class="text-2xl font-bold text-gray-800">{{ items.length }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-sm text-gray-500">Total Stok</p>
                    <p class="text-2xl font-bold text-gray-800">{{ totalStock }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-sm text-gray-500">Nilai Total</p>
                    <p class="text-2xl font-bold text-gray-800">Rp {{ totalValue }}</p>
                </div>
                <div class="bg-white rounded-lg shadow p-4">
                    <p class="text-sm text-gray-500">Kategori</p>
                    <p class="text-2xl font-bold text-gray-800">{{ uniqueCategories }}</p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Barang</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Kategori</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Supplier</th>
                                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Stok</th>
                                <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Harga</th>
                                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-if="filteredItems.length === 0">
                                <td colspan="7" class="px-4 py-8 text-center text-gray-500">Belum ada data barang</td>
                            </tr>
                            <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap">{{ item.id }}</td>
                                <td class="px-4 py-3 font-medium">{{ item.name }}</td>
                                <td class="px-4 py-3">
                                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{{ item.category }}</span>
                                </td>
                                <td class="px-4 py-3">{{ item.supplier || '-' }}</td>
                                <td class="px-4 py-3 text-center">
                                    <span class="px-2 py-1 rounded-full text-xs" :class="item.stock <= 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                                        {{ item.stock }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-right">Rp {{ formatPrice(item.price) }}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-center">
                                    <button @click="editItem(item)" class="text-yellow-600 hover:text-yellow-800 mr-2">
                                        <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteItem(item.id)" class="text-red-600 hover:text-red-800">
                                        <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Barang' : 'Tambah Barang' }}</h2>
                    <form @submit.prevent="saveItem">
                        <input type="hidden" v-model="form.id" />
                        
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Barang *</label>
                            <input 
                                v-model="form.name" 
                                type="text" 
                                required 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan nama barang"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                            <select 
                                v-model="form.category" 
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Pilih Kategori</option>
                                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                            <select 
                                v-model="form.supplier" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Pilih Supplier</option>
                                <option v-for="sup in suppliers" :key="sup" :value="sup">{{ sup }}</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Stok *</label>
                            <input 
                                v-model.number="form.stock" 
                                type="number" 
                                required 
                                min="0"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan jumlah stok"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
                            <input 
                                v-model.number="form.price" 
                                type="number" 
                                required 
                                min="0"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan harga barang"
                            />
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea 
                                v-model="form.description" 
                                rows="2"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan deskripsi barang (opsional)"
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
            // Data barang SESUAI DENGAN GAMBAR YANG ANDA KIRIM
            items: [
                { 
                    id: 1, 
                    name: 'Laptop Asus ROG', 
                    category: 'Elektronik',
                    supplier: 'PT. Elektronik Jaya',
                    stock: 15, 
                    price: 15000000,
                    description: ''
                },
                { 
                    id: 2, 
                    name: 'Mouse Wireless Logitech', 
                    category: 'Elektronik',
                    supplier: 'PT. Elektronik Jaya',
                    stock: 30, 
                    price: 350000,
                    description: ''
                },
                { 
                    id: 3, 
                    name: 'Kemeja Pria Lengan Panjang', 
                    category: 'Pakaian',
                    supplier: 'CV. Fashion Modern',
                    stock: 50, 
                    price: 250000,
                    description: ''
                },
                { 
                    id: 4, 
                    name: 'Roti Tawar 500gr', 
                    category: 'Makanan',
                    supplier: 'UD. Sumber Pangan',
                    stock: 20, 
                    price: 18000,
                    description: ''
                },
                { 
                    id: 5, 
                    name: 'Meja Kayu Jati', 
                    category: 'Perabotan',
                    supplier: 'PT. Furniture Indah',
                    stock: 8, 
                    price: 2500000,
                    description: ''
                }
            ],
            searchQuery: '',
            filteredItems: [],
            showModal: false,
            isEditing: false,
            form: {
                id: null,
                name: '',
                category: '',
                supplier: '',
                stock: 0,
                price: 0,
                description: ''
            },
            // Daftar kategori sesuai gambar
            categories: ['Elektronik', 'Pakaian', 'Makanan', 'Perabotan'],
            // Daftar supplier sesuai gambar
            suppliers: ['PT. Elektronik Jaya', 'CV. Fashion Modern', 'UD. Sumber Pangan', 'PT. Furniture Indah']
        };
    },
    computed: {
        totalStock() {
            return this.items.reduce((sum, item) => sum + item.stock, 0);
        },
        totalValue() {
            const total = this.items.reduce((sum, item) => sum + (item.stock * item.price), 0);
            return this.formatPrice(total);
        },
        uniqueCategories() {
            const cats = new Set(this.items.map(item => item.category));
            return cats.size;
        }
    },
    mounted() {
        this.filteredItems = [...this.items];
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('id-ID').format(price);
        },
        openModal() {
            this.isEditing = false;
            this.form = {
                id: null,
                name: '',
                category: '',
                supplier: '',
                stock: 0,
                price: 0,
                description: ''
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        editItem(item) {
            this.isEditing = true;
            this.form = { ...item };
            this.showModal = true;
        },
        saveItem() {
            if (!this.form.name.trim()) {
                alert('Nama barang harus diisi!');
                return;
            }
            if (!this.form.category) {
                alert('Kategori harus dipilih!');
                return;
            }
            if (this.form.stock < 0) {
                alert('Stok tidak boleh negatif!');
                return;
            }
            if (this.form.price < 0) {
                alert('Harga tidak boleh negatif!');
                return;
            }

            if (this.isEditing) {
                const index = this.items.findIndex(item => item.id === this.form.id);
                if (index !== -1) {
                    this.items[index] = { ...this.form };
                }
            } else {
                const newId = Math.max(0, ...this.items.map(item => item.id)) + 1;
                this.items.push({
                    id: newId,
                    name: this.form.name,
                    category: this.form.category,
                    supplier: this.form.supplier || '',
                    stock: this.form.stock,
                    price: this.form.price,
                    description: this.form.description || ''
                });
            }

            this.closeModal();
            this.searchItems();
        },
        deleteItem(id) {
            const item = this.items.find(i => i.id === id);
            if (!item) return;

            if (confirm(`Apakah Anda yakin ingin menghapus barang "${item.name}"?`)) {
                this.items = this.items.filter(i => i.id !== id);
                this.searchItems();
            }
        },
        searchItems() {
            if (!this.searchQuery.trim()) {
                this.filteredItems = [...this.items];
                return;
            }

            const keyword = this.searchQuery.toLowerCase();
            this.filteredItems = this.items.filter(item =>
                item.name.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword) ||
                (item.supplier && item.supplier.toLowerCase().includes(keyword))
            );
        }
    }
};

const DashboardComponent = Dashboard;