import React from "react"

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBgxnV_AGydX3z2SNAzpH66qNmyKHvoKs4",
  authDomain: "schoolapp-c2f68.firebaseapp.com",
  databaseURL: "https://schoolapp-c2f68-default-rtdb.firebaseio.com",
  projectId: "schoolapp-c2f68",
  storageBucket: "schoolapp-c2f68.appspot.com",
  messagingSenderId: "217519489759",
  appId: "1:217519489759:web:1b26607449f211cf4b1f6a",
  measurementId: "G-NZ1WHRQ6QL"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getDatabase(app)

export const storage = getStorage(app)

export const firestore = getFirestore(app)


