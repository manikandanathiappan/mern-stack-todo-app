import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [userDetails, setDetails] = useState({
    user_name: '',
    user_id : '',
    password : ''
  });

  const submitForm = e => {
    e.preventDefault();
    setDetails({
      user_name: userDetails.user_name,
      user_id: userDetails.user_id,
      password: userDetails.password
    })
    axios.post('http://localhost:5000/users/add', userDetails)
  }

  return (
    <form onSubmit={submitForm}>
      <h5>Sign Up</h5>

      <div className="form-group">
        <input type="text" required className="form-control" placeholder="Name" onChange={e =>  setDetails({...userDetails, user_name: e.target.value})} value={userDetails.user_name} />
      </div>

      <div className="form-group">
        <input type="text" required className="form-control" placeholder="ID" onChange={e =>  setDetails({...userDetails, user_id: e.target.value})} value={userDetails.user_id} />
      </div>

      <div className="form-group">
        <input type="password" required className="form-control" placeholder="Password" onChange={e =>  setDetails({...userDetails, password: e.target.value})} value={userDetails.password} />
      </div>

      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
      <p><Link className="nav-link" style={{textAlign: "center"}} to={"/sign-in"}>Click here to Login</Link></p>
    </form>
  );
}
