import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authetication(props){
  const {handleCloseModal}=props
  const [isRegistration,setIsRegistration]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const [isAuthenticating,setIsAuthenticating]=useState(false)

  const {signIn,signUp}=useAuth()

  async function handleAuthentication(){
    if(!email || !password || password.length<=6 || isAuthenticating){return}
    try{
      setIsAuthenticating(true)
      if(isRegistration){
        await signUp(email,password)
      } else {
        await signIn(email,password)
      }
      handleCloseModal()
    }catch(e){
      console.log(e.message)
      setError(e.message)
    }finally{
      setIsAuthenticating(false)
    }

  }

  return(
    <>
      <h2 className="sign-up-text">{isRegistration ? 'Signup':'Login'}</h2>
      <p>{isRegistration ? 'Create an Account' : 'Log in to your account'}</p>
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input type="password" placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleAuthentication}><p>Submit</p></button>
      <hr/>
      <div className="register-content">
        <p>{isRegistration ? "Already have an account?" : "Don't have an account?"}</p>
        <button onClick={()=>{setIsRegistration(!isRegistration)}}><p>{isRegistration ? 'Login' : 'Sign Up'}</p></button>
      </div>
    </>
    
  )
}