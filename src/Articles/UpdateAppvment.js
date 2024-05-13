import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateAppvment() {


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

  const { appvmentId } = useParams(); 

  const navigate = useNavigate();

  const [appvment, setAppvment] = useState({
    nomArt: "",
    dateLivraison: "",
    qte_cmd: "",
    cat: null,
  });

  // useEffect(() => {}, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setAppvment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postApvment();
  };

  useEffect(() => {
      loading() ;
      
  }, [])


  const loading = ()=>{

  axios
   .get(`http://localhost:8181/stock/appvment/${appvmentId}`)
   .then((response) => {
    // notifySuccess();
     setAppvment(response.data);
   })
   .catch((error) => {
     console.log("error : ", error.message);
     notifyError();
     setAppvment((prevState) => ({
       ...prevState,
       nomArt: "",
       dateLivraison: "",
       qte_cmd: "",
       cat: "",
     }));
   });

  }

  const postApvment = () => {
    console.log("appvment : ", {
      id : appvment.id,
      nomArt: appvment.nomArt,
      dateLivraison: appvment.dateLivraison,
      qte_cmd: appvment.qte_cmd,
      cat: JSON.parse(appvment.cat),
    });

    axios
      .put("http://localhost:8181/stock/appvment", {
        id : appvment.id , 
        nomArt: appvment.nomArt,
        dateLivraison: appvment.dateLivraison,
        qte_cmd: appvment.qte_cmd,
        cat: JSON.parse(
          appvment.cat
        ) /*façon simple comme ça je suis sûr d'envoyer le bon format */,
      })
      .then((response) => {
        notifySuccess();
        navigate("/admin/articles/appvment");
      })
      .catch((error) => {
        console.log("error : ", error.message);
        notifyError();
        setAppvment((prevState) => ({
          ...prevState,
          nomArt: "",
          dateLivraison: "",
          qte_cmd: "",
          cat: "",
        }));
      });
  };

  const notifySuccess = () =>
    toast.success("Enregistré avec succès !", {
      position: "top-left",
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
      position: "top-left",
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
    <div className="shadow-lg shadow-blue-700 mb-5 mt-[7rem] ms-[16rem] px-5 bg-white rounded-lg">
      <div className="mt-3 w-[500px] mx-auto  p-3">
        <div>
          <h1 className="mb-5 uppercase font-mono font-semibond text-2xl font-bold">
            Modifier l'article
          </h1>

          <form method="post" onSubmit={handleSubmit}>
           
            <div className="relative">
              <input
                onChange={handleChange}
                id="ids"
                name="id"
                type="numeric"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                value={appvment.id}
                disabled = "true"
              />
              <label
                htmlFor="ids"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Id*
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="nomArt"
                name="nomArt"
                type="text"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                value={appvment.nomArt}
              />
              <label
                htmlFor="nomArt"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Nom Article*
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="dateLivraison"
                name="dateLivraison"
                type="datetime-local"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                value={appvment.dateLivraison}
              />
              <label
                htmlFor="dateLivraison"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                dateLivraison*
              </label>
            </div>

            <div className="mt-10 relative">
              <select
                onChange={handleChange}
                id="cat"
                name="cat"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                required
                value={appvment.cat}
              >
                <option value="">{appvment&& appvment.cat&& appvment.cat.nom}</option>
                {categoriesMap &&
                  categoriesMap.map((item, id) => (
                  
                  <option key={id} value={JSON.stringify(item)}>
                      {item.nom}
                    </option>

                  ))}
              </select>
              <label
                htmlFor="cat"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Catégorie
              </label>
            </div>

            <div className="mt-10 relative">
              <input
                onChange={handleChange}
                id="qte_cmd"
                name="qte_cmd"
                type="number"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                placeholder="john@doe.com"
                required
                value={appvment.qte_cmd}
              />
              <label
                htmlFor="qte_cmd"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Qte cmd*
              </label>
            </div>

            <div className="flex items-center justify-center mt-10">
              <button
                className={`upperase hover:cursor-not-allowed hover:bg-slate-600
             font-mono bg-black px-10 py-2 uppercase text-lg text-white font-semibold
             ${
               appvment.nomArt === "" ||
               appvment.dateLivraison === "" ||
               appvment.qte_cmd === "" ||
               appvment.cat === ""
                 ? "hover:cursor-not-allowed"
                 : "hover:cursor-pointer"
             }`}
              >
                Modifier
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

          {/* <ToastContainer
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
          /> */}

          <div className="text-center mt-5 hover:cursor-pointer hover:text-blue-500">
            <Link to="/admin/articles/appvment">
              {" "}
              <p> Annuler ? cliquer ici </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAppvment;
