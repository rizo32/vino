import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post("/login", payload).then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        if (response.data.errors) {
          setErrors(response.data.errors)
        } else {
          setErrors({
            email: [response.data.message]
          })
        }
        setErrors(response.data.errors);
      }
    })
  }

 return (
    <div className="w-full">
      <div className="form w-64 mx-auto">
        <form className="flex flex-col gap-5 border-2 my-5" onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="text-red-900">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"  className="border-2 mt-3" />
          <input ref={passwordRef} type="password" placeholder="Password"  className="border-2 mt-3" />
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}


