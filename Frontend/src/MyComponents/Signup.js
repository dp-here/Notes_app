import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json=await response.json();
    console.log(json)
    if(json.success){
      // save the auth-token and redirect
      localStorage.setItem('auth-token',json.authToken)
      navigate('/')
      props.showAlert("Account created successfully","success")
    }
    else{
      props.showAlert("Invalid credentials","danger")
    }
  }
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
   }

  return (
    <div className="container mx-5 mb-3">
    <h2 >Create an account to use i-notebook.</h2>
    <form onSubmit={handleSubmit}>
<div>
<label htmlFor="name" className="form-label">Enter name</label>
  <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

  <label htmlFor="email" className="form-label">Email address</label>
  <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" minLength={5} required/>
  <label htmlFor="pcassword" className="form-label">Confirm Password</label>
  <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name="cpassword" minLength={5} required/>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
  )
}
