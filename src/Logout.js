import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  
  const auth = sessionStorage.getItem("auth");

  const navigate = useNavigate();

  const [login, setLogin] = useState();

  const [clik, setClik] = useState(false);

  useEffect(() => {
    auth && setLogin(JSON.parse(auth));
  }, [clik]);

  // si aucun user mais quelqu'un vient dasns ce lien /logout , on le ramène a login
  // sur le Main, laba il y'a un retard d'execution de /login a /logout donc directement faire ici
  useEffect(() => {
    sessionStorage.getItem("auth") === null && navigate("/login");
  }, []);

  const handleClick = () => {
    axios
      .post("http://localhost:8181/stock/users/logout", login)
      .then((response) => {
        /* supprimera toute les clés */
        sessionStorage.clear();
        //  sessionStorage.removeItem("auth")

        console.log(
          "logout SESSION ",
          sessionStorage,
          " session : auth ",
          sessionStorage.getItem("auth")
        );

        setClik(!clik);

        navigate("/login");
      })
      .catch((error) => {
        console.log("error logout ", error.message);
      });
  };

  if (auth) {
    return (
      <div className="">
        <div className="mt-5 w-[500px] mx-auto  p-3">
          <div>
            <h1 className="uppercase font-mono text-blue-700 font-semibond text-xl font-bold">
              Nous sommes triste de vous voir partir !
            </h1>
            <p className="my-10 text-red-300">
              Voulez-vous vraiment vous déconnecter ?
            </p>
            <div className="flex items-center justify-center mt-3">
              <button
                onClick={handleClick}
                className={`upperase hover:cursor-pointer hover:bg-red-300
             font-mono bg-red-500 px-10 py-2 uppercase text-lg text-white font-semibold`}
              >
                DECONNEXION
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-10  px-5 py-3">
        <h1 className="text-center bg-red-400 max-w-4xl py-10 px-5 text-white text-2xl mx-auto">
          ERROR {navigate("/login")}
        </h1>
      </div>
    );
  }
}

export default Logout;
