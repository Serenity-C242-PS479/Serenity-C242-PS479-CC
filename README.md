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

## 📂 Project Structure

```plaintext
├── 📦 node_modules/                     # Node.js dependencies folder
├── 📂 src/                              # Main folder for source code
│   ├── 🗂️ controllers/                  # Folder for controllers
│   │   ├── 🔑 AuthController.js         # Controller for authentication
│   │   └── 🏆 ChallengeController.js    # Controller for challenge features
│   ├── 🔧 helper/                       # Folder for utility/helper functions
│   │   └── 🔑 AuthenticationHelper.js   # Helper for authentication
│   ├── 🏛️ models/                       # Folder for database models
│   │   ├── 🏆 challenges.js             # Model for challenges
│   │   ├── 📜 index.js                  # File for initializing models
│   │   └── 👤 users.js                  # Model for users
│   ├── ✅ validators/                   # Folder for input validation
│   │   ├── 🔑 AuthValidator.js          # Validator for authentication
│   │   └── 🏆 ChallengeValidator.js     # Validator for challenges
│   ├── ⚙️ config.js                     # Configuration file
│   ├── 🌐 routes.js                     # Application routing file
│   └── 🚀 server.js                     # Main file to run the server
├── 🗒️ .env                              # Environment variable file
├── ❌ .gitignore                        # File to specify ignored files for Git
├── 🔒 package-lock.json                 # Lockfile for Node.js dependencies
├── 📦 package.json                      # Node.js project configuration file
├── 📄 README.md                         # Project documentation
└── 🔑 service-account-key.json          # Credential file for Google services
```

## API Endpoints

## 🔑 Authentication

### **1. Register User**
**POST** `/api/v1/register`  
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
**POST** `/api/v1/login`  
Endpoint ini digunakan untuk masuk ke akun yang sudah didaftarkan.

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
    
### **3. JWT Refresh Token**
**POST** `/api/v1/refresh`  
Endpoint ini digunakan untuk merefresh JWT Access Token.

- **Request Body**:
  ```json
  {
    "refreshToken": JWT Refresh Token
  }
  ```
- **Response Body**:
    ```json
    {
    "accessToken": JWT Access Token,
    "status": "success"
    }
    ```

## 👤 Profile

### **1. Get Profile**
**GET** `/api/v1/profile/{{user_id}}`  
Endpoint ini digunakan untuk mendapatkan informasi pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Response Body**:
  ```json
  {
    "status": "success",
    "data": {
        "user_id": 6,
        "name": "My Name",
        "email": "myeail@gmail.com",
        "password": Encrypted Password,
        "age": 25,
        "gender": "Male",
        "photo_profile": null
    }
  }
  ```

### **2. Update Profile**
**PUT** `/api/v1/profile/{{user_id}}`
Endpoint ini digunakan untuk mengupdate informasi pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Request Body (Using Form Data)**:
    ```bash
    name="My New Name"
    email="My New Email"
    password="My New Password"
    age="My New Age"
    gender="My New Gender"
    photo_profile="My New Photo Profile Path"
    ```
- **Response Body**:
  ```json
  {
    "status": "success",
    "data": {
        "user_id": 1,
        "name": "My New Name",
        "email": "mynewemail@gmail.com",
        "password": Encrypted Password,
        "age": 30,
        "gender": "Male",
        "photo_profile": Photo Profile Path
    }
  }
  ```

## 📝 Challenge

### **1. Get Challenge**
**GET** `/api/v1/{{user_id}}/challenges/`  
Endpoint ini digunakan untuk mendapatkan informasi challenge milik pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Response Body**:
  ```json
    {
        "datas": [
            {
                "id": 6,
                "user_id": 3,
                "title": "Challenge 5",
                "start_hour": "11:00:00",
                "end_hour": "18:00:00",
                "status": "On Progress",
                "createdAt": "2024-12-11T16:41:11.929Z",
                "updatedAt": "2024-12-11T16:41:11.929Z"
            },
            {
                "id": 7,
                "user_id": 3,
                "title": "Challenge 5",
                "start_hour": "11:00:00",
                "end_hour": "18:00:00",
                "status": "On Progress",
                "createdAt": "2024-12-11T16:41:13.479Z",
                "updatedAt": "2024-12-11T16:41:13.479Z"
            }
        ],
        "status": "success"
  }

### **2. Create Challenge**
**POST** `/api/v1/{{user_id}}/challenges`
Endpoint ini digunakan untuk membuat challenge kepada pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Request Body (Using Form Data)**:
    ```json
    {
        "user_id": 3,
        "title": "Challenge 5",
        "start_hour": "11:00",
        "end_hour": "18:00",
        "status": "On Progress"
    }
    ```
- **Response Body**:
  ```json
  {
    "status": "success",
  }
  ```

### **3. Update Challenge**
**PUT** `/api/v1/{{user_id}}/challenges/{{challenge_id}}`
Endpoint ini digunakan untuk mengupdate informasi challenge milik pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Request Body (Using Form Data)**:
    ```json
    {
        "title": "No Morning Scroll",
        "start_hour": "07:00",
        "end_hour": "09:00",
        "status": "Passed"
    }
    ```
- **Response Body**:
  ```json
  {
    "status": "success",
  }
  ```

### **4. Delete Challenge**
**DELETE** `/api/v1/{{user_id}}/challenges/{{challenge_id}}`
Endpoint ini digunakan untuk menghapus salah satu challenge milik pengguna.
- **Request Header**:
  ```bash
    Authorization: Bearer <<JWT ACCESS TOKEN>>
  ```
- **Response Body**:
  ```json
  {
    "status": "success",
  }
  ```

## 🐋Deployment
Untuk mendeploy aplikasi ini, gunakan cloud run:

### **1. Google Cloud Shell**
Pastikan sudah clone projek ini dan masuk cloud shell di google console
![image](https://github.com/user-attachments/assets/e3d1ee95-aad8-443b-ab5d-e4bb3496c840)

### **2. Build and Submit the Docker Image**
Gunakan Google Cloud Build to membuat dan push Docker image ke Google Container Registry:

    gcloud builds submit --tag asia-southeast2-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/backend/serenity:1.0.0

### **3. Deploy to Cloud Run**
Deploy container menggunakan Cloud Run:

    gcloud run deploy serenity-backend \
    --image asia-southeast2-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/backend/serenity:1.0.0 \
    --region asia-southeast2 \
    --allow-unauthenticated \
    --add-cloudsql-instances [PROJECT_ID]:[REGION]:[INSTANCE_NAME] \
    --set-env-vars DB_HOST=/cloudsql/[PROJECT_ID]:[REGION]:[INSTANCE_NAME],DB_USER=[DB_USER],DB_PASSWORD=[DB_PASSWORD],DB_NAME=[DB_NAME],GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/iamkey.json,JWT_SECRETKEY=your_jwt_secret_key,JWT_REFRESH_SECRETKEY=your_jwt_refresh_secret_key
    
    GOOGLE_CLOUD_PROJECT            : nama project kamu
    REGION                          : region kamu, misalnya asia-southeast2
    PROJECT_ID                      : id projek kamu
    add-cloudsql-instances          : koneksi db kamu, untuk project ini menggunanakan postgresql
    INSTANCE_NAME                   : nama instance db postgresql kamu
    GOOGLE_APPLICATION_CREDENTIALS  : key iam kamu berupa .json

### **4. Access the API Backend:**
Setelah proses deployment selesai, Google cloud run akan memberikan sebuah link yang bisa digunakan untuk backend aplikasi serenity:
        
    Deployment successful.
    Service URL: https://YOUR_SERVICE_URL/

## License
This project is licensed under the MIT License.
