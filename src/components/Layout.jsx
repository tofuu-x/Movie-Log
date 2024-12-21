import {useState} from 'react'
import Modal from './Modal';
import Authetication from './Authentication';
import { useAuth } from '../context/AuthContext';

function Layout(props){
  const {children}=props
  const {globalUser,logOut}=useAuth()
  const [showModal,setShowModal]=useState(false);

  console.log(globalUser)
  const header=(
    <header>
      <div>
        <h1 className="text-gradient">MovieLog</h1>
        <p>For Cinephiles</p>
      </div>
      {globalUser ? (<button onClick={logOut}>Log Out</button>) :(<button onClick={()=>setShowModal(true)}>
        Sign Up free
      </button>)}
    </header>
  )

  const footer=(
    <footer>
      {/* ADD MORE HERE */}
      <p>Made by <span className="text-gradient">Adarsha</span></p> 
    </footer>
  )

  function handleCloseModal(){
    setShowModal(false)
  }

  return(
    <>
      {showModal &&(
        <Modal handleCloseModal={handleCloseModal}>
          <Authetication handleCloseModal={handleCloseModal}/>
        </Modal>
      )}
      {header}
      <main>
        {children}
      </main>

      {footer}
    </>
  )
}

export default Layout;