import React, { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import phone from "./image/apple.jpg";
import pc from "./image/ordinateur.jpg";
import tablette from "./image/tablette.jpg";
import lunette from "./image/lunette.jpg";

const Section = () => {
  const [image, setImage] = useState([
    {
      id: pc,
      style: "text-blue-500 bg-slate-50",

      text: (
        <h1 className="font-black text-4xl">
          ORDINATEUR &gt; Gérer et visualiser les articles en stock
        </h1>
      ),
    },
    {
      id: phone,
      style: "text-slate-600 bg-pink-100",

      text: (
        <h1 className="font-black text-4xl">
          TÉLÉPHONE &gt; Gérer et visualiser les articles en stock
        </h1>
      ),
    },
    {
      id: tablette,
      style: "text-blue-500 bg-slate-50",

      text: (
        <h1 className="font-black text-4xl">
          TABLETTE &gt; Gérer et visualiser les articles en stock
        </h1>
      ),
    },
    {
      text: (
        <h1 className="font-black text-4xl">
          LUNETTE &gt; Gérer et visualiser les articles en stock
        </h1>
      ),
      id: lunette,
      style: "text-white bg-black",
      color: "text-white",
    },
  ]);
  const [count, setCount] = useState(0);

  const handleClickRight = () =>
    setCount((prevState) => (prevState < 3 ? prevState + 1 : 0));

  const handleClickLeft = () =>
    setCount((prevState) => (prevState > 0 ? prevState - 1 : 3));

  console.log("handle Click Right : ", count);
  console.log("handle click left : ", count);

  const images = ["pc", "tablette", "lunette", "phone"];

  const colorChevron =
    image[count].id === lunette ? "text-white" : "text-black";

  const chevron = (
    <div className="flex justify-between items-center px-5 h-full">
      <BsFillArrowRightCircleFill
        onClick={handleClickLeft}
        size="27px"
        class={`hover:cursor-pointer hover:text-pink-300 text-black duration-300 ease-in-out rotate-180 ${colorChevron}`}
      />
      <BsFillArrowRightCircleFill
        onClick={handleClickRight}
        size="27px"
        class="hover:cursor-pointer z-[100] hover:text-pink-300 text-black duration-300 ease-in-out "
      />
    </div>
  );
  /* bg-gradient-to-r from-blue-900 via-blue-500 to-white */
  return (
    <div
      className={`max-w-[87rem] ${image[count].style} mx-auto my-10 h-[500px] relative`}
    >
      <div className="relative group">
        <img
          src={image[count].id}
          className="h-[500px] w-[30rem] right-0 z-0  absolute"
        />
        <div className="p-3 animate-bounce  bg-purple-700 hidden group-hover:block rounded-full text-white absolute hover:cursor-pointer hover:durationo-300 ease-in-out hover:bg-blue-600 right-[7rem] top-[18rem]">
          <p className=" text-md font-semibold uppercase ">en savoir plus</p>
        </div>
      </div>
      {chevron}
      {/* absolute */}
      <div className="absolute max-w-lg left-32 top-32">
        {image[count].text}
        <p className="my-10">
          Faite vite !, gérer les articles en stock et en approvisionnement 
        </p>
        {image[count].id === lunette ? (
          <button className="px-3 py-2 hover:scale-110 duration-300 bg-white text-black">
           Démmarrer
          </button>
        ) : (
          <button className="px-3 hover:scale-110 duration-300 py-2 bg-purple-700 text-white">
            Démmarrer
          </button>
        )}
      </div>
    </div>
  );
};

export default Section;
