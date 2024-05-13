import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Main from "./Main";
import Manager from "./Manager";
import Login from "./Login";
import Section from "./Section";
import Articles from "./Articles/Articles";
import PDF from "./Articles/PDF";
import Appvment from "./Articles/Appvment";
import UpdateStock from "./Articles/UpdateStock";
import UpdateAppvment from "./Articles/UpdateAppvment" ; 
import AddStock from "./Articles/AddStock"
import AddAppvment from "./Articles/AddAppvment"
import Logout from "./Logout";


function App() {
  const items = ["Téléphone", "Lunette", "Ordinateur", "Tablette"];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Section />} />
          <Route path="/section" element={<Section />} />
          <Route exact path="/login" element={<Login />} />
           <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Manager />} />
          <Route path="dashboard" element={<Manager />} />
          <Route exact path="articles/stock" element={<Articles />} />
          <Route exact path="articles/appvment" element={<Appvment />} />
          <Route path="articles/stock/pdf" element={<PDF value="stock" />} />
          <Route path="articles/appvment/pdf" element={<PDF value="appvment" />} />

          <Route exact path="articles/stock/save" element={<AddStock />} />
          <Route exact path="articles/appvment/save" element={<AddAppvment />} />

          <Route  path="articles/stock/update/:stockId" element={<UpdateStock />} />
          <Route  path="articles/appvment/update/:appvmentId" element={<UpdateAppvment />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
