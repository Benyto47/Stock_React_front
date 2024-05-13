import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStock() {
  const categoriesMap = [
    {
      id: 1,
      nom: "Téléphone",
    },
    {
      id: 2,
      nom: "Tablette",
    },
    {
      id: 3,
      nom: "Ordinateur",
    },
    {
      id: 4,
      nom: "Lunette",
    },
  ];

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    nom: "",
    descp: "",
    qte_art : null,
    date : "", /* en réalité dans le back on génère auto la date */
    prix : null,
    category: null,
  });

  // useEffect(() => {}, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     article.nom === "" || article.date === "" || article.qte_art === "" || article.category ==="" || article.prix === "" ? notify() : postApvment();
  };

  const postApvment = () => {
    
    /* on ne prends pas la date , il est générer auto au backend  */
    axios
      .post("http://localhost:8181/stock/articles", {
        nom: article.nom,
        descp: article.descp,
        qte_art: article.qte_art,
        prix : article.prix,
        category: JSON.parse(
          article.category
        ) /*façon simple comme ça je suis sûr d'envoyer le bon format */,
      })
      .then((response) => {
        notifySuccess();

        setArticle((prevState) => ({
          ...prevState,
          nom: "",
          descp: "",
          qte_art: null,
          date: "" /* en réalité dans le back on génère auto la date */,
          prix: null,
          category: "",
        }));

        setTimeout(() => {
          navigate("/admin/articles/stock");
        }, 2000);
      })
      .catch((error) => {
        console.log("error : ", error.message);
        notifyError();
        setArticle((prevState) => ({
          ...prevState,
          nom: "",
          descp: "",
          qte_art: null,
          date: "" /* en réalité dans le back on génère auto la date */,
          prix: null,
          category: "",
        }));
      });
  };

  const notifySuccess = () =>
    toast.success("Enregistré avec succès !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify = () =>
    toast.warn("Veuillez s'il vous plaît remplir tout les champs !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = () =>
    toast.error("Oops ! verifier à nouveau vos informations ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div className="shadow-lg shadow-blue-700 mb-5 mt-[7rem] ms-[16rem] px-5 bg-white rounded-lg">
      <div className="mt-3 w-[500px] mx-auto  p-3">
        <div>
          <h1 className="uppercase font-mono font-semibond text-2xl font-bold">
            Ajouter un article en stock
          </h1>

          <form method="post" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                onChange={handleChange}
                id="nom"
                name="nom"
                type="text"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={article.nom}
              />
              <label
                htmlFor="nom"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Nom Article*
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="date"
                name="date"
                type="datetime-local"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                value={article.date}
              />
              <label
                htmlFor="date"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Date*
              </label>
            </div>

            <div className="mt-10 relative">
              <select
                onChange={handleChange}
                id="category"
                name="category"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                required
                value={article.category}
              >
                <option value="">Sélectionner une catégorie</option>
                {categoriesMap &&
                  categoriesMap.map((item, id) => (
                    <option key={id} value={JSON.stringify(item)}>
                      {item.nom}
                    </option>
                  ))}
              </select>
              <label
                htmlFor="category"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Catégorie
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="qte_art"
                name="qte_art"
                type="number"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={article.qte_cmd}
              />
              <label
                htmlFor="qte_art"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Qte_Art*
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="prix"
                name="prix"
                type="number"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={article.prix}
              />
              <label
                htmlFor="prix"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                prix*
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="descp"
                name="descp"
                type="text"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={article.descp}
              />
              <label
                htmlFor="descp"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                descp*
              </label>
            </div>



            <div className="flex items-center justify-center mt-10">
              <button
                className={`upperase hover:cursor-not-allowed hover:bg-slate-600
             font-mono bg-black px-10 py-2 uppercase text-lg text-white font-semibold
             ${
               article.nom === "" ||
               article.date === "" ||
               article.qte_art === "" ||
               article.category === "" ||
               article.prix === "" ||
               article.descp === ""
                 ? "hover:cursor-not-allowed"
                 : "hover:cursor-pointer"
             }`}
              >
                Ajouter
              </button>
            </div>
          </form>

          <ToastContainer
            position="top-right"
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
            <Link to="/admin/articles/article">
              {" "}
              <p> Annuler ? cliquer ici </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStock;
