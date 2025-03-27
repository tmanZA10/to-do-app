import {useContext} from "react";
import {AuthAxiosContext} from "../context/AuthAxiosContext.tsx";


function useAuthAxios() {
  return useContext(AuthAxiosContext)
}

export default useAuthAxios;