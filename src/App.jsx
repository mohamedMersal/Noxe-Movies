import './App.css';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import Tv from './Tv';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


function App() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  function saveUserData()
  {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    // console.log(userData);
  };
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    {
      saveUserData()
    }
  }, [])
  function ProtectedRoute(props)
  {
    if(!localStorage.getItem('userToken'))
    {
      return <Navigate to='/login'/>
    }else{
      return props.children;
    }
  };

  function logOut()
  {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }
  return (
   <>
   <div className="container">
    <Navbar logOut={logOut} userData={userData}/>
    <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
        <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
        <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='tv' element={<ProtectedRoute><Tv/></ProtectedRoute>}/>
        <Route path='login' element={ <Login saveUserData={saveUserData}/> }/>
        <Route path='register' element={ <Register/> }/>
        <Route path='*' element={ <NotFound/> }/>
    </Routes>
    <Footer/>
   </div>
   </>
  );
}

export default App;
