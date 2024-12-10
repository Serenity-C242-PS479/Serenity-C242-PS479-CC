# Serenity-C242-PS479-CC

## How To Setup This Project
1. Clone this repository
2. Enter to the directory and npm install
3. Create .env file

Fill the .env file:

`DB_NAME =`

`DB_USER =`

`DB_PASSWORD =`

`DB_HOST =`

`DB_PORT =`

`JWT_SECRETKEY =`

`JWT_REFRESH_SECRETKEY =`

## 📂 Struktur Direktori

```plaintext
├── node_modules/                # Folder dependensi Node.js
├── src/                         # Folder utama untuk kode sumber
│   ├── controllers/             # Folder untuk controller
│   │   ├── AuthController.js    # Controller untuk autentikasi
│   │   └── ChallengeController.js  # Controller untuk fitur tantangan
│   ├── helper/                  # Folder untuk fungsi/helper pendukung
│   │   └── AuthenticationHelper.js # Helper untuk autentikasi
│   ├── models/                  # Folder untuk model database
│   │   ├── challenges.js        # Model untuk tantangan
│   │   ├── index.js             # File untuk inisialisasi model
│   │   └── users.js             # Model untuk pengguna
│   ├── validators/              # Folder untuk validasi input
│   │   ├── AuthValidator.js     # Validator untuk autentikasi
│   │   └── ChallengeValidator.js # Validator untuk tantangan
│   ├── config.js                # File konfigurasi aplikasi
│   ├── routes.js                # File routing aplikasi
│   └── server.js                # File utama untuk menjalankan server
├── .env                         # File untuk variabel lingkungan
├── .gitignore                   # File untuk menentukan file yang diabaikan oleh Git
├── package-lock.json            # File kunci dependensi Node.js
├── package.json                 # File konfigurasi proyek Node.js
├── README.md                    # Dokumentasi proyek
└── service-account-key.json     # File kredensial untuk layanan Google
