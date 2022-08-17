import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email:'',
    password:''
  });
  function getUserData(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  };
  async function submitLoginForm(e){
    e.preventDefault();
    setIsLoding(true);
    let validateResault = validateLoginForm();
    // console.log(validateResault);
    if(validateResault.error)
    {
      setErrorList(validateResault.error.details);
      setIsLoding(false);
    }else{
      let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin',user);
    if (data.message === 'success')
      {
        localStorage.setItem('userToken', data.token);
        props.saveUserData();
        setIsLoding(false);
        navigate('/home')
      }else{
        setError(data.message);
        setIsLoding(false)
      }
    }
  };
  function validateLoginForm()
  {
    let scheme = Joi.object({
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
    });
    return scheme.validate(user, {abortEarly:false})
  }

 
    return (
        <>
        <div className="w-75 mx-auto">
          <h2>Login Now</h2>
          {errorList.map((error, i)=> i === 1?<div key={i} className='alert alert-danger py-2'>Password Invalid</div>:<div key={i} className='alert alert-danger py-2'>{error.message}</div>)}
          {error?<div className='alert alert-danger'>{error}</div>:''}
          <form onSubmit={submitLoginForm}>
            <label htmlFor="email">email</label>
            <input onChange={getUserData} type="email" className='form-control mb-2' id='email' name='email' />
            
            <label htmlFor="passwored">password</label>
            <input onChange={getUserData} type="password" className='form-control mb-2' id='passwored' name='password' />
    
            <button type='submit' className='btn btn-outline-info '>
            {isLoding?<i className='fas fa-spinner fa-spin'></i>:'Login'}
            </button>
          </form>
        </div>
        </>
      )
}


