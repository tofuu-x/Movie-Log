import { createContext,useContext,useEffect,useState } from "react"
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth"
import { auth,db } from "../../firebase"
import { doc,getDoc } from "firebase/firestore"



const AuthContext=createContext()

export function useAuth(){
  return useContext(AuthContext)
}


export function AuthProvider(props){
  const {children}=props
  const [globalUser,setGlobalUser]=useState(null)
  const [globalData,setGlobalData]=useState(null)

  function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
  }

  function signIn(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logOut(){
    setGlobalUser(null)
    return signOut(auth)

  }

  

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async (user)=>{
      console.log('Current User:',user)
      setGlobalUser(user)

      //if there is no user
      if(!user){
        console.log('no active user')
        return
      }

      //if there is user
      try{
        const docRef=doc(db,'users',user.uid)
        const docSnap=await getDoc(docRef)

        let firebaseData={}
        if(docSnap.exists()){
          firebaseData=docSnap.data()
          console.log('Found user data')
        }
        setGlobalData(firebaseData)
        console.log(globalData)
      } catch(err){
        console.log(err)
      }

    })
    return unsubscribe
  },[])

  const value={signIn,signUp,logOut,globalUser,globalData,setGlobalData}
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}