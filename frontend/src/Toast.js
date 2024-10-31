import { toast } from "react-toastify";

export const handleSucess = (msg)=>{
  toast.success(msg,{
    position:'top-right',
    style:{backgroundColor:'green',color:'black'},duration: 2000,pauseOnHover:false
  })
}

export const handleError = (msg) =>{
  toast.error(msg,{
    position:'top-right',
    style:{backgroundColor:'red',color:'black'},duration: 2000
  })
}