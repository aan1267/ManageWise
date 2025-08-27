import React,{useState,useEffect} from "react";
import { MdEmail ,MdLocationOn } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { FaPersonDress } from "react-icons/fa6"
import { SlCalender } from "react-icons/sl";
import Spiner from "../components/spiner/Spiner";
import { useParams } from "react-router-dom";
import { singleusergetfunc } from "../services/Apis";
import moment from "moment"


function Profile() {
  const [showspin,setShowSpin] = useState(true);
  const [userprofile,setUserProfile] = useState("");

  //id
  const {id} = useParams();
  // console.log(id)

  useEffect(()=>{
    userProfileGet()
    setShowSpin(()=>{
      false
    },2000)
  },[])

  const userProfileGet = async()=>{
     const res = await singleusergetfunc(id)
    //  console.log(res.data)
    if(res.status === 200){
       setUserProfile(res.data)
    }else{
      console.log("Error")
    }
    
  }
  const  { fname, lname, gender, email, status, profile,mobile,location, dateCreated } = userprofile 

  return (
     <>
      { showspin ? <Spiner/> :(
       <div className="lg:max-w-[900px]  max-w-[500px] md:max-w-[700px] mx-auto shadow-2xl mt-[10%] p-3">
       <div className="mb-3">
         <img
           className="w-32 h-32 rounded-full mx-auto"
           src={profile}
           alt="nnn"
         />
       </div>
       <div className="text-center">
         <h1>{fname +""+ lname}</h1>
         <div className="flex items-center justify-center mb-2">
           <MdEmail size={35} />&nbsp;<span className="text-2xl font-bold">:- {email}</span>
         </div>
         <div className="flex items-center justify-center mb-2">
           <FaMobile size={35} />&nbsp;<span className="text-2xl font-bold"> :- {mobile}</span>
         </div>
         <div className="flex items-center justify-center mb-2">
           <FaPersonDress size={35} />&nbsp;<span className="text-2xl font-bold"> :- {gender} </span>
         </div>
         <div className="flex items-center justify-center mb-2">
           <MdLocationOn size={35} />&nbsp;<span className="text-2xl font-bold"> :- {location} </span>
         </div>
         <div className="flex items-center justify-center mb-2">
          <span className="text-2xl font-bold"> Status  :-  {status} </span>
         </div>
         <div className="flex items-center justify-center mb-2">
           <SlCalender size={30}/>  &nbsp;<span className="text-2xl font-bold">Date Created :- {moment(dateCreated).format("DD-MM-YYYY")}</span>
         </div>
         <div className="flex items-center justify-center mb-2">
           <SlCalender size={30}/> &nbsp;<span className="text-2xl font-bold">Date Updated :- </span>
 
         </div>
       </div>
     </div>
  )
    }
     </>
  )
}

export default Profile;