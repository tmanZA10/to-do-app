import {useContext} from "react";
import {MainAxiosContext} from "../context/MainAxiosContext.tsx";

function useMainAxios(){
  return useContext(MainAxiosContext)
}

export default useMainAxios