import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    signOut, 
    getAuth, 
    signInWithEmailAndPassword } from "firebase/auth";
import { 
    addDoc, 
    getFirestore, 
    collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAicBYglNS_B2iskKnCL1tyoOWklpM_R2g",
  authDomain: "netflix-clone-133f6.firebaseapp.com",
  projectId: "netflix-clone-133f6",
  storageBucket: "netflix-clone-133f6.firebasestorage.app",
  messagingSenderId: "610521556075",
  appId: "1:610521556075:web:489d8e2f895b6c51b37d2e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local", 
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}