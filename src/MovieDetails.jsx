import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import avtar from './avtarr.png';


export default function MovieDetails() {
  let params = useParams();
  const [movieDetails, setMovieDetails] = useState({})
  async function getMovieDetails(id)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3033d94e4fd17724d42bcb69ec871bb4`);
    setMovieDetails(data)
  };
  useEffect(()=>{
    getMovieDetails(params.id)
  }, [])
  
  return (
    <>
    {movieDetails? <div className='row'>
      <div className="col-md-3">
        <img src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} className="w-100" alt="" />
      </div>
      <div className="col-md-9">
        <h2>{movieDetails?.title}</h2>
        <p className='text-muted py-3'>{movieDetails.overview}</p>
        <ul>
          <li>budget :{movieDetails.budget} </li>
          <li>popularity :{movieDetails.popularity} </li>
          <li>vote_average :{movieDetails.vote_average} </li>
          <li>vote_count :{movieDetails.vote_count} </li>
        </ul>
      </div>
    </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
      <i className='fas fa-spinner fa-spin fa-3x'></i></div>}
    </>
    // <>
    // {movieDetails?
    // <div className="row">
    //   <div className="col-md-3">
    //   {movieDetails?.poster_path === null ?<img src={avtar} className="w-100" />:
    //     <img src={'https://image.tmdb.org/t/p/w500'+movieDetails?.poster_path} className='w-100'/>

    //   }
    //   </div>
    //   <div className="col-md-9">
    //     <h2>{movieDetails?.title}</h2>
    //     <p className=' text-muted py-3'>{movieDetails?.overview}</p>
    //     <ul>
    //       <li>budget :{movieDetails.budget}</li>
    //       <li>vote_average :{movieDetails.vote_average}</li>
    //       <li>popularity :{movieDetails.popularity}</li>
    //       <li>vote_count :{movieDetails.vote_count}</li>
    //     </ul>
    //   </div>
    // </div>:<div className='vh-100 d-flex justify-content-center align-items-center'>
    // <i className='fas fa-spinner fa-spin fa-3x'></i></div>}
    
    // </>
  )
}
