import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [userDetails, setDetails] = useState({
    user_id : '',
    password : ''
  });
  const [userResponse, setResponse] = useState('');
  const [userData, setUserData] = useState({ id: '', user_name: '', user_id: '', created_at: '', updated_at: '' })

  const submitForm = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', userDetails)
      .then(res => {
        setUserData(res.data);
        setResponse(res.data.message);
      })
      .catch(err => setResponse(err.response.data.message));
  }

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={submitForm}>
            <h5>Login</h5>
            {
              userResponse == '' ? '' :
              <div>
                {
                  userResponse == "Login successful" ? <Redirect to={{ pathname: '/dashboard', state: userData }} /> :
                  <h6 style={{position: "relative", textAlign: "center", color: "red", fontWeight: "bold", bottom: "15px"}}>{userResponse}</h6>
                }
              </div>
            }
            <div className="form-group">
              <input type="text" required className="form-control" placeholder="ID" onChange={e =>  setDetails({...userDetails, id: e.target.value})} value={userDetails.id} />
            </div>

            <div className="form-group">
              <input type="password" required className="form-control" placeholder="Password" onChange={e =>  setDetails({...userDetails, password: e.target.value})} value={userDetails.password}  />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <p><Link className="nav-link" style={{textAlign: "center"}} to={"/sign-up"}>Click here to Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
