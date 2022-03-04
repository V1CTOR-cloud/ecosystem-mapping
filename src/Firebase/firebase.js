 //import firebase   from 'firebase'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
  const firebaseConfig = {
    apiKey: "AIzaSyDq9SUlRQhU5Rtljg0s2wfCVKgAOT-420M",
    authDomain: "startup-commons.firebaseapp.com",
    databaseURL: "https://startup-commons.firebaseio.com",
    projectId: "startup-commons",
    storageBucket: "startup-commons.appspot.com",
    messagingSenderId: "799010509327",
    appId: "1:799010509327:web:78cc1dfae9095af579497a"
  };

const app=initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app ,auth} 