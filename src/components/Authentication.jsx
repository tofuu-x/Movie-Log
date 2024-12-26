import { useState,useRef } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authetication(props){
  const {handleCloseModal}=props
  const [isRegistration,setIsRegistration]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const [isAuthenticating,setIsAuthenticating]=useState(false)
  const timeOutId=useRef(null)

  const {signIn,signUp}=useAuth()

  const hideError=()=>{
    if(timeOutId.current){
      clearTimeout(timeOutId)
    }

    timeOutId.current=setTimeout(()=>{
        setError(null)
    },5000)
  }

  async function handleAuthentication(){
    if(!email || !password || isAuthenticating){return}
    try{
      setIsAuthenticating(true)
      if(isRegistration){
        if(password.length<=6){
          throw new Error('Password should have more than 6 characters')
        }
        await signUp(email,password)
      } else {
        await signIn(email,password)
      }
      handleCloseModal()
    }catch(e){
      console.log(e.message)
      setError(e.message)
      hideError()
    }finally{
      setIsAuthenticating(false)
    }

  }

  return(
    <>
      <h2 className="sign-up-text">{isRegistration ? 'Signup':'Login'}</h2>
      <p>{isRegistration ? 'Create an Account' : 'Log in to your account'}</p>
      {error && (<p className='firebase-error'>❌ {error}</p>)}
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input type="password" placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      {isAuthenticating?(<h3>Authenticating...</h3>):(<button onClick={handleAuthentication}><p>Submit</p></button>)}
      <hr/>
      <div className="register-content">
        <p>{isRegistration ? "Already have an account?" : "Don't have an account?"}</p>
        <button onClick={()=>{setIsRegistration(!isRegistration)}}><p>{isRegistration ? 'Login' : 'Sign Up'}</p></button>
      </div>
    </>
    
  )
}