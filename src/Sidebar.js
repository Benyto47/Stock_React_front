import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineUser, AiOutlineHome, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { SiLoopback } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  const menus = [
    { name: "Gestion de Stock", link: "/", icon: AiOutlineHome, margin: true },
    { name: "dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },

    {
      name: "Articles en stock",
      link: "/admin/articles/stock",
      icon: FiFolder,
      margin: true,
    },
    {
      name: "Article Approvisionnement",
      link: "/admin/articles/appvment",
      icon: FiShoppingCart,
    },

    { name: "Deconnexion", link: "/logout", icon: HiOutlineLogout, margin: true },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#ad4816] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 fixed px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? console.log(" link is pending")
                  : isActive
                  ? ` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 bg-gray-800 rounded-md`
                  : `${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`
              }
              to={menu?.link}
              key={i}
              /*   className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`} */
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
