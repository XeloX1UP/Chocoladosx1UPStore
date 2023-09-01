import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCIUT_ULvXRb66CX9ozuKArjNeCbHG_xnc",
  authDomain: "chocoladosx1up.firebaseapp.com",
  databaseURL: "https://chocoladosx1up-default-rtdb.firebaseio.com",
  projectId: "chocoladosx1up",
  storageBucket: "chocoladosx1up.appspot.com",
  messagingSenderId: "614798901733",
  appId: "1:614798901733:web:08c6b06b399a2d116a2f0c",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
