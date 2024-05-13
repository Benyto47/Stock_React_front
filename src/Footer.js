import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa";

function Footer() {
  const items = [{}];
  return (
    <div className="max-w-[87rem] pt-5 my-7 py-4 bg-gray-200 mx-auto min-h-[20rem]">
      <div className="sm:flex ps-10 sm:ps-0 font-extralight  justify-evenly space-x-5">
        <div className="mt-5 sm:mt-0">
          <h1 className="uppercase mb-7 font-bold">à propos de nous ?</h1>
          <div className="flex-col font-mono space-y-7">
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              Notre histoire
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              the ones
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              onseSight
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-0">
          <h1 className="uppercase mb-7 font-bold">besoin d'aide</h1>
          <div className="flex-col font-mono space-y-7">
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              Assistance
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              suivi des commandes
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              retours
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              suivi des retours
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              faq
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              nous contactez
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mt-0">
          <h1 className="uppercase mb-7 font-bold">Produit categorie</h1>
          <div className="flex-col font-mono space-y-7">
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              Notre histoire
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              the ones
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500">
              onseSight
            </p>
          </div>
        </div>

        <div className="mt-5 sm:mt-0">
          <h1 className="uppercase mb-7 font-bold">suivez-nous</h1>
          <div className="flex-col font-mono space-y-7">
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500 flex items-center space-x-5 ">
              <FaFacebook size="27px" />
              &nbsp; Facebook
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500 flex items-center space-x-5 ">
              <BsTwitter size="27px" />
              &nbsp;twitter
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-orange-400 flex items-center space-x-5 ">
              <AiFillInstagram size="27px" />
              &nbsp;onstagram
            </p>
            <p className="uppercase hover:cursor-pointer duration-300 ease-in-out hover:text-blue-500 flex items-center space-x-5 ">
              <FaFacebookMessenger size="27px" />
              &nbsp;Messenger
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
