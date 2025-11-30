// Context API = global shared data
import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserContext = createContext();

const ContextProvider = () => {
  const [useradd, setUserAdd] = useState("");
  const [update, setUpdate] = useState("");
  const [delUser, setDelUser] = useState("");
  return (
    <UserContext.Provider value={{useradd,setUserAdd,update,setUpdate,delUser,setDelUser}}>
       <Outlet/>
    </UserContext.Provider>
  );
};

export default ContextProvider;
