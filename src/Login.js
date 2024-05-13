import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    console.log(`${name} : `, value);

    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login.email === "" || login.password === "" ? notify() : post_login_user();
  };

  const post_login_user = () => {
    console.log("post_login_user : ", login);
    axios
      .post("http://localhost:8181/stock/users/login", login)
      .then((response) => {
        //parfois si l'email est vrai et mot de passe faux,
        //il trouve que response est vrai et essayer de le connecter
        //ce qui est faux, donc on évite çela
        if (response.data) {
          setLogin(response.data);

          sessionStorage.setItem("auth", JSON.stringify(response.data));

          console.log("login: ", sessionStorage.getItem("auth"));

          navigate("/admin");
        }

        console.log("n'existe pas ");
        errorLogin();
        setLogin((prevState) => ({
          ...prevState,
          password: "",
          email: "",
        }));
      })
      .catch((error) => {
        errorLogin();
        console.log("error : ", error);
        setLogin((prevState) => ({
          ...prevState,
          password: "",
          email: "",
        }));
      });
  };

  const notify = () =>
    toast.warn("Veuillez s'il vous plaît remplir tout les champs !", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const errorLogin = () =>
    toast.error("Ooups il semble que vos information sont incorrect!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="">
      <div className="hover:cursor-pointer hover:bg-pink-400 bg-pink-500 font-mono  my-3 text-white text-center">
        Bienvenue Mr/Mlle l'Administrateur{" "}
        <div
          className="inline-flex border-l bor
       der-slate-700 text-pink-500"
        >
          hr
        </div>
        Manager les articles en stock
      </div>
      <div className="mt-5 w-[500px] mx-auto  p-3">
        <div>
          <h1 className="uppercase font-serif font-semibond text-2xl font-bold">
           ADMIN {">"} se connecter
          </h1>
          <p className="my-10">
            Connectez-vous avec vos informations de compte
          </p>

          <form method="post" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={login.email}
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Address email*
              </label>
            </div>
            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="password"
                type="password"
                name="password"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="Password"
                value={login.password}
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Mot de passe*
              </label>
            </div>
            <div className="flex w-[500px] justify-between items-center my-4">
              <p className="text-white"> hidden</p>
              <Link to="/forget">
                {" "}
                <p className="hover:cursor-pointer hover:text-orange-700">
                  Mot de passe oublié ?
                </p>
              </Link>
            </div>

            <div className="flex items-center justify-center mt-3">
              <button
                className={`upperase hover:cursor-not-allowed hover:bg-slate-600
             font-mono bg-black px-10 py-2 uppercase text-lg text-white font-semibold
             ${
               login.email === "" || login.password === ""
                 ? "hover:cursor-not-allowed"
                 : "hover:cursor-pointer"
             }`}
              >
                se connecter
              </button>
            </div>
          </form>

          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <div className="text-center mt-5 hover:cursor-pointer hover:text-blue-500">
            <Link to="/register">
              {" "}
              <p> Vous n'êtes membre ? , S'INSCRIRE</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
