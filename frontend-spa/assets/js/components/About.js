// assets/js/components/About.js
const About = {
    template: `
        <div class="about-container max-w-6xl mx-auto">
            <div class="text-center mb-10">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Tentang E-INVENTORY</h1>
                <p class="text-lg text-gray-600">Sistem Manajemen Inventaris Berbasis Web</p>
            </div>

            <!-- Main Card -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
                <div class="text-6xl mb-4">📦</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-3">Apa itu E-INVENTORY?</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">
                    E-INVENTORY adalah sistem manajemen inventaris yang dirancang untuk 
                    membantu bisnis dalam mengelola data barang, kategori, supplier, dan 
                    histori transaksi secara efisien dan terorganisir.
                </p>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                    <div class="text-4xl mb-3"></div>
                    <h3 class="font-bold text-gray-800 mb-2">Manajemen Data Barang</h3>
                    <p class="text-sm text-gray-600">Kelola data barang dengan mudah, lengkap dengan jumlah stok, harga, dan informasi penting lainnya.</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                    <div class="text-4xl mb-3"></div>
                    <h3 class="font-bold text-gray-800 mb-2">Kategori & Supplier</h3>
                    <p class="text-sm text-gray-600">Organisir barang berdasarkan kategori dan kelola data supplier untuk memudahkan pembelian.</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                    <div class="text-4xl mb-3"></div>
                    <h3 class="font-bold text-gray-800 mb-2">Histori Aktivitas</h3>
                    <p class="text-sm text-gray-600">Pantau semua aktivitas inventaris seperti barang masuk, keluar, update, dan penghapusan.</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
                    <div class="text-4xl mb-3"></div>
                    <h3 class="font-bold text-gray-800 mb-2">Keamanan Data</h3>
                    <p class="text-sm text-gray-600">Sistem dilengkapi dengan autentikasi pengguna untuk menjaga keamanan data inventaris.</p>
                </div>
            </div>

            <!-- Information Sections -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="font-bold text-lg text-gray-800 mb-4 border-b-2 border-purple-600 pb-2">Informasi Sistem</h3>
                    <ul class="space-y-2 text-sm">
                        <li><span class="font-semibold">Nama Aplikasi:</span> E-INVENTORY</li>
                        <li><span class="font-semibold">Versi:</span> 1.0.0</li>
                        <li><span class="font-semibold">Teknologi:</span> Vue.js 3, Tailwind CSS</li>
                        <li><span class="font-semibold">Database:</span> Local Storage / JSON</li>
                        <li><span class="font-semibold">Lisensi:</span> Open Source</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="font-bold text-lg text-gray-800 mb-4 border-b-2 border-purple-600 pb-2">Tim Pengembang</h3>
                    <ul class="space-y-2 text-sm">
                        <li><span class="font-semibold">Frontend Developer:</span> Tim E-INVENTORY</li>
                        <li><span class="font-semibold">UI/UX Designer:</span> Tim E-INVENTORY</li>
                        <li><span class="font-semibold">Project Manager:</span> Tim E-INVENTORY</li>
                        <li><span class="font-semibold">Backend Developer:</span> Tim E-INVENTORY</li>
                    </ul>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="font-bold text-lg text-gray-800 mb-4 border-b-2 border-purple-600 pb-2">Kontak & Dukungan</h3>
                    <ul class="space-y-2 text-sm">
                        <li><span class="font-semibold">Email:</span> support@e-inventory.com</li>
                        <li><span class="font-semibold">Website:</span> www.e-inventory.com</li>
                        <li><span class="font-semibold">Telepon:</span> (021) 1234-5678</li>
                        <li><span class="font-semibold">Alamat:</span> Jl. Teknologi No. 45, Jakarta</li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center py-6 border-t border-gray-200">
                <p class="text-gray-600">© 2026 E-INVENTORY. All rights reserved.</p>
                <p class="text-sm text-gray-500 mt-1">Built with  using Vue.js & Tailwind CSS</p>
            </div>
        </div>
    `
};

// Register component
const AboutComponent = About;