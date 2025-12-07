import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000", 
});
export const register=(username:string,email:string,password:string)=>{
    return api.post("/auth/register",{username,email,password});
}

//export default api;