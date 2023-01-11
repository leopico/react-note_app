import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Error from "./Components/Error";
import Create from "./Pages/note/Create";
import Edit from "./Pages/note/Edit";
import All from "./Pages/Label/All";
import LabelCreate from "./Pages/Label/Create";
import LabelEdit from "./Pages/Label/Edit";
import SearchUsers from "./Pages/Contribute/SearchUsers";
import AllReceive from "./Pages/Contribute/AllReceive";
import AllContribute from "./Pages/Contribute/AllContribute";

const MainRouter = () => {
  return (
    <Routes>
      {/*Home*/}
      <Route path="/" element={<Home />} />

      {/*Auth*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*Error*/}
      <Route path="*" element={<Error />} />

      {/*note*/}
      <Route path="/:category_slug/note" element={<Home />} />
      <Route path="/note/create" element={<Create />} />
      <Route path="/note/:slug" element={<Edit />} />

      {/*label*/}
      <Route path="/label" element={<All />} />
      <Route path="/label/create" element={<LabelCreate />} />
      <Route path="/label/edit/:slug" element={<LabelEdit />} />

      {/*Contrubute*/}
      <Route path="/contribute/:slug" element={<SearchUsers />} />
      <Route path="/show/contribute" element={<AllContribute />} />
      <Route path="/show/receive" element={<AllReceive />} />
    </Routes>
  );
};

export default MainRouter;
