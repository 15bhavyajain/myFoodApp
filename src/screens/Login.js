import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {

  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({email: credentials.email,
    //     password: credentials.password
    //     }))
    const response = await fetch("https://myfoodapp-kffs.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    else
    {
      localStorage.setItem("authToken", json.authToken)
      localStorage.setItem("userEmail", credentials.email)
      console.log("authToken :", localStorage.getItem("authToken"));
      navigate("/");
    }
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]:event.target.value});
  }


  return (
  
    <div>
        <div><Navbar/></div>
      
        <div className="container m-3 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>

        <Link to="/signup" className="m-3 btn btn-danger">
          I'm a new user
        </Link>
      </form>
    </div>


    </div>
  )
}
