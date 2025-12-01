import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaSort } from "react-icons/fa";
import Tables from "../components/tables/Tables";
import Spiner from "../components/spiner/Spiner";
import { UserContext } from "../components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import { usergetfunc, deletefunc } from "../services/Apis";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [showspin, setShowSpin] = useState(true);
  const [allusers, setAllUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "All");
  const [status, setStatus] = useState(searchParams.get("status") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "new");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  //alerts
  const { useradd, setUserAdd, update, setUpdate, delUser, setDelUser } =
    useContext(UserContext);

  console.log(useradd);
  const adduser = () => {
    navigate("/register");
  };

  // getallusers
  const getallUsers = async () => {
    //search
    const res = await usergetfunc(search, gender, status, sort, page);

    if (res.status === 200) {
      console.log(res.data.users);
      setAllUsers(res.data.users);
      setTotalPages(res.data.total);
    }
  };

  //delete user // backend id
  const deleteUser = async (id) => {
    const res = await deletefunc(id);

    if (res.status === 200) {
      setDelUser(true);
      getallUsers();
    }
  };
  
    // update URL query params whenever filters/search/page changes
  useEffect(() => {
    const params = { search, gender, status, sort, page };
    
    // remove default values 
    if (gender === "All") delete params.gender;
    if (status === "All") delete params.status;
    if (sort === "new") delete params.sort;
    // if (page === 1) delete params.page;
    if (!search) delete params.search;

    setSearchParams(params);
  }, [search, gender, status, sort, page]);

  useEffect(() => {
    getallUsers()
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, sort, page]); // so that whenever serach getalluser changes as per search

  return (
    <>
      {/* alert show on the top  */}
      {useradd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {useradd.fname.toUpperCase()} Sucessfully Added
        </Alert>
      ) : (
        ""
      )}
      {update ? (
        <Alert variant="primary" onClose={() => setUserAdd("")} dismissible>
          Sucessfully updated
        </Alert>
      ) : (
        ""
      )}
      {delUser ? (
        <Alert variant="danger" onClose={() => setDelUser("")} dismissible>
          User delete
        </Alert>
      ) : (
        ""
      )}
      {console.log(search)}
      <div className="container">
        <div className="flex justify-between items-center pt-5">
          <Form className="flex flex-rows items-center gap-2 w-[800px]">
            <Form.Control
              type="text"
              placeholder="search...."
              value={search}    
              className="w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <Button variant="success" onClick={()=>setPage(1)} className="px-4 py-2">
              Search
            </Button> */}
          </Form>
          <div>
            <Button variant="primary" onClick={adduser}>
              <div className="flex items-center gap-2">
                <FaPlus /> Add User
              </div>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div>
            <Button variant="success">Export to CV</Button>
          </div>
          <div>
            <h1>Filter By Gender</h1>
            <div className="flex flex-row justify-around gap-4">
              <Form.Check
                type="radio"
                label="All"
                name="gender"
                value="All"
                defaultChecked
                onChange={(e) => setGender(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                // checked = {inputdata.gender === "male"}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <h1>Sort By Value</h1>
            <Dropdown className="text-center">
              <Dropdown.Toggle
                className="border-0 bg-white p-0"
                id="dropdown-basic"
              >
                <FaSort size={20} className="text-black" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort("new")}>
                  New
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("old")}>
                  Old
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <h1> Filter By Value</h1>
            <div className="flex flex-row justify-around gap-4">
              <Form.Check
                type="radio"
                label="All"
                name="status"
                value="All"
                defaultChecked
                onChange={(e) => setStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Active"
                name="status"
                value="Active"
                onChange={(e) => setStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Inactive"
                name="status"
                value="Inactive"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
        </div>
        {showspin ? (
          <Spiner />
        ) : (
          <>
            <Tables
              allusers={allusers}
              deleteUser={deleteUser}
              getallUsers={getallUsers}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;

// useSearchParams se sab states (search, filter, sort, page) URL me 
// reflect hote hain aur refresh ke baad bhi retain ho jate hain.

//create function to load more
// const getMoreUser = async()=>{
//  const nextPage = page ? page + 1 : 1

//  const res = await usergetfunc(search, gender, status, sort, nextPage)
//   if(res.status == 200){
//     if(res.data.users.length == 0){
//       setHasMore(false)
//       return
//     }
//        console.log(res)
//     setAllUsers(prev => [...prev,...res.data.users]) // append users
//     setPage(nextPage)
//   }
// }
// <InfiniteScroll
//           dataLength ={allusers.length}
//           hasMore = {hasMore}
//           next = {getMoreUser}
//           loader = {<h4><Spiner/></h4>}
//           endMessage = {<p className="textAlign:center">No more Users</p>}
//          ></InfiniteScroll>
////Home.jsx → API call + states

// mistake 
// error due to your search was not work due to not mention value attritube as value change to value aaye na value ={search}
// dynamic search (onChange) no need button

// feature of  these project i add 
// Dynamic search, sorting, filtering
// Form validation (frontend + backend)
// Global state management using Context API
// CRUD operations: add, view, delete users
// Image upload with Cloudinary