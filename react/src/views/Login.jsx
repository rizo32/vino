import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState([]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err;
        setMessage(response);
      });
  };

  return (
    <div className="w-full">
      <div className="form w-full mx-auto">
        <form className="flex flex-col mt-10vh w-10/12 ml-auto mr-auto" onSubmit={onSubmit}>
          {/* Si quelqu'un a une meilleure traduction de 'welcome back', the floor is yours! */}
          <h1 className="text-4xl text-center mt-vh-10">Rebonjour!</h1>
          {message.length > 0 && (
            <div className="text-red-900">
              {message.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          <label htmlFor="email"
            className="mt-12 text-xl ml-2">Courriel</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="g.harvey@caramail.com"
            className="rounded-lg bg-white h-12 pl-2 shadow-shadow-tiny-inset"
          />
          <label htmlFor="password"
            className="mt-5 text-xl ml-2">Courriel</label>
          <input
            id="password"
            ref={passwordRef}
            type="password"
            placeholder="********"
            className="rounded-lg bg-white h-12 pl-2 shadow-shadow-tiny-inset"
          />
          <button className="btn btn-block mt-12 bg-red-900 rounded-md text-white h-12 text-xl shadow-shadow-tiny">Connexion</button>
          <p className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10/12"><Link to="/signup">Créer un nouveau compte ></Link>
          </p>
        </form>
      </div>
    </div>
  );
}
