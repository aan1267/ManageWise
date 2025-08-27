import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {singleusergetfunc,edituserfunc } from "../services/Apis";
import { UserContext } from "../components/context/ContextProvider";
import UserForm from "../components/common/UserForm";
import {options} from "../constants"


function Edit() {
  const { id } = useParams();
  // fetch userData from backend
  const [initialData, setInitialData] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [image,setImage] = useState(null);

    //alert
   const { setUpdate } = useContext(UserContext);
   const navigate = useNavigate()

  useEffect(()=>{
     const userData = async () => {
    try{
      const res = await singleusergetfunc(id);
      if(res.status === 200) {
        const {fname,lname,email,mobile,gender,status,profile,location} = res.data
       setInitialData({
         fname,
         lname,
         email,
         mobile,
         gender,
         status,
         location,
         profile
       })
       console.log("profile",profile);
       setPreviewImage(profile)
     }
    }catch(e){
      console.log(e)
    }
  };
   userData()
 },[id])


  //profile set
  const  handleImageChange  = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file)
    setPreviewImage(URL.createObjectURL(file)) //crete url
  };

  //getImageName
  const getImageName = ()=>{
    if(image) return image?.name 
    if(previewImage) return previewImage.split("/").pop() 
    return "No File Choose"
  }



  const handleEditForm = async(data) => {

    const formData = new FormData();

    Object.keys(data).map(key=>{
      if(key == "profile"){
      // check if user uploaded a new image
      if(image) {
        formData.append("profile",image); 
        // formData.append("profile", previewImage);
      }
    } else {
      formData.append(key, data[key]); // append all other fields
    }
  });
    
      const config = {
        "Content-Type": "multipart/form-data",
      };

      const res = await edituserfunc(id, formData,config)
       if (res.status === 200){
        setUpdate(res.data) // this show alert on home page
        navigate("/")
       }else{
          toast.error("Error updating user");
       } 
      
    }
  



  // useEffect(()=>{
  //   userProfileGet();
  // },[id])


  
  return (
    <>
      <div className="flex flex-column">
        <h1 className="text-center mt-1">Edit Your Details</h1>
        <div className="max-w-screen mx-[100px]  mt-3 p-4 rounded shadow-lg">
           <UserForm
             initialValues={initialData}
             options = {options}
             previewImage={previewImage}
             onSubmit ={handleEditForm}
             handleImageChange ={handleImageChange}
             getImageName={getImageName}
           />
          <ToastContainer position="top-center" toClose={5000} />
        </div>
      </div>
    </>
  );
}

export default Edit;





// const handleInputValue = (e) => {
//     const { name, value } = e.target;
//     setInputData({
//       ...inputdata,
//       [name]: value,
//     });
//   };