import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";
import "./login_signup.css";
import { Footer } from '..';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <style>{'body { background: linear-gradient(-45deg, #00ffcc, #66ccff, #00ccff, #0066ff); animation: gradient 5s ease infinite; background-size: 400%;}'}</style>
    <br/><br/>
      <div className="p-4 box">
        <div className="login__logo">
          <Link to="/">
            <img
              className="login__logo"
              src="https://ph-files.imgix.net/b585745e-2d1f-474d-98d9-1dcbd3ed9464.png?auto=format"
              alt=""
            />
          </Link>
        </div>

        <h2 className="login-head">Jobseeker-Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <hr/>
        <div className='line'>Don't have an account? <Link to="/signup">Sign up</Link></div>
      </div>
      
      <Footer/>
    </>
  );
};

export default Login;
