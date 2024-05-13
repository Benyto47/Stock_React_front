import React, { useEffect, useContext, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { SlBasketLoaded } from "react-icons/sl";
import { Routes, Outlet, Route, NavLink, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import ChildNavbar from "./ChildNavbar";
import Footer from "./Footer";
import Section from "./Section";

function Main() {
  //mettre a jour cette session par useEffect. au fil du temps cette session peut être vide ou pas.il dois remarquer cela
  const authenticate = JSON.parse(sessionStorage.getItem("auth"));

  const [log2, setLog2] = useState({
    log: "/login",
  });

  //ce u
  const [clik, setClik] = useState(false);

  useEffect(() => {
    //on met la session a l'interieur pour que useEffect reverifie la session,
    // s'il a été mis a jour ou pas.

    const session = JSON.parse(sessionStorage.getItem("auth"));

    session
      ? setLog2({
          log: "/logout",
        })
      : setLog2({ log: "/login" });

    console.log("authenticate : ", authenticate);
    console.log("mise a jour authenticate : ", log2);
  }, [clik]);

  const items = ["Téléphone", "Lunette", "Ordinateur", "Tablette"];

  const showAdmin = authenticate && 
             <NavLink
              to="/admin" /* onClick={() => setClik(!clik)} to={log2.log} */
             >
              <MdAdminPanelSettings
                size="27px"
                className="hover:cursor-pointer duration-300 hover:text-indigo-300 hover:scale-110"/>
            </NavLink> 


  return (
    <div>
      <div>
        <div className="flex sticky top-0 bg-white mt-4 justify-around sm:justify-evenly items-center">
          <Link
            to="/section"
            className="hidden sm:block hover:cursor-pointer font-black text-2xl uppercase"
          >
            Gestion de stock
          </Link>
          <div className="lg:flex hidden font-semibold items-center space-x-5">
            {items.map((item, index) => (
              <button
                className={({ isActive, isPending }) =>
                  isPending
                    ? console.log(" link is pending")
                    : isActive
                    ? "bg-black py-2 px-3 rounded-2xl text-white"
                    : "py-2 px-3 hover:bg-black hover:rounded-2xl hover:text-white hover:cursor-pointer duration-400"
                }
                to={`/category/${item}`}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex relative justify-center items-center space-x-5">
            <AiOutlineSearch
              size="27px"
              className="hover:cursor-pointer hover:scale-110 duration-300 hover:text-blue-300"
            />
            <NavLink onClick={() => setClik(!clik)} to={log2.log}>
              <RiAdminFill
                size="27px"
                className="hover:cursor-pointer duration-300 hover:text-indigo-300 hover:scale-110"
              />
            </NavLink>
            {showAdmin}
            {/* cursor-not-allowed */}

          </div>
        </div>
        <ChildNavbar />
        <Outlet />

        {/* <Routes>
          <Route path="/items" element={<Aside items={items} />} />
        </Routes> */}
      </div>

      <Footer />
    </div>
  );
}

export default Main;
