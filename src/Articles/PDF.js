import React, { useState, useEffect, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegFilePdf } from "react-icons/fa";

function PDF(props) {

  const navigate = useNavigate() ; 

  const [onclik, setOnclik] = useState(0);

  const conponentPDF = useRef();

  const [article, setArticle] = useState(null)

 const [pdfArticle, setPdfArticle] = useState(0) ; 

  useEffect(()=>{
    console.log("<PDF/> use effect , generate PDF : ",pdfArticle) ; 
  pdfArticle !== 0 && generatePDF();
  pdfArticle !== 0 && notify() ; 

  },[pdfArticle])

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => console.log("Data saved in PDF"),
  });


    useEffect(() => {
      console.log("articles : ", article);
      //comme ça ce useEffect ne s'executera pas , est c'est vérifié
    articles();
    }, []);

    /*   L'important on ne peut pas dans useEffect avoir le setState, et state. modifier le 
  on aura tojours le state avant modification. Pour cela on fait de cette façon.
  SOLUTION : LES SÉPARER */


    const articles = () => {
      // generatePDF();

      axios
        .get("http://localhost:8181/stock/appvment/all")
        .then((response) => {
       
          console.log("liste d'articles : ", response.data);
          setArticle(response.data) ;

        //  navigate("/panier")
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const notify = () =>
      toast.success(
        `Télechargement du pdf effectué avec succès !`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );

   const total = article && article.reduce((accumulator, item) => accumulator + 1, 0);


  return (
    <React.Fragment>
      <div className="">
        <div className="">
          <div className="ps-10 mt-3">
            <button
              className="group hover:text-black bg-blue-800 flex space-x-3 items-center text-white py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors"
              onClick={() => setPdfArticle((prev) => prev + 1)}
            >
             Télecharger pdf {">"}  <FaRegFilePdf size="30px" className='text-white group-hover:text-red-800 ms-4'/>
            </button>
          </div>

          <div ref={conponentPDF} className="px-10">
            <div className="font-black flex space-x-3 text-lg my-2">
              Articles {props.value} :
              <div className="ms-2 text-slate-600 font-semibold italic flex space-x-2">
                <span>{total}</span>
              </div>
            </div>

            <div className="my-3"></div>
            <table className="w-full bg-white border">
              <thead>
                <tr className="bg-blue-400 text-white">
                  <th className="py-3">Id</th>
                  <th className="py-3 px-5">Image</th>
                  <th className="border px-5 border-slate-200">
                    Nom<span className="ms-1">Article</span>
                  </th>
                  <th className="px-5 border border-slate-200">Categorie</th>
                  <th className="px-3 border border-slate-200">
                    Quantités<span className="ms-2">{props.value}</span>
                  </th>
                  <th className="px-12 border border-slate-200">Date</th>
                  <th className="border border-slate-200">Heure</th>
                </tr>
              </thead>
              <tbody>
                {article &&
                  article &&
                  article.map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 border-b border-blue-200">
                        {index + 1}
                      </td>
                      <td className="px-2 text-center border-b border-blue-200">
                        <img src={item.image} className="h-14 w-14" />
                      </td>
                      <td className="px-2 text-center border-b border-blue-200">
                        {item.nomArt}
                      </td>
                      <td className="px-5 border-b border-blue-200">
                        {item.cat.nom}
                      </td>
                      <td className="px-3 text-center border-b border-blue-200">
                        {item.qte_cmd}
                      </td>
                      <td className="px-3 border-b border-blue-200">
                        {item.dateLivraison.split("T")[0]}
                      </td>
                      <td className="px-5 border-b border-blue-200">
                        {item.dateLivraison.split("T")[1]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            </div>
        </div>

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
      </div>
    </React.Fragment>
  );
}

export default PDF;
