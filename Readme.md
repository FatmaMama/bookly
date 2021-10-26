# Bookly
## E-Commerce website

Complete e-commerce website build with MongoDb, Express, Node Js, React Js, Redux


### Env Variables
Create a .env file in the backend folder, in config folder,with name "config.env".
Add your variables :

- PORT 
- NODE_ENV
- FRONTEND_URL
- DB_LOCAL_URI 
- DB_URI 
- JWT_SECRET
- JWT_EXPIRES_TIME 
- COOKIE_EXPIRES_TIME 
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- SMTP_HOST
- SMTP_PORT
- SMTP_EMAIL
- SMTP_PASSWORD
- SMTP_FROM_EMAIL
- SMTP_FROM_NAME


### Install Dependencies (Frontend)

```sh
cd frontend
npm i
```

### Install Dependencies (Backtend)

```sh
npm i
```

### Seed Database
Use the following command to put some dummy books in that database.
Run it in the root folder.

```sh
npm run seeder
```