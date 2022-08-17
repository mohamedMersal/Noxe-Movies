import Axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    first_name:'',
    last_name:'',
    age:0,
    email:'',
    password:''
  });
  function getUserData(e){
    let myUser = {...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  };
  async function submitRegisterForm(e){
    e.preventDefault();
    setIsLoding(true);
    let validateResault = validateRegisterForm();
    // console.log(validateResault);
    if(validateResault.error)
    {
      setErrorList(validateResault.error.details);
      setIsLoding(false);
    }else{
      let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup',user);
      if (data.message === 'success')
      {
        setIsLoding(false);
        navigate('/login')
      }else{
        setError(data.message);
        setIsLoding(false)
      }
    }
  };
  function validateRegisterForm()
  {
    let scheme = Joi.object({
      first_name:Joi.string().alphanum().min(3).max(12).required(),
      last_name:Joi.string().alphanum().min(3).max(12).required(),
      age:Joi.number().min(16).max(80).required(),
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(new RegExp('^[A-Z][a-z]{3,8}$')).required()
    });
    return scheme.validate(user, {abortEarly:false})
  }

 
    return (
        <>
        <div className="w-75 mx-auto">
          <h2>Register Now</h2>
          {errorList.map((error, i)=> i === 4?<div key={i} className='alert alert-danger py-2'>Password Invalid</div>:<div key={i} className='alert alert-danger py-2'>{error.message}</div>)}
          {error?<div className='alert alert-danger'>{error}</div>:''}
          <form onSubmit={submitRegisterForm}>
            <label htmlFor="first_name">first_name</label>
            <input onChange={getUserData} type="text" className='form-control mb-2' id='first_name' name='first_name' />
            
            <label htmlFor="last_name">last_name</label>
            <input onChange={getUserData} type="text" className='form-control mb-2' id='last_name' name='last_name' />
            
            <label htmlFor="age">age</label>
            <input onChange={getUserData} type="number" className='form-control mb-2' id='age' name='age' />
            
            <label htmlFor="email">email</label>
            <input onChange={getUserData} type="email" className='form-control mb-2' id='email' name='email' />
            
            <label htmlFor="passwored">password</label>
            <input onChange={getUserData} type="password" className='form-control mb-2' id='passwored' name='password' />
    
            <button type='submit' className='btn btn-outline-info '>
            {isLoding?<i className='fas fa-spinner fa-spin'></i>:'Register'}
            </button>
          </form>
        </div>
        </>
      )
}


