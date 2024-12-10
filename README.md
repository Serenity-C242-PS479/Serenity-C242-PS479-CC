# Serenity-C242-PS479-CC

## Dependency Version Used

- Node.js (20.18.0)
- Node Package Manager (10.9.0)
- PostgreSQL (17.0)
- Google Cloud Storage (7.14.0)
- Hapi (21.3.12)
- Hapi Auth JWT-2 (10.7.0)
- Sequelize (6.37.5)
- Joi (17.13.3)
- Nodemon (3.1.7)

## 🚀 Cara Setup Project

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan proyek:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Serenity-C242-PS479/Serenity-C242-PS479-CC.git serenity-backend
    cd serenity-backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Environment Variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    DB_NAME=serenity_db
    DB_USER=serenityadmin
    DB_PASSWORD=serenitypassword
    DB_HOST=127.0.0.1
    DB_PORT=5432
    JWT_SECRETKEY=serenitysecretkey
    JWT_REFRESH_SECRETKEY=serenityrefreshsecretkey
    GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
    ```

4. **Service Account Key:**

    Obtain your Firebase service account key file from the Google Cloud IAM and place it in the root directory of the project. Rename it to `service-account-key.json`.

5. **Running the Application:**

    ```bash
    node src/server.js
    ```

    The application should now be running on `http://localhost:3000`.

## 📂 Struktur Direktori

```plaintext
├── node_modules/                     # Folder dependensi Node.js
├── src/                              # Folder utama untuk kode sumber
│   ├── controllers/                  # Folder untuk controller
│   │   ├── AuthController.js         # Controller untuk autentikasi
│   │   └── ChallengeController.js    # Controller untuk fitur tantangan
│   ├── helper/                       # Folder untuk fungsi/helper pendukung
│   │   └── AuthenticationHelper.js   # Helper untuk autentikasi
│   ├── models/                       # Folder untuk model database
│   │   ├── challenges.js             # Model untuk tantangan
│   │   ├── index.js                  # File untuk inisialisasi model
│   │   └── users.js                  # Model untuk pengguna
│   ├── validators/                   # Folder untuk validasi input
│   │   ├── AuthValidator.js          # Validator untuk autentikasi
│   │   └── ChallengeValidator.js     # Validator untuk tantangan
│   ├── config.js                     # File konfigurasi aplikasi
│   ├── routes.js                     # File routing aplikasi
│   └── server.js                     # File utama untuk menjalankan server
├── .env                              # File untuk variabel lingkungan
├── .gitignore                        # File untuk menentukan file yang diabaikan oleh Git
├── package-lock.json                 # File kunci dependensi Node.js
├── package.json                      # File konfigurasi proyek Node.js
├── README.md                         # Dokumentasi proyek
└── service-account-key.json          # File kredensial untuk layanan Google
```

## API Endpoints

## 🔑 Authentication

### **1. Register User**
**POST** `/register`  
Endpoint ini digunakan untuk mendaftarkan pengguna baru.

- **Request Body**:
  ```json
  {
    "name": "My Name",
    "email": "myemail@gmail.com",
    "password": "mypassword",
    "age": 25,
    "gender": "Male"
  }
  ```
- **Response Body**:
    ```json
    {
      "data": {
          "user_id": 1,
          "name": "My Name",
          "email": "myemail@gmail.com",
          "password": Encrypted Password,
          "age": 25,
          "gender": "Male",
          "photo_profile": null
      },
      "status": "success"
    }
    ```
### **2. Login User**
**POST** `/login`  
Endpoint ini digunakan untuk mendaftarkan pengguna baru.

- **Request Body**:
  ```json
  {
    "email": "myemail@gmail.com",
    "password": "mypassword"
  }
  ```
- **Response Body**:
    ```json
    {
      "data": {
          "user_id": 1,
          "name": "My Name",
          "email": "myemail@gmail.com",
          "password": Encrypted Password,
          "age": 25,
          "gender": "Male",
          "photo_profile": null
      },
    "accessToken": JWT Access Token,
    "refreshToken": JWT Refresh Token,
      "status": "success"
    }
    ```
 
### Profile

- **POST `/register`**: Registers a new user.
    - Request: `{ "email": "user@example.com", "password": "password123", "name": "John Doe", "username": "johndoe" }`
    - Response: `{ "error": false, "message": "User registered successfully" }`

- **POST `/login`**: Logs in a user.
    - Request: `{ "email": "user@example.com", "password": "password123" }`
    - Response: `{ "error": false, "message": "success", "loginResult": { "username": "johndoe", "name": "John Doe", "token": "jwt_token", "userID": "user_id" } }`

### Challenge

- **POST `/stories`**: Adds a new story. Requires JWT authentication.
    - Request: Form data with fields `storyTitle`, `storyDescription`, `lat`, `lon`, and `photo`.
    - Response: `{ "error": false, "message": "success", "storyID": "story_id" }`

- **GET `/stories`**: Retrieves all stories.
    - Request: Query parameters `page`, `size`, and `location`.
    - Response: `{ "error": false, "message": "Stories fetched successfully", "listStory": [...] }`
