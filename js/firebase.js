import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

/*==============================
FIRESTORE
==============================*/

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    increment,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

/*==============================
AUTHENTICATION
==============================*/

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

/*==============================
STORAGE
==============================*/

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

/*==============================
CONFIG
==============================*/

const firebaseConfig = {

    apiKey: "AIzaSyA5LOfEsCS0XkKfxiEU8ar5Q5TGLiNtgVQ",

    authDomain: "vijay-events.firebaseapp.com",

    projectId: "vijay-events",

    storageBucket: "vijay-events.firebasestorage.app",

    messagingSenderId: "152156008592",

    appId: "1:152156008592:web:c810eb8f0f7bbe37592815"

};

/*==============================
INITIALIZE
==============================*/

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

/*==============================
EXPORTS
==============================*/

export {

    // Firebase Services
    db,
    storage,
    auth,

    // Firestore
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    increment,
    deleteDoc,

    // Storage
    ref,
    uploadBytes,
    getDownloadURL,

    // Authentication
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

};