import { useState, useEffect } from "react";

import { useStore as userStore } from "../models/userStore";

const UseStatus = () => {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const user = userStore((state) => state.user);
  // create state variables
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    /* 
    setIsChecking(true);
    setStatus(null);
    setError(null);
*/
   isLoggedIn().then(res=>{
        console.log("STATUS ",res,user);
        setIsChecking(false);
        setStatus(res)
   }).catch((error) => {
        setIsChecking(false);
        setError(error);
      });
  }, []);

  return { status, error, isChecking };
};

export default UseStatus;
