import Layout from './components/Layout'
import Hero from './components/Hero'
import MovieForm from './components/MovieForm'
import List from './components/List'
import { MovieListProvider } from './context/MovieContext'

function App() {

  

  return(
    <MovieListProvider>
      <Layout>
        <Hero/>
        <MovieForm/>
        <hr/>
        <List/>
      </Layout>
    </MovieListProvider>
      
  )
}

export default App
