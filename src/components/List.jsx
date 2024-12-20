import { useMovie } from "../context/MovieContext"

export default function List(){
  const {movieList,removeFromList}=useMovie();
  const listHeader=(
    <h1>Movie Hisotry</h1>
  )

  if (movieList.length===0){
    return(
      <>
        {listHeader}
        <div className="movie-add-msg">
          <h2>No Movies Yet!</h2>
          <p>Search for a movie above and add to your List</p>
        </div>
      </>  
    );
  }
  return(
    <>
      <table>
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Release Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie,movieIndex)=>{
            const year=new Date(movie.release_date).getFullYear()
            return(
              <tr key={movieIndex}>
                <td>{movie.title}</td>
                <td>{year}</td>
                <td><button className="delete" onClick={()=>removeFromList(movieIndex)}>Delete</button></td>
              </tr>
            )
          })}
          
          
        </tbody>
      </table>
    
    </>
    
  )
}