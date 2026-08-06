import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

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

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyA5LOfEsCS0XkKfxiEU8ar5Q5TGLiNtgVQ",

    authDomain: "vijay-events.firebaseapp.com",

    projectId: "vijay-events",

    storageBucket: "vijay-events.firebasestorage.app",

    messagingSenderId: "152156008592",

    appId: "1:152156008592:web:c810eb8f0f7bbe37592815"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export {

    db,
    storage,

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

    ref,
    uploadBytes,
    getDownloadURL

};