import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [message, setMessage] = useState([]);
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
    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
        const response = err;
        if (response && response.status === 422) {
          setMessage(response);
        }
      });
  };

  return (
    <div className="w-full">
      <div className="form w-full mx-auto">
        <form
          className="flex flex-col w-10/12 ml-auto mr-auto"
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl text-center mt-vh-10">Soyez des nôtres!</h1>
          <label htmlFor="first-name" className="mt-vh-2 text-md ml-2">
            Prénom
          </label>
          <input
            id="first-name"
            ref={firstNameRef}
            type="text"
            placeholder="Gandalf"
            className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
          />
          <label htmlFor="last-name" className="mt-vh-2 text-md ml-2">
            Nom de famille
          </label>
          <input
            id="last-name"
            ref={lastNameRef}
            type="text"
            placeholder="Le gris"
            className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
          />
          <label htmlFor="email" className="mt-vh-2 text-md ml-2">
            Courriel
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            placeholder="gandalf_grey123@sympatico.com"
            className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
          />
          <label htmlFor="password" className="mt-vh-2 text-md ml-2">
            Mot de passe
          </label>
          <input
            id="first-name"
            ref={passwordRef}
            type="password"
            placeholder="********"
            className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset"
          />
          <input
            // id="first-name"
            ref={passwordConfirmationRef}
            type="password"
            placeholder="********"
            className="rounded-lg bg-white h-8 pl-2 shadow-shadow-tiny-inset mt-2"
          />
          <button className="btn btn-block mt-12 bg-red-900 rounded-md text-white h-12 text-xl shadow-shadow-tiny">
            L'aventure commence!
          </button>
          <p className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-10/12">
            <Link to="/login">Vous avez un compte? ></Link>
          </p>
        </form>
      </div>
    </div>
  );
}
