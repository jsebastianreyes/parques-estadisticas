// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, setDoc, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpn11K5nUhQHN5BikFxoApl3_RLWSKO0",
  authDomain: "game-d6f6f.firebaseapp.com",
  projectId: "game-d6f6f",
  storageBucket: "game-d6f6f.appspot.com",
  messagingSenderId: "429225178203",
  appId: "1:429225178203:web:fdbd7bae060824a9bafb7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const storage = getStorage(app)

export async function addScoreBD(obj){
    try {
        
        await setDoc(doc(db, "players", obj.id), {...obj});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export async function setUpdateProfile(obj){
  // console.log(obj)
  try {
      await setDoc(doc(db, "players", obj.id), {...obj});
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export async function editChampions(player1, player2){
  try {
      
      await setDoc(doc(db, "players", player1.id), {...player1});
      await setDoc(doc(db, "players", player2.id), {...player2});

    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export async function getData(){
  try {
    const players = []
    const querySnapshot = await getDocs(collection(db, "players"));
    querySnapshot.forEach((doc) => {
     players.push(doc.data())
  });
   return players
  } catch (error) {
    console.log(error)
  }
   
}

export async function setUserProfilePhoto(user, file){

  try{
    const imgRef = ref(storage, `images/${user}`)
    const resUpload = await uploadBytes(imgRef, file)
    return resUpload

  }catch(error){
    console.error(error)
  }

}


export async function getProfilePhotoURL(path){
  try {
    const imgRef = ref(storage, path)
    const url = getDownloadURL(imgRef)
    return url 

  } catch (error) {
    console.log(error)
  }
}

