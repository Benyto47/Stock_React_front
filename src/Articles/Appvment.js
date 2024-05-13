import React, { useState, useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { LuFolderEdit } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import { FaRegFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Appvment() {
  const [articles, setArticles] = useState();
  const [pageable, setPageable] = useState({
    totalPages: null,
    totalElements: null,
  });


  /* ajouter déclenchera cette notify */

  const conponentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => console.log("Data saved in PDF"),
  });

  //on veut changer useEffect apres cette modification , pas a chaque fois lorsque on a monté le composant

  //nombre total des pages de l'entités
  const [count, setCount] = useState();

  const[del,setDel] = useState(0) ; 

  //la page sélectionner
  const [selected, setSelected] = useState();

  useEffect(() => {
    initialPages();
  }, []);

  useEffect(() => {
  
   del != 0 &&  selectedPages();

    selectedPages();

  }, [count,del]);

  const initialPages = () => {
    axios
      .get("http://localhost:8181/stock/appvment/admin", {
        params: {
          page: 0,
          size: 10,
        },
      })
      .then((response) => {
        console.log("Liste des articles :", response.data.content);
        setArticles(response.data.content);
        setPageable({
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
        });

        console.log(
          " number pages : ",
          pageable.totalPages,
          " number of elements ",
          pageable.totalElements
        );

        setCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Erreur :", error.message);
      });
  };

  const selectedPages = (page) => {
    axios
      .get("http://localhost:8181/stock/appvment/admin", {
        params: {
          page: page /* notre state */,
          size: 8,
        },
      })
      .then((response) => {
        console.log("Liste des articles :", response.data.content);
        setArticles(response.data.content);
        setPageable({
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
        });

      })
      .catch((error) => {
        console.log("Erreur :", error.message);
      });
  };

  const handlePageClick = (e) => {
    //on modifie notre state , qui prendra a chaque fois la valeur selectionner
    setSelected(e.selected);
    console.log("page click : ", e.selected);
    selectedPages(e.selected);

    console.log("handlePageClick:: numéro cliqué --> ", e.selected);
  };


  const handleDelete = (e)=>{

    const confirmation = window.confirm("êtes vous sûr de supprimé l'article ? ")

    if(confirmation){

          console.log("delete : " , e) 
     axios
       .delete(`http://localhost:8181/stock/appvment/${e}`)
       .then((response) => {
         console.log(" article supprimé  :", e , " message : " , response.data.content);
         
         setDel((prev) => prev+1)
         
         notifySuccess();

       })
       .catch((error) => {
         console.log("Erreur :", error.message);
       });
    }else {

      notifyError();
    }

  
  }


   const notifySuccess = () =>
     toast.success("L'article a été supprimé avec succès !", {
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
       toast.info("Abandon de l'operation avec succès", {
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
    <div className="min-w-6xl mx-auto">
      <div className="mb-5 mt-7">
        <h1 className="mb-5 text-blue-700">
          {" "}
          Admin {">"} Articles Approvisionnement{" "}
        </h1>

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

        <div className="my-3">
          <span className="italic font-semibold text-slate-500">
            Nombre{"s"} totales d'articles : {pageable.totalElements}
          </span>
        </div>
        <Link
          to="/admin/articles/appvment/save"
          className="hover:bg-blue-700 hover:text-white duration-500 bg-green-600 text-white  rounded-lg px-3 py-2 font-semibold uppercase"
        >
          Ajouter
        </Link>

        <div className="min-w-6xl my-2 flex justify-between items-center ">
          {pageable.totalPages && (
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              breakLabel={"..."}
              pageCount={pageable.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={
                "border py-1 max-w-[32rem] rounded-xl bg-white flex justify-center items-center space-x-2"
              }
              pageClassName={"text-blue-500 py-1 cursor-pointer"}
              pageLinkClassName={
                "rounded px-3 hover:px-3 hover:bg-slate-300 py-1"
              }
              previousClassName={
                "text-blue-500 hover:bg-slate-300 hover:rounded-xl hover:text-black  px-2 py-1 cursor-pointer"
              }
              previousLinkClassName={"rounded px-2 py-1"}
              nextClassName={
                "text-blue-500 hover:bg-slate-300 hover:rounded-xl hover:text-black  px-2 py-1 cursor-pointer"
              }
              nextLinkClassName={"rounded px-2 py-1"}
              breakClassName={"px-2"}
              breakLinkClassName={""}
              activeClassName={"bg-blue-500 text-orange-50 px-2 py-1 rounded"}
            />
          )}

          <Link
            to="/admin/articles/appvment/pdf"
            className="w-[14rem] flex items-center mb-3 py-3 px-2 rounded-lg hover:bg-cyan-500 hover:text-white"
          >
            {" "}
            <span className="italic font-mono">
              Télecharger pdf {">"}{" "}
            </span>{" "}
            <FaRegFilePdf size="30px" className="text-red-800 ms-4" />
          </Link>
        </div>
      </div>

      <table className="mb-5 table-auto border-spacing-4 border-collapse bg-white border-purple-700  sm:block hidden">
        <thead>
          <tr className="bg-blue-400 text-white italic">
            <th className="py-5">Id</th>
            <th className="px-10 border border-slate-200">Image</th>
            <th className="border border-slate-200">NomArt</th>
            <th className="px-5 border border-slate-200">Categorie</th>
            <th className="px-3 border border-slate-200">Quantités</th>
            <th className="px-14 border border-slate-200">Date Livraison </th>
            <th className="border border-slate-200">Heure </th>
            <th className="border border-slate-200">Options</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-10 border-b border-blue-200">
                    {index + 1}
                  </td>
                  <td className="text-center border-b border-blue-200">
                    <img src={item.image} className="mx-auto h-14 w-14" />
                  </td>
                  <td className="px-2 border-b border-blue-200">
                    {item.nomArt}
                  </td>
                  <td className="px-5 border-b border-blue-200">
                    {item.cat.nom}
                  </td>

                  <td className="px-3 text-center font-semibold border-b border-blue-200">
                    {item.qte_cmd}
                  </td>
                  <td className="px-5 border-b border-blue-200">
                    {item.dateLivraison.split("T")[0]}
                  </td>
                  <td className="px-5 border-b border-blue-200">
                    {item.dateLivraison.split("T")[1]}
                  </td>
                  <td className="">
                    <div className="px-5 hover:text-white duratio-300 hover:bg-pink-300 bg-white flex space-x-3 p-3 rounded-xl">
                      <button className="px-3 hover:text-blue-700">
                        <FaEye size="24px" />
                      </button>
                      <button className="px-3 hover:text-blue-700">
                        <Link
                          to={`/admin/articles/appvment/update/${item.id}`}
                          className="px-3 hover:text-blue-700"
                        >
                          <LuFolderEdit size="24px" />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 hover:text-red-500"
                      >
                        <AiOutlineDelete size="24px" />
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appvment;
