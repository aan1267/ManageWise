import axios from "axios"

export const commonreq = async(methods,url,body,header)=>{
    let config = {
        method : methods,
        url,
        headers : header ? header : {
            "Content-Type": "application/json" // default
        },
        data : body
    }

    // axios instance 
    return axios(config).then((data)=>{
        return data
    }).catch((e)=>{
        return e
    })
} 