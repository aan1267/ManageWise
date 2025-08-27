import {commonreq} from "./ApiCall"
import { BASE_URL } from "./helper"



export const register = async(data,header)=>{
   return await commonreq("post",`${BASE_URL}/user/register`,data,header)
}

export const usergetfunc = async(search,gender,status,sort,page)=>{
   // query params (mutliple value) 
   return await commonreq("get",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"")
}

export const singleusergetfunc = async(id)=>{
   return await commonreq("get",`${BASE_URL}/user/${id}`,"")
}

export const edituserfunc = async(id,data,header)=>{
   return await commonreq("put",`${BASE_URL}/user/edit/${id}`,data,header)
}

export const deletefunc = async(id)=>{
   return await commonreq("delete",`${BASE_URL}/user/delete/${id}`,{})
}


//here data = status and we can pass anything in parameter
export const statuschangefunc = async(id,data)=>{
   return await commonreq("put",`${BASE_URL}/user/status/${id}`,{data})
}



// Method 1: State + Query Params in API Call
// 📌 Steps:
// 1️⃣ Store data in state (search, gender, status, sort, page).
// 2️⃣ Pass state values as query parameters in API request (req.query).
// 3️⃣ Backend extracts query params, applies filters, and returns filtered data
//  method 2 Use useSearchParams + SAME Backend