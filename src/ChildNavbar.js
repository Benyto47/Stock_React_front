import React from "react";
import { BiCar } from "react-icons/bi";
import { MdCalendarToday } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import { FcCalendar } from "react-icons/fc";

function ChildNavbar() {
  const items = [
    { icon: <BiCar size="27px" />, name: "Livraison gratuit" },
    { icon: <MdCalendarToday size="27px" />, name: "7 jours de réfraction" },
    { icon: <BiMoney size="27px" />, name: "crédit gratuit*" },
    { icon: <FcCalendar size="27px" />, name: "Paiement à la livraison" },
  ];
  return (
    <div className="bg-purple-700 text-white mt-5  flex max-w-[1400px] mx-auto justify-evenly p-4">
      <div className="font-semibold italic text-xl">Gestion de stock &gt;</div>

      {items.map((item, index) => {
        return (
          <div key={index} className="flex items-center space-x-5">
            {item.icon} &nbsp;{" "}
            <span className="hidden md:block">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ChildNavbar;
