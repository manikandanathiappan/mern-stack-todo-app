import { useState, useEffect } from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import axios from 'axios';

function SignOut() {
  const [logOutResponse, setLogOutResponse] = useState('');

  useEffect(() => {
    (async function() {
      const response = await axios.post('http://localhost:5000/logout');
      localStorage.removeItem('token');
      setLogOutResponse(response.data);
    })();
  }, [])

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3 style={{textAlign: "center"}}>You have been successfully logged out</h3>
          <br/>
          <h6 style={{textAlign: "center"}}>Redirecting you to Login Page...</h6>
          {
            logOutResponse !== '' ? <Redirect to='/sign-in' /> : ''
          }
        </div>
      </div>
    </div>
  );
}

export default SignOut;
