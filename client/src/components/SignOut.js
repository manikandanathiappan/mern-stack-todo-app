import { BrowserRouter as Route, Link } from "react-router-dom";

function SignOut() {
  return (
    <div>
      <h3 style={{textAlign: "center"}}>You have been successfully logged out</h3>
      <br/>
      <h6 style={{textAlign: "center"}}>Redirecting you to Login Page...</h6>
    </div>
  );
}

export default SignOut;
