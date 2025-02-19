import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth.tsx";
import { backendURL } from "../../AppVariables.ts";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner.tsx";


function AutoLogin() {
  const { accessToken, setAccessToken } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = useRef(location.state?.from?.pathname || "../");

  useEffect(() => {
    if (accessToken){
      navigate(redirectPath.current)
      return;
    }

    fetch(
      `${backendURL}/auth/refresh`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res) =>{
      if (!res.ok){
        return navigate("../auth/login",
          {
            state: {redirectPath: redirectPath.current},
          });
      }
      return res.json()
    }).then((data)=>{
      if (data?.accessToken){
        setAccessToken(data.accessToken)
        navigate(redirectPath.current)
      }
    })

  }, []);

  return (
    <LoadingSpinner display={true}/>
  );
}

export default AutoLogin;