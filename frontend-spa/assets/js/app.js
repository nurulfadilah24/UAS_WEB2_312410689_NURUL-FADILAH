// 1. Definisikan susunan routing aplikasi
const routes = [
    // Halaman Login (Pastikan nama komponennya sesuai dengan yang ada di Login.js, biasanya 'Login')
    { path: '/login', component: Login },

    // Jika data barang Anda menggunakan path /dashboard
    { path: '/dashboard', component: Dashboard }, 
    
    // Hubungkan path URL dengan komponen-komponen lainnya
    { path: '/kategori', component: Kategori },
    { path: '/supplier', component: Supplier },
    { path: '/histori', component: Histori },
    { path: '/about', component: About },
    
    // Redirect otomatis ke halaman dashboard jika user mengetik alamat kosong
    { path: '/', redirect: '/dashboard' }
];

// 2. Buat instance router dengan konfigurasi Hash History
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes,
});

// 3. Inisialisasi dan jalankan aplikasi Vue Anda
const app = Vue.createApp({
    data() {
        return {
            // Default diubah sesuai alur login aplikasi Anda, jika ingin langsung masuk set ke true
            isLoggedIn: true 
        }
    },
    methods: {
        logout() {
            // A. Mengubah status login menjadi false agar Sidebar otomatis tersembunyi
            this.isLoggedIn = false;
            
            // B. Mengarahkan URL browser langsung kembali ke halaman login
            this.$router.push('/login'); 
        }
    }
});

// 4. Hubungkan router ke dalam aplikasi Vue, lalu pasang ke elemen #app
app.use(router);
app.mount('#app');