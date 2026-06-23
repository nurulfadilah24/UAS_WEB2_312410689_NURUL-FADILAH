// assets/js/components/Histori.js
const Histori = {
    template: `
        <div class="histori-container">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Histori Aktivitas</h1>
            </div>

            <!-- Filter Buttons -->
            <div class="flex flex-wrap gap-2 mb-4">
                <button 
                    v-for="filter in filters" 
                    :key="filter.value"
                    @click="setFilter(filter.value)"
                    class="px-4 py-2 rounded-lg transition"
                    :class="currentFilter === filter.value ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
                >
                    {{ filter.label }}
                </button>
            </div>

            <!-- Search Bar -->
            <div class="mb-6">
                <input 
                    v-model="searchQuery" 
                    @input="searchHistory" 
                    type="text" 
                    placeholder="Cari histori berdasarkan aktivitas atau barang..." 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow text-center">
                    <span class="block text-sm text-gray-500">Total Aktivitas</span>
                    <span class="block text-2xl font-bold text-gray-800">{{ filteredHistory.length }}</span>
                </div>
                <div class="bg-white p-4 rounded-lg shadow text-center">
                    <span class="block text-sm text-gray-500">Barang Masuk</span>
                    <span class="block text-2xl font-bold text-green-600">{{ getTypeCount('masuk') }}</span>
                </div>
                <div class="bg-white p-4 rounded-lg shadow text-center">
                    <span class="block text-sm text-gray-500">Barang Keluar</span>
                    <span class="block text-2xl font-bold text-red-600">{{ getTypeCount('keluar') }}</span>
                </div>
                <div class="bg-white p-4 rounded-lg shadow text-center">
                    <span class="block text-sm text-gray-500">Update Data</span>
                    <span class="block text-2xl font-bold text-yellow-600">{{ getTypeCount('update') }}</span>
                </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-800 text-white">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Waktu</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Aktivitas</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Barang</th>
                                <th class="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Jumlah</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                                <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-if="paginatedHistory.length === 0">
                                <td colspan="8" class="px-4 py-8 text-center text-gray-500">Tidak ada histori yang ditemukan</td>
                            </tr>
                            <tr v-for="history in paginatedHistory" :key="history.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap">{{ history.id }}</td>
                                <td class="px-4 py-3 whitespace-nowrap">{{ history.date }}</td>
                                <td class="px-4 py-3 whitespace-nowrap">{{ history.time }}</td>
                                <td class="px-4 py-3 whitespace-nowrap">
                                    <span class="px-2 py-1 rounded-full text-xs font-semibold" :class="getBadgeClass(history.type)">
                                        {{ getTypeLabel(history.type) }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 font-medium">{{ history.item }}</td>
                                <td class="px-4 py-3 text-center">{{ history.quantity }}</td>
                                <td class="px-4 py-3">{{ history.user }}</td>
                                <td class="px-4 py-3">{{ history.note || '-' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-between items-center mt-4">
                <span class="text-sm text-gray-600">
                    Menampilkan {{ startIndex + 1 }} - {{ Math.min(endIndex, filteredHistory.length) }} dari {{ filteredHistory.length }} data
                </span>
                <div class="flex gap-2">
                    <button 
                        @click="prevPage" 
                        :disabled="currentPage === 1"
                        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sebelumnya
                    </button>
                    <span class="px-4 py-2 bg-purple-600 text-white rounded-lg">
                        {{ currentPage }}
                    </span>
                    <button 
                        @click="nextPage" 
                        :disabled="currentPage === totalPages"
                        class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            allHistory: [
                { id: 1, date: '2026-06-21', time: '08:30:15', type: 'masuk', item: 'Laptop Asus', quantity: 5, user: 'Admin', note: 'Pembelian dari PT. Elektronik Jaya' },
                { id: 2, date: '2026-06-21', time: '09:15:42', type: 'keluar', item: 'Mouse Wireless', quantity: 3, user: 'Staff Gudang', note: 'Permintaan dari departemen IT' },
                { id: 3, date: '2026-06-20', time: '14:20:30', type: 'update', item: 'Monitor 24 inch', quantity: 2, user: 'Admin', note: 'Update harga barang' },
                { id: 4, date: '2026-06-20', time: '10:05:18', type: 'masuk', item: 'Keyboard Mechanical', quantity: 10, user: 'Admin', note: 'Pembelian dari CV. Tech Solutions' },
                { id: 5, date: '2026-06-19', time: '16:45:55', type: 'hapus', item: 'Kabel USB-C', quantity: 5, user: 'Admin', note: 'Barang kadaluarsa' },
                { id: 6, date: '2026-06-19', time: '11:30:20', type: 'keluar', item: 'Harddisk External', quantity: 2, user: 'Staff Gudang', note: 'Pengiriman ke cabang Bandung' },
                { id: 7, date: '2026-06-18', time: '13:15:40', type: 'masuk', item: 'Printer Canon', quantity: 4, user: 'Admin', note: 'Pembelian dari UD. Sumber Pangan' },
                { id: 8, date: '2026-06-18', time: '09:00:10', type: 'update', item: 'Mouse Pad', quantity: 20, user: 'Admin', note: 'Update stok setelah pengecekan' },
                { id: 9, date: '2026-06-17', time: '15:20:33', type: 'keluar', item: 'Headphone Gaming', quantity: 3, user: 'Staff Gudang', note: 'Permintaan dari divisi marketing' },
                { id: 10, date: '2026-06-17', time: '10:45:22', type: 'masuk', item: 'Smartphone Samsung', quantity: 8, user: 'Admin', note: 'Pembelian dari PT. Elektronik Jaya' },
                { id: 11, date: '2026-06-16', time: '08:30:00', type: 'update', item: 'Baterai Laptop', quantity: 6, user: 'Admin', note: 'Update stok setelah restock' },
                { id: 12, date: '2026-06-16', time: '14:10:45', type: 'masuk', item: 'Flashdisk 32GB', quantity: 25, user: 'Admin', note: 'Pembelian dari CV. Fashion Modern' }
            ],
            filteredHistory: [],
            searchQuery: '',
            currentFilter: 'all',
            currentPage: 1,
            itemsPerPage: 5,
            filters: [
                { value: 'all', label: 'Semua' },
                { value: 'masuk', label: 'Barang Masuk' },
                { value: 'keluar', label: 'Barang Keluar' },
                { value: 'update', label: 'Update' },
                { value: 'hapus', label: 'Hapus' }
            ]
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredHistory.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return Math.min(this.startIndex + this.itemsPerPage, this.filteredHistory.length);
        },
        paginatedHistory() {
            return this.filteredHistory.slice(this.startIndex, this.endIndex);
        }
    },
    mounted() {
        this.filteredHistory = [...this.allHistory];
    },
    methods: {
        setFilter(filter) {
            this.currentFilter = filter;
            this.currentPage = 1;
            this.applyFilters();
        },
        applyFilters() {
            let result = [...this.allHistory];
            
            // Apply type filter
            if (this.currentFilter !== 'all') {
                result = result.filter(h => h.type === this.currentFilter);
            }
            
            // Apply search filter
            if (this.searchQuery.trim()) {
                const keyword = this.searchQuery.toLowerCase();
                result = result.filter(h =>
                    h.item.toLowerCase().includes(keyword) ||
                    this.getTypeLabel(h.type).toLowerCase().includes(keyword) ||
                    h.note.toLowerCase().includes(keyword)
                );
            }
            
            this.filteredHistory = result;
        },
        searchHistory() {
            this.currentPage = 1;
            this.applyFilters();
        },
        getTypeLabel(type) {
            const labels = {
                'masuk': 'Barang Masuk',
                'keluar': 'Barang Keluar',
                'update': 'Update Data',
                'hapus': 'Hapus Data'
            };
            return labels[type] || type;
        },
        getBadgeClass(type) {
            const classes = {
                'masuk': 'bg-green-100 text-green-800',
                'keluar': 'bg-red-100 text-red-800',
                'update': 'bg-yellow-100 text-yellow-800',
                'hapus': 'bg-gray-100 text-gray-800'
            };
            return classes[type] || '';
        },
        getTypeCount(type) {
            return this.filteredHistory.filter(h => h.type === type).length;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
};

// Register component
const HistoriComponent = Histori;