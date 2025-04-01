import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth.tsx";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner.tsx";
import useAuthAxios from "../../hooks/UseAuthAxios.tsx";


function AutoLogin() {

  const authAxios = useAuthAxios()

  const { accessToken, setAccessToken, userId, setUserId } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = useRef(location.state?.from?.pathname || "../");

  useEffect(() => {
    if (accessToken || userId) {
      navigate(redirectPath.current)
      return;
    }
    async function getData(){
      try{
        const response = await authAxios.get(
          "/refresh",
          {
            withCredentials: true
          }
        )
        if(response.data?.accessToken && response.data?.userId){
          setAccessToken(response.data.accessToken)
          setUserId(response.data.userId)
          navigate(redirectPath.current)
        }
      }catch(error){
        navigate(
          "/auth/login",
          {
            state: {redirectPath: redirectPath.current},
          }
        )
      }
    }
    getData()

    // fetch(
    //   `${backendURL}/auth/refresh`,
    //   {
    //     method: "GET",
    //     credentials: "include",
    //   }
    // ).then((res) =>{
    //   if (!res.ok){
    //     return navigate("../auth/login",
    //       {
    //         state: {redirectPath: redirectPath.current},
    //       });
    //   }
    //   return res.json()
    // }).then((data)=>{
    //   if (data?.accessToken && data?.userId){
    //     setAccessToken(data.accessToken)
    //     setUserId(data.userId)
    //     navigate(redirectPath.current)
    //   }
    // })

  }, []);

  return (
    <LoadingSpinner display={true}/>
  );
}

export default AutoLogin;