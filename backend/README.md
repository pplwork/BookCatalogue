# Backend

This Directory is the backend for the [BookCatalogue](https://bookcatalogue-pplwork.netlify.app/) Website.

The [backend](https://bookcatalogue-pplwork.herokuapp.com/books) is built using NodeJS(Express-TypeScript) and Firebase/Firebase Storage is used as the database/storage.

## Setup
For the sake of this project i have saved the Firebase Service Worker credentials file in a json file. You need to replace this file with your own credentials.

For Better Security i would recommend storing the credentials in enviroment variables.

Steps for setting up credentials in environment variables:
1) Create a `.env` file in the root folder.
2) Create the required variables (`PROJECT_ID`,`PRIVATE_KEY_ID`,`PRIVATE_KEY` ...etc)
3) Replace the following code fragment 
```
import * as serviceAccount from "./bookproject-dfb00-firebase-adminsdk-2c6k6-154712943f.json"; // change this json file to your own if not using environment variables
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), 
});
```
with
```
admin.initializeApp({
  credential: admin.credential.cert(
{
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.CLIENT_CERT_URL
} as admin.ServiceAccount), 
});
```

To Run Locally : `npm install && npm start`



## Interfaces

Book : `{
title:string,
year:number,
image:string,
description:string,
id:string}`

## Routes

#### Books ('/books')
Fetches data from firestore and Returns `Book[]`.


### BookInfo ('/books/:id')
Fetches data from firestore using the `id` param and Returns `Book`.

