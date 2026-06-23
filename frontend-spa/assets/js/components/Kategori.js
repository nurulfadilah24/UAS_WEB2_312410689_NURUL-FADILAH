// assets/js/components/Kategori.js
const Kategori = {
    template: `
        <div class="kategori-container">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Manajemen Kategori</h1>
                <button @click="openModal" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <span>+</span> Tambah Kategori
                </button>
            </div>

            <!-- Search Bar -->
            <div class="mb-6">
                <input 
                    v-model="searchQuery" 
                    @input="searchCategories" 
                    type="text" 
                    placeholder="Cari kategori..." 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <!-- Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Kategori</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Deskripsi</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jumlah Barang</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr v-if="filteredCategories.length === 0">
                            <td colspan="5" class="px-6 py-4 text-center text-gray-500">Belum ada kategori</td>
                        </tr>
                        <tr v-for="category in filteredCategories" :key="category.id" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">{{ category.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap font-medium">{{ category.name }}</td>
                            <td class="px-6 py-4">{{ category.description || '-' }}</td>
                            <td class="px-6 py-4 text-center">
                                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{{ category.itemCount }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <button @click="editCategory(category)" class="text-yellow-600 hover:text-yellow-800 mr-3">
                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-800">
                                    <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Kategori' : 'Tambah Kategori' }}</h2>
                    <form @submit.prevent="saveCategory">
                        <input type="hidden" v-model="form.id" />
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                            <input 
                                v-model="form.name" 
                                type="text" 
                                required 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan nama kategori"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea 
                                v-model="form.description" 
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Masukkan deskripsi kategori"
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
            // ==========================================
            // DATA KATEGORI SESUAI GAMBAR YANG ANDA KIRIM
            // ==========================================
            categories: [
                { 
                    id: 1, 
                    name: 'Elektronik', 
                    description: 'Perangkat elektronik dan gadget', 
                    itemCount: 45 
                },
                { 
                    id: 2, 
                    name: 'Pakaian', 
                    description: 'Pakaian pria, wanita, dan anak-anak', 
                    itemCount: 120 
                },
                { 
                    id: 3, 
                    name: 'Makanan', 
                    description: 'Makanan dan minuman kemasan', 
                    itemCount: 78 
                },
                { 
                    id: 4, 
                    name: 'Perabotan', 
                    description: 'Perabotan rumah tangga', 
                    itemCount: 34 
                }
            ],
            searchQuery: '',
            filteredCategories: [],
            showModal: false,
            isEditing: false,
            form: {
                id: null,
                name: '',
                description: ''
            }
        };
    },
    mounted() {
        this.filteredCategories = [...this.categories];
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.form = { id: null, name: '', description: '' };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.form = { id: null, name: '', description: '' };
        },
        editCategory(category) {
            this.isEditing = true;
            this.form = { ...category };
            this.showModal = true;
        },
        saveCategory() {
            if (!this.form.name.trim()) {
                alert('Nama kategori harus diisi!');
                return;
            }

            if (this.isEditing) {
                const index = this.categories.findIndex(c => c.id === this.form.id);
                if (index !== -1) {
                    this.categories[index].name = this.form.name;
                    this.categories[index].description = this.form.description;
                }
            } else {
                const newId = Math.max(0, ...this.categories.map(c => c.id)) + 1;
                this.categories.push({
                    id: newId,
                    name: this.form.name,
                    description: this.form.description,
                    itemCount: 0
                });
            }

            this.closeModal();
            this.searchCategories();
        },
        deleteCategory(id) {
            const category = this.categories.find(c => c.id === id);
            if (!category) return;

            if (category.itemCount > 0) {
                alert(`Kategori "${category.name}" masih memiliki ${category.itemCount} barang. Tidak dapat dihapus!`);
                return;
            }

            if (confirm(`Apakah Anda yakin ingin menghapus kategori "${category.name}"?`)) {
                this.categories = this.categories.filter(c => c.id !== id);
                this.searchCategories();
            }
        },
        searchCategories() {
            if (!this.searchQuery.trim()) {
                this.filteredCategories = [...this.categories];
                return;
            }

            const keyword = this.searchQuery.toLowerCase();
            this.filteredCategories = this.categories.filter(cat =>
                cat.name.toLowerCase().includes(keyword) ||
                (cat.description && cat.description.toLowerCase().includes(keyword))
            );
        }
    }
};

const KategoriComponent = Kategori;