import { useState,useEffect,useRef } from "react"
import { searchMovies } from "../services/api";
import { useMovie } from "../context/MovieContext";

function MovieCard(props){
  const {movie,setMessage,hideMessage,setShowResults}=props
  const {addToList,movieList}=useMovie();
  
  return(
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="image not available"/>
      <div className="info-section">
        <h4>{movie.title}</h4>
        <button onClick={()=>{
          if(movieList.some((m)=>m.id===movie.id)){
            setMessage(" ⚠️ Movie already in the list")
            hideMessage()
            
            return
          }
          addToList(movie)
          setShowResults(false);
          alert('Added')
          }}>Add</button>
      </div>
      
      
    </div>
  )
}





export default function MovieForm(){
  const [searchQuery,setSearchQuery]=useState('');
  const [movie,setMovie]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null)
  const [message,setMessage]=useState(null);
  const timeOutId=useRef(null);
  const [showResults,setShowResults]=useState(true)

  const hideMessage=()=>{
    if(timeOutId.current){
      clearTimeout(timeOutId)
    }

    timeOutId.current=setTimeout(()=>{
        setMessage(null)
    },4000)
  }
  
  
  
  
  
  const handlesearch=async ()=>{
    setError(null)
    setShowResults(true)
    if (!searchQuery.trim()||loading){return}
    setLoading(true)
    try{
      const searchResult= await searchMovies(searchQuery)
      if(typeof(searchResult)==='string'){
        throw new Error('⚠️ No movies Found')
      };
      setMovie(searchResult)
      
    }catch(e){
      setError(e.message)
      setMessage(e.message)
      hideMessage()
    }finally{
      setLoading(false)
      setSearchQuery("")
    }
    
  }

  return(
    <>
      <h2 className="movie-form-heading">Start Tracking Today</h2>
      <div className="search-section">
        <input placeholder="Search for Movies..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button onClick={handlesearch}>Search</button>
      </div>
      
      {loading && (<h2>Loading...</h2>)}
      
      <div className={message ? 'card' : ' '}><h3>{message ? message : ' '}</h3></div>
      
      {showResults && <div className="results-container">
        { movie.map((m,m_index)=>{
          return(
            <MovieCard movie={m} key={m_index} setMessage={setMessage}hideMessage={hideMessage} setShowResults={setShowResults} />
          )
          
        })}
      </div>}
    </>
    
  )
}
