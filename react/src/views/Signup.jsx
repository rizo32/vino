import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient.post("/signup", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        setErrors(response.data.errors);
      }
    })
  };

  return (
    <div className="w-full">
      <div className="form w-64 mx-auto">
        <form className="flex flex-col gap-5 border-2 my-5" onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>

          {errors &&
          <div className="text-red-900">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}  
          </div>}

          <input
            ref={firstNameRef}
            type="text"
            placeholder="Full name"
            className="border-2 mt-3"
          />
          <input
            ref={lastNameRef}
            type="text"
            placeholder="Full name"
            className="border-2 mt-3"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="border-2 mt-3"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="border-2 mt-3"
          />
          <input
            ref={passwordConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
            className="border-2 mt-3"
          />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
