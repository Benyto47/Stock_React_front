import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import axios from "axios"

function Manager() {

 const [count, setCount] = useState();

 const [coun , setCoun] = useState() ; 

 useEffect(() => {
   countArticles();
   counArticles() ; 
 }, []);

 const countArticles = () => {
   axios
     .get("http://localhost:8181/stock/articles/all")
     .then((response) => {
       setCount(response.data.length);
     })
     .catch((e) => {
       console.log("error : ", e.mesasge);
     });
 };

  const counArticles = () => {
    axios
      .get("http://localhost:8181/stock/appvment/all")
      .then((response) => {
        setCoun(response.data.length);
      })
      .catch((e) => {
        console.log("error : ", e.mesasge);
      });
  };

    const Article_stock = (
      <div
        className={`mt-5 ring-purple-300 ring-offset-1 ring-2 ps-5 pl-3 bg-pink-50 py-2  capitalize font-bold rounded-xl h-[13rem] shadow-md shadow-slate-300`}
      >
        <div className="mt-5 flex items-center space-x-4  ms-10 text-xl text-center text-slate-700">
          <FiFolder size="32px" /> <h1>Liste d'articles en stock</h1>
        </div>
        <div className="mt-10 max-w-sm mx-auto">
          <div className="flex place-items-end text-blue-900 justify-center space-x-4">
            <p className="text-5xl"> {count && count} </p>
            <p className="text-slate-400 italic text-md"> articles</p>
          </div>
        </div>
      </div>
    );

    const Article_appvt = (
      <div
        className={`mt-5 ring-purple-300 ring-offset-1 ring-2 ps-5 pl-3 bg-blue-50 py-2  capitalize font-bold rounded-xl h-[13rem] shadow-md shadow-slate-300`}
      >
        <div className="mt-5 flex items-center space-x-4  ms-10 text-xl text-start text-slate-700">
          <FiShoppingCart size="32px" /> <h1>Liste d'approvisionnement</h1>
        </div>
        <div className="mt-10 max-w-sm mx-auto">
          <div className="flex place-items-end text-blue-900 justify-center space-x-4">
            <p className="text-5xl"> {coun && coun} </p>
            <p className="text-slate-400 italic text-md"> articles</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="ms-[10rem]">
      <div className="text-center mt-10">
        <h1 className="my-3 italic font-semibold text-2xl text-blue-800">
          {" "}
          <span className="normal font-bold">
            {" "}
            TABLEAU DE BORDS {">"}{" "}
          </span>{" "}
          GESTION DE STOCK{" "}
        </h1>
        <h1 className="text-extalight text-start italic max-w-4xl">
          Nous vous souhaitons la bienvenue dans votre espace d'administration.
          C'est un plaisir de vous avoir ici pour gérer et superviser les
          articles articles 🎉🎊.
        </h1>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-5 mx-auto  min-w-[57rem]">
        <Link to="/admin/articles/stock">{Article_stock}</Link>
        <Link to="/admin/articles/appvment">{Article_appvt}</Link>
      </div>
    </div>
  );
}

export default Manager;
