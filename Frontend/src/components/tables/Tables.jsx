import React from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import "../../index.css";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import Paginations from "../paginations/Paginations";


function Tables({ allusers ,deleteUser , getallUsers ,handlePrevBtn ,handleNextBtn,page ,setPage,pageCount }){

//change status
  const handleChangeStatus = async(id,status)=>{
    //  console.log(id,status)
    const res = await statuschangefunc(id,status)

    if(res.status === 200){
      getallUsers()
      toast.success("Status Updated") 
    }else{
      toast.error("error")
    }
  } 
  
  


  return (
    <>
    <div className="container mt-5 position-relative">
      <div className="grid grid-cols-7 gap-2 bg-black text-white items-center">
        <div className="px-4 py-2">ID</div>
        <div className="px-4 py-2">FullName</div>
        <div className="px-4 py-2">Email</div>
        <div className="px-4 py-2">Gender</div>
        <div className="px-4 py-2">Status</div>
        <div className="px-4 py-2">Profile</div>
        <div className="px-4 py-2">Action</div>
      </div>
      {allusers.length > 0 ?
        allusers.map((userdata, index) => {
          const { fname, lname, gender, email, status, profile, _id } =
            userdata;
          return (
            <>
              {/* Table Body Rows */}
              <div className="grid grid-cols-7 gap-2  border-b">
                <div className="px-4 py-4">{index + 1}</div>
                <div className="px-4 py-4">{fname + lname}</div>
                <div className="px-4 py-4">{email}</div>
                <div className="px-4 py-4">{gender}</div>
                <div className="px-4 py-4">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant={status === "Active" ? "primary" : "danger"}
                      id="dropdown-custom-components"
                    >
                      <Badge  bg={status === "Active" ? "primary" : "danger"}>
                        {status}
                      </Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleChangeStatus(_id,"Active")}>Active</Dropdown.Item>
                      <Dropdown.Item onClick= {()=>handleChangeStatus(_id,"Inactive")}>InActive</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="px-3 py-2 ">
                  <img
                    className="w-15 h-15 rounded-full"
                    src={profile}
                    alt="img"
                  />
                </div>
                <div className="px-4 py-4">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      className="border-0 bg-transparent p-0 hover:bg-white focus:outline-none"
                      id="dropdown-custom-components"
                    >
                      <HiDotsVertical size={24} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <NavLink
                          to={`/userprofile/${_id}`}
                          className="flex items-center gap-2 !no-underline"
                        >
                          <FaEye size={20} className="text-green-500" />
                          View
                        </NavLink>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <NavLink
                          to={`/edit/${_id}`}
                          className="flex items-center gap-2 !no-underline"
                        >
                          <FiEdit size={20} className="text-blue-500" /> Edit
                        </NavLink>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div className="flex items-center gap-2" onClick={()=>deleteUser(_id)}>
                          <MdDelete size={20} className="text-red-800" /> Delete
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </>
          );
        }): <p className="text-2xl text-center">Not Data Found</p>}
         {/* <Paginations handlePrevBtn={handlePrevBtn}
            handleNextBtn = {handleNextBtn}
            page ={page}
            setPage={setPage}
            pageCount = {pageCount} /> */}
    </div>
    <ToastContainer position="top-center" toClose={5000} />
    </>
  );
}

export default Tables;

// allusers data home page me server se fetch kiya then =>
//store in state and as a prop send kiya tables component me =>
// then tables me get kiya , it is array of object if length > 0 then
// map kiya array of obj par


//search sort filter by gender,status,or pagination  iske liye new route nhi create kiya

// update status ke liye new route create

// remember no need to create everything from screatch but slightly logic gets change react bootstrap
