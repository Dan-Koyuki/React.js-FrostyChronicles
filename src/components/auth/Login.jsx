import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth);

  useEffect(() => {
    if(auth._id){
      navigate('/');
    }
  }, [auth._id, navigate])

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="example@mail.com"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>{auth.loginStatus === "pending" ? (
          "Submitting.."
        ) : "Login"}</button>

        {auth.loginStatus === "rejected" ? (
          <p>{auth.loginError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Login;
