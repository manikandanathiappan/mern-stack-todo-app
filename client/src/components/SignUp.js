import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [userDetails, setDetails] = useState({
    user_name: '',
    user_id : '',
    password : ''
  });
  const [resStatus, setResStatus] = useState('');

  const submitForm = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/add', userDetails)
      .then(res => setResStatus(res.data.message))
      .catch(err => setResStatus(err.response.data.message));
  }

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={submitForm}>
            {
              resStatus == '' ? '' :
              <div>
                {resStatus == "Already exists"} ? <h6 style={{position: "relative", textAlign: "center", color: "red", bottom: "15px"}}>User ID already exists</h6>
                <Redirect to='/sign-in' />
              </div>
            }
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
        </div>
      </div>
    </div>
  );
}
