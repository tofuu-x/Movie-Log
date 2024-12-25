import Layout from './components/Layout'
import Hero from './components/Hero'
import MovieForm from './components/MovieForm'
import List from './components/List'
import {useAuth } from './context/AuthContext'

function App() {
  const {globalUser}=useAuth();
  const isAuthenticated=globalUser

  const authenticatedContent=(
    <>
      <List/>
    </>
    
  )

  return(
    
      <Layout>
        <Hero/>
        <MovieForm/>
        <hr/>
        {(isAuthenticated)&& authenticatedContent}
      </Layout>

      
  )
}

export default App
