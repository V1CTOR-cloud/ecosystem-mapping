//import firebase   from 'firebase'
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'

const {
    REACT_APP_DEV_API_KEY,
    REACT_APP_DEV_AUTH_DOMAIN,
    REACT_APP_DEV_DATABASE_URL,
    REACT_APP_DEV_PROJECT_ID,
    REACT_APP_DEV_STORAGE_BUCKET,
    REACT_APP_DEV_MESSAGING_SENDER_ID,
    REACT_APP_DEV_DEV_APP_ID,
    REACT_APP_DEV_DEV_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_DEV_API_KEY,
    authDomain: REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: REACT_APP_DEV_DATABASE_URL,
    projectId: REACT_APP_DEV_PROJECT_ID,
    storageBucket: REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_DEV_MESSAGING_SENDER_ID,
    appId: REACT_APP_DEV_DEV_APP_ID,
    measurementId: REACT_APP_DEV_DEV_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth} 