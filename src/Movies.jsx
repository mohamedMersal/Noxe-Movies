import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  let nums = new Array(13).fill(1).map((elem, i)=> i+1);

  async function getTrending(pageNumber)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=3033d94e4fd17724d42bcb69ec871bb4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setTrendingMovies(data.results);
  };
  useEffect(()=>{
    getTrending(1)
  },[]);
  return (
    <>
      {trendingMovies?<div className="container">
        <div className="row py-5 justify-content-center">
          {trendingMovies.map((movie,i)=>{
            return(
              <div key={i} className="col-md-2">
                <Link to={`/moviedetails/${movie.id}`}>
                  <div className="item">
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
                    <h3 className='h6 my-2'>{movie.title}</h3>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i></div>}

        <nav aria-label="..." className='py-5'>
          <ul className="pagination pagination-sm d-flex justify-content-center ">
            {nums.map((pageNum)=><li onClick={()=>getTrending(pageNum)} key={pageNum} className="page-item"><a className="page-link text-white bg-transparent">{pageNum}</a></li>
            )}       
          </ul>
        </nav>
    </>
  )
}
