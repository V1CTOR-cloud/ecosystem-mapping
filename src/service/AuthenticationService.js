import { auth } from "../Firebase/firebase";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Services from "./EcosystemMapServices";

function signInWithGoogle(callback){
    let google_provider = new GoogleAuthProvider();
      signInWithPopup(auth,google_provider)
      .then((res) => {      
       Services.addUser(res)
        callback(true)
      })
      .catch((err) => {
        console.log(err);
        callback(false)
      });
}
function isLoggedIn(){
   let user =  JSON.parse(sessionStorage.getItem("user"))
   if(user){
       return true
   }
   return false
}
function userLogOut(){
  auth.signOut();
  sessionStorage.removeItem("user");
}
function getCurrentUser(){
  let user =  JSON.parse(sessionStorage.getItem("user"))
  if(user){
    return user
}
return null
}
export{
    signInWithGoogle,isLoggedIn,userLogOut,getCurrentUser
}