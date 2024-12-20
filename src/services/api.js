const API_KEY=import.meta.env.VITE_APIKEY
const BASE_URL=`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&`

export const searchMovies=async(query)=>{
  const response=await fetch(`${BASE_URL}query=${encodeURIComponent(query)}`);
  
  const data=await response.json();
  if(data.results.length===0){
    return("Couldn't be found")
  }
  return data.results.splice(0,6)
}