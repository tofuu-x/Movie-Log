import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext"
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";


export default function List(){
  const {movieList,removeFromList}=useMovie();
  const {globalData,globalUser,setGlobalData}=useAuth()
  const listHeader=(
    <h1>Movie Hisotry</h1>
  )

  if (!globalData || Object.keys(globalData).length===0){
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
  
  async function  removefromList(movie){
    try{
     const userDocRef=doc(db,"users",globalUser.uid);
     await updateDoc(userDocRef,{[movie]:deleteField(),
     })
     try{
      const docRef=doc(db,'users',globalUser.uid)
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

    }catch(err){
      console.log(err.message)
    }
    
  }

  const movies=Object.keys(globalData)
  console.log(movies)

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
          {movies.map((movie,movieIndex)=>{
            const year=new Date(globalData[movie].release_date).getFullYear()
            return(
              <tr key={movieIndex}>
                <td>{globalData[movie].title}</td>
                <td>{year}</td>
                <td><button className="delete" onClick={()=>removefromList(movies[movieIndex])}>Delete</button></td>
              </tr>
            )
          })}
          
          
        </tbody>
      </table>
    
    </>
    
  )
}