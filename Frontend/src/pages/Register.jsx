import React, { useState, useEffect,useContext} from "react";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../services/Apis.js";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../components/context/ContextProvider.jsx";
import UserForm from "../components/common/UserForm.jsx";
import {options,initialValues} from "../constants/index.js"

function Register() {
  const [showspin, setShowSpin] = useState(true);
  
  //handle img
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();
  const {useradd, setUserAdd} = useContext(UserContext)

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (formDataFromUser) => {
      
      const formData = new FormData();
      Object.keys(formDataFromUser).map( key => {
       formData.append(key,formDataFromUser[key])
      })

      if(image){
        formData.append("profile",image)
      }

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const res = await register(formData, config);

      console.log(res);
      if(res.status === 201){
         toast.success("User registered successfully");
         setImage(null);
         setPreviewImage("");
         setUserAdd(res.data.user) // so that access in home page
      }else{
         toast.error("error")
      }
          navigate("/")
    }

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

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
      {showspin ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner variant="danger" />
        </div>
      ) : (
        <div className="flex flex-column">
          <h1 className="text-center mt-1">Register Your Details</h1>
          <div className="max-w-screen mx-[100px]  mt-3 p-4 rounded shadow-lg">
             <UserForm 
             initialValues={initialValues}
             options ={options}
             previewImage={previewImage || '/girl.jpeg'}
             onSubmit={handleFormSubmit}
             handleImageChange ={handleImageChange}
             getImageName={getImageName}
             />
            <ToastContainer position="top-center" toClose={5000} />
          </div>
        </div>
      )}
    </>
  );
}

export default Register;

//what i learn
// 1)  public folder images path => /img.jpeg , /aanchal.jpeg
// 2) use this always=>For larger forms, it's better to use a single
// state object to store all the form fields.
//3) e is the event object that React automatically provides when the onChange
//  event is triggered.
// 4) use the checked attribute for  radio buttons and checkboxes

// Whenever you want to center an element both horizontally and vertically,
// you need to ensure the container has both width and height
// defined (using w-full, h-screen, or custom values).


// when user registered then navigate to home page that page one 
// alert show user registered sucessfully for that we create one context 
// check in virtualvista end call logic


 // key should match with value={}
// Use JSON when you're not uploading files, 
// and use FormData when you need to upload files.