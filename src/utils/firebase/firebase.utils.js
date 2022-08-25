import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuzQymDymZi_z-2bzJLelwwHwY8uRj9IU",
    authDomain: "crwn-clothing-db-10f8d.firebaseapp.com",
    projectId: "crwn-clothing-db-10f8d",
    storageBucket: "crwn-clothing-db-10f8d.appspot.com",
    messagingSenderId: "1054075509494",
    appId: "1:1054075509494:web:dcade3e96e056fefe1ead7"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters ({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {  }) => {
    const userDocRef = doc(db,"users",userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date()
      try {
        await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
      } catch (error) {
        console.log("error message created by user", error.message)
      }

    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}