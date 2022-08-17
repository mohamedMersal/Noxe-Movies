import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avtar from './avtarr.png';
export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(mediaType , callBack)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=3033d94e4fd17724d42bcb69ec871bb4`);
    callBack(data.results.slice(0, 10))
  };
  useEffect(()=>{
    getTrending('movie' , setTrendingMovies)
    getTrending('tv' , setTrendingTv)
    getTrending('person' , setTrendingPeople)
  },[]);
  // console.log(trendingMovies);
  // console.log(trendingTv);
  // console.log(trendingPeople);
  return (
    <>
    {/* Trending Movies */}
    <div className="container">
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h2 className='h3'>Trending <br/>Movies <br/> to watch now</h2>
            <p className='text-muted'>most watched movies by days</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
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
    </div>

    {/* Trending Tv */}
    <div className="container">
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h2 className='h3'>Trending <br/>Tv <br/> to watch now</h2>
            <p className='text-muted'>most watched Tv by days</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
        {trendingTv.map((tv,i)=>{
          return(
            <div key={i} className="col-md-2">
              <Link to={`/moviedetails/${tv.id}`}>
                <div className="item">
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+tv.backdrop_path} alt="" />
                  <h3 className='h6 my-2'>{tv.name}</h3>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>

    {/* Trending People */}
    <div className="container">
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h2 className='h3'>Trending <br/>People <br/> to watch now</h2>
            <p className='text-muted'>most People by days</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
        {trendingPeople.map((person,i)=>{
          return(
            <div key={i} className="col-md-2">
              <Link to={`/moviedetails/${person.id}`}>
                <div className="item">
                  {person.profile_path === null ?<img src={avtar} className="w-100" />:
                  <img className='w-100' src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />
                  }
                  <h3 className='h6 my-2'>{person.name}</h3>
              </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
