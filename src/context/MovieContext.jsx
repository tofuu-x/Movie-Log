import {useState,useContext,createContext,useEffect} from 'react';

const MovieContext=createContext()

export function useMovie(){
  return useContext(MovieContext)
}

export function MovieListProvider({children}){
  const [movieList,setMovieList]=useState([]);

  function addToList(movie){
    setMovieList((m)=>[...(m||[]),movie])
  }

  function removeFromList(movie_index){
    const newList=movieList.filter((_,m_id)=>movie_index!==m_id)
    setMovieList(newList)
  }




  useEffect(()=>{
    const movieList=localStorage.getItem('movieList');

    if(movieList){
      setMovieList(JSON.parse(localStorage.getItem('movieList')))
    }
    console.log(movieList);
  },[])
 

  const value={movieList,addToList,removeFromList}

  useEffect(()=>{
    localStorage.setItem('movieList',JSON.stringify(movieList))
    console.log(movieList);
  },[movieList])
  
  






  return(
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  )
  
}