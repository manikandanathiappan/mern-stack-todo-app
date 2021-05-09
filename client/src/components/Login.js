import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [userDetails, setDetails] = useState({
    user_id : '',
    password : ''
  });

  const submitForm = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', userDetails)
  }

  return (
    <form onSubmit={submitForm}>
      <h5>Login</h5>

      <div className="form-group">
        <input type="text" required className="form-control" placeholder="ID" onChange={e =>  setDetails({...userDetails, id: e.target.value})} value={userDetails.id} />
      </div>

      <div className="form-group">
        <input type="password" required className="form-control" placeholder="Password" onChange={e =>  setDetails({...userDetails, password: e.target.value})} value={userDetails.password}  />
      </div>

      <button type="submit" className="btn btn-primary btn-block">Login</button>
      <p><Link className="nav-link" style={{textAlign: "center"}} to={"/sign-up"}>Click here to Register</Link></p>
    </form>
  );
}

export default Login;
