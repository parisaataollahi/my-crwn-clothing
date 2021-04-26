import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
        apiKey: "AIzaSyC-K5PDVaH96nOm6oInTyBQV_KTR0BliPA",
        authDomain: "my-crwn-db-ded60.firebaseapp.com",
        projectId: "my-crwn-db-ded60",
        storageBucket: "my-crwn-db-ded60.appspot.com",
        messagingSenderId: "560570935420",
        appId: "1:560570935420:web:db9e93b2453d7e0ba901f9"
      
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    if(!snapShot.exists){
        const {displayName , email}=userAuth;
        const createdAt = new Date();
        
        try{
            await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
            });    
        }catch(error){
                console.log('error creating user',error.message);
        }
    }
return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();
  
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;